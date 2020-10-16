<template>
    <div>
        <!--口服肠内营养补充-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span>肠内营养补充</span>
            <span>方法1</span>
        </a-row>
        <a-table
                :columns="intestinesColumns"
                :data-source="intestinesDetail"
                :pagination="false"
                bordered
        >
            <!--商品名称名称-->
            <div slot="commodityName" slot-scope="scope,sItem,sIndex,extra">
                {{scope.commodityName}}
            </div>
            <!--购买单位-->
            <div slot="buyer" slot-scope="scope,sItem,sIndex,extra">
                {{scope.buyer}}
            </div>
            <!--商品单价-->
            <div slot="unitPrice" slot-scope="scope,sItem,sIndex,extra">
                {{scope.unitPrice}}
            </div>
            <!--数量-->
            <div slot="quantity" slot-scope="scope,sItem,sIndex,extra">
                {{scope.quantity}}
            </div>
        </a-table>
    </div>
</template>
<script>
    //  口服肠内营养支持 表格 列的意义
    const intestinesColumns = [
        {
            title: '商品名称',
            scopedSlots: { customRender: 'commodityName' },
            width: 100,
        },
        {
            title: '购买单位',
            width: 100,
            scopedSlots: { customRender: 'buyer' },
        },
        {
            title: '商品单价',
            width: 100,
            scopedSlots: { customRender: 'unitPrice' },
        },
        {
            title: '数量',
            width: 100,
            scopedSlots: { customRender: 'quantity' },
        },
    ];
    export default {
        computed: {
            //  口服信息数据
            intestinesDetail(){
                return this.$store.state.detailsTable.intestinesDetail;
            }
        },
        data(){
            return {
                intestinesColumns,
            };
        }
    };
</script>