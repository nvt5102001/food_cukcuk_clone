<template>
<Teleport to="body">
    <BaseToast 
    iconType="icon-toast--success" 
    toastType="toast--success" 
    v-if="showToast == TypeToast.success">
        <template v-slot:toastMsg >
            <div class="toast__content">
                <span class="popup-toast-type">{{titleToast}}</span>
                {{msgToast}}
            </div>
        </template>
    </BaseToast>

    <BaseToast 
    iconType="icon-toast--success" 
    toastType="toast--success" 
    v-if="showToast == TypeToast.error">
        <template v-slot:toastMsg >
            <div class="toast__content">
                <span>{{titleToast}}</span>
                {{msgToast}}
            </div>
        </template>
    </BaseToast>

    <BaseToast 
    iconType="icon-toast--success" 
    toastType="toast--success" 
    v-if="showToast == TypeToast.warning">
        <template v-slot:toastMsg >
            <div class="toast__content">
                <span>{{titleToast}}</span>
                {{msgToast}}
            </div>
        </template>
    </BaseToast>
</Teleport>
            
    
</template>

<script>
import BaseToast from '@/components/base/Toast/BaseToast.vue'
import * as Enum from '@/common/Enum'
export default {
    name: "BaseToastType",
    components: {
        BaseToast
    },
    props: {
        titleToast: String,
        msgToast: String,
        showToast: Number,
    },
    data() {
        return {
            TypeToast: {},

        }
    },
    methods: {
        
    },
    mounted(){
        this.TypeToast = Enum.typeToast
    },
}
</script>

<style scoped>
</style>