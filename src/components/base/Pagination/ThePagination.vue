<template>
  <div class="ms-pagination">
    <div class="ms-pagination-inner">
      <div class="pagination__left">
        <div class="pagination__left-item">
          <div class="pagination__left-item-inner" :class="{ disabled: pageNumber == 1 }">
            <div
              class="icon-page-first icon-16"
              id="firstPage"
              @click="firstPage"
              title="Trang đầu"
            ></div>
          </div>
          <div class="pagination__left-item-inner" :class="{ disabled: pageNumber == 1 }">
            <div
              class="icon-left-page icon-16"
              
              id="prevPage"
              @click="prevPage"
              title="Trang trước"
            ></div>
          </div>
          <div><div class="line-page"></div></div>
          <div><div>Trang</div></div>
          <div>
            <div>
              <input
                type="number"
                name="pageNumber"
                id=""
                class="input input-page"
                :value="pageNumber"
                @change="$emit('getPageNumber')"
              />
            </div>
          </div>
          <div>
            <div style="min-width: 42px">trên {{ maxPage }}</div>
          </div>
          <div><div class="line-page"></div></div>
          <div class="pagination__left-item-inner" :class="{ disabled: pageNumber == maxPage }">
            <div
              class="icon-right-page icon-16"
              
              id="nextPage"
              @click="nextPage"
              title="Trang sau"
            ></div>
          </div>
          <div class="pagination__left-item-inner" :class="{ disabled: pageNumber == maxPage }">
            <div
              class="icon-page-last icon-16"
              
              id="lastPage"
              @click="lastPage"
              title="Trang cuối"
            ></div>
          </div>
          <div><div class="line-page"></div></div>
          <div class="pagination__left-item-inner">
            <div
              class="icon-page-refresh icon-16"
              @click="refreshPage"
              title="Tải lại"
            ></div>
          </div>
          <div><div class="line-page"></div></div>

          <div class="pagination-button-record">
            <div class="input-pagination">
              <div class="th-filter-type-1">
                <input
                  type="number"
                  name="pageSize"
                  :value="pageSize"
                  style="
                    width: 60px;
                    height: 24px;
                    outline: unset;
                    border: 1px solid #babec5;
                    background-color: #f2f2f2;
                  "
                  class="input"
                  @change="$emit('getPageSize')"
                  @click="borderBlueFunc"
                />
                <div
                  class="icon icon-22 icon__input--down"
                  @click="showSelectPageSize"
                ></div>
              </div>
            </div>
            <div
              class="pagination-combobox-list"
              v-if="selectRecordNumber"
              v-clickoutside="hideselectRecordNumber"
            >
              <div
                class="pagination-combobox-item"
                v-for="pageSize in listPageSize"
                :key="pageSize"
                @click="getPageSize(pageSize)"
                :class="{ pageSizeSelectActive: isActive == pageSize }"
              >
                {{ pageSize }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination__right">
        <div class="pagination__right-item">
          Hiển thị {{ (pageNumber - 1) * pageSize + 1 }} -
          {{
            pageSize * pageNumber < totalRecord
              ? pageSize * pageNumber
              : totalRecord
          }}
          trên {{ totalRecord }} kết quả
        </div>
      </div>
    </div>
    <div class="ms-out-right-white-pagination"></div>
    <div class="ms-out-right-grey-pagination"></div>
  </div>
</template>
<script>
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
  name: "ThePagination",
  data() {
    return {
      listPageSize: [10, 25, 50, 100],
      pageSizeSelect: "",
      pageNumberSelect: 0,
      isActive: "",
      toPage: 0,
      borderBlue: false,
    };
  },
  directives: {
    clickoutside,
  },
  props: {
    totalRecord: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNumber: {
      type: Number,
      required: 1,
    },
    maxPage: {
      type: Number,
    },
    selectRecordNumber: {
      type: Boolean,
    },
  },
  methods: {
    nextPage() {
      this.$emit("nextPage");
    },
    prevPage() {
      this.$emit("prevPage");
    },
    lastPage() {
      this.$emit("lastPage");
    },
    firstPage() {
      this.$emit("firstPage");
    },
    refreshPage() {
      this.$emit("refreshPage");
    },
    showSelectPageSize() {
      // this.selectRecordNumber = !this.selectRecordNumber;
      this.$emit("showSelectPageSize");
      this.borderBlue = true;
    },
    getPageSize(pageSize) {
      this.pageSizeSelect = pageSize;
      this.isActive = pageSize;
      this.$emit("pageSizeSelect", this.pageSizeSelect);
      // this.selectRecordNumber = false;
    },
    borderBlueFunc() {
      this.borderBlue = true;
      this.isActive = null;
    },
    hideselectRecordNumber() {
      this.$emit("hideselectRecordNumber", this.borderBlue);
    },
  },
  mounted() {},
  created() {},
};
</script>
<style scoped>
</style>