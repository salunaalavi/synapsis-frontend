<template>
  <div
    class="flex flex-col w-full"
    :class="[`md:${width}`]"
    v-bind="null"
  >
    <label v-if="label" class="mb-1">
      {{ label }}{{ label ? ":" : "" }}
      <span
        v-if="required"
        style="color: red"
      >
        *
      </span>
    </label>
    <textarea
      v-bind="$attrs"
      :value="viewValue"
      :class="[`${showValidation ? 'warning' : ''}`, `${customClass}`]"
      :placeholder="placeholder"
      class="rounded-md"
      @input="validateField($event)"
      @keypress="ruler($event)"
    />
    <p
      v-if="showValidation"
      class="pt-2 text-red-500"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>
<script setup>
const props = defineProps({
  value: {
    type: [String, Number, Object, Array],
    default: "",
  },
  width: {
    type: String,
    default: "w-1/2",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
    required: false,
  },
  required: {
    type: Boolean,
    default() {
      return false;
    },
  },
  errorMessage: {
    type: String,
    default: "",
  },
  parser: {
    type: Function,
    default: null,
  },
  invertedParser: {
    type: Function,
    default: null,
  },
  validator: {
    type: [RegExp, null, Array],
    default: null,
  },
  rule: {
    type: [RegExp, null],
    default: null,
  },
  showValidation: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
    required: false,
  }
});
const emit = defineEmits(["update:value", "update:showValidation"]);

const viewValue = computed(() => {
  if (props.parser && props.value && props.value !== "") {
    return props.parser(props.value);
  }
  return props.value;
});

function emitNewVal(val) {
  const parsedValue = props.parser ? props.parser(val) : val;
  const rawValue =
    props.parser && props.invertedParser
      ? props.invertedParser(parsedValue)
      : parsedValue;
  emit("update:value", rawValue);
}

function ruler(e) {
  if (props.rule) {
    e = e ? e : window.event;
    if (!props.rule.test(e.key)) {
      e.preventDefault();
    } else {
      return true;
    }
  }
}

function validateField(e) {
  let showValidation = false;
  let inputValue = e.target.value;
  const parsedValue = props.parser ? props.parser(inputValue) : inputValue;
  const rawValue =
    props.parser && props.invertedParser
      ? props.invertedParser(parsedValue)
      : parsedValue;
  if (props.validator) {
    e = e ? e : window.event;
    inputValue = e.target.value;
    if (typeof props.validator === "object" && props.validator.length > 0) {
      props.validator.forEach((regex, i) => {
        if (i === 0) {
          showValidation = !regex.test(inputValue);
        } else {
          showValidation = showValidation && !regex.test(inputValue);
        }
      });
    } else {
      showValidation = !props.validator?.test(inputValue) || false;
    }
    // cancel validator if its not valid because of required
    if (inputValue === "" && showValidation && !props.required) {
      showValidation = false;
    }
  } else {
    showValidation =
      props.required &&
      (rawValue === "" || rawValue === null || rawValue === undefined);
  }
  emit("update:showValidation", showValidation);
  emitNewVal(inputValue);
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/libs/variables";
@import "../../assets/scss/libs/mixins";
textarea {
  @include flex-all-center;
  padding: $spacer-1;
  border-radius: $spacer-1;
  position: relative;
  width: 100%;
  box-shadow: 0px 7px 17px rgba(51, 51, 51, 0.07);
  border: 1px solid $primary;
  font-size: 0.875rem;
  line-height: 1.25rem;
  &.warning {
    border-color: red;
  }
  &::placeholder {
    color: $primary;
    font-weight: 400;
    font-size: 0.875rem;
  }
  &:focus {
    outline: none;
  }
}
</style>