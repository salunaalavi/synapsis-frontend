<template>
  <div class="flex flex-col w-full mb-2" :class="[`${xClass}`]">
    <label class="mb-2">
      {{ label }}
      <span v-if="required" style="color: red"> * </span>
    </label>
    <input
      :class="{
        warning: showValidation,
        'opacity-50 cursor-not-allowed': disabled,
      }"
      :type="type"
      :value="viewValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="validateField($event)"
      @keypress="ruler($event)"
    />
    <p v-if="showValidation" class="pt-2 text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: [String, Number, Object, Array],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
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
  type: {
    type: String,
    default: "text", // [text, password]
  },
  showValidation: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  xClass: {
    type: String,
    default: "",
  },
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
<style scoped lang="scss">
@import "../../assets/scss/libs/_variables";
@import "../../assets/scss/libs/_mixins";

input {
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
