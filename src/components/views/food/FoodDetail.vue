<template>
  <div class="ms-popup" id="popup-form">
    <div class="popup">
      <div class="popup-form">
        <div class="popup-header">
          <div class="popup__header--title">
            {{ changeTitle }}
          </div>
          <div
            class="popup__header--close icon-form-close icon-16"
            title="Đóng"
            @click="closeDialog"
          ></div>
        </div>
        <div class="popup-body">
          <div class="popup__body-header flex flex-items-center">
            <div class="popup__body-header-left"></div>
            <div class="popup__body-header-right"></div>
          </div>
          <div class="popup__body-content">
            <div class="popup__body-header">
              <div class="form-tabbar flex flex-items-center">
                <div
                  class="form-tabbar-item"
                  :class="{ active: this.general == true }"
                  @click="openTabbar(true)"
                >
                  Thông tin chung
                </div>
                <div
                  class="form-tabbar-item"
                  :class="{ active: this.serviceHobby == true }"
                  @click="openTabbar()"
                >
                  Sở thích phục vụ
                </div>
              </div>
            </div>
            <div
              v-show="general"
              class="popup__body-contents flex flex-jus-between tabbar"
            >
              <div class="popup__body-content-left">
                <div class="popup__group__input flex flex flex-items-center">
                  <label class="popup__group__input-label"
                    >Tên món <span class="lable-required">(*)</span></label
                  >
                  <div class="popup__input">
                    <input
                      type="text"
                      name="foodName"
                      id=""
                      class="input"
                      v-model="food.FoodName"
                      title-input="Tên món"
                      @blur="getFoodCode"
                      required
                    />
                  </div>
                </div>
                <div class="popup__group__input flex flex flex-items-center">
                  <label class="popup__group__input-label"
                    >Mã món <span class="lable-required">(*)</span></label
                  >
                  <div class="popup__input">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="input"
                      v-model="food.FoodCode"
                      title-input="Mã món"
                      required
                      @blur="blurValidate"
                    />
                  </div>
                </div>
                <div class="popup__group__input flex flex flex-items-center">
                  <label class="popup__group__input-label"
                    >Nhóm thực đơn
                  </label>
                  <div class="popup__input">
                    <BaseCombobox
                      class="combobox"
                      name="menuGroupName"
                      @getValue="GetMenuGroupID"
                      url="https://localhost:44340/api/v1/MenuGroups"
                      propValue="MenuGroupID"
                      propText="MenuGroupName"
                    />
                  </div>
                </div>
                <div class="popup__group__input flex flex flex-items-center">
                  <label class="popup__group__input-label"
                    >Đơn vị tính <span class="lable-required">(*)</span></label
                  >
                  <div class="popup__input">
                    <BaseCombobox
                      class="combobox"
                      name="foodUnitName"
                      url="https://localhost:44340/api/v1/FoodUnits"
                      @getValue="GetFoodUnitID"
                      propValue="FoodUnitID"
                      propText="FoodUnitName"
                      titleInput="Đơn vị tính"
                      @blurValidate="blurValidate"
                      required
                    />
                  </div>
                </div>
                <div
                  class="popup__group__input flex flex flex-items-center input-cost"
                >
                  <label class="popup__group__input-label"
                    >Giá bán <span class="lable-required">(*)</span></label
                  >
                  <div class="popup__input">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="input"
                      title-input="Giá bán"
                      @keydown="removeLeadingZeros"
                      @input="inputNumberPrice"
                      @keyup="
                        ($event) => updateValue($event, food, 'FoodPrice')
                      "
                      :value="convertMoney(food.FoodPrice)"
                      @blur="blurMoneyPrice"
                      required
                      style="text-align: right; padding-right: 3px"
                    />
                  </div>
                </div>
                <div
                  class="popup__group__input flex flex flex-items-center input-cost"
                >
                  <label class="popup__group__input-label">Giá vốn </label>
                  <div class="popup__input">
                    <input
                      type="text"
                      name=""
                      id=""
                      class="input"
                      @input="inputNumberCost"
                      @keyup="($event) => updateValue($event, food, 'FoodCost')"
                      :value="convertMoney(food.FoodCost)"
                      @blur="blurMoneyCost"
                      style="text-align: right; padding-right: 3px"
                    />
                  </div>
                </div>
                <div class="popup__group__input flex flex flex-items-center">
                  <label class="popup__group__input-label">Mô tả </label>
                  <div class="popup__input">
                    <textarea
                      name=""
                      id=""
                      class="input"
                      v-model="food.FoodDescription"
                    ></textarea>
                  </div>
                </div>
                <div class="popup__group__input flex flex flex-items-center">
                  <label class="popup__group__input-label">Chế biến tại</label>
                  <div class="popup__input">
                    <BaseCombobox
                      class="combobox"
                      name="cookRoomName"
                      url="https://localhost:44340/api/v1/CookRooms"
                      @getValue="GetCookRoomID"
                      propValue="CookRoomID"
                      propText="CookRoomName"
                    />
                  </div>
                </div>
                <div
                  class="popup__group__input flex flex flex-items-center"
                  style="margin-top: 4px"
                >
                  <label class="popup__group__input-label"></label>
                  <div class="popup__input checkbox-text ms-checkbox-con">
                    <input
                      type="checkbox"
                      name="showOnMenu"
                      id=""
                      class="input-checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="food.ShowOnMenu"
                    />
                    <span class="ms-checkbox">
                      <span
                        class="ms-checkbox-tick icon icon-checkbox-active icon-14 checked"
                      ></span> </span
                    ><span>Không hiển thị trên thực đơn</span>
                  </div>
                </div>
              </div>
              <div class="popup__body-content-right">
                <fieldset class="flex">
                  <legend>Ảnh đại diện</legend>
                  <div class="group__image-left">
                    <img
                      :src="
                        urlFileImage
                          ? urlFileImage
                          : getImgUrl('ImageHandler.png')
                      "
                      alt="Ảnh món"
                      class="image-food"
                    />
                    <!-- <button class="image__select-icons flex flex-items-center">
                      <div class="icon-16 image__select-icon"></div>
                      <div class="btn-icon-text">Biểu tượng</div>
                    </button> -->
                    <div class="group__image-left-text">
                      Chọn các ảnh có định dạng
                    </div>
                    <div class="group__image-left-text">
                      <b>(.jpg,.jpeg,.png,.gif)</b>
                    </div>
                  </div>
                  <div class="group__image-right">
                    <div
                      class="group__image-right-item btn-hover"
                      title="Chọn ảnh"
                      @click="btnOpenFileOnClick"
                    >
                      <span>...</span>
                      <input
                        v-on:change="fileImageOnChange($event)"
                        style="display: none"
                        type="file"
                        accept="image/*"
                        ref="inputOpenFileRef"
                      />
                    </div>
                    <div
                      class="group__image-right-item image__icon-cancel btn-hover"
                      title="Xoá ảnh"
                      @click="deleteImage"
                    >
                      <span style="color: red">x</span>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="popup__body-contents tabbar" v-show="serviceHobby">
              <div>
                <div style="margin-bottom: 8px">Món ăn:</div>
                <div class="flex flex-items-center">
                  <div class="icon-form-info-large icon-32"></div>
                  <div style="font-style: italic; margin-left: 8px">
                    Ghi lại các sở thích của khách hàng giúp nhân viên phục vụ
                    chọn nhanh order. <br />
                    VD: không cay/ít hành/thêm phomai...
                  </div>
                </div>
              </div>
              <div class="form-table-service">
                <table class="table-service">
                  <thead>
                    <tr>
                      <th style="width: 70%">Sở thích phục vụ</th>
                      <th style="width: 30%">Thu thêm</th>
                    </tr>
                  </thead>
                  <tbody class="ms-tbody-combobox">
                    <tr
                      v-for="(item, index) in serviceHobbies"
                      :key="index"
                      ref="firstRow"
                      @contextmenu.prevent="showServiceMenu($event, index)"
                    >
                      <td
                        :class="{
                          'column-selected':
                            index == rowSelected && flagRowSelected == 0,
                        }"
                      >
                        <div class="th-filter-type-1" style="margin: 0">
                          <input
                            type="text"
                            v-model="item.ServiceHobbyName"
                            @click="rowOnClick(index, 0)"
                            @keydown="selecItemUpDown"
                            :data-index="index"
                            class="input input-filter"
                            @input="inputOnChange(item.ServiceHobbyName)"
                            :class="{
                              'column-selected':
                                index == rowSelected && flagRowSelected == 0,
                            }"
                          />
                          <div
                            class="icon__input--down icon-16 input-btn"
                            @click="showListService(index)"
                          ></div>
                          <div
                            class="table-autocombobox"
                            id="optionsRow"
                            :class="{
                              hideEl: showService && serviceID == index,
                            }"
                          >
                            <div class="table-autocombobox-inner">
                              <div class="flex table-autocombobox-header">
                                <div class="w-60">Sở thích phục vụ</div>
                                <div class="w-40">Thu thêm</div>
                              </div>
                              <div
                                class="flex table-autocombobox-body"
                                v-for="(item, index) in filteredServiceHobbys"
                                :key="index"
                                :class="{
                                  'row-focus': index == indexItemFocus,
                                }"
                                :ref="'toFocus_' + index"
                                @focus="saveItemFocus(index)"
                                @click="
                                  getServiceID(
                                    item.ServiceHobbyName,
                                    item.AdditionalPayment,
                                    index
                                  )
                                "
                              >
                                <div class="w-60">
                                  {{ item.ServiceHobbyName }}
                                </div>
                                <div class="w-40" style="justify-content: end">
                                  {{ formatMoney(item.AdditionalPayment) }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        :class="{
                          'column-selected':
                            index == rowSelected && flagRowSelected == 1,
                        }"
                      >
                        <input
                          type="text"
                          v-model="item.AdditionalPayment"
                          class="input input-filter"
                          @click="rowOnClick(index, 1)"
                          :class="{
                            'column-selected':
                              index == rowSelected && flagRowSelected == 1,
                          }"
                          style="text-align: right"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="flex flex-items-center"
                style="margin: 4px 0; column-gap: 4px"
              >
                <button
                  class="btn-icons flex flex-items-center"
                  @click="addRow"
                >
                  <div
                    class="btn-icon toolbar__button--icon icon-toolbar icon-insert icon-16"
                  ></div>
                  <div class="btn-icon-text">Thêm dòng</div>
                </button>
                <button
                  class="btn-icons flex flex-items-center"
                  @click="removeRow"
                >
                  <div
                    class="btn-icon toolbar__button--icon icon-toolbar icon-delete icon-16"
                  ></div>
                  <div class="btn-icon-text">Xoá dòng</div>
                </button>
              </div>
            </div>
          </div>
          <div
            class="popup__body-footer flex flex-items-center flex-jus-between"
          >
            <div class="popup__body-footer-right flex flex-items-center">
              <button
                class="btn-icons flex flex-items-center"
                title="Ctrl + S"
                @click="handleStore"
              >
                <div
                  class="btn-icon icon-toolbar icon-16 icon-form-store"
                ></div>
                <div class="btn-icon-text">Cất</div>
              </button>
              <button
                class="btn-icons flex flex-items-center"
                @click="handleSave"
              >
                <div class="btn-icon icon-toolbar icon-16 icon-form-save"></div>
                <div class="btn-icon-text">Cất và thêm</div>
              </button>
              <button
                class="btn-icons flex flex-items-center"
                @click="closeDialog"
              >
                <div
                  class="btn-icon icon-toolbar icon-16 icon-form-cancel"
                ></div>
                <div class="btn-icon-text">Huỷ bỏ</div>
              </button>
            </div>
            <div class="popup__body-footer-left">
              <button class="btn-none" @keyup="tabFocus"></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="ms-component"
      style="position: fixed; z-index: 99999"
      v-show="isServiceMenuVisible"
      v-clickoutside="hideRightClickOpts"
      :style="{ top: serviceMenuTop + 'px', left: serviceMenuLeft + 'px' }"
    >
      <ul class="fix-list">
        <li class="fix-item" @click="addRow">
          <div
            class="toolbar__button--icon icon-toolbar icon-insert icon-16"
          ></div>
          <a href="#" class="fix-link">Thêm dòng </a>
        </li>
        <li class="fix-item" @click="removeRow">
          <div
            class="toolbar__button--icon icon-toolbar icon-delete icon-16"
          ></div>
          <a href="#" class="fix-link">Xoá dòng</a>
        </li>
      </ul>
    </div>

    <ThePopupType
      :showPopup="isShowPopup"
      @closeDialog="closePopup"
      :foodCode="foodCode"
      @closeDialogQuick="closeDialogQuick"
      @showPopupFunc="showPopupFunc"
      @handleStore="handleStore"
      :msg="msgPopup"
    />
  </div>
