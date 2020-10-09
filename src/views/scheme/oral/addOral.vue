<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="医院">
                <a-select
                        placeholder="请选择医院"
                        v-decorator="hospitalDecorator"
                >
                    <a-select-option value="">
                        请选择性别
                    </a-select-option>
                    <a-select-option value="1">
                        男
                    </a-select-option>
                    <a-select-option value="2">
                        女
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="膳选择处方类型">
                <a-select
                        placeholder="请选择膳选择处方类型"
                        v-decorator="prescriptionTypeDecorator"
                >
                    <a-select-option value="">
                        请选择性别
                    </a-select-option>
                    <a-select-option value="1">
                        男
                    </a-select-option>
                    <a-select-option value="2">
                        女
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="肠内营养支持">
                <div class="table-group" style="width:calc((100vw - 200px) * .65)">
                    <!--表头-->
                    <a-row type="flex" justify="start" align="middle" class="table-group-title">
                        <a-col :span="4">
                            肠内营养支持
                        </a-col>
                        <a-col :span="5">
                            <a-select
                                    v-model="tableForm.energyId"
                                    style="width:100%;"
                                    placeholder="请选能量"
                                    @change="selectEnergyChange"
                            >
                                <a-select-option value="1600">1600</a-select-option>
                                <a-select-option value="1400">1400</a-select-option>
                                <a-select-option value="1200">1200</a-select-option>
                                <a-select-option value="1000">1000</a-select-option>
                                <a-select-option value="800">800</a-select-option>
                                <a-select-option value="600">600</a-select-option>
                                <a-select-option value="400">400</a-select-option>
                                <a-select-option value="200">200</a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="5" :offset="10">
                            <a-select
                                    v-model="tableForm.eatingMethod"
                                    style="width:100%;"
                                    placeholder="请选食用方法"
                            >
                                <a-select-option value="Option1">
                                    Option1
                                </a-select-option>
                                <a-select-option value="Option2">
                                    Option2
                                </a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="space-between" align="middle">
                        <a-col :span="4">
                            <a-row type="flex" justify="center" align="middle">
                                <a-space size="small">
                                    <a @click="selectCommodity()">选择商品</a>
                                </a-space>
                            </a-row>
                        </a-col>
                        <a-col :span="20" style="border-left: 1px solid #e8e8e8;">
                            <!--类型表格-->
                            <a-table :columns="typeTableColumns"
                                     :data-source="typeTableData"
                                     :pagination="false"
                                     bordered
                                     class="custom-select-title-table">
                                <!--购买单位-->
                                <div slot="buyUnitList" slot-scope="scope,sItem,sIndex,extra">
                                    <p v-for="item in sItem.buyUnitList"
                                       v-if="item.buyUnitId === sItem.buyUnitCheckId"
                                    >{{item.buyUnit}}</p>
                                </div>
                                <!--单价-->
                                <div slot="price" slot-scope="scope,sItem,sIndex,extra">
                                    <p v-for="item in sItem.buyUnitList"
                                       v-if="item.buyUnitId === sItem.buyUnitCheckId"
                                    >{{item.price}}</p>
                                </div>
                                <!--数量-->
                                <div slot="number" slot-scope="scope,sItem,sIndex,extra">
                                    <a-input v-model="sItem.number" placeholder="请输入数量"/>
                                </div>
                                <!--操作-->
                                <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                                    <a-space size="small">
                                        <a @click="deleteTypeTable(sItem,sIndex)">删除</a>
                                    </a-space>
                                </div>
                            </a-table>
                        </a-col>
                    </a-row>
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
                                {{sItem.commodityName}}
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
                </div>
            </a-form-item>
            <!--保存-->
            <a-form-item :wrapper-col="{ span: 4, offset: 7 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
        <!--查看价格莫泰框-->
        <a-modal v-model="dialogDataSelectCommodity.visible"
                 v-if="dialogDataSelectCommodity.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="选择商品"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="selectCommodityModalCheck('refSelectCommodity')">
            <SelectCommodity ref="refSelectCommodity"/>
        </a-modal>
    </div>
