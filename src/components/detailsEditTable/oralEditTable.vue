<template>
    <div>
        <!--口服肠内营养补充-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <a-space>
                <span>{{dataTitle.name}}</span>
                <a @click="choosePlanFn">选择方案<a v-if="choosePlanData.energyId">(已选：{{choosePlanData.energyId}})</a></a>
            </a-space>
            <a-select class="lengthen-select-width" v-model="dataTitle.usageMethod" placeholder="请选择食用方法"
                      @change="usageMethodChangeFn">
                <a-select-option :value="item.id"
                                 :key="item.id"
                                 v-for="item in usageMethodList"
                >{{item.name}}
                </a-select-option>
            </a-select>
        </a-row>
        <div class="custom-flex">
            <div class="custom-flex-left">
                <a @click="chooseCommodityFn">选择商品</a>
            </div>
            <div class="custom-flex-right">
                <a-table
                        :columns="basicColumns1"
                        :data-source="commodityTableData"
                        :pagination="false"
                        bordered
                >
                    <!--购买单位-->
                    <div slot="buyUnit" slot-scope="scope,sItem,sIndex,extra">
                        <p v-for="(item , index) in sItem.uintListVos"
                           v-if="item.id === sItem.purchaseUnitCheckId"
                        >{{item.uname}}</p>
                    </div>
                    <!--单价-->
                    <div slot="price" slot-scope="scope,sItem,sIndex,extra">
                        <p v-for="(item , index) in sItem.uintListVos"
                           v-if="item.id === sItem.purchaseUnitCheckId"
                        >{{item.unitPrice}}</p>
                    </div>
                    <!--数量-->
                    <div slot="count" slot-scope="scope,sItem,sIndex,extra">
                        <a-input-number v-model="sItem.quantity" placeholder="请输入数量"/>
                    </div>
                    <!--小计-->
                    <div slot="subtotal" slot-scope="scope,sItem,sIndex,extra">
                        <p v-for="(item , index) in sItem.uintListVos"
                           v-if="item.buyUnitId === sItem.buyUnitCheckId"
                        >{{ sItem.quantity * item.unitPrice || 0}}</p>
                    </div>
                    <!--操作-->
                    <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                        <a-space size="small">
                            <a @click="deleteTypeTable(sItem,sIndex)">删除</a>
                        </a-space>
                    </div>
                </a-table>
            </div>
        </div>
        <div class="custom-flex">
            <div class="custom-flex-left">
                <a @click="addTimeCheck">新增时间</a>
            </div>
            <div class="custom-flex-right">
                <a-table
                        :columns="timeTableColumns"
                        :data-source="timeTableData"
                        :pagination="false"
                        bordered
                        class="custom-select-title-table">
                    <!--商品名称-->
                    <div slot="goodsName"
                         slot-scope="scope,sItem,sIndex,extra"
                         class="negative-margin-16"
                    >
                        <div v-for="(item , index) in scope.list"
                             :key="index"
                             class="negative-margin-item"
                        >
                            {{item.goodsName}}
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
                                {{item.uname}}
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
            </div>
        </div>
        <!--选择方案泰框-->
        <a-modal v-model="modal1"
                 v-if="modal1"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="选择方案"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="choosePlanModalCheck('refChoosePlanBox')">
            <ChoosePlanBox
                    :choosePlanData="choosePlanData"
                    :data-title="dataTitle"
                    ref="refChoosePlanBox"
            />
        </a-modal>
        <!--选择商品莫泰框-->
        <a-modal v-model="modal2"
                 v-if="modal2"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="选择商品"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="chooseCommodityModalCheck('refChooseCommodityBox')">
            <ChooseCommodityBox
                    ref="refChooseCommodityBox"
                    :commodityList="commodityList[choosePlanData.planId]"
            />
        </a-modal>
        <!--新增时间莫泰框-->
        <a-modal v-model="modal3"
                 v-if="modal3"
                 :maskClosable="false"
                 centered
                 :width="200"
                 title="新增时间"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="addTimeModalCheck()">
            <a-time-picker
                    v-model="addTimeMoment"
                    @change="addTimeChange"
                    format="HH:mm"/>
        </a-modal>
    </div>