</template>
<script>
import BaseCombobox from "@/components/base/Combobox/BaseCombobox.vue";
import ThePopupType from "@/components/base/Popup/ThePopupType.vue";
import {
  InsertFood,
  UpdateFood,
  UploadImage,
  deleteImageOld,
} from "@/utils/foods/handleFood";
import { getServiceByID } from "@/utils/servicehobbys/loadServiceHobby";
import {
  getNewCode,
  getFoodByID,
  checkDuplicateCode,
} from "@/utils/foods/loadFood";
// import * as RequireImage from "@/js/handleImage";
import * as Sources from "@/common/Sources";
import * as Enum from "@/common/Enum";

const clickoutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
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

const keyCode = {
  Enter: 13,
  ArrowUp: 38,
  ArrowDown: 40,
  ESC: 27,
};

export default {
  name: "FoodDetail",
  components: {
    BaseCombobox,
    ThePopupType,
  },
  directives: {
    clickoutside,
  },
  props: {
    showDialog: Boolean,
    changeTitle: String,
    formMode: Number,
    totalRecord: Number,
    employees: Array,
    allEmployees: Array,
    foodID: String,
  },
  data() {
    return {
      general: true,
      serviceHobby: false,
      food: {
        FoodPrice: 0,
        FoodCost: 0,
      },
      serviceHobbies: [
        // {ServiceHobbyName: '', AdditionalPayment: 0 }
      ],
      serviceHobbys: [
        {
          ServiceHobbyID: 1,
          ServiceHobbyName: "Salad",
          AdditionalPayment: 20000,
        },
        {
          ServiceHobbyID: 2,
          ServiceHobbyName: "Mochi",
          AdditionalPayment: 10000,
        },
        { ServiceHobbyID: 3, ServiceHobbyName: "Kimchi", AdditionalPayment: 0 },
        { ServiceHobbyID: 4, ServiceHobbyName: "Kem", AdditionalPayment: 5000 },
        {
          ServiceHobbyID: 5,
          ServiceHobbyName: "Kem dâu",
          AdditionalPayment: 15000,
        },
        {
          ServiceHobbyID: 6,
          ServiceHobbyName: "Kem Socola",
          AdditionalPayment: 15000,
        },
        { ServiceHobbyID: 7, ServiceHobbyName: "Lá kim", AdditionalPayment: 0 },
        {
          ServiceHobbyID: 8,
          ServiceHobbyName: "Trà quất",
          AdditionalPayment: 12000,
        },
      ],
      filteredServiceHobbys: [],
      rowSelected: -1,
      flagRowSelected: -1,
      isValid: false,
      showService: false,
      serviceID: null,
      foodNameEl: null,
      menuGroupEl: null,
      cookRoomEl: null,
      foodUnitEl: null,
      showOnMenuEl: null,
      urlFileImage: "",
      // Biến lưu file ảnh
      fileImage: null,
      indexItemFocus: null,
      indexRowService: null,

      isServiceMenuVisible: false,
      serviceMenuTop: 0,
      serviceMenuLeft: 0,

      guidNull: "00000000-0000-0000-0000-000000000000",
      foodCode: null,
      isShowPopup: 0,
      imageOld: null,
      foodCodeOld: null,
      foodOld: {
        FoodPrice: 0,
        FoodCost: 0,
      },
      msgPopup: null,
      flagClose: null,
    };
  },

  methods: {
    closeDialogQuick() {
      this.showPopupFunc(0);
      this.$emit("showForm", false);
    },

    closePopup() {
      this.showPopupFunc(0);
    },
    /**
     * Hàm show popup
     * author: NVThuy(26/04/2023)
     */
    showPopupFunc(showPopup) {
      this.isShowPopup = showPopup;
    },

    showServiceMenu(event, index) {
      event.preventDefault();
      this.serviceID = index;
      this.serviceMenuTop = event.pageY;
      this.serviceMenuLeft = event.pageX;
      this.isServiceMenuVisible = true;
    },

    /**
     * Ẩn Menu con
     * author: NVThuy(25/04/2023)
     */
    hideRightClickOpts() {
      this.isServiceMenuVisible = false;
    },

    selecItemUpDown() {
      var me = this;
      var keyCodePress = event.keyCode;
      var elToFocus = null;
      this.filteredServiceHobbys = this.serviceHobbys;
      switch (keyCodePress) {
        case keyCode.ESC:
          this.showService = false;
          break;
        case keyCode.ArrowDown:
          this.showService = true;
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
          this.showService = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus - 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = this.filteredServiceHobbys.length - 1;
          } else {
            this.indexItemFocus -= 1;
          }
          break;
        case keyCode.Enter:
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus}`];
          if (elToFocus && elToFocus.length > 0) {
            elToFocus[0].click();
            this.showService = false;
          }
          break;
        default:
          break;
      }
    },
    inputOnChange(value) {
      this.filteredServiceHobbys = this.serviceHobbys.filter(
        (item) =>
          item.ServiceHobbyName.includes(value) ||
          item.AdditionalPayment.toString().includes(value)
      );
      this.showService = true;
    },
    /**
     * Format lại từ tiền về số
     * author: NVThuy(25/04/2023)
     */
    parseMoney(moneyString) {
      if (moneyString != "0") {
        if (/\D/.test(moneyString)) {
          let integerString = moneyString.replace(/[^\d]/g, "");
          return parseInt(integerString);
        } else {
          return moneyString;
        }
      } else {
        return 0;
      }
    },

    /**
     * Format kiểu tiền
     * author: NVThuy(25/04/2023)
     */
    FormatMoney(data) {
      let regex = /^[0-9]& /;
      if (regex.test(data)) data = data.slice(0, data?.length - 2);
      let result = "";
      let value = (data + "").split("").reverse();
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 3 == 0) {
          result += "." + value[i];
        } else {
          result += value[i];
        }
      }
      return result.split("").reverse().join("");
    },

    /**
     * Convert kiểu tiền
     * author: NVThuy(25/04/2023)
     */
    convertMoney(value) {
      if (value) {
        if (value && typeof value === "string") {
          // Kiểm tra và xoá bỏ số 0 đầu tiên của value
          if (value.startsWith("0") && value.length > 1) {
            value = value.replace(/^0+/, "");
          }
        }
        const regex = /\./i;
        let temp = value + "";
        while (temp.indexOf(".") != -1) temp = temp.replace(regex, "").trim();
        let current = this.FormatMoney(temp);
        return current;
      }
      return 0;
    },

    /**
     * Cập nhật lại giá trị
     * author: NVThuy(25/04/2023)
     */
    updateValue(e, datas, field) {
      datas[field] = e.target.value;
    },

    /**
     * Lấy ra url ảnh
     * author: NVThuy(25/04/2023)
     */
    getImgUrl(image) {
      var images = require.context("../../../assets/icon", false, /\.*/);
      return images("./" + image);
    },

    /**
     * API upload ảnh trả về tên ảnh lưu trữ trên server
     * author: NVThuy(26/04/2023)
     */
    async uploadImage() {
      let res = await UploadImage(this.fileImage);
      this.food.FoodImageID = res.data;
    },

    /**
     * Xoá ảnh
     * author: NVThuy(26/04/2023)
     */
    deleteImage() {
      this.fileImage = null;
      this.food.FoodImageID = null;
      this.urlFileImage = this.getImgUrl("ImageHandler.png");
    },

    /**
     * Chọn ảnh và hiển thị
     * author: NVThuy(26/04/2023)
     */
    fileImageOnChange(event) {
      var _this = this;
      var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']; // danh sách các kiểu tập tin ảnh được phép
      if (event.target.files && event.target.files[0] && allowedTypes.includes(event.target.files[0].type)) {
        var reader = new FileReader();
        reader.onload = function (e) {
          _this.urlFileImage = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        _this.fileImage = event.target.files[0];
      } else {
        this.showPopupFunc(Enum.typePopup.errorImg);
        this.msgPopup = Sources.popupMsg.errorImgMsg;
      }
},

    /**
     * Chọn ảnh
     * author: NVThuy(25/04/2023)
     */
    btnOpenFileOnClick() {
      this.$refs.inputOpenFileRef.click();
    },

    /**
     * Lấy món ăn thông qua id
     * author: NVThuy(25/04/2023)
     */
    async getFoodByid() {
      try {
        if (
          this.formMode == Enum.formMode.update ||
          this.formMode == Enum.formMode.clone
        ) {
          let res = await getFoodByID(this.foodID);
          if (res.status == 200) {
            this.food = res.data;
            this.foodOld = { ...this.food };

            if (this.food.FoodImageID) {
              this.imageOld = this.food.FoodImageID;
              this.urlFileImage = `https://localhost:44340/api/v1/Foods/get-image/${this.food.FoodImageID}`;
            }
            if (this.formMode == Enum.formMode.clone) {
              this.newCode();
            }
            this.foodCodeOld = this.food.FoodCode;
            this.menuGroupEl.value = this.food.MenuGroupName;
            this.cookRoomEl.value = this.food.CookRoomName;
            this.foodUnitEl.value = this.food.FoodUnitName;
            let result = await getServiceByID(this.foodID);
            if (result.status == 200) {
              this.serviceHobbies = result.data;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy ra sở thích phục vụ thêm
     * author: NVThuy(25/04/2023)
     */
    getServiceID(name, price, index) {
      this.indexItemFocus = index;
      for (var i = 0; i < this.serviceHobbies.length; i++) {
        if (i == this.serviceID) {
          this.serviceHobbies[i].ServiceHobbyName = name;
          this.serviceHobbies[i].AdditionalPayment = price;
        }
      }
      this.showService = false;
    },

    /**
     * Hiển thị bảng chứa sở thích phục vụ thêm
     * author: NVThuy(25/04/2023)
     */
    showListService(index) {
      this.serviceID = index;
      this.filteredServiceHobbys = this.serviceHobbys;
      let miniMenu = document.getElementById("optionsRow");
      let showMiniMenu = event.target.closest(".icon__input--down");
      if (event.target == showMiniMenu) {
        // Lấy toạ độ của button show Menu con
        var rect = showMiniMenu.getBoundingClientRect();
        // Hiện menu con
        this.showService = !this.showService;
        // this.ListService();
        // Hiện menu con ở vị trí dưới button show menu con
        miniMenu.style.top = `${rect.top}px`;
        miniMenu.style.left = `8px`;
      }
    },

    /**
     * Hàm validate dữ liệu không được để trống
     * author: NVThuy(25/04/2023)
     */
    validate() {
      const inputs = document.getElementsByTagName("input");
      let hasEmptyValue = true;
      // Lặp qua từng input để kiểm tra nếu input có thuộc tính "required"
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].hasAttribute("required")) {
          if (!inputs[i].value || inputs[i].value.trim() == "".trim()) {
            if (!inputs[i].hasAttribute("data-error-icon")) {
              // Kiểm tra nếu chưa có data-error-icon
              inputs[i].classList.add("input-error");
              const errorIcon = document.createElement("div");
              errorIcon.className =
                "icon-16 icon-form-error popup__input-error";
              const popupGroupInput = inputs[i].closest(".popup__group__input");
              if (popupGroupInput) {
                popupGroupInput.appendChild(errorIcon);
                inputs[i].setAttribute("data-error-icon", "true"); // Thêm thuộc tính data-error-icon để đánh dấu đã thêm div
              }
              const titleInput = inputs[i].getAttribute("title-input");
              if (titleInput) {
                errorIcon.setAttribute(
                  "title",
                  `${titleInput} không được để trống!`
                );
              }
            }
            hasEmptyValue = false;
          } else {
            const errorIcon = inputs[i]
              .closest(".popup__group__input")
              .querySelector(".icon-form-error");
            if (errorIcon) {
              errorIcon.remove();
              inputs[i].removeAttribute("data-error-icon"); // Xóa thuộc tính data-error-icon để đánh dấu đã xóa div
            }
            inputs[i].classList.remove("input-error");
          }
        }
      }
      return hasEmptyValue;
    },

    blurValidate() {
      if (event.target.value != null && event.target.value.trim() === "") {
        if (!event.target.hasAttribute("data-error-icon")) {
          event.target.classList.add("input-error");
          const errorIcon = document.createElement("div");
          errorIcon.className = "icon-16 icon-form-error popup__input-error";
          const popupGroupInput = event.target.closest(".popup__group__input");
          if (popupGroupInput) {
            popupGroupInput.appendChild(errorIcon);
            event.target.setAttribute("data-error-icon", "true"); // Thêm thuộc tính data-error-icon để đánh dấu đã thêm div
          }
          const titleInput = event.target.getAttribute("title-input");
          if (titleInput) {
            errorIcon.setAttribute(
              "title",
              `${titleInput} không được để trống!`
            );
          }
        }
      } else {
        const errorIcon = event.target
          .closest(".popup__group__input")
          .querySelector(".icon-form-error");

        if (errorIcon) {
          errorIcon.remove();
          event.target.removeAttribute("data-error-icon"); // Xóa thuộc tính data-error-icon để đánh dấu đã xóa div
        }
        event.target.classList.remove("input-error");
      }
    },

    blurMoneyCost(event) {
      if (event.target.value.trim() === "") {
        event.target.value = 0;
        this.food.FoodCost = 0;
      }
    },
    blurMoneyPrice(event) {
      if (event.target.value.trim() === "") {
        event.target.value = 0;
        this.food.FoodPrice = 0;
      }
    },

    /**
     * Chuyển tab trong form
     * author: NVThuy(25/04/2023)
     */
    openTabbar(tab) {
      if (tab == true) {
        this.general = true;
        this.serviceHobby = false;
      } else {
        // this.$el.querySelector('input[data-index="0"]').focus();
        this.general = false;
        this.serviceHobby = true;
      }
    },

    /**
     * Đóng form
     * author: NVThuy(25/04/2023)
     */
    closeDialog() {
      for (let prop in this.food) {
        if (this.foodOld[prop] !== this.food[prop]) {
          this.showPopupFunc(Enum.typePopup.store);
          this.flagClose = 1;
          this.msgPopup = Sources.popupMsg.storeMsg;
          this.$emit("showForm", true);
        } else {
          if (this.flagClose != 1) {
            this.$emit("showForm", false);
            this.showPopupFunc(0);
          }
        }
      }
    },

    /**
     * Gán value vào obj và hiển thị
     * author: NVThuy(25/04/2023)
     */
    GetMenuGroupID(value) {
      this.food["MenuGroupID"] = value.trim();
      this.$el.querySelector('div[name="menuGroupName"] input').value =
        value.trim();
    },

    /**
     * Gán value vào obj và hiển thị
     * author: NVThuy(25/04/2023)
     */
    GetCookRoomID(value) {
      this.food["CookRoomID"] = value;
      this.$el.querySelector('div[name="cookRoomName"] input').value = value;
    },

    /**
     * Gán value vào obj và hiển thị
     * author: NVThuy(25/04/2023)
     */
    GetFoodUnitID(value) {
      this.food["FoodUnitID"] = value;
      this.$el.querySelector('div[name="foodUnitName"] input').value = value;
    },

    /**
     * Chọn dòng sở thích phục vụ thêm
     * author: NVThuy(25/04/2023)
     */
    rowOnClick(index, flag) {
      this.serviceID = index;
      this.rowSelected = index;
      this.flagRowSelected = flag;
    },

    /**
     * Thêm dòng phục vụ thêm
     * author: NVThuy(25/04/2023)
     */
    addRow() {
      this.serviceHobbies.push({ ServiceHobbyName: "", AdditionalPayment: 0 });
      if (this.serviceHobbies.length > 0) {
        this.rowSelected = this.serviceHobbies.length - 1;
        this.flagRowSelected = 0;
      }
      this.isServiceMenuVisible = false;
    },

    /**
     * Xoá dòng phục vụ thêm
     * author: NVThuy(25/04/2023)
     */
    removeRow() {
      if (this.serviceHobbies.length > 0) {
        if (this.serviceID !== undefined && this.serviceID !== null) {
          for (var i = 0; i < this.serviceHobbies.length; i++) {
            if (i == this.serviceID) {
              this.serviceHobbies.splice(i, 1);
            }
          }
        } else {
          this.serviceHobbies.pop();
        }
      }
      this.serviceID = null;
      this.isServiceMenuVisible = false;
    },

    /**
     * Hàm cất dữ liệu
     * author: NVThuy(25/04/2023)
     */
    async handleStore() {
      let res;
      let check = this.validate();
      let checkCode = await this.checkDuplicateCodeFunc(
        this.guidNull,
        this.food.FoodCode
      );
      // this.foodCode = this.food.FoodCode;
      if (check) {
        if (this.fileImage) {
          await this.uploadImage();
        }
        this.food.FoodPrice = this.parseMoney(this.food.FoodPrice);
        this.food.FoodCost = this.parseMoney(this.food.FoodCost);
        this.formatShowOnMenu();
        if (
          this.formMode == Enum.formMode.add ||
          this.formMode == Enum.formMode.clone
        ) {
          if (checkCode.data == false) {
            res = await InsertFood(this.food, this.serviceHobbies);
            if (res.status == 201) {
              this.$emit("showForm", false);
              this.$emit("filterData");
            } else {
              console.log(res.data.ListErrors);
            }
          } else {
            this.foodCode = this.food.FoodCode;
            this.showPopupFunc(Enum.typePopup.duplicate);
          }
        } else if (this.formMode == Enum.formMode.update) {
          if (this.food.FoodCode != this.foodCodeOld) {
            if (checkCode.data == false) {
              if (this.food.FoodImageID != this.imageOld) {
                await deleteImageOld(this.imageOld);
              }
              res = await UpdateFood(
                this.foodID,
                this.food,
                this.serviceHobbies
              );
              if (res.status == 200) {
                this.$emit("showForm", false);
                this.$emit("filterData");
              }
            } else {
              this.foodCode = this.food.FoodCode;
              this.showPopupFunc(Enum.typePopup.duplicate);
            }
          } else {
            if (this.food.FoodImageID != this.imageOld) {
              await deleteImageOld(this.imageOld);
            }
            res = await UpdateFood(this.foodID, this.food, this.serviceHobbies);
            if (res.status == 200) {
              this.$emit("showForm", false);
              this.$emit("filterData");
            }
          }
        }
      } else {
        console.log("Có lỗi");
      }
    },

    /**
     * Kiểm tra trùng mã
     * author: NVThuy(25/04/2023)
     */
    async checkDuplicateCodeFunc(id, code) {
      let res;
      res = await checkDuplicateCode(id, code);
      return res;
    },

    /**
     * Hàm cất và thêm
     * author: NVThuy(25/04/2023)
     */
    async handleSave() {
      let res;
      let check = this.validate();
      let checkCode = await this.checkDuplicateCodeFunc(
        this.guidNull,
        this.food.FoodCode
      );
      if (check) {
        if (this.fileImage) {
          await this.uploadImage();
        }
        this.food.FoodPrice = this.parseMoney(this.food.FoodPrice);
        this.food.FoodCost = this.parseMoney(this.food.FoodCost);
        this.formatShowOnMenu();
        if (
          this.formMode == Enum.formMode.add ||
          this.formMode == Enum.formMode.clone
        ) {
          if (checkCode.data == false) {
            res = await InsertFood(this.food, this.serviceHobbies);
            if (res.status == 201) {
              this.resetForm();
              this.newCode();
              this.$emit("filterDataNoLoading");
            } else {
              console.log(res.data.ListErrors);
            }
          } else {
            this.foodCode = this.food.FoodCode;
            this.showPopupFunc(Enum.typePopup.duplicate);
          }
        } else if (this.formMode == Enum.formMode.update) {
          res = await UpdateFood(this.foodID, this.food, this.serviceHobbies);
          if (res.status == 200) {
            this.resetForm();
            this.newCode();
            this.$emit("filterDataNoLoading");
          }
        }
      } else {
        console.log("Có lỗi");
      }
    },

    /**
     * Reset form
     * author: NVThuy(27/04/2023)
     */
    resetForm() {
      this.$emit("changeFormMode");
      this.food = {};
      this.food.FoodPrice = 0;
      this.food.FoodCost = 0;
      this.menuGroupEl.value = "";
      this.cookRoomEl.value = "";
      this.foodUnitEl.value = "";
      this.deleteImage();
      this.foodNameEl.focus();
    },

    /**
     * Format hiện trên menu
     * author: NVThuy(25/04/2023)
     */
    formatShowOnMenu() {
      if (this.food.ShowOnMenu == true) {
        this.food.ShowOnMenu = 1;
      } else {
        this.food.ShowOnMenu = 0;
      }
    },

    /**
     * API lấy ra mã mới
     * author: NVThuy(25/04/2023)
     */
    async newCode() {
      if (this.food.FoodName && this.food.FoodName.trim() !== "") {
        let res = await getNewCode(this.food.FoodName);
        this.food.FoodCode = "";
        this.food.FoodCode = res.data;
      }
    },

    /**
     * Blur input tên món -> hiển thị mã mới
     * author: NVThuy(25/04/2023)
     */
    getFoodCode() {
      this.blurValidate();
      if (this.formMode == Enum.formMode.add) {
        this.newCode();
      }
    },

    /**
     * Focus quay trở lại input tên món ăn
     * author: NVThuy(25/04/2023)
     */
    tabFocus() {
      let nextFocus = event.key;
      if (nextFocus == "Tab") {
        this.foodNameEl.focus();
      }
    },

    inputNumberPrice(event) {
      let newValue = event.target.value.replace(/[^0-9]/g, "");
      this.food.FoodPrice = newValue;
    },

    // inputNumberCost(event) {
    //   let newValue = event.target.value.replace(/[^0-9]/g, "");
    //   this.food.FoodCost = newValue;
    // },

    inputNumberCost(e) {
      // loại bỏ các ký tự không phải số và không phải dấu chấm
      e.target.value = event.target.value.replace(/[^0-9]/g, "");

      // loại bỏ các số 0 đầu tiên
      if (e.target.value.startsWith("0") && e.target.value.length > 1) {
        e.target.value = e.target.value.replace(/^0+/, "");
      }
    },

    /**
     * Sự kiện nhấn phím
     * Created by NVTHUY 06/04/2023
     */
    async handleKey(event) {
      // Nhấn 'ESC' để đóng form
      if (event.keyCode == 27) {
        this.closeDialog();
      }

      // // Nhấn tổ hợp phím Ctr + S để 'Cất'
      // if (event.ctrlKey && event.key === "s") {
      //   event.preventDefault();
      //   await this.handleStore();
      // }

      // // Nhấn tổ hợp phím Ctr + Shift + S để 'Cất và thêm'
      // if (event.ctrlKey && event.shiftKey && event.key === "s") {
      //   event.preventDefault();
      //   this.handleSave();
      // }
    },

    /**
     * Format hiển thị tiền
     * author: NVThuy(25/04/2023)
     */
    formatMoney(value) {
      if (typeof value == "number" && (value || value === 0)) {
        var money = Math.round(value);
        return money
          .toString()
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
  },

  created() {
    this.getFoodByid();
  },

  mounted() {
    this.foodNameEl = this.$el.querySelector('input[name="foodName"]');
    this.menuGroupEl = this.$el.querySelector(
      'div[name="menuGroupName"] input'
    );
    this.cookRoomEl = this.$el.querySelector('div[name="cookRoomName"] input');
    this.foodUnitEl = this.$el.querySelector('div[name="foodUnitName"] input');
    this.showOnMenuEl = this.$el.querySelector('input[name="showOnMenu"]');
    this.foodNameEl.focus();

    window.addEventListener("keydown", (e) => this.handleKey(e));
  },

  beforeUnmount() {
    window.removeEventListener("keydown", () => this.handleKey());
  },
};
</script>

<style scoped>
</style>