<template>
  <div>
    <!-- Popup cảnh báo xoá món ăn -->
    <ThePopup
      typeIcon="icon-info"
      v-if="showPopup == this.TypePopup.delete"
      titlePopup="CUKCUK - Quản lý nhà hàng"
    >
      <template v-slot:dialogText>
        <div class="dialog__text">
          Bạn có chắc chắn muốn xoá món
          <span>&lt; {{ foodCode }} - {{ foodName }} &gt;</span> không ?
        </div>
      </template>
      <div class="dialog__footer flex flex-items-center flex-row-reverse">
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Không"
          @click="handleCancel"
        />
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Có"
          @click="handleAccept"
          v-focus
        />
      </div>
    </ThePopup>

    <!-- Popup cảnh báo trùng sở thích -->
    <ThePopup
      typeIcon="icon-warning"
      v-if="showPopup == this.TypePopup.errorDuplicateService"
      titlePopup="CUKCUK - Quản lý nhà hàng"
    >
      <template v-slot:dialogText>
        <div class="dialog__text">
          Sở thích phục vụ  
          <span>&lt; {{ serviceName }} - {{ servicePrice }} &gt;</span> đã bị trùng. Vui lòng kiểm tra lại.
        </div>
      </template>
      <div class="dialog__footer flex flex-items-center flex-row-reverse">
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Đồng ý"
          @click="handleCancel"
          v-focus
        />
      </div>
    </ThePopup>

    <!-- Popup cảnh báo trùng sở thích -->
    <ThePopup
      typeIcon="icon-error"
      v-if="showPopup == this.TypePopup.errors"
      titlePopup="CUKCUK - Quản lý nhà hàng"
    >
      <template v-slot:dialogText>
        <div class="dialog__text">
          {{msg}}
        </div>
      </template>
      <div class="dialog__footer flex flex-items-center flex-row-reverse">
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Đồng ý"
          @click="handleCancel"
          v-focus
        />
      </div>
    </ThePopup>


    <!-- Popup cảnh báo trùng mã -->
    <ThePopup
      typeIcon="icon-warning"
      v-if="showPopup == this.TypePopup.duplicate"
      titlePopup="CUKCUK - Quản lý nhà hàng"
    >
      <template v-slot:dialogText>
        <div class="dialog__text">
          Mã <span>&lt; {{ foodCode }} &gt;</span> đã tồn tại trên một trong các
          danh sách sau: Món ăn, đồ uống, combo, món khác, dịch vụ tính tiền
          theo thời gian.
        </div>
      </template>
      <div class="dialog__footer flex flex-items-center flex-row-reverse">
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Đồng ý"
          @click="handleCancel"
          v-focus
        />
      </div>
    </ThePopup>
    
    <!-- Popup cảnh báo lỗi định dạng ảnh -->
    <ThePopup
      typeIcon="icon-warning"
      v-if="showPopup == this.TypePopup.errorImg"
      titlePopup="CUKCUK - Quản lý nhà hàng"
    >
      <template v-slot:dialogText>
        <div class="dialog__text">
          {{msg}}
        </div>
      </template>
      <div class="dialog__footer flex flex-items-center flex-row-reverse">
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Đồng ý"
          @click="handleCancel"
          v-focus
        />
      </div>
    </ThePopup>
    

    <!-- Popup cảnh báo cất dữ liệu -->
    <ThePopup
      typeIcon="icon-info"
      v-if="showPopup == this.TypePopup.store"
      titlePopup="CUKCUK - Quản lý nhà hàng"
    >
      <template v-slot:dialogText>
        <div class="dialog__text">
          {{ msg }}
        </div>
      </template>
      <div class="dialog__footer flex flex-items-center flex-row-reverse">
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Có"
          @click="handleAccept"
          v-focus
        />
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Không"
          @click="handleUnAccept"
        />
        <BaseButton
          class="btn-default-cukcuk btn-hover"
          text="Huỷ bỏ"
          @click="handleCancel"
        />
      </div>
    </ThePopup>
  </div>
</template>
<script>
import ThePopup from "@/components/base/Popup/ThePopup.vue";
import BaseButton from "@/components/base/Button/BaseButton.vue";
import * as Enum from "@/common/Enum";
import * as Sources from "@/common/Sources";

export default {
  name: "BaseMessage",
  props: {
    showPopup: {
      type: Number,
    },
    msgError: {
      type: Array,
    },
    foodCode: String,
    foodName: String,
    serviceName: String,
    servicePrice: Number,
    msg: String,
  },

  components: {
    ThePopup,
    BaseButton,
  },
  data() {
    return {
      TypePopup: {},
    };
  },
  methods: {
    /**
     * Nút đồng ý, Có (popup xoá )
     * Created by NVTHUY 20/02/2023
     */

    handleAccept() {
      if (this.showPopup == Enum.typePopup.delete) {
        this.$emit("deleteFood");
      } else if (this.showPopup == Enum.typePopup.store) {
        this.$emit("handleStore");
      } else if (this.showPopup == Enum.typePopup.multipleDelete) {
        this.$emit("handleMultipleDelete");
      }
      this.handleCancel();
    },

    /**
     * Nút "Không" (popup cất dữ liệu)
     * Created by NVTHUY 20/02/2023
     */
    handleUnAccept() {
      this.$emit("closeDialogQuick");
    },

    /**
     * Nút "Huỷ bỏ"
     * Created by NVTHUY 20/02/2023
     */
    handleCancel() {
      this.$emit("showPopupFunc", 0);
    },

    /**
     * Sự kiện nhấn phím
     * Created by NVTHUY 06/04/2023
     */
    handleKey(e) {
      if (e.keyCode == 27) {
        this.handleCancel();
      }
    },
  },

  mounted() {
    // Tạo obj chứa typePopup
    this.TypePopup = Enum.typePopup;
    this.titlePopup = Sources.titlePopup;
    window.addEventListener("keydown", (e) => this.handleKey(e));
  },

  beforeUnmount() {
    window.removeEventListener("keydown", () => this.handleKey());
  },
};
</script>
<style scoped>
.dialog__text span {
  font-weight: 400;
}
.preText {
  word-wrap: break-word;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap;
}
</style>