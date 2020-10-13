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
                    <a-select-option value="1">
                        男
                    </a-select-option>
                    <a-select-option value="2">
                        女
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="肠内营养支持">
                <div class="table-group" style="width:calc((100vw - 200px)*.65)">
                    <!--表头-->
                    <a-row type="flex" justify="start" align="middle" class="table-group-title">
                        <a-col :span="4">
                            肠内营养支持
                        </a-col>
                        <a-col :span="5">
                            <a-select
                                    v-model="tableForm.energyId"
                                    style="width:100%;"
                                    placeholder="请选择能量"
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
                                    placeholder="请选择食用方法"
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
                    <!--选择商品表格-->
                    <a-row type="flex" justify="space-between" align="middle" class="table-group-row">
                        <a-col :span="3">
                            <a-row type="flex" justify="center" align="middle">
                                <a-space size="small">
                                    <a @click="selectCommodity()">选择商品</a>
                                </a-space>
                            </a-row>
                        </a-col>
                        <a-col :span="21" class="col-right">
                            <a-table :columns="commodityTableColumns"
                                     :data-source="commodityTableData"
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
                    <!--选择时间表格-->
                    <a-row type="flex" justify="space-between" align="middle" class="table-group-row">
                        <a-col :span="3">
                            <a-row type="flex" justify="center" align="middle">
                                <a-space size="small">
                                    <a @click="chooseTime()">选择时间</a>
                                </a-space>
                            </a-row>
                        </a-col>
                        <a-col :span="21" class="col-right">
                            <a-table
                                    :columns="timeTableColumns"
                                    :data-source="timeTableData"
                                    :pagination="false"
                                    bordered
                                    class="custom-select-title-table">
                                <!--商品名称-->
                                <div slot="commodityName"
                                     slot-scope="scope,sItem,sIndex,extra"
                                     class="negative-margin-16"
                                >
                                    <div v-for="item in scope.list"
                                         class="negative-margin-item"
                                    >
                                        {{item.commodityName}}
                                    </div>
                                </div>
                                <!--使用量-->
                                <div slot="dosage"
                                     slot-scope="scope,sItem,sIndex,extra"
                                     class="negative-margin-16"
                                >
                                    <div v-for="item in scope.list"
                                         class="negative-margin-item is-input"
                                    >
                                        <a-space size="small">
                                            <a-input placeholder="请输入使用量" v-model="item.dosage"/>
                                            {{item.unit}}
                                        </a-space>
                                    </div>
                                </div>
                                <!--温水-->
                                <div slot="warmWater"
                                     slot-scope="scope,sItem,sIndex,extra"
                                     class="negative-margin-16"
                                >
                                    <div class="negative-margin-item is-input">
                                        <a-space size="small">
                                            <a-input placeholder="请输入温水" v-model="scope.warmWater"/>
                                        </a-space>
                                    </div>
                                </div>
                                <!--操作-->
                                <div slot="operation" slot-scope="scope,sItem,sIndex,extra"
                                     class="negative-margin-16"
                                >
                                    <div v-for="(item,index) in scope.list"
                                         class="negative-margin-item"
                                    >
                                        <a-space size="small">
                                            <a @click="deleteTimeTable(scope,index,sItem,sIndex)">删除</a>
                                        </a-space>
                                    </div>
                                </div>
                            </a-table>
                        </a-col>
                    </a-row>
                </div>
            </a-form-item>
            <!--保存-->
            <a-form-item :wrapper-col="{ span: 4, offset: 5 }">
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
        <!--选择时间莫泰框-->
        <a-modal v-model="dialogDataSelectTime.visible"
                 v-if="dialogDataSelectTime.visible"
                 :maskClosable="false"
                 centered
                 :width="200"
                 title="选择时间"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="selectTimeModalCheck">
            <a-time-picker
                    v-model="selectTimeMoment"
                    @change="selectTimeChange"
                    format="HH:mm"/>
        </a-modal>
    </div>
