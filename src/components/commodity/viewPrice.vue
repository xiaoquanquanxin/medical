<template>
    <div class="table-in-box">
        <a-table
                :columns="countTableColumns"
                :data-source="countTableData"
                :pagination="false"
                bordered
        >
            <!--单位-->
            <div slot="unit" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a-input placeholder="输入值，只有渠道商可以输入值" v-model="sItem.price"/>
                </a-space>
            </div>
        </a-table>
    </div>
</template>
<script>
    //  查看详情的表格
    const countTableData = [
        {
            key: Math.random(),
            distributors: '许晓飞',
            hospital: '山西省人民医院',
            relative: '10克',
            shoppingType: 'A商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '许晓飞',
            hospital: '山西省肿瘤医院',
            relative: '110克',
            shoppingType: 'A商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省人民医院',
            relative: '10克',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省肿瘤医院',
            relative: '110克',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省人民医院',
            relative: '10克',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省肿瘤医院',
            relative: '110克',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省肿瘤医院',
            relative: '110克',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省人民医院',
            relative: '10克',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省肿瘤医院',
            relative: '110克',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            distributors: '渠道商2',
            hospital: '山西省肿瘤医院',
            relative: '110克',
            shoppingType: 'B商品',
            price: null,
        },
    ];
    export default {
        data(){
            const countTableColumns = [
                //  todo    角色区分这个对象就可以了
                {
                    dataIndex: 'distributors',
                    title: '渠道商名称',
                    width: 200,
                    customRender: (text, row, index) => {
                        const obj = {
                            children: text,
                            attrs: {},
                        };
                        if (index === 0) {
                            obj.attrs.rowSpan = 2;
                        } else if (index === 2) {
                            obj.attrs.rowSpan = 7;
                        } else {
                            obj.attrs.rowSpan = 0;
                        }
                        return obj;
                    },
                },
                {
                    //  医院
                    title: '医院',
                    key: 'hospital',
                    dataIndex: 'hospital',
                    width: 200,
                },
                {
                    //  单位关系
                    title: '单位关系',
                    key: 'relative',
                    dataIndex: 'relative',
                    width: 200,
                },
                {
                    //  价格
                    title: '价格',
                    key: 'price',
                    dataIndex: 'price',
                    width: 300,
                    scopedSlots: { customRender: 'unit' },
                },
            ];
            return {
                //  弹框表格的数据
                countTableColumns,
                countTableData,
            };
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            //    表单提交
            handleSubmit(){
                return Promise.resolve();
            }
        }
    };
</script>