</template>
<script>
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import SelectCommodity from '@/components/prescriptionTemplate/selectCommodity.vue';
    import { formItemLayout } from '@/utils/layout.ts';

    const countTableData = [
        {
            key: Math.random(),
            name: '添加时间',
            time: '7:00',
            unit: '勺',
            commodityName: 'A商品',
        },
        {
            key: Math.random(),
            name: '添加时间',
            time: '7:00',
            unit: 'ml',
            commodityName: 'B商品',
        },
        {
            key: Math.random(),
            name: '添加时间',
            time: '8:00',
            unit: '勺',
            commodityName: 'A商品',
        },
        {
            key: Math.random(),
            name: '添加时间',
            time: '8:00',
            unit: 'ml',
            commodityName: 'B商品',
        },
    ];

    const typeTableColumns = [
        {
            title: '商品名称',
            dataIndex: 'commodityName',
            width: 100,
        },
        {
            title: '购买单位',
            dataIndex: 'buyUnitList',
            width: 100,
            scopedSlots: { customRender: 'buyUnitList' },
        },
        {
            title: '商品单价',
            dataIndex: 'price',
            width: 200,
            scopedSlots: { customRender: 'price' },
        },
        {
            title: '数量',
            dataIndex: 'number',
            width: 200,
            scopedSlots: { customRender: 'number' },
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        components: {
            SelectCommodity,
        },
        computed: {
            //  商品源的数据
            originCommodityList(){
                return JSON.parse(JSON.stringify(this.$store.state.prescriptionTemplate.originCommodityList));
            },
//            //  被选中的数据
//            selectedCommodityList(){
//                return this.$store.state.prescriptionTemplate.selectedCommodityList;
//            },
        },
        data(){
            const countTableColumns = [
                {
                    dataIndex: 'name',
                    colSpan: 100,
                    width: 150,
                    customRender: (text, row, index) => {
                        const obj = {

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
                    width: 100,
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
                //  选择商品表格数据
                typeTableData: [],
                typeTableColumns,
                countTableData,
                countTableColumns,

                //	处方模板管理 - 增加口服肠内补充方案 - 选择商品
                dialogDataSelectCommodity: this.initModal(DIALOG_TYPE.TEMPLATE_SELECT_COMMODITY),

                formItemLayout,

                //  请选择医院
                hospitalDecorator: ['hospital', {
                    rules: [{
                        required: true,
                        message: '请选择医院'
                    },]
                }],
                //  请选择膳选择处方类型
                prescriptionTypeDecorator: ['prescriptionType', {
                    rules: [{
                        required: true,
                        message: '请选择膳选择处方类型'
                    },]
                }],

                //  表格数据
                tableForm: {
                    //  能量  energyId
                    //  食用方法  tableForm
                }
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
//            this.setShoppingList(shoppingList);
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
//            ...mapActions('addOral', [
//                //  设置商品列表数据
//                'setShoppingList',
//            ]),
            ...mapActions('prescriptionTemplate', [
                //  处方模板，选择的能量，请求选择商品的源数据
                'setOriginCommodityList',
            ]),

            //  切换能量
            selectEnergyChange(value){
                console.log(value);
                console.log('🍎🍎🍎🍎发请求');
                setTimeout(() => {
                    //  源数据
                    const originCommodityList = [
                        {
                            commodityName: '权鑫',
                            key: 1,
                            buyUnitList: [
                                {
                                    buyUnit: '11111克',
                                    price: 11111,
                                    buyUnitId: 1,
                                },
                                {
                                    buyUnit: '100克',
                                    price: 100,
                                    buyUnitId: 2,
                                }
                            ],
                            //  被选中的购买单位的id
                            //  buyUnitCheckId: null,
                        },
                        {
                            commodityName: '小斯',
                            key: 2,
                            buyUnitList: [
                                {
                                    buyUnit: '333克',
                                    price: 333,
                                    buyUnitId: 1,
                                    //  用于组织 buyUnitCheckId
                                    isRadioChecked: true,
                                },
                                {
                                    buyUnit: '55克',
                                    price: 55,
                                    buyUnitId: 2,
                                }
                            ],
                            //  被选中的购买单位的id
                            buyUnitCheckId: 1,
                            //  多选的勾选状态
                            isCheckboxChecked: true,
                        },];
                    this.setOriginCommodityList(originCommodityList);
                });
            },

            //  选择商品
            selectCommodity(){
                //  必须选择能量方案
                if (!this.tableForm.energyId) {
                    this.$error({ title: '请先选择能量' });
                    return;
                }
                this.showModal(DIALOG_TYPE.TEMPLATE_SELECT_COMMODITY);
            },
            //  确认选择商品莫泰框
            selectCommodityModalCheck(refSelectCommodity){
                const promise = this.$refs[refSelectCommodity].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.TEMPLATE_SELECT_COMMODITY);
                    console.log('源数据', JSON.stringify(this.originCommodityList));
                    //  只展示被选中的
                    this.typeTableData = this.originCommodityList.filter(item => item.isCheckboxChecked);
                }).catch(error => {
                    console.log(error);
                    console.log('有错');
                });
            },

            //  选择时间
            chooseTime(){

            },

            //  删除类型表格的一行
            deleteTypeTable(sItem, sIndex){
                this.typeTableData.splice(sIndex, 1);
            },
            //  删除数据表格的一行
            deleteCountTable(){

            },

            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                console.log(this.typeTableData);
                this.form.validateFields((err, values) => {
                    console.table(values);
                    console.log(!err);
                });
            },
        }
    };
</script>
<style scoped>
</style>
