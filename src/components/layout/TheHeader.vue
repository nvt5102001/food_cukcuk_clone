<template>
    <div class="header">
            <div class="header__left">
                <div class="header__mulApp"></div>
                <div class="header__logo"></div>
            </div>
            <div class="header__right">
                <div class="header__company">
                    <input type="text" name="" id="" value="hisoft">
                    <div class="header__input__select">
                        <div class="header__input__select--icon"></div>
                    </div>
                    <div class="header__input__filter">
                        <div class="header__input__filter--icon"></div>
                    </div>
                </div>
                <div class="header__account">
                    <div class="account__info">
                        <div class="avatar__user">
                            <img src="../../assets/img/avatar.jpg" alt="avatar" 
                            style="width:100%;" title="Ảnh đại diện"> 
                        </div>
                        <div class="name__user">
                            <div class="display__user">
                                Nguyễn Văn Thuỷ
                            </div>
                        </div>
                        <div class="header__input__select--icon"></div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'TheHeader',
    data() {
        return {
            sidebarOpen:true,

        }
    },
    methods: {






        // Nút toggle sidebar
        toggleSidebar() {
            var miniText = document.querySelectorAll('.navbar__item__title');
            var minuMenu = document.querySelector('.navbar');
            var minuContent = document.querySelector('.content');
            var miniPag = document.querySelector('.ms-pagination');
            this.sidebarOpen = !this.sidebarOpen;
           if(this.sidebarOpen)
           {
            miniText.forEach(function (miniT) {
                miniT.style.display = "none";
            })
            minuMenu.style.width = "73px";
            minuContent.style.width = "calc(100% - 200px + 127px)";
            miniPag.style.left = "73px";
           }
           else
           {
            miniText.forEach(function (miniT) {
                miniT.style.display = "block";
            })
            minuMenu.style.width = "200px";
            minuContent.style.width = "calc(100% - 200px)";
            miniPag.style.left = "calc(200px + 24px)";
           }
        }
    },
}
</script>

<style scoped>

</style>