</template>
<script>
    import moment from 'moment';

    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import SelectCommodity from '@/components/prescriptionTemplate/selectCommodity.vue';
    import { formItemLayout } from '@/utils/layout.ts';

    import TemplateRemarkInput from '@/components/prescriptionTemplate/templateRemarkInput';

    //  选择商品表格列的意义
    const commodityTableColumns = [
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
            //  备注
            remark(){
                return this.$store.state.prescriptionTemplate.remark;
            },
        },
        data(){
            return {
                //  选择商品表格数据
                commodityTableData: [],
                commodityTableColumns,

                //  选择时间表格数据
                timeTableData: [],
                //  选择时间表格列的意义
                timeTableColumns: [
                    {
                        title: '时间',
                        dataIndex: 'time',
                        width: 100,
                    },
                    {
                        title: '商品名称',
                        width: 200,
                        scopedSlots: { customRender: 'commodityName' },
                    },
                    {
                        title: '使用量',
                        width: 200,
                        scopedSlots: { customRender: 'dosage' }
                    },
                    {
                        title: '温水/ml',
                        width: 200,
                        scopedSlots: { customRender: 'warmWater' }
                    },
                    {
                        title: '操作',
                        width: 100,
                        scopedSlots: { customRender: 'operation' },
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        width: 200,
                        rowSpan: 100,
                        customRender: (text, row, index) => {
                            const obj = {
                                children: this.$createElement(TemplateRemarkInput),
                                attrs: {},
                            };
                            if (index === 0) {
                                obj.attrs.rowSpan = 10000;
                            } else {
                                obj.attrs.rowSpan = 0;
                            }
                            return obj;
                        },
                    },
                ],

                //	处方模板管理 - 增加口服肠内补充方案 - 选择商品
                dialogDataSelectCommodity: this.initModal(DIALOG_TYPE.TEMPLATE_SELECT_COMMODITY),
                //  处方模板管理 - 增加口服肠内补充方案 - 选择时间
                dialogDataSelectTime: this.initModal(DIALOG_TYPE.TEMPLATE_SELECT_TIME),

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

                //  表单中表格的数据 ：能量、 食用方法
                tableForm: {
                    //  能量  energyId
                    //  食用方法  tableForm
                },

                //  选择时间的值的对象
                selectTimeMoment: null,
                //  选择时间的值
                selectTimeValue: null,
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

                });
            }
//            this.setShoppingList(shoppingList);
        },
        methods: {
            //  时间选择器的方法
            moment,
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
                            commodityName: '许晓飞',
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
                    this.commodityTableData = this.originCommodityList.filter(item => item.isCheckboxChecked);
                }).catch(error => {
                    console.log(error);
                    console.log('有错');
                });
            },

            //  选择时间
            chooseTime(){
                //  如果没有选择商品数据，先添加选择商品数据
                if (!this.commodityTableData.length) {
                    this.$error({ title: '请先选择商品' });
                    return;
                }
                console.log('实际是新增一条时间');
                this.selectTimeValue = '00:00';
                //  初始化时间
                this.selectTimeMoment = this.moment(this.selectTimeValue, 'HH:mm');
                //  弹框
                this.showModal(DIALOG_TYPE.TEMPLATE_SELECT_TIME);
            },

            //  选择时间的变换
            selectTimeChange(value, selectTimeValue){
                this.selectTimeValue = selectTimeValue;
            },

            //  确定选择的时间
            selectTimeModalCheck(){
                console.log(this.selectTimeValue);
                console.log(this.commodityTableData);
                //  子列表数据
                const list = this.commodityTableData.map(item => {
                    const child = item.buyUnitList.filter((_item) => {
                        console.log(_item.isRadioChecked);
                        //  todo    有bug，是直接选择多选导致的
                        return _item.isRadioChecked;
                    });
                    return JSON.parse(JSON.stringify(child[0]));
                });
                console.log(JSON.parse(JSON.stringify(list)));
                //  一条数据
                const data = {
                    //  key
                    key: Math.random(),
                    //  时间
                    time: this.selectTimeValue,
                    //  温水
                    warmWater: null,
                    //  子列表
                    list,
                };
                //  新增一条数据
                this.timeTableData.push(data);
                //  关闭时间选择
                this.hideModal(DIALOG_TYPE.TEMPLATE_SELECT_TIME);
            },

            //  删除类型表格的一行
            deleteTypeTable(sItem, sIndex){
                this.commodityTableData.splice(sIndex, 1);
            },
            //  删除数据表格的一行
            deleteTimeTable(scope, index, sItem, sIndex){
                //  console.log(scope, index, sItem, sIndex);
                scope.list.splice(index, 1);
                //  如果删除完了这一列，需要删时间的主数据
                if (scope.list.length === 0) {
                    this.timeTableData.splice(sIndex, 1);
                }
                console.log(JSON.parse(JSON.stringify(this.timeTableData)));
            },

            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                console.log(this.commodityTableData);
                console.log('备注🍌', this.remark);
                console.log(this.timeTableData);
                this.form.validateFields((err, values) => {
                    console.table(values);
                    console.log(!err);
                });
            },
        }
    };

    //  todo    删除时间的某一类之后，删除全部的这个类型的数据，前端有风险
    //  todo    同理，删除商品的某一类后，要删除全部这个时间的数据
</script>
<style scoped>
    .col-right {
        border-left: 1px solid #e8e8e8;
    }
    
    .table-group-row {
        border-bottom: 1px solid #e8e8e8;
    }
</style>
<!--<a-time-picker-->
<!--        :use12Hours="false"-->
<!--        format="h:mm a"-->
<!--        @change="onChange"-->
<!--        placeholder="请新增时间"/>-->
