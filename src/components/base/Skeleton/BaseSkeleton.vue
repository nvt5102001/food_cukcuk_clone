<template>
  <div class="placeholder">
    &nbsp;
  </div>
</template>

<script>
export default {
    name: "BaseSkeleton",
    props:{
        height: {
            type: String,
        },
        width: {
            type: String,
        },
        borderRadius: {
            type: String,
        },
        
    },
}
</script>

<style scoped>

</style>