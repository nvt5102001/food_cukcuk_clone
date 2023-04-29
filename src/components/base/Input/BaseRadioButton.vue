<template>
    <div class="ms-radio-item">
        <input
        :type="typeInput"
        :name="nameInput"
        :id="idInput"
        :class="classInput"
        :value="valueInput"
        v-model="value"
        :title="titleInput"
        @input="$emit('changeInput')"
        @blur="$emit('validateInput')"
        @change="$emit('onChangeInput')"
        :ref="refInput"
        :checked="checkedInput"
      />
      <span class="ms-radioButton">
        <span class="ms-radio-border"></span>
        <span class="ms-radio-tron"></span>
      </span>
      <span class="ms-radio-lable">{{nameRadio}}</span>
  </div>
</template>

<script>
export default {
  name: "BaseRadioButton",
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
    idInput: {
      type: String,
      default: "",
    },
    nameInput: {
      type: String,
      default: "",
    },
    valueInput: {
      type: String,
      default: "",
    },
    classLabel: String,
    titleInput: String,
    labelInput: String,
    refInput: String,
    nameRadio: String,
    checkedInput: {
      type: Boolean,
      default: true
    }
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