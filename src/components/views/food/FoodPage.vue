<template>
  <div class="content" @click="handleClickOutside">
    <div class="inner__content">
      <div class="content__header">
        <div class="content__header__title">
          <div class="content__title">Thực đơn</div>
          <!-- <div class="header__button__list">
            <div>
              <BaseButton
                class="btn btn-green"
                id="btnAddEmployee"
                text="Thêm mới nhân viên"
                @click="handleOpenDialog"
              />
            </div>
          </div> -->
        </div>
        <div class="content__header__directory"></div>
      </div>

      <div class="content__body">
        <div class="content__body__options">
          <div class="content__body__option">
            <div class="content__body__option-left flex flex-items-center">
              <div class="center__body__option-left-item">
                <div
                  class="toolbar__button"
                  @click="handleOpenDialog"
                  title="Ctr + 1"
                >
                  <div
                    class="toolbar__button--icon icon-toolbar icon-insert icon-16"
                  ></div>
                  <div class="toolbar__button--text">Thêm</div>
                </div>
                <div
                  class="toolbar__button"
                  @click="handleClone"
                  title="Ctr + C"
                >
                  <div
                    class="toolbar__button--icon icon-toolbar icon-clone icon-16"
                  ></div>
                  <div class="toolbar__button--text">Nhân bản</div>
                </div>
                <div
                  class="toolbar__button"
                  @click="showUpdate()"
                  title="Ctr + E"
                >
                  <div
                    class="toolbar__button--icon icon-toolbar icon-update icon-16"
                  ></div>
                  <div class="toolbar__button--text">Sửa</div>
                </div>
                <div
                  class="toolbar__button"
                  @click="handleDelete"
                  title="Ctr + D"
                >
                  <div
                    class="toolbar__button--icon icon-toolbar icon-delete icon-16"
                  ></div>
                  <div class="toolbar__button--text">Xoá</div>
                </div>
              </div>
              <div
                class="center__body__option-left-item"
                style="column-gap: 4px"
              >
                <div class="line-page" style="margin: 0 5px"></div>
                <div
                  class="toolbar__button"
                  @click="refreshData"
                  title="Ctr + Y"
                >
                  <div
                    class="toolbar__button--icon icon-toolbar icon-load icon-16"
                  ></div>
                  <div class="toolbar__button--text">Nạp</div>
                </div>
              </div>
            </div>
            <div class="content__body__option-center">
              <div class="center__body__option-center-item">
                <div class="input-icon center__body__input"></div>
              </div>
            </div>
            <div class="content__body__option-right"></div>
          </div>
        </div>

        <div class="content__body__table">
          <TheLoading :isLoading="isLoading" />
          <div class="table__scroll">
            <table class="ms-table" id="tbEmployeeList">
              <thead class="ms-thead">
                <tr>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div class="th-text">Loại món</div>
                      <div class="th-filter-type-1">
                        <input
                          type="text"
                          class="input input-filter"
                          v-model="foodType"
                        />
                        <div
                          class="icon__input--down icon-16 input-btn"
                          @click="
                            () => (showFilterFoodType = !showFilterFoodType)
                          "
                        ></div>

                        <div class="filter-type-1" v-show="showFilterFoodType">
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="showFoodType('Tất cả')"
                          >
                            <div class="filter-type-2-text">Tất cả</div>
                          </div>
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="showFoodType('Món ăn')"
                          >
                            <div class="filter-type-2-text">Món ăn</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div
                        class="th-text"
                        @click="sortField(fieldName.FoodCode)"
                      >
                        Mã món
                        <span
                          class="icon-16"
                          :class="{
                            'icon-sort-desc':
                              iconSort === typeSort.DESC &&
                              flagSort == fieldName.FoodCode,
                            'icon-sort-asc':
                              iconSort === typeSort.ASC &&
                              flagSort == fieldName.FoodCode,
                          }"
                        ></span>
                      </div>
                      <div class="th-filter-type-2">
                        <div
                          class="input-btn icon-22"
                          @click="
                            () => (showFilterFoodCode = !showFilterFoodCode)
                          "
                        >
                          <span>{{ filterFoodCode }}</span>
                        </div>
                        <div
                          class="filter-type-2"
                          v-show="showFilterFoodCode"
                          v-clickoutside="() => (showFilterFoodCode = false)"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(field.FoodCode, item, item.id)
                            "
                            v-for="item in operators"
                            :key="item.id"
                          >
                            <div class="filter-type-2-active">
                              <div
                                class="icon-16"
                                :class="{
                                  'icon-filter-option-active':
                                    item.operator == filterFoodCode,
                                }"
                              ></div>
                            </div>
                            <div class="filter-type-2-operator">
                              <span>{{ item.operator }}</span>
                            </div>
                            <div class="filter-type-2-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </div>

                        <input
                          type="text"
                          class="input input-filter"
                          v-model="Filters[0].Value"
                          @change="changeFilter"
                          @blur="blurFilter()"
                        />
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div
                        class="th-text"
                        @click="sortField(fieldName.FoodName)"
                      >
                        Tên món
                        <span
                          class="icon-16"
                          :class="{
                            'icon-sort-desc':
                              iconSort === typeSort.DESC &&
                              flagSort == fieldName.FoodName,
                            'icon-sort-asc':
                              iconSort === typeSort.ASC &&
                              flagSort == fieldName.FoodName,
                          }"
                        ></span>
                      </div>
                      <div class="th-filter-type-2">
                        <div
                          class="input-btn icon-22"
                          @click="
                            () => (showFilterFoodName = !showFilterFoodName)
                          "
                        >
                          <span>{{ filterFoodName }}</span>
                        </div>
                        <div
                          class="filter-type-2"
                          v-show="showFilterFoodName"
                          v-clickoutside="() => (showFilterFoodName = false)"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(field.FoodName, item, item.id)
                            "
                            v-for="item in operators"
                            :key="item.id"
                          >
                            <div class="filter-type-2-active">
                              <div
                                class="icon-16"
                                :class="{
                                  'icon-filter-option-active':
                                    item.operator == filterFoodName,
                                }"
                              ></div>
                            </div>
                            <div class="filter-type-2-operator">
                              <span>{{ item.operator }}</span>
                            </div>
                            <div class="filter-type-2-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </div>

                        <input
                          type="text"
                          class="input input-filter"
                          v-model="Filters[1].Value"
                          @change="changeFilter"
                          @blur="blurFilter"
                        />
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div
                        class="th-text"
                        @click="sortField(fieldName.MenuGroupName)"
                      >
                        Nhóm thực đơn
                        <span
                          class="icon-16"
                          :class="{
                            'icon-sort-desc':
                              iconSort === typeSort.DESC &&
                              flagSort == fieldName.MenuGroupName,
                            'icon-sort-asc':
                              iconSort === typeSort.ASC &&
                              flagSort == fieldName.MenuGroupName,
                          }"
                        ></span>
                      </div>
                      <div class="th-filter-type-2">
                        <div
                          class="input-btn icon-22"
                          @click="
                            () => (showFilterMenuGroup = !showFilterMenuGroup)
                          "
                        >
                          <span>{{ filterMenuGroup }}</span>
                        </div>
                        <div
                          class="filter-type-2"
                          v-show="showFilterMenuGroup"
                          v-clickoutside="() => (showFilterMenuGroup = false)"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(field.MenuGroupName, item, item.id)
                            "
                            v-for="item in operators"
                            :key="item.id"
                          >
                            <div class="filter-type-2-active">
                              <div
                                class="icon-16"
                                :class="{
                                  'icon-filter-option-active':
                                    item.operator == filterMenuGroup,
                                }"
                              ></div>
                            </div>
                            <div class="filter-type-2-operator">
                              <span>{{ item.operator }}</span>
                            </div>
                            <div class="filter-type-2-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </div>
                        <input
                          type="text"
                          class="input input-filter"
                          v-model="Filters[2].Value"
                          @change="changeFilter"
                          @blur="blurFilter"
                        />
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div
                        class="th-text"
                        @click="sortField(fieldName.FoodUnitName)"
                      >
                        Đơn vị tính
                        <span
                          class="icon-16"
                          :class="{
                            'icon-sort-desc':
                              iconSort === typeSort.DESC &&
                              flagSort == fieldName.FoodUnitName,
                            'icon-sort-asc':
                              iconSort === typeSort.ASC &&
                              flagSort == fieldName.FoodUnitName,
                          }"
                        ></span>
                      </div>
                      <div class="th-filter-type-2">
                        <div
                          class="input-btn icon-22"
                          @click="
                            () => (showFilterFoodUnit = !showFilterFoodUnit)
                          "
                        >
                          <span>{{ filterFoodUnit }}</span>
                        </div>
                        <div
                          class="filter-type-2"
                          v-show="showFilterFoodUnit"
                          v-clickoutside="() => (showFilterFoodUnit = false)"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(field.FoodUnitName, item, item.id)
                            "
                            v-for="item in operators"
                            :key="item.id"
                          >
                            <div class="filter-type-2-active">
                              <div
                                class="icon-16"
                                :class="{
                                  'icon-filter-option-active':
                                    item.operator == filterFoodUnit,
                                }"
                              ></div>
                            </div>
                            <div class="filter-type-2-operator">
                              <span>{{ item.operator }}</span>
                            </div>
                            <div class="filter-type-2-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </div>
                        <input
                          type="text"
                          class="input input-filter"
                          v-model="Filters[3].Value"
                          @change="changeFilter"
                          @blur="blurFilter"
                        />
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div
                        class="th-text"
                        @click="sortField(fieldName.FoodCost)"
                      >
                        Giá vốn
                        <span
                          class="icon-16"
                          :class="{
                            'icon-sort-desc':
                              iconSort === typeSort.DESC &&
                              flagSort == fieldName.FoodCost,
                            'icon-sort-asc':
                              iconSort === typeSort.ASC &&
                              flagSort == fieldName.FoodCost,
                          }"
                        ></span>
                      </div>

                      <div class="th-filter-type-2">
                        <div
                          class="input-btn icon-22"
                          @click="
                            () => (showFilterFoodCost = !showFilterFoodCost)
                          "
                        >
                          <span>{{ filterFoodCost }}</span>
                        </div>
                        <div
                          class="filter-type-2"
                          style="right: -5px;"
                          v-show="showFilterFoodCost"
                          v-clickoutside="() => (showFilterFoodCost = false)"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(field.FoodCost, item, item.id)
                            "
                            v-for="item in compares"
                            :key="item.id"
                          >
                            <div class="filter-type-2-active">
                              <div
                                class="icon-16"
                                :class="{
                                  'icon-filter-option-active':
                                    item.compare == filterFoodCost,
                                }"
                              ></div>
                            </div>
                            <div class="filter-type-2-operator">
                              <span>{{ item.compare }}</span>
                            </div>
                            <div class="filter-type-2-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </div>

                        <input
                          type="number"
                          class="input input-filter"
                          v-model="Filters[4].Value"
                          @change="changeFilter"
                          @blur="blurFilter"
                        />
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div
                        class="th-text"
                        @click="sortField(fieldName.FoodPrice)"
                      >
                        Giá bán
                        <span
                          class="icon-16"
                          :class="{
                            'icon-sort-desc':
                              iconSort === typeSort.DESC &&
                              flagSort == fieldName.FoodPrice,
                            'icon-sort-asc':
                              iconSort === typeSort.ASC &&
                              flagSort == fieldName.FoodPrice,
                          }"
                        ></span>
                      </div>
                      <div class="th-filter-type-2">
                        <div
                          class="input-btn icon-22"
                          @click="
                            () => (showFilterFoodPrice = !showFilterFoodPrice)
                          "
                        >
                          <span>{{ filterFoodPrice }}</span>
                        </div>
                        <div
                          class="filter-type-2"
                          style="right: -5px;"
                          v-show="showFilterFoodPrice"
                          v-clickoutside="() => (showFilterFoodPrice = false)"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(field.FoodPrice, item, item.id)
                            "
                            v-for="item in compares"
                            :key="item.id"
                          >
                            <div class="filter-type-2-active">
                              <div
                                class="icon-16"
                                :class="{
                                  'icon-filter-option-active':
                                    item.compare == filterFoodPrice,
                                }"
                              ></div>
                            </div>
                            <div class="filter-type-2-operator">
                              <span>{{ item.compare }}</span>
                            </div>
                            <div class="filter-type-2-text">
                              {{ item.text }}
                            </div>
                          </div>
                        </div>

                        <input
                          type="number"
                          class="input input-filter"
                          v-model="Filters[5].Value"
                          @change="changeFilter"
                          @blur="blurFilter"
                        />
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div class="th-text">Hiển thị trên thực đơn</div>
                      <div class="th-filter-type-1">
                        <input
                          type="text"
                          class="input input-filter"
                          v-model="inputShowOnMenu"
                          @change="changeInputShowOnMenu"
                        />
                        <div
                          class="icon__input--down icon-16 input-btn"
                          @click="
                            () => (showFilterShowOnMenu = !showFilterShowOnMenu)
                          "
                        ></div>

                        <div
                          class="filter-type-1"
                          v-show="showFilterShowOnMenu"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(
                                field.ShowOnMenu,
                                0,
                                compares[0].id
                              )
                            "
                          >
                            <div class="filter-type-2-text">Có</div>
                          </div>
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(
                                field.ShowOnMenu,
                                1,
                                compares[0].id
                              )
                            "
                          >
                            <div class="filter-type-2-text">Không</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th class="ms-th">
                    <div class="ms-th-inner">
                      <div class="th-text">Ngừng bán</div>
                      <div class="th-filter-type-1">
                        <input
                          type="text"
                          class="input input-filter"
                          v-model="inputStopSelling"
                          @change="changeInputStopSelling"
                        />
                        <div
                          class="icon__input--down icon-16 input-btn"
                          @click="
                            () =>
                              (showFilterStopSelling = !showFilterStopSelling)
                          "
                        ></div>

                        <div
                          class="filter-type-1"
                          v-show="showFilterStopSelling"
                        >
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(
                                field.StopSelling,
                                0,
                                compares[0].id
                              )
                            "
                          >
                            <div class="filter-type-2-text">Không</div>
                          </div>
                          <div
                            class="filter-type-2-item flex flex-items-center"
                            @click="
                              selectOperator(
                                field.StopSelling,
                                1,
                                compares[0].id
                              )
                            "
                          >
                            <div class="filter-type-2-text">Có</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody class="ms-tbody" ref="mstbody">
                <tr
                  v-for="food in foods"
                  :key="food.FoodID"
                  @click="
                    selectRecordFunc(food.FoodID, food.FoodCode, food.FoodName)
                  "
                  @dblclick="showUpadateRecord(food.FoodID)"
                  :class="{ selectRecord: foodID == food.FoodID }"
                  @contextmenu.prevent="
                    showContextMenu(
                      $event,
                      food.FoodID,
                      food.FoodCode,
                      food.FoodName,
                      food.FoodImageID
                    )
                  "
                >
                  <td>Món ăn</td>
                  <td>{{ food.FoodCode }}</td>
                  <td>{{ food.FoodName }}</td>
                  <td>{{ food.MenuGroupName }}</td>
                  <td>{{ food.FoodUnitName }}</td>
                  <td class="td-right">{{ formatMoney(food.FoodCost) }}</td>
                  <td class="td-right">{{ formatMoney(food.FoodPrice) }}</td>
                  <td class="td-center">
                    <div class="popup__input checkbox-text ms-checkbox-con">
                      <span
                        class="ms-checkbox"
                        style="width: 13px; height: 13px"
                      >
                        <span
                          class="icon icon-16"
                          :class="{
                            'icon-checkbox-default': food.ShowOnMenu == 0,
                          }"
                        ></span>
                      </span>
                    </div>
                  </td>
                  <td class="td-center">
                    <div class="popup__input checkbox-text ms-checkbox-con">
                      <span
                        class="ms-checkbox"
                        style="width: 13px; height: 13px"
                      >
                        <span
                          class="icon icon-16"
                          :class="{
                            'icon-checkbox-default': food.StopSelling == 1,
                          }"
                        ></span>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="table-unresult" v-show="dataEmpty">
          <div class="nodata">
            <img
              src="@/assets/img/bg_report_nodata.76e50bd8.svg"
              class="nodata-img"
            />
            <br />
            <span>Không có dữ liệu</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="ms-component"
    style="position: fixed; z-index: 10"
    v-show="isContextMenuVisible"
    v-clickoutside="hideRightClickOpts"
    :style="{ top: contextMenuTop + 'px', left: contextMenuLeft + 'px' }"
  >
    <ul class="fix-list">
      <li class="fix-item" @click="handleOpenDialog">
        <div
          class="toolbar__button--icon icon-toolbar icon-insert icon-16"
        ></div>
        <a href="#" class="fix-link">Thêm thực đơn</a>
      </li>
      <li class="fix-item" @click="handleClone">
        <div
          class="toolbar__button--icon icon-toolbar icon-clone icon-16"
        ></div>
        <a href="#" class="fix-link">Nhân bản</a>
      </li>
      <li class="fix-item" @click="showUpdate">
        <div
          class="toolbar__button--icon icon-toolbar icon-update icon-16"
        ></div>
        <a href="#" class="fix-link">Sửa</a>
      </li>
      <li class="fix-item" @click="handleDelete">
        <div
          class="toolbar__button--icon icon-toolbar icon-delete icon-16"
        ></div>
        <a href="#" class="fix-link">Xoá</a>
      </li>
      <li class="fix-item" @click="refreshData">
        <div class="toolbar__button--icon icon-toolbar icon-load icon-16"></div>
        <a href="#" class="fix-link">Nạp</a>
      </li>
    </ul>
  </div>

  <FoodDetail
    v-if="isShowForm"
    @showForm="showForm"
    :changeTitle="changeTitle"
    @filterData="filterData"
    @filterDataNoLoading="filterDataNoLoading"
    @changeFormMode="changeFormMode"
    :foodID="foodID"
    :formMode="formMode"
  />

  <ThePagination
    :totalRecord="totalRecord"
    :pageSize="pageSize"
    :pageNumber="pageNumber"
    :maxPage="maxPage"
    @nextPage="nextPage"
    @firstPage="firstPage"
    @lastPage="lastPage"
    @refreshPage="refreshPage"
    @pageSizeSelect="funcPageSizeSelect"
    @showSelectPageSize="showSelectPageSize"
    @prevPage="prevPage"
    @getPageSize="getPageSize"
    @getPageNumber="getPageNumber"
    :selectRecordNumber="selectRecordNumber"
    @hideselectRecordNumber="hideselectRecordNumber"
  />

  <ThePopupType
    :showPopup="isShowPopup"
    :foodCode="foodCode"
    :foodName="foodName"
    @showPopupFunc="showPopupFunc"
    @deleteFood="deleteFood"
    :msg="msgPopup"
    @handleMultipleDelete="handleMultipleDelete"
  />
