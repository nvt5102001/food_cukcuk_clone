<template>
    <div class="ms-input relative ">
        <div class="flex ms-input-label">
            <div :class="classLabel" :title="titleLabel">{{labelInput}}</div>
            <div class="ms-input-title-require" v-show="labelRequired"> *</div>
        </div>
        <div :class="classInputIcon">
            <input
            :type="typeInput"
            :class="classInput"
            :name="nameInput"
            :required="requiredInput"
            v-model="value"
            :title="titleInput"
            @input="$emit('changeInput')"
            @blur="$emit('validateInput')"
            :DataType="DataType"
            :placeholder="placeholder"
            />

            <div class="input__button__dropdown" v-show="iconDate">
                <span class="icon icon-24 icon-calendar"></span>
            </div>
        </div>
        <span class="input-msg"></span>
    </div>
</template>

<script>
export default {
  name: "BaseInput",
  watch: {
    value(val) {
      this.$emit("update:modelValue", val);
    },
    modelValue(val) {
      this.value = val;
    },
  },
  props: {
    modelValue: [String, Number, Boolean],
    typeInput: {
      type: String,
      default: "",
    },
    classInput: {
      type: String,
      default: "",
    },
    nameInput: {
      type: String,
      default: "",
    },
    classLabel: String,
    titleLabel:String,
    titleInput: String,
    DataType: String,
    labelInput: String,
    classInputIcon: String,
    placeholder: String,
    labelRequired: Boolean,
    requiredInput: Boolean,
    iconDate: Boolean,
  },
  data() {
    return {
      value: null,
    };
  },
  created() {
    this.value = this.modelValue;
  },
};
</script>
<style scoped>
</style>