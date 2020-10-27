<template>
    <div>
        <!--口服肠内营养补充-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span>{{dataTitle.name}}</span>
            <span v-for="(item,index) in usageMethodList"
                  :key="index"
                  v-if="dataTitle.usageMethod === item.id"
            >
                {{item.name }}
            </span>
        </a-row>
        <a-table
                :columns="oralColumns"
                :data-source="dataSource"
                :pagination="false"
                bordered
        >
        </a-table>
    </div>
</template>
<script>
    import { prescriptionTypeList, liquidEnergyList, usageMethodList } from '../../utils/constants';
    //  口服肠内营养支持 表格 列的意义
    const oralColumns = [
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: 100,
        },
        {
            title: '购买单位',
            width: 100,
            dataIndex: 'purchaseUnit',
        },
        {
            title: '商品单价',
            width: 100,
            dataIndex: 'unitPrice',
        },
        {
            title: '数量',
            width: 100,
            dataIndex: 'quantity',
        },
        {
            title: '小计',
            width: 100,
            dataIndex: 'subtotal',
        },
    ];
    export default {
        props: ['dataSource', 'dataTitle'],
        data(){
            return {
                //  能量下拉
                usageMethodList,
                oralColumns,
            };
        },
        created(){
//            console.log(JSON.parse(JSON.stringify(this.dataSource)));
        }
    };
</script>