</template>

<script>
import FoodDetail from "@/components/views/food/FoodDetail.vue";
import ThePagination from "@/components/base/Pagination/ThePagination.vue";
import TheLoading from "@/components/base/Loading/TheLoading.vue";
import ThePopupType from "@/components/base/Popup/ThePopupType.vue";
import { initTableResize } from "@/js/tableResize";
import { getAllFood, filterFood } from "@/utils/foods/loadFood";
import * as Sources from "@/common/Sources";
import * as Enum from "@/common/Enum";
import { DeleteFood } from "@/utils/foods/handleFood";
import { deleteImageOld } from "@/utils/foods/handleFood";

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

export default {
  name: "EmployeePage",
  components: {
    ThePagination,
    FoodDetail,
    TheLoading,
    ThePopupType,
  },
  directives: {
    clickoutside,
  },
  props: {},

  data() {
    return {
      foods: [],
      isShowForm: false,
      changeTitle: "",

      showFilterFoodCode: false,
      showFilterFoodName: false,
      showFilterFoodUnit: false,
      showFilterMenuGroup: false,
      showFilterFoodCost: false,
      showFilterFoodPrice: false,
      showFilterFoodType: false,
      showFilterShowOnMenu: false,
      showFilterStopSelling: false,

      filterFoodCode: "*",
      filterFoodName: "*",
      filterMenuGroup: "*",
      filterFoodUnit: "*",
      filterFoodCost: "≤",
      filterFoodPrice: "≤",
      filterShowOnMenu: "",
      filterStopSelling: "",

      operators: [
        { id: Enum.operators.CONTAIN, operator: "*", text: ": Chứa" },
        { id: Enum.operators.EQUAL, operator: "=", text: ": Bằng" },
        {
          id: Enum.operators.START_WITH,
          operator: "+",
          text: ": Bắt đầu bằng",
        },
        { id: Enum.operators.END_WITH, operator: "-", text: ": Kết thúc bằng" },
        { id: Enum.operators.NOT_CONTAIN, operator: "!", text: ": Không chứa" },
      ],
      compares: [
        { id: Enum.operators.EQUAL, compare: "=", text: ": Bằng" },
        { id: Enum.operators.LESS, compare: "<", text: ": Nhỏ hơn" },
        {
          id: Enum.operators.LESS_OR_EQUAL,
          compare: "≤",
          text: ": Nhỏ hơn hoặc bằng",
        },
        { id: Enum.operators.BIGGER, compare: ">", text: ": Lớn hơn" },
        {
          id: Enum.operators.BIGGER_OR_EQUAL,
          compare: "≥",
          text: ": Lớn hơn hoặc bằng",
        },
      ],
      Filters: [
        {
          Property: "FoodCode",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "FoodName",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "MenuGroupName",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "FoodUnitName",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "FoodCost",
          Operator: Enum.operators.LESS_OR_EQUAL,
          Value: null,
          type: "int",
        },
        {
          Property: "FoodPrice",
          Operator: Enum.operators.LESS_OR_EQUAL,
          Value: null,
          type: "int",
        },
        {
          Property: "ShowOnMenu",
          Operator: Enum.operators.EQUAL,
          Value: null,
          type: "boolean",
        },
        {
          Property: "StopSelling",
          Operator: Enum.operators.EQUAL,
          Value: null,
          type: "boolean",
        },
      ],
      field: {
        FoodCode: 0,
        FoodName: 1,
        MenuGroupName: 2,
        FoodUnitName: 3,
        FoodCost: 4,
        FoodPrice: 5,
        ShowOnMenu: 6,
        StopSelling: 7,
      },
      fieldName: {
        FoodCode: "FoodCode",
        FoodName: "FoodName",
        MenuGroupName: "MenuGroupName",
        FoodUnitName: "FoodUnitName",
        FoodCost: "FoodCost",
        FoodPrice: "FoodPrice",
        ShowOnMenu: "ShowOnMenu",
        StopSelling: "StopSelling",
      },
      filterSort: null,
      sortData: {
        direction: 1,
      },
      pageSize: 20,
      pageSizeSelect: "",
      pageNumber: 1,
      maxPage: 0,
      typeSort: {
        DESC: 1,
        ASC: 2,
      },
      iconSort: 0,
      flagSort: "",
      foodType: "Món ăn",
      isLoading: false,
      foodID: null,
      foodImage: null,
      foodCode: null,
      foodName: null,
      formMode: null,

      isContextMenuVisible: false,
      contextMenuTop: 0,
      contextMenuLeft: 0,
      selectRecordNumber: false,
      isShowPopup: 0,
      inputShowOnMenu: "",
      inputStopSelling: "",
      imageName: "",
    };
  },
  methods: {
    hideselectRecordNumber() {
      this.selectRecordNumber = false;
    },
    changeFormMode() {
      this.formMode = Enum.formMode.add;
    },
    /**
     * Xoá hiện popup
     * author: NVThuy(26/04/2023)
     */
    handleDelete() {
      this.showPopupFunc(Enum.typePopup.delete);
    },

    /**
     * Hàm show popup
     * author: NVThuy(26/04/2023)
     */
    showPopupFunc(showPopup) {
      this.isShowPopup = showPopup;
    },

    /**
     * Menu con
     * author: NVThuy(25/04/2023)
     */
    showContextMenu(event, id, code, name, image) {
      event.preventDefault();
      this.foodID = id;
      this.foodCode = code;
      this.foodName = name;
      this.imageName = image;
      // Xác định vị trí chuột
      this.contextMenuTop = event.pageY;
      this.contextMenuLeft = event.pageX;

      const windowHeight = window.innerHeight;
      const contextMenuHeight = 122;
      if (this.contextMenuTop + contextMenuHeight > windowHeight) {
        this.contextMenuTop = windowHeight - contextMenuHeight;
      }
      // Hiển thị hộp div context menu
      this.isContextMenuVisible = true;
    },

    /**
     * Ẩn Menu con
     * author: NVThuy(25/04/2023)
     */
    hideRightClickOpts() {
      this.isContextMenuVisible = false;
    },

    /**
     * Chọn số bản ghi trên 1 trang
     * author: NVThuy(25/04/2023)
     */
    funcPageSizeSelect(pageSize) {
      this.pageNumber = 1;
      this.selectRecordNumber = false;
      this.pageSize = pageSize;
      this.filterData();
    },

    /**
     * Chuyển trang sau
     * author: NVThuy(25/04/2023)
     */
    nextPage() {
      if (this.pageNumber < this.maxPage) {
        this.pageNumber++;
        this.filterData();
      }
      // this.initPagination();
    },

    /**
     * Chuyển trang trước
     * author: NVThuy(25/04/2023)
     */
    prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.filterData();
      }
      // this.initPagination();
    },

    /**
     * Chuyển trang đầu tiên
     * author: NVThuy(25/04/2023)
     */
    firstPage() {
      if(this.pageNumber != 1)
      {
        this.pageNumber = 1;
        this.filterData();
      }
    },

    /**
     * Chuyển trang cuối
     * author: NVThuy(25/04/2023)
     */
    lastPage() {
      if(this.pageNumber != this.maxPage)
      {
        this.pageNumber = this.maxPage;
        this.filterData();
      }
    },

    /**
     * Load lại phân trang về mặc định
     * author: NVThuy(25/04/2023)
     */
    refreshPage() {
      this.pageNumber = 1;
      this.selectRecordNumber = false;
      this.pageSize = 20;
      this.filterData();
    },

    /**
     * Ẩn/ hiện lựa chọn số bản ghi/trang
     * author: NVThuy(25/04/2023)
     */
    showSelectPageSize() {
      this.selectRecordNumber = !this.selectRecordNumber;
    },

    /**
     * Lấy ra số bản ghi/trang khi nhập vào
     * author: NVThuy(25/04/2023)
     */
    getPageSize() {
      let pageSizeVal = this.$el.parentElement.querySelector(
        'input[name="pageSize"]'
      ).value;
      this.selectRecordNumber = false;
      if (pageSizeVal.trim() != "".trim()) {
        this.pageSize = pageSizeVal;
      } else {
        this.pageSize = 20;
      }
      this.pageNumber = 1;
      this.filterData();
    },

    /**
     * Lấy trang hiện tại khi nhập vào
     * author: NVThuy(25/04/2023)
     */
    getPageNumber() {
      let pageNumberVal = this.$el.parentElement.querySelector(
        'input[name="pageNumber"]'
      ).value;
      if (pageNumberVal.trim() != "".trim()) {
        if (pageNumberVal > this.maxPage) {
          this.pageNumber = this.maxPage;
        } else {
          this.pageNumber = pageNumberVal;
        }
      } else {
        this.pageNumber = 1;
      }
      this.filterData();
    },
    
    /**
     * Nạp dữ liệu
     * author: NVThuy(25/04/2023)
     */
    refreshData() {
      this.Filters = [
        {
          Property: "FoodCode",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "FoodName",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "MenuGroupName",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "FoodUnitName",
          Operator: Enum.operators.CONTAIN,
          Value: null,
          type: "string",
        },
        {
          Property: "FoodCost",
          Operator: Enum.operators.LESS_OR_EQUAL,
          Value: null,
          type: "int",
        },
        {
          Property: "FoodPrice",
          Operator: Enum.operators.LESS_OR_EQUAL,
          Value: null,
          type: "int",
        },
        {
          Property: "ShowOnMenu",
          Operator: Enum.operators.EQUAL,
          Value: null,
          type: "boolean",
        },
        {
          Property: "StopSelling",
          Operator: Enum.operators.EQUAL,
          Value: null,
          type: "boolean",
        },
      ];
      this.isContextMenuVisible = false;
      this.filterData();
    },

    /**
     * API xoá dữ liệu
     * author: NVThuy(25/04/2023)
     */
    async deleteFood() {
      let res = await DeleteFood(this.foodID);
      if (res.status == 200) {
        this.showPopupFunc(0);
        if (this.imageName) {
          await deleteImageOld(this.imageName);
        }
        this.filterData();
      }
    },

    /**
     * Cập nhật dữ liệu (dbclick)
     * author: NVThuy(25/04/2023)
     */
    showUpadateRecord(id) {
      this.showForm(true);
      this.changeTitle = Sources.titleFormMode.updateTitle;
      this.foodID = id;
      this.formMode = Enum.formMode.update;
    },

    /**
     * Cập nhật dữ liệu (Nhấn nút sửa)
     * author: NVThuy(25/04/2023)
     */
    showUpdate() {
      this.showForm(true);
      this.changeTitle = Sources.titleFormMode.updateTitle;
      this.formMode = Enum.formMode.update;
    },

    /**
     * Nhân bản dữ liệu
     * author: NVThuy(25/04/2023)
     */
    handleClone() {
      this.showForm(true);
      this.changeTitle = Sources.titleFormMode.cloneTitle;
      this.formMode = Enum.formMode.clone;
    },

    /**
     * Click chọn bản ghi
     * author: NVThuy(25/04/2023)
     */
    selectRecordFunc(id, code, name) {
      this.foodID = id;
      this.foodCode = code;
      this.foodName = name;
      this.isContextMenuVisible = false;
    },

    /**
     * Load tất cả bản ghi
     * author: NVThuy(25/04/2023)
     */
    async loadData() {
      let res;
      res = await getAllFood();
      if (res.status == 200) {
        this.foods = res.data;
      }
    },

    /**
     * Show lựa chọn loại món ăn
     * author: NVThuy(25/04/2023)
     */
    showFoodType(text) {
      this.foodType = text;
      this.showFilterFoodType = false;
      this.filterData();
    },

    /**
     * Lựa chọn lọc bản ghi
     * author: NVThuy(25/04/2023)
     */
    selectOperator(field, item, operator) {
      if (field == this.field.FoodCode) {
        this.filterFoodCode = item.operator;
        this.showFilterFoodCode = false;
        this.Filters[0].Operator = operator;
        this.filterData();
      } else if (field == this.field.FoodName) {
        this.filterFoodName = item.operator;
        this.showFilterFoodName = false;
        this.Filters[1].Operator = operator;
        this.filterData();
      } else if (field == this.field.MenuGroupName) {
        this.filterMenuGroup = item.operator;
        this.showFilterMenuGroup = false;
        this.Filters[2].Operator = operator;
        this.filterData();
      } else if (field == this.field.FoodUnitName) {
        this.filterFoodUnit = item.operator;
        this.showFilterFoodUnit = false;
        this.Filters[3].Operator = operator;
        this.filterData();
      } else if (field == this.field.FoodCost) {
        this.filterFoodCost = item.compare;
        this.showFilterFoodCost = false;
        this.Filters[4].Operator = operator;
        this.filterData();
      } else if (field == this.field.FoodPrice) {
        this.filterFoodPrice = item.compare;
        this.showFilterFoodPrice = false;
        this.Filters[5].Operator = operator;
        this.filterData();
      } else if (field == this.field.ShowOnMenu) {
        this.Filters[6].Value = item;
        this.showFilterShowOnMenu = false;
        this.Filters[6].Operator = operator;
        if (item == 1) {
          this.inputShowOnMenu = "Không";
        } else {
          this.inputShowOnMenu = "Có";
        }
        this.filterData();
      } else if (field == this.field.StopSelling) {
        this.Filters[7].Value = item;
        this.showFilterStopSelling = false;
        this.Filters[7].Operator = operator;
        if (item == 1) {
          this.inputStopSelling = "Có";
        } else {
          this.inputStopSelling = "Không";
        }
        this.filterData();
      }
    },

    changeInputShowOnMenu() {
      if (this.inputShowOnMenu.trim() == "Có") {
        this.selectOperator(this.field.ShowOnMenu, 0, this.compares[0].id);
      } else if (this.inputShowOnMenu.trim() == "Không") {
        this.selectOperator(this.field.ShowOnMenu, 1, this.compares[0].id);
      } else if (this.inputShowOnMenu.trim() === "") {
        this.Filters[6] = {
          Property: "ShowOnMenu",
          Operator: Enum.operators.EQUAL,
          Value: null,
          type: "boolean",
        };
        this.filterData();
      } else {
        this.Filters[6] = {
          Property: "ShowOnMenu",
          Operator: Enum.operators.EQUAL,
          Value: 2,
          type: "boolean",
        };
        this.filterData();
      }
    },

    changeInputStopSelling() {
      if (this.inputStopSelling.trim() == "Không") {
        this.selectOperator(this.field.StopSelling, 0, this.compares[0].id);
      } else if (this.inputStopSelling.trim() == "Có") {
        this.selectOperator(this.field.StopSelling, 1, this.compares[0].id);
      } else if (this.inputStopSelling.trim() === "") {
        this.Filters[7] = {
          Property: "StopSelling",
          Operator: Enum.operators.EQUAL,
          Value: null,
          type: "boolean",
        };
        this.filterData();
      } else {
        this.Filters[7] = {
          Property: "StopSelling",
          Operator: Enum.operators.EQUAL,
          Value: 2,
          type: "boolean",
        };
        this.filterData();
      }
    },

    /**
     * Lựa chọn sắp xếp bản ghi
     * author: NVThuy(25/04/2023)
     */
    sortField(field) {
      this.sortData.Property = field;
      if (this.sortData.direction == Enum.orderBy.ASC) {
        this.sortData.direction = Enum.orderBy.DESC;
        this.iconSort = this.typeSort.DESC;
        this.flagSort = field;
      } else {
        this.sortData.direction = Enum.orderBy.ASC;
        this.iconSort = this.typeSort.ASC;
        this.flagSort = field;
      }
      this.filterSort = this.sortData;
      this.filterData();
    },

    /**
     * API lấy bản ghi theo phân trang và lọc có loading
     * author: NVThuy(25/04/2023)
     */
    async filterData() {
      var res;
      this.isLoading = true;
      res = await filterFood(
        this.Filters,
        this.pageSize,
        this.pageNumber,
        this.filterSort
      );
      if (res.status == 200) {
        this.foods = res.data.Data;
        if (this.foods.length != 0) {
          this.foodID = this.foods[0].FoodID;
          this.foodCode = this.foods[0].FoodCode;
          this.foodName = this.foods[0].FoodName;
        }
        this.totalRecord = res.data.TotalRecord;
        this.maxPage = res.data.TotalPage;
        if (this.totalRecord == 0) {
          this.dataEmpty = true;
        } else {
          this.dataEmpty = false;
        }
        this.isLoading = false;
      } else {
        this.dataEmpty = true;
      }
    },

    /**
     * API lấy bản ghi theo phân trang và lọc không loading
     * author: NVThuy(25/04/2023)
     */
    async filterDataNoLoading() {
      var res;
      res = await filterFood(
        this.Filters,
        this.pageSize,
        this.pageNumber,
        this.filterSort
      );
      if (res.status == 200) {
        this.foods = res.data.Data;
        if (this.foods.length != 0) {
          this.foodID = this.foods[0].FoodID;
          this.foodCode = this.foods[0].FoodCode;
          this.foodName = this.foods[0].FoodName;
        }
        this.totalRecord = res.data.TotalRecord;
        this.maxPage = res.data.TotalPage;
        if (this.totalRecord == 0) {
          this.dataEmpty = true;
        } else {
          this.dataEmpty = false;
        }
      } else {
        this.dataEmpty = true;
      }
    },

    /**
     * Thay đổi filter
     * author: NVThuy(25/04/2023)
     */
    changeFilter() {
      this.filterData();
    },

    /**
     * Thay đổi filter khi blur ra ngoài
     * author: NVThuy(25/04/2023)
     */
    blurFilter(event, value) {
      if (value && value.trim() !== "") {
        const newVal = event.target.value;
        if (value !== newVal) {
          this.filterData();
        }
      }
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

    /**
     * Mở form thêm mới
     * author: NVThuy(25/04/2023)
     */
    handleOpenDialog() {
      this.showForm(true);
      this.changeTitle = Sources.titleFormMode.addTitle;
      this.formMode = Enum.formMode.add;
    },

    /**
     * Mở form
     * author: NVThuy(25/04/2023)
     */
    showForm(flag) {
      this.isShowForm = flag;
    },

    /**
     * Sự kiện nhấn phím
     * Created by NVTHUY 27/04/2023
     */
    handleKey(event) {
      if (event.ctrlKey && event.key === "1") {
        event.preventDefault();
        this.handleOpenDialog();
      }

      if (event.ctrlKey && event.key === "y") {
        event.preventDefault();
        this.filterData();
      }

      if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        this.showUpdate();
      }

      if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        this.handleDelete();
      }

      if (event.ctrlKey && event.key === "c") {
        event.preventDefault();
        this.handleClone();
      }
    },
  },
  created() {
    this.filterData();
  },
  mounted() {
    // resize các cột
    initTableResize();
    window.addEventListener("keydown", (e) => this.handleKey(e));
  },
  beforeUnmount() {
    window.removeEventListener("keydown", () => this.handleKey());
  },
};
</script>


<style scoped>
</style>