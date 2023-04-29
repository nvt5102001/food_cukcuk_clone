<template>
     <div class="navbar">
        <div class="navbar__list scrollbar">
            <router-link to="foods" class="navbar__item">
                <div class="icon__menu--nav icon-24 " title="Thực đơn" style="margin: 0 8px;"></div>
                <div class="navbar__item__title">Thực đơn</div>
            </router-link>
           
        </div>
        <div class="navbar__footer"></div>
    </div>
</template>
<script>

export default {
    name: 'TheNav',
    methods: {
    },
    mounted() {
      
    },
}
</script>

<style scoped>
</style>