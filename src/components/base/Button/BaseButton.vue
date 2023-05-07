<template>
    <button :class="str" :tabindex="tabIndex" :ref="refBtn">
        <div class="button__text ">
            <span class="btn-text"> {{ text }}</span>
        </div>
    </button>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        str: String,
        text: String,
        tabIndex: Number,
        refBtn:String,
    }
}
</script>