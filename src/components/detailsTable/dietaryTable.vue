<template>
    <div>
        <!--膳食营养计划-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span>膳食营养计划</span>
        </a-row>
        <a-table
                :columns="oralColumns"
                :data-source="dataSource"
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
    const oralColumns = [
        {
            title: '时间',
            width: 100,
            dataIndex: 'time'
        },
        {
            title: '用餐内容',
            width: 100,
            dataIndex: 'content'
        }
    ];
    export default {
        props: ['data-source'],
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