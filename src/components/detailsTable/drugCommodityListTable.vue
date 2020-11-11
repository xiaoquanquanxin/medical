<template>
    <div>
        <b class="red">规格字段需要新组织</b>
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            商品单详情
        </a-row>
        <a-table
                :columns="columns"
                :data-source="dataSource"
                :pagination="false"
                bordered
        >
        </a-table>
        <a-row type="flex" justify="end" align="middle" class="combined">
            <span style="color:var(--basic-red)">合计：<b>{{combined}}</b></span>
        </a-row>
    </div>
</template>
<script>
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 40,
        },
        {
            title: '商品名称',
            width: 100,
            dataIndex: 'goodsName',
        },
        {
            title: '单位',
            width: 100,
            dataIndex: 'goodsUnit',
        },
        {
            title: '规格',
            width: 100,
            dataIndex: 'goodsSpecifications',
        },
        {
            title: '使用量',
            width: 100,
            dataIndex: 'quantity',
        },

        {
            title: '单价',
            dataIndex: 'price',
            width: 100,
        },
        {
            title: '小计',
            dataIndex: 'subtotal',
            width: 100,
        },
    ];
    export default {
        props: ['dataSource'],
        computed: {
            //  合计
            combined(){
                return this.dataSource.reduce(((previousValue, currentValue) => {
                    return previousValue + currentValue.subtotal;
                }), 0);
            }
        },
        data(){
            return {
                columns,
            };
        },
        created(){
            console.log(JSON.parse(JSON.stringify(this.dataSource)));
            this.dataSource.forEach((item, index) => {
                item.key = index;
                item.index = index + 1;
            });

        }
    };
</script>
<style scoped>
    /*合计*/
    .combined {
        padding: 16px 2em;
        /*border-bottom: 1px solid var(--basic-border-color);*/
        margin-bottom: 2em;
    }
</style>