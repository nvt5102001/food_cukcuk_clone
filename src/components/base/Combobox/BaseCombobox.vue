<template>
  <div class="combobox">
    <input
      type="text"
      class="input combobox__input"
      ref="inputEl"
      v-model="textInput"
      @input="inputOnChange"
      @keydown="selecItemUpDown"
      :required="required"
      @blur="$emit('blurValidate')"
      :class="classInput"
      :title-input="titleInput"
      
    />
    <button
      class="button combobox__button"
      @click.stop="btnSelectDataOnClick"
      @keydown="selecItemUpDown"
      tabindex="-1"
    >
      <div class="icon__input--down icon-16 input-btn "></div>
    </button>
    <div
      v-if="isShowListData"
      class="combobox__data"
      ref="combobox__data"
      v-clickoutside="hideListData"
    >
      <a
        class="combobox__item"
        v-for="(item, index) in dataFilter"
        :class="{
          'combobox__item--focus': index == indexItemFocus,
          'combobox__item--selected': index == indexItemSelected,
        }"
        :key="item[this.propValue]"
        :ref="'toFocus_' + index"
        :value="item[this.propValue]"
        @click="itemOnSelect(item, index)"
        @focus="saveItemFocus(index)"
        @keydown="selecItemUpDown(index)"
        @keyup="selecItemUpDown(index)"
        tabindex="1"
      >
      
        <span>{{ item[this.propText] }}</span>
      </a>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
/**
 * Gán sự kiện nhấn click chuột ra ngoài combobox data (ẩn data list đi)
 * NVMANH (31/07/2022)
 */
const clickoutside = {
  mounted(el, binding, vnode, prevVnode) {
    el.clickOutsideEvent = (event) => {
      // Nếu element hiện tại không phải là element đang click vào
      // Hoặc element đang click vào không phải là button trong combobox hiện tại thì ẩn đi.
      if (
        !(
          (
            el === event.target || // click phạm vi của combobox__data
            el.contains(event.target) || //click vào element con của combobox__data
            el.previousElementSibling.contains(event.target)
          ) //click vào element button trước combobox data (nhấn vào button thì hiển thị)
        )
      ) {
        // Thực hiện sự kiện tùy chỉnh:
        binding.value(event, el);

        // vnode.context[binding.expression](event); // vue 2
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  beforeUnmount: (el) => {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

const keyCode = {
  Enter: 13,
  ArrowUp: 38,
  ArrowDown: 40,
  ESC: 27,
};

export default {
  name: "MSCombobox",
  directives: {
    clickoutside,
  },
  props: {
    value: null,
    url: String,
    propValue: String,
    propText: String,
    isLoadData: {
      type: Boolean,
      default: true,
    },
    required:String,
    classInput: String,
    titleInput: String,

  },
  methods: {
    /**
     * Lưu lại index của item đã focus
     * NVMANH (31/07/2022)
     */
    saveItemFocus(index) {
      this.indexItemFocus = index;
    },

    /**
     * Ẩn danh sách item
     * NVMANH (31/07/2022)
     */
    hideListData() {
      this.isShowListData = false;
    },

    /**
     * Nhấn vào button thì hiển thị hoặc ẩn List Item
     * NVMANH (31/07/2022)
     */
    btnSelectDataOnClick() {
      this.dataFilter = this.data;
      this.isShowListData = !this.isShowListData;
    },

    /**
     * Click chọn item trong danh sách
     * NVMANH (31/07/2022)
     */
    itemOnSelect(item, index) {
      const text = item[this.propText];
      const value = item[this.propValue];
      this.textInput = text; // Hiển thị text lên input.
      this.inputID = value;
      this.indexItemSelected = index;
      this.isShowListData = false;
      this.$emit("getValue", value, text, item);
      this.$refs.inputEl.focus(); // Thuỷ custom
    },

    /**
     * Nhập text thì thực hiện filter dữ liệu và hiển thị
     * NVMANH (31/07/2022)
     */
    inputOnChange() {
      var me = this;
      // Thực hiện lọc các phần tử phù hợp trong data:
      this.dataFilter = this.data.filter((e) => {
        let text = removeVietnameseTones(me.textInput)
          .toLowerCase()
          .replace(" ", "");
        let textOfItem = removeVietnameseTones(e[me.propText])
          .toLowerCase()
          .replace(" ", "");
        return textOfItem.includes(text);
      });
      this.isShowListData = true;
    },

    /**
     * Lựa chọn item bằng cách nhấn các phím lên, xuống trên bàn phím
     * NVMANH (31/07/2022)
     */
    selecItemUpDown() {
      var me = this;
      var keyCodePress = event.keyCode;
      var elToFocus = null;
      switch (keyCodePress) {
        case keyCode.ESC:
          this.isShowListData = false;
          break;
        case keyCode.ArrowDown:
          this.isShowListData = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus + 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = 0;
          } else {
            this.indexItemFocus += 1;
          }
          break;
        case keyCode.ArrowUp:
          this.isShowListData = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus - 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = this.dataFilter.length - 1;
          } else {
            this.indexItemFocus -= 1;
          }
          break;
        case keyCode.Enter:
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus}`];
          if (elToFocus && elToFocus.length > 0) {
            elToFocus[0].click();
            this.isShowListData = false;
          }
          break;
        default:
          break;
      }
    },
  },

  created() {
    // Thực hiện lấy dữ liệu từ api:
    if (this.url) {
      fetch(this.url)
        .then((res) => res.json())
        .then((res) => {
          this.data = res;
          this.dataFilter = res;
        })
        .catch((res) => {
          console.log(res);
        });
    }
  },
  data() {
    return {
      data: [], // data gốc
      inputID: null,
      textInput: null,
      dataFilter: [], // data đã được filter
      isShowListData: false, // Hiển thị list data hay không
      indexItemFocus: null, // Index của item focus hiện tại
      indexItemSelected: null, // Index của item được selected
    };
  },
};
</script>
<style scoped>
.combobox {
  position: relative;
  /* flex-direction: row; */
  /* border-radius: 4px; */
  box-sizing: border-box;
}

.combobox__input,
select {
  width: 100%;
  height: 22px;
  flex: 1;
  padding-right: 24px !important;
  padding-left: 3px;
  outline: none;
  border: 1px solid #ccc;
  /* font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  box-sizing: border-box;
}

.combobox__input:focus,
.combobox__input:focus ~ .combobox__button {
  border-color: #4b9cd7 !important;
}

.combobox__button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(90, 90, 90);
  right: 0px;
  top: 0px;
  border: 1px solid #bbbbbb;
  border-left: unset;
  height: 22px;
  width: 22px;
  background-color: #fff;
  cursor: pointer;
  min-width: unset !important;
  outline: none;
  box-sizing: border-box;
  opacity: 0.5;
}

/* .combobox__button:hover,
.combobox__button:focus {
  background-color: #bbbbbb;
  color: #000;
} */

.combobox__data {
  display: flex;
  flex-direction: column;
  padding: 4px 0px;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 3px 6px #00000016;
  z-index: 999;
}

.combobox__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 40px;
  padding-left: 10px;
  height: 25px;
  cursor: pointer;
  /* border: 1px solid #ccc; */
  outline: none;
}


.combobox__item-icon--selected {
  width: 14px;
  height: 11px;
}

.combobox__item:hover,
.combobox__item:focus,
.combobox__item--focus,
.combobox__item--hover {
  background-color: #dbe7f7;
  color: #000;
}

.combobox__item--selected {
  pointer-events: none;
  background-color:#b6d3f8;
  color: #333;
}
</style>