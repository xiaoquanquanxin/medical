<template>
    <div class="layout-content-inner-main">
        <!--返回按钮-->
        <div class="a-input-group">
            <GoBackButton/>
        </div>
        <div class="a-input-group">
            <a-row type="flex" justify="space-between" align="middle">
                <a-space>
                    <a-select class="basic-select-width"
                              v-model="tableForm.hospitalId"
                              placeholder="请选择医院">
                        <a-select-option :value="item.id"
                                         v-for="item in hospitalList"
                        >{{item.hospitalName}}
                        </a-select-option>
                    </a-select>
                    <a-select class="lengthen-select-width" placeholder="请选择处方类型">
                        <a-select-option :value="item.id"
                                         v-for="item in prescriptionTypeList"
                        >{{item.name}}
                        </a-select-option>
                    </a-select>
                </a-space>
                <a-button type="primary" @click>保存</a-button>
            </a-row>
        </div>
        <div class="a-input-group" data-msg="空"></div>
        <div class="table-group">
            <!--表头-->
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                <a-space>
                    <span>肠内营养支持</span>
                    <a-select
                            class="basic-select-width"
                            v-model="tableForm.energy"
                            placeholder="请选择能量"
                            @change="selectEnergyChange"
                    >
                        <a-select-option :value="item.id"
                                         v-for="item in energyList"
                        >{{item.name}}
                        </a-select-option>
                    </a-select>
                </a-space>
                <a-select
                        class="lengthen-select-width"
                        v-model="tableForm.usageMethod"
                        placeholder="请选择食用方法"
                >
                    <a-select-option :value="item.id"
                                     v-for="item in usageMethodList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
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
                            <p v-for="(item,index) in sItem.buyUnitList"
                               :key="index"
                               v-if="item.buyUnitId === sItem.buyUnitCheckId"
                            >{{item.buyUnit}}</p>
                        </div>
                        <!--单价-->
                        <div slot="price" slot-scope="scope,sItem,sIndex,extra">
                            <p v-for="(item , index) in sItem.buyUnitList"
                               :key="index"
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
                            <div v-for="(item , index) in scope.list"
                                 :key="index"
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
                            <div v-for="(item , index) in scope.list"
                                 :key="index"
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
                                 :key="index"
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
    import GoBackButton from '@/components/goBackButton.vue';
    import TemplateRemarkInput from '@/components/prescriptionTemplate/templateRemarkInput';
    import { requestPrescriptionTemplateInsert } from '../../../api/scheme/scheme';

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
            width: 100,
            scopedSlots: { customRender: 'price' },
        },
        {
            title: '数量',
            dataIndex: 'number',
            width: 100,
            scopedSlots: { customRender: 'number' },
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    export default {
        components: {
            GoBackButton,
            SelectCommodity,
        },
        computed: {
            //  商品源的数据
            originCommodityList(){
                return this.$store.state.prescriptionTemplate.originCommodityList;
            },
            //  备注
            remark(){
                return this.$store.state.prescriptionTemplate.remark;
            },
            //  区分编辑
            oralId(){
                return this.$route.params.oralId;
            }
        },
        data(){
            return {
                //  医院下拉
                hospitalList: [{ id: 1, hospitalName: 'a医院' }, { id: 2, hospitalName: 'b医院' }],
                //  处方类型下拉
                prescriptionTypeList: [
                    { id: 1, name: '口服肠内营养补充' },
                    { id: 2, name: '肠内营养支持' },
                    { id: 3, name: '膳食营养计划' }],
                //  能量下拉
                energyList: [
                    { id: '1600kcal', name: '1600kcal', },
                    { id: '1400kcal', name: '1400kcal', },
                    { id: '1200kcal', name: '1200kcal', },
                    { id: '1000kcal', name: '1000kcal', },
                    { id: '800kcal', name: '800kcal', },
                    { id: '600kcal', name: '600kcal', },
                    { id: '400kcal', name: '400kcal', },
                    { id: '200kcal', name: '200kcal', }],
                //  食用方法下拉
                usageMethodList: [
                    { id: '口服', name: '口服', },
                    { id: '经口', name: '经口', },
                    { id: '管饲', name: '管饲', },
                    { id: '外周静脉', name: '外周静脉', },
                    { id: '中心静脉', name: '中心静脉', },
                    { id: '鼻胃管', name: '鼻胃管', },
                    { id: '肠胃管', name: '肠胃管', }],

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

                //  表单中表格的数据
                tableForm: {
                    //  hospitalId          医院
                    //  prescriptionName    处方名
                    //  prescriptionType    处方类型
                    //  energy              能量
                    //  usageMethod         食用方法

                    //  goods               选择的商品
                    //  dinnerTimes         用餐时间
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
        created(){
            this.searchFn();
            console.log('是编辑？', !!this.oralId);
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
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
                //  设置remark的行数
                'setRowForRemark',
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
                        },
                        //  ⚠️别删
//                        {
//                            commodityName: '小斯',
//                            key: 2,
//                            buyUnitList: [
//                                {
//                                    buyUnit: '333克',
//                                    price: 333,
//                                    buyUnitId: 3,
//                                    //  用于组织 buyUnitCheckId
//                                    isRadioChecked: true,
//                                },
//                                {
//                                    buyUnit: '55克',
//                                    price: 55,
//                                    buyUnitId: 4,
//                                }
//                            ],
//                            //  被选中的购买单位的id
//                            buyUnitCheckId: 1,
//                            //  多选的勾选状态
//                            isCheckboxChecked: true,
//                        },
                        {
                            commodityName: '大斯',
                            key: 3,
                            buyUnitList: [
                                {
                                    buyUnit: '666克',
                                    price: 66,
                                    buyUnitId: 6,
                                },
                                {
                                    buyUnit: '777克',
                                    price: 77,
                                    buyUnitId: 7,
                                },
                                {
                                    buyUnit: '88克',
                                    price: 8,
                                    buyUnitId: 8,
                                }
                            ],
                        },
                    ];
                    this.setOriginCommodityList(originCommodityList);
                });
                //  重置数据
                this.commodityTableData = [];
                this.timeTableData = [];
            },

            //  选择商品
            selectCommodity(){
                //  必须选择能量方案
                if (!this.tableForm.energy) {
                    this.$message.error('请先选择能量');
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
                    //  重置时间表格数据
                    this.timeTableData = [];
                }).catch(error => {
                    console.log(error);
                    console.log('有错');
                });
            },

            //  选择时间
            chooseTime(){
                //  如果没有选择商品数据，先添加选择商品数据
                if (!this.commodityTableData.length) {
                    this.$message.error('请先选择商品');
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
                //  console.clear();
                const commodityTableData = JSON.parse(JSON.stringify(this.commodityTableData));
                //  子列表数据
                const list = commodityTableData.map(item => {
                    const child = item.buyUnitList.filter((_item) => {
                        //  console.log(_item.isRadioChecked);
                        return _item.isRadioChecked;
                    });
                    //  console.log(child);
                    return Object.assign(child[0], { commodityName: item.commodityName });
                });
                //  console.log(list);
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
                this.rowCount();
            },

            //  删除选择商品表格的一行
            deleteTypeTable(sItem, sIndex){
                //  内部的id，单选id
                const { buyUnitCheckId } = sItem;
                //  洗主数据
                delete sItem.buyUnitCheckId;
                delete sItem.isCheckboxChecked;
                sItem.buyUnitList.forEach((item => {
                    if (item.isRadioChecked) {
                        delete item.isRadioChecked;
                    }
                }));
                //  清洗时间表格数据，只删除一行
                this.timeTableData.forEach(item => {
                    for (let i = 0; i < item.list.length; i++) {
                        //  要被删除的商品类型
                        if (item.list[i].buyUnitId === buyUnitCheckId) {
                            item.list.splice(i, 1);
                            break;
                        }
                    }
                });
                this.clearTimeTableData();
                //  清除选择商品表格的该行，只删除一行
                this.commodityTableData.splice(sIndex, 1);
                //  这里要存store
                this.setOriginCommodityList(this.originCommodityList);
                //  console.table(JSON.parse(JSON.stringify(this.originCommodityList)));
            },
            //  删除时间表格的一行
            deleteTimeTable(scope, index){
                //  操作的是 timeTableData，只删除一行
                scope.list.splice(index, 1);
                //  如果删除了某个时间下的所有数据，需要删除这一行
                if (!scope.list.length) {
                    this.clearTimeTableData();
                }
            },
            //  清洗时间表格数据
            clearTimeTableData(){
                for (let i = 0; i < this.timeTableData.length; i++) {
                    const item = this.timeTableData[i];
                    //  在时间列表里删除这个项，这是被删除完了
                    if (!item.list.length) {
                        this.timeTableData.splice(i, 1);
                        //  ⚠️可能删除多行
                        i--;
                    }
                }
                console.table(JSON.parse(JSON.stringify(this.timeTableData)));
                //  计算时间框的总行数
                this.rowCount();
            },
            //  计算时间框的总行数
            rowCount(){
                if (!this.timeTableData || !this.timeTableData.length) {
                    return 0;
                }
                const rowCount = this.timeTableData.reduce((a, b) => {
                    return a + b.list.length;
                }, 0);
                this.setRowForRemark(rowCount);
            },
            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                console.log(this.commodityTableData);
                console.log('备注🍌', this.remark);
                console.log(this.timeTableData);
                return;
                (() => {
                    //  如果是新增
                    if (!this.oralId) {
                        return requestPrescriptionTemplateInsert(data);
                    }
                    data.id = this.oralId;
                    //  如果是编辑
                    return requestPrescriptionTemplateUpdate(data);
                })()
                    .then(v => {
                        console.log(v);
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },
        }
    };
</script>
<style scoped>
    .layout-content-inner-main {
        min-width: 900px;
    }
    
    .col-right {
        border-left: 1px solid #e8e8e8;
    }
    
    /*表组*/
    .table-group {
        border: 1px solid #e8e8e8;
        border-bottom: none;
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
