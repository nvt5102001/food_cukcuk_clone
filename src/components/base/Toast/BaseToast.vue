<template>
    
      <div class="toast__box" id="toast" >
            <div class="toast" :class="toastType">
                <div class="toast__icon">
                    <div class="icon icon-20" :class="iconType"></div>
                </div>
                <div class="toast__text flex flex-center flex-jus-between">
                    <slot name="toastMsg"></slot>
                    <div class="toast__undo">
                        <!-- Hoàn tác -->
                    </div>
                </div>
                <div class="toast__close">
                    <div class="icon icon-toast-close icon-16 cursor-pointer"></div>
                </div>
            </div>
        </div>
   
</template>

<script>
export default {
    name: "BaseToast",
    props: {
        toastType:String,
        iconType: String,

    },
}
</script>

<style scoped>
</style>