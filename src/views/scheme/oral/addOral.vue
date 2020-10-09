<template>
    <div class="layout-content-inner-main">
        <!--类型表格-->
        <a-table :columns="typeTableColumns"
                 :data-source="typeTableData"
                 :pagination="false"
                 bordered
                 class="custom-select-title-table">
            <!--表头-->
            <div slot="slotTitle" slot-scope="scope,sItem,sIndex,extra">
                <a-row type="flex" justify="start" align="middle">
                    <a-col :span="4">
                        肠内营养支持
                    </a-col>
                    <a-col :span="5">
                        <a-select default-value="Option1" style="width:100%;">
                            <a-select-option value="Option1">
                                Option1
                            </a-select-option>
                            <a-select-option value="Option2">
                                Option2
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="5" :offset="10">
                        <a-select default-value="Option1" style="width:100%;">
                            <a-select-option value="Option1">
                                Option1
                            </a-select-option>
                            <a-select-option value="Option2">
                                Option2
                            </a-select-option>
                        </a-select>
                    </a-col>
                </a-row>
            </div>
            <!--操作-->
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="deleteTypeTable(sItem,sIndex)">删除</a>
                </a-space>
            </div>
        </a-table>
        <!--数据表格-->
        <a-table
                :columns="countTableColumns"
                :data-source="countTableData"
                :pagination="false"
                :showHeader="false"
                bordered
        >
            <!--单位-->
            <div slot="unit" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    {{sItem.shoppingType}}
                    <span>
                          <a-input placeholder="输入值"/>
                    </span>
                    {{scope}}
                </a-space>
            </div>
            <!--操作-->
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="deleteCountTable(sItem,sIndex)">删除</a>
                </a-space>
            </div>
        </a-table>
        <br>
        <a-button key="submit" type="primary" @click="submitFn">
            确定
        </a-button>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import AddOralChooseShopping from '@/components/addOralChooseShopping';
    import AddOralChooseTime from '@/components/addOralChooseTime';
    //  类型表格
    const typeTableData = [
        {
            key: Math.random(),
            name: '选择商品',
            shoppingType: 'A商品',
            price: '45元/一盒'
        },
        {
            key: Math.random(),
            name: '选择商品',
            shoppingType: 'B商品',
            price: '27元/一盒'
        },
    ];
    //  数量表格
    const countTableData = [
        {
            key: Math.random(),
            name: '添加时间',
            time: '7:00',
            unit: '勺',
            shoppingType: 'A商品',
        },
        {
            key: Math.random(),
            name: '添加时间',
            time: '7:00',
            unit: 'ml',
            shoppingType: 'B商品',
        },
        {
            key: Math.random(),
            name: '添加时间',
            time: '8:00',
            unit: '勺',
            shoppingType: 'A商品',
        },
        {
            key: Math.random(),
            name: '添加时间',
            time: '8:00',
            unit: 'ml',
            shoppingType: 'B商品',
        },
    ];

    export default {
        data(){
            const typeTableColumns = [
                {
                    scopedSlots: {
                        title: 'slotTitle',
                        customRender: 'tags',
                    },
                    dataIndex: 'name',
                    colSpan: 100,
                    width: 200,
                    customRender: (text, row, index) => {
                        const obj = {
                            children: this.$createElement(AddOralChooseShopping),
                            attrs: {},
                        };
                        if (index === 0) {
                            obj.attrs.rowSpan = typeTableData.length;
                        } else {
                            obj.attrs.rowSpan = 0;
                        }
                        return obj;
                    },
                },
                {
                    //  商品类型
                    colSpan: 0,
                    key: 'shoppingType',
                    dataIndex: 'shoppingType',
                },
                {
                    //  单价
                    colSpan: 0,
                    key: 'price',
                    dataIndex: 'price',
                    width: 300,
                },
                {
                    colSpan: 0,
                    dataIndex: 'tags',
                    key: 'tags',
                    width: 100,
                    scopedSlots: { customRender: 'tags' },
                },
            ];
            const countTableColumns = [
                {
                    dataIndex: 'name',
                    colSpan: 100,
                    width: 200,
                    customRender: (text, row, index) => {
                        const obj = {
                            children: this.$createElement(AddOralChooseTime),
                            attrs: {},
                        };
                        if (index === 0) {
                            //  console.log(countTableData.length);
                            obj.attrs.rowSpan = countTableData.length;
                        } else {
                            obj.attrs.rowSpan = 0;
                        }
                        return obj;
                    },
                },
                {
                    //  时间
                    colSpan: 0,
                    key: 'time',
                    dataIndex: 'time',
                },
                {
                    //  单位
                    colSpan: 0,
                    key: 'unit',
                    dataIndex: 'unit',
                    width: 300,
                    scopedSlots: { customRender: 'unit' },
                },
                {
                    colSpan: 0,
                    dataIndex: 'tags',
                    key: 'tags',
                    width: 100,
                    scopedSlots: { customRender: 'tags' },
                },
            ];
            return {
                typeTableData,
                typeTableColumns,
                countTableData,
                countTableColumns
            };
        },
        mounted(){
            //  选择商品
            const shoppingList = [];
            for (let i = 0; i < 10; i++) {
                shoppingList.push({
                    key: i,
                    hospital: `xx医院`,
                    city: '上海',
                    status: String(i % 2),
                    icon: '医院图标',
                    tags: ['编辑', '关联科室'],
                });
            }
            this.setShoppingList(shoppingList);
        },
        methods: {
            ...mapActions('addOral', [
                //  设置商品列表数据
                'setShoppingList',
            ]),
            //  确定按钮
            submitFn(){

            },

            //  选择时间
            chooseTime(){

            },

            //  删除类型表格的一行
            deleteTypeTable(){

            },
            //  删除数据表格的一行
            deleteCountTable(){

            },

        }
    };
</script>
<style scoped>
</style>
