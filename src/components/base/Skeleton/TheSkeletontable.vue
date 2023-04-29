<template>
    <template v-if="isShowLoading"> 
        <tr v-for="i in 20" :key="i">
        <td class="ms-out-left-white-16"></td>
        <td class="ms-table-td ms-table-checkbox-row">
            <label class="ms-checkbox-con">
                <BaseSkeleton 
                    height="20px" 
                    width="20px"  
                    />
            </label>
        </td>
        <td class="ms-table-td dymamic-col static-col cell-fixed cell-fixed-color"
        style="
        left:71px;
        z-index:7;
        background-color: #fafafa;
        "
        >
            <div class="table-td-title float-left">
                <BaseSkeleton 
                height="25px" 
                width="200px" 
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col cell-fixed cell-fixed-color" 
        style="
        left:241px;
        z-index:7;
        background-color: #fafafa;
        " >
            <div class="table-td-title float-left">
                <BaseSkeleton 
                height="25px" 
                width="100px" 
            
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title float-left">
                <BaseSkeleton 
                height="25px" 
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title">
                <BaseSkeleton 
                height="25px" 
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title  float-left">
                <BaseSkeleton 
                height="25px" 
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title">
                <BaseSkeleton 
                height="25px" 
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title float-left">
                <BaseSkeleton 
                height="25px" 
                
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title float-left">
                <BaseSkeleton 
                height="25px" 
                
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title float-left">
                <BaseSkeleton 
                height="25px" 
                
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title float-left ">
                <BaseSkeleton 
                height="25px" 
            
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col"  title="Tên ngân hàng">
            <div class="table-td-title float-left">
                    <BaseSkeleton 
                height="25px" 
                
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col"  title="Tên chi nhánh ngân hàng">
            <div class="table-td-title float-left">
                    <BaseSkeleton 
                height="25px" 
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title float-left">
                    <BaseSkeleton 
                height="25px" 
                
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col"  title="Điện thoại di động">
            <div class="table-td-title  float-left">
                    <BaseSkeleton 
                height="25px" 
            
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title  float-left">
                    <BaseSkeleton 
                height="25px" 
                
                />
            </div>    
        </td>
        <td class="ms-table-td dymamic-col static-col" >
            <div class="table-td-title float-left">
                <BaseSkeleton 
                height="25px" 
            
                />
            </div>    
        </td>

        <td class="ms-table-td ms-td-function table_col_fixed" 
        style="background-color: #fafafa !important;">
            <BaseSkeleton 
                height="25px"
                />
        </td>
        <td class="ms-out-right-white-30"></td>
        <td class="ms-out-right-grey-30"></td>
    </tr>
    </template>
   
</template>
<script>
import BaseSkeleton from '@/components/base/Skeleton/BaseSkeleton.vue'
export default {
    name: "TheSkeletontable",
    components: {
       BaseSkeleton,
    },
    props:{
        isShowLoading: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style scoped>

.ms-table tr:hover .ms-table-td {
    background-color:transparent !important;
}
</style>