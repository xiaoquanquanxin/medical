<template>
    <div>
        <!--口服肠内营养补充-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span>{{templateName}}</span>
            <span>{{usageMethod}}</span>
        </a-row>
        <a-table
                :columns="oralColumns"
                :data-source="dataSource.detailGoods"
                :pagination="false"
                bordered
        >
        </a-table>
    </div>
</template>
<script>
    import { usageMethodMap, templateTypeMap } from '../../utils/constants';
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
            dataIndex: 'goodsUnit',
        },
        {
            title: '商品单价',
            width: 100,
            dataIndex: 'price',
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
        props: ['dataSource'],
        data(){
            return {
                //  食用方法
                usageMethodMap,
                //  模板类型
                templateTypeMap,

                oralColumns,
                //  模板类型
                templateName: undefined,
                //  食用方法
                usageMethod: undefined,
            };
        },
        created(){
            //  console.log('🍉');
            const { templateType, usageMethod, detailGoods } = this.dataSource;
            detailGoods.forEach((item, index) => {
                item.key = index;
            });
            //  console.log(JSON.parse(JSON.stringify(this.dataSource)));
            this.templateName = this.templateTypeMap[templateType].name;
            this.usageMethod = this.usageMethodMap[usageMethod || 1].name;
            //  console.log(this.templateName);
            //  食用方法
            //  console.log(this.dataSource.usageMethod);
        }
    };
</script>