<template>
    <button :class="str">
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
        text: String
    }
}
</script>