<template>
  <div class="dialog">
    <Vue3DraggableResizable
      :parent="true"
      :draggable="isDraggable"
      :resizable="false"
      :x="xDrag"
      :y="yDrag"
      class="centered"
    >
      <div class="dialog__inner">
        <div class="dialog__header flex">
          <div class="dialog__title">{{ titlePopup }}</div>
          <div class="dialog__close">
            <slot name="iconClose"></slot>
          </div>
        </div>
        <div class="dialog__body flex">
          <div class="dialog__icon">
            <div class="icon icon-48" :class="typeIcon"></div>
          </div>
          <slot name="dialogText"></slot>
        </div>
        <slot></slot>
      </div>
    </Vue3DraggableResizable>
  </div>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
export default {
  name: "ThePopup",
  components: {
    Vue3DraggableResizable,
  },
  props: {
    typeIcon: String,
    titlePopup: String,
  },
  data() {
    return {
      isDraggable: true,
      xDrag: 0,
      yDrag: 0,
    };
  },
  methods: {
    centerElement() {
      const element = document.querySelector(".centered");
      const elementRect = element.getBoundingClientRect();

      const divWidth = elementRect.width;
      const divHeight = elementRect.height;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      this.xDrag = windowWidth / 2 - divWidth / 2;
      this.yDrag = windowHeight / 2 - divHeight / 2;
    },
  },
  mounted() {
    this.centerElement();
  },
};
</script>
<style scoped>
.vue-draggable-resizable {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>