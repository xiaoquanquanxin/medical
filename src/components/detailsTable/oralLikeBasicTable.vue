<template>
    <div>
        <!--口服肠内营养补充-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span>{{dataTitle.name}}</span>
            <span>{{dataTitle.method}}</span>
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
    //  口服肠内营养支持 表格 列的意义
    const oralColumns = [
        {
            title: '商品名称',
            dataIndex: 'commodityName',
            width: 100,
        },
        {
            title: '购买单位',
            width: 100,
            dataIndex: 'buyer',
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
                oralColumns,
            };
        },
        created(){
            //  console.log(this.dataSource);
        }
    };
</script>