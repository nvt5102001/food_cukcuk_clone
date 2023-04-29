<template>
    <div class="m-loading" v-if="isLoading">
        <div class="load-box">
            <div class="iconLoad">
                <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="load-text">Đang lấy dữ liệu...</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TheLoading',
    props: {
        isLoading: {
            type: Boolean,
            default: false
        }
    },
      data() {
        return {
          
        }
    },

}
</script>
<style scoped>
.m-loading {
    position: absolute;
    top: 88px;
    left: 0;
    right: 10px;
    bottom: 26px;
    z-index: 9999999999;
    background-color: rgba(0, 0, 0, 0.35);
}
.showElHide {
	display: block;
}
.load-box 
{
    position: relative;
    background-color: #ededed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    border-radius: 4px;
}
.iconLoad 
{
    position: absolute;
    top: -35%;
    left: 18%;
}
.load-text 
{
    margin-top: 25px;
    color: #5f5f5f;
}
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
    display: block;
    position: absolute;
    top: 30px;
    left: 37px;
    width: 2px;
    height: 5px;
    border-radius: 30%;
    background: #333;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>