</template>
<script>
    import moment from 'moment';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    //  选择方案弹框
    import ChoosePlanBox from '@/components/detailsEditTable/choosePlanBox.vue';
    //  选择商品弹框
    import ChooseCommodityBox from '@/components/detailsEditTable/chooseCommodityBox.vue';
    import TemplateRemarkInput from '@/components/prescriptionTemplate/templateRemarkInput';
    import { usageMethodList } from '../../utils/constants';
    import { mapGetters, mapActions } from 'vuex';

    const basicColumns1 = [
        {
            title: '商品名称',
            width: 100,
            dataIndex: 'goodsName'
        },
        {
            title: '购买单位',
            width: 100,
            scopedSlots: { customRender: 'buyUnit' }
        },
        {
            title: '商品单价',
            width: 100,
            scopedSlots: { customRender: 'price' }
        },
        {
            title: '数量',
            width: 100,
            scopedSlots: { customRender: 'count' }
        },
        {
            title: '小计',
            width: 100,
            scopedSlots: { customRender: 'subtotal' }
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' }
        }
    ];
    const basicColumns2 = [
        {
            title: '商品名称',
            width: 100,
            dataIndex: 'goodsName'
        },
        {
            title: '购买单位',
            width: 100,
            scopedSlots: { customRender: 'buyUnit' }
        },
        {
            title: '商品单价',
            width: 100,
            scopedSlots: { customRender: 'price' }
        },
        {
            title: '数量',
            width: 100,
            scopedSlots: { customRender: 'count' }
        },
        {
            title: '小计',
            width: 100,
            scopedSlots: { customRender: 'subtotal' }
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' }
        }
    ];
    //  可编辑的第一组数据
    export default {
        components: {
            ChoosePlanBox,
            ChooseCommodityBox,
        },
        props: ['dataTitle'],
        computed: {
            //  处方模板类型
            prescriptionType(){
                const { basicInfoEditData } = this.$store.state.intervention;
                if (!basicInfoEditData) {
                    return;
                }
                return basicInfoEditData[0].prescriptionType;
            },
            //  被选中的处方
            chooseInterventionData(){
                return this.$store.state.intervention.chooseInterventionData;
            }
        },
        data(){
            return {
                //  选择方案弹框
                modal1: false,
                //  选择商品莫泰框
                modal2: false,
                //  选择时间莫泰框
                modal3: false,
                //  食用方法下拉
                usageMethodList,
                basicColumns1,
                basicColumns2,
                //  基础表格数据
                commodityTableData: [],
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
                        scopedSlots: { customRender: 'goodsName' },
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

                //  选择方案数据
                choosePlanData: {
                    //  选择的能量
                    energyId: null,
                    //  选择的具体的方案，是一个结果。如果是编辑，需要反向设计到planMap里
                    planId: null,
                },

                //  页面整体数据
                mainData: null,
                //  商品数据
                commodityList: null,
                //  新增时间的值的对象
                addTimeMoment: null,
                //  新增时间的值
                addTimeValue: null,
            };
        },
        watch: {
            //  处方类型
            prescriptionType(value){
                console.log(value);
                this.resetTableData();
//                //  选择方案数据
//                this.choosePlanData = {
//                    //  选择的能量
//                    energyId: null,
//                    //  选择的具体的方案，是一个结果。如果是编辑，需要反向设计到planMap里
//                    planId: null,
//                };
            }
        },
        created(){
            console.log(JSON.parse(JSON.stringify(this.dataTitle)));
            //  商品数据
            this.commodityList = {
                1: [{
                    key: 1,
                    name: '一胎素',
                    //  单价*数量
                    subtotal: null,
                    //  详细数据
                    customList: [
                        {
                            buyUnitId: 1,
                            //  单位
                            buyUnit: '克',
                            //  单价
                            price: 87,
                        },
                        {
                            buyUnitId: 2,
                            //  单位
                            buyUnit: '箱',
                            //  单价
                            price: 1,
                        }
                    ]
                },],
                2: [{
                    key: 2,
                    name: '一胎素',
                    //  单价*数量
                    subtotal: null,
                    //  详细数据
                    customList: [
                        {
                            buyUnitId: 3,
                            //  单位
                            buyUnit: '克',
                            //  单价
                            price: 87,
                        },
                        {
                            buyUnitId: 4,
                            //  单位
                            buyUnit: '箱',
                            //  单价
                            price: 1,
                        }
                    ]
                },],
                3: [{
                    key: 3,
                    name: '一胎素',
                    //  单价*数量
                    subtotal: null,
                    //  详细数据
                    customList: [
                        {
                            buyUnitId: 5,
                            //  单位
                            buyUnit: '克',
                            //  单价
                            price: 87,
                        },
                        {
                            buyUnitId: 6,
                            //  单位
                            buyUnit: '箱',
                            //  单价
                            price: 1,
                        }
                    ]
                },],
                4: [
                    {
                        key: 41,
                        name: '一胎素',
                        //  单价*数量
                        subtotal: null,
                        //  详细数据
                        customList: [
                            {
                                buyUnitId: 7,
                                //  单位
                                buyUnit: '克',
                                //  单价
                                price: 87,
                                //  根据配置量来计算
                                count: 777,
                            },
                            {
                                buyUnitId: 8,
                                //  单位
                                buyUnit: '箱',
                                //  单价
                                price: 1,
                                //  根据配置量来计算
                                count: 8888,
                            }
                        ]
                    },
                    {
                        key: 42,
                        name: '二胎素',
                        //  单价*数量
                        subtotal: null,
                        //  详细数据
                        customList: [
                            {
                                buyUnitId: 7,
                                //  单位
                                buyUnit: '克',
                                //  单价
                                price: 87,
                                //  根据配置量来计算
                                count: 222,
                            },
                            {
                                buyUnitId: 8,
                                //  单位
                                buyUnit: '箱',
                                //  单价
                                price: 1,
                                //  根据配置量来计算
                                count: 1111,
                            }
                        ]
                    }
                ],
                5: [{
                    key: 5,
                    name: '一胎素',
                    //  单价*数量
                    subtotal: null,
                    //  详细数据
                    customList: [
                        {
                            buyUnitId: 9,
                            //  单位
                            buyUnit: '克',
                            //  单价
                            price: 87,
                        },
                        {
                            buyUnitId: 10,
                            //  单位
                            buyUnit: '箱',
                            //  单价
                            price: 1,
                        }
                    ]
                },],
            };
            //  this.searchFn();
        },
        methods: {
            ...mapActions('prescriptionTemplate', [
                //  设置商品列表数据
                'setRemark',
            ]),
            //  时间选择器的方法
            moment,
            //  选择方案
            choosePlanFn(){
                this.modal1 = true;
            },
            //  关闭选择方案
            choosePlanModalCheck(refChoosePlanBox){
                //  去弹框组件中拿数据
                const promise = this.$refs[refChoosePlanBox].handleSubmit();
                promise.then(v => {
                    //  关闭弹框
                    this.modal1 = false;
                    //  被选中的方案
                    const { commodityTableData, timeTableData } = this.chooseInterventionData;
                    console.log('被选中的方案');
                    console.log(JSON.parse(JSON.stringify(commodityTableData)));
//                    commodityTableData.forEach(item => {
//                        const purchaseUnitCheckId = item.purchaseUnitCheckId;
//                        item.uintListVos.forEach(_item => {
//                            if (_item.id === purchaseUnitCheckId) {
//                                //
//                            }
//                        });
//
//                    });
                    this.commodityTableData = commodityTableData;
                    this.timeTableData = timeTableData;
                    console.log(JSON.parse(JSON.stringify(timeTableData)));

//                    return;
//                    const { energyId, planId } = this.choosePlanData;
//                    if ((v.energyId !== energyId) || (v.planId !== planId)) {
//                        //  ⚠️这时候要重置所有数据的状态
//                        //  重置基础数据状态
//                        Reflect.ownKeys(this.commodityList).forEach(key => {
//                            const itemList = this.commodityList[key];
//                            if (!itemList || !itemList.length) {
//                                return;
//                            }
//                            itemList.forEach(item => {
//                                delete item.buyUnitCheckId;
//                                delete item.isCheckboxChecked;
//                                item.customList.forEach(_item => {
//                                    delete _item.isRadioChecked;
//                                });
//                            });
//                        });
//                        //  重置基础数据
//                        this.commodityTableData = [];
//                    }
                    this.choosePlanData = v;
                })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //  选择商品
            chooseCommodityFn(){
                //  如果没有选择方案，先选择方案
                if (!this.choosePlanData.planId) {
                    this.$message.error('请选择方案');
                    return;
                }
            },
            //  确认选择商品
            chooseCommodityModalCheck(refChooseCommodityBox){
                //  去弹框组件中拿数据
                const promise = this.$refs[refChooseCommodityBox].handleSubmit();
                promise
                    .then(commodityList => {
                        //  关闭弹框
                        this.hideModal(DIALOG_TYPE.CHOOSE_COMMODITY);

                        return;
                        //  基础表格数据
                        this.commodityTableData = commodityList.filter(item => {
                            return item.isCheckboxChecked;
                        });
                        console.log('基础表格数据');
                        console.table(JSON.parse(JSON.stringify(this.commodityTableData)));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //  删除基础数据
            deleteTypeTable(sItem, sIndex){
                const deleteItem = this.commodityTableData.splice(sIndex, 1);
                //  重置数据
                deleteItem[0].isCheckboxChecked = false;
                deleteItem[0].buyUnitCheckId = null;
                deleteItem[0].customList.forEach(item => {
                    item.isRadioChecked = false;
                });
            },

            //  新增时间
            addTimeCheck(){
                //  如果没有选择商品数据，先添加选择商品数据
                if (!this.commodityTableData.length) {
                    this.$message.error('请先选择商品');
                    return;
                }
                console.log('实际是新增一条时间');
                this.addTimeValue = '00:00';
                //  初始化时间
                this.addTimeMoment = this.moment(this.addTimeValue, 'HH:mm');
                this.modal3 = true;
            },
            //  新增时间的变换
            addTimeChange(value, addTimeValue){
                this.addTimeValue = addTimeValue;
            },
            //  新增时间确认
            addTimeModalCheck(){

            },
            //  使用方法下拉
            usageMethodChangeFn(value){
                console.log(value);
                this.resetTableData();
            },

            //  重置table的数据
            resetTableData(){
                //  基础表格数据
                this.commodityTableData = [];
                //  选择时间表格数据
                this.timeTableData = [];
            }
        },
    };
</script>
<style scoped>
    @import "~@/css/custom-flex.css";
</style>
