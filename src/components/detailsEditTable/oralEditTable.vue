<template>
    <div class="layout-content-inner-main" style="padding:0;">
        <div class="table-group">
            <!--表头-->
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                <a-space>
                    <span>{{templateTypeMap[dataTitle.templateType].name}}</span>
                    <a @click="choosePlanFn">选择方案<a
                            v-if="dataTitle.energyId">(已选：{{energyMap[dataTitle.energyId].name}})</a></a>
                </a-space>
                <a-select class="lengthen-select-width" v-model="dataTitle.usageMethod" placeholder="请选择食用方法"
                          @change="usageMethodChangeFn">
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
                            <a @click="selectCommodity(true)">选择商品</a>
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
                        <div slot="uintListVos" slot-scope="scope,sItem,sIndex,extra">
                            <a-select v-if="prescriptionType===1"
                                      data-msg="院内配置"
                                      placeholder="请选择单位"
                                      style="width:100%;"
                                      v-model="sItem.checked_uname"
                                      @change="unameChangeFn(sItem,$event)"
                            >
                                <a-select-option v-for="item in sItem.uintListVos"
                                                 :value="item.uname"
                                                 :key="item.uname"
                                >
                                    {{unitTypeMap[item.uname].label}}
                                </a-select-option>
                            </a-select>
                            <p v-else>
                                <span v-for="item in sItem.uintListVos"
                                      v-if="item.id === sItem.purchaseUnitCheckId">
                                      {{unitTypeMap[item.uname].label}}
                                </span>
                            </p>
                        </div>
                        <!--单价-->
                        <div slot="unitPrice" slot-scope="scope,sItem,sIndex,extra">
                            <p v-for="item in sItem.uintListVos"
                               v-if="item.id === sItem.purchaseUnitCheckId"
                            >{{item.unitPrice}}元/{{unitTypeMap[item.uname].label}}</p>
                        </div>
                        <!--数量-->
                        <div slot="quantity" slot-scope="scope,sItem,sIndex,extra" v-if="commodityTableData.length">
                            <a-input v-if="prescriptionType===1"
                                     v-model="sItem.quantity"
                                     placeholder="请输入数量"
                                     data-msg="院内配置"
                            />
                            <a-input v-else
                                     v-model="sItem.quantity"
                                     placeholder="请输入数量"
                                     data-msg="门诊领药"
                            />
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
                            <div class="negative-margin-item">
                                <a-space size="small">
                                    <a @click="selectCommodity(false,scope.list)">选择商品</a>
                                </a-space>
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
                                    <a-input placeholder="请输入使用量"
                                             v-model="item.dosage"
                                             @input="dosageChangeFn(scope,item)"
                                    />
                                    <span v-if="prescriptionType===1" data-msg="院内配置" class="nowrap">
                                        {{unitTypeMap[item.basicUnitItem.uname].label}}
                                    </span>
                                    <span v-else data-msg="门诊领药">{{item.unitUse}}</span>
                                </a-space>
                            </div>
                            <div class="negative-margin-item" style="height:50px;"></div>
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
                            <div class="negative-margin-item" style="height:50px;"></div>
                        </div>
                    </a-table>
                </a-col>
            </a-row>
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
                    :dataTitle="dataTitle"
                    ref="refChoosePlanBox"
            />
        </a-modal>
        <!--选择商品莫泰框-->
        <a-modal v-model="commoditySelectModal"
                 v-if="commoditySelectModal"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="选择商品"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="selectCommodityModalCheck('refSelectCommodity')">
            <SelectCommodity ref="refSelectCommodity"
                             :prescriptionType="prescriptionType"
                             :timeOriginList="timeOriginList"
                             :isMainButton="isMainButton"
                             :originCommodityList="originCommodityList"
            />
        </a-modal>
        <!--选择时间莫泰框-->
        <a-modal v-model="timeSelectModal"
                 v-if="timeSelectModal"
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
    import SelectCommodity from '@/components/prescriptionTemplate/selectCommodity.vue';
    //  选择方案弹框
    import ChoosePlanBox from '@/components/detailsEditTable/choosePlanBox.vue';
    //  选择商品弹框
    import ChooseCommodityBox from '@/components/detailsEditTable/chooseCommodityBox.vue';
    import TemplateRemarkInput from '@/components/prescriptionTemplate/templateRemarkInput';
    import { templateTypeMap, usageMethodList, energyMap } from '../../utils/constants';
    import { mapGetters, mapActions } from 'vuex';
    import { requestGoodsUnitType } from '../../api/commodity/addCommodity';
    import {
        //  确认选择商品莫泰框
        selectCommodityModalCheck,
        //  获取该医院下的商品
        getGoodsListByHospital,
        //  删除选择商品表格的一行
        deleteTypeTable,
        //  确定选择的时间
        selectTimeModalCheck,
        //  选择时间
        chooseTime,
        //  选择时间的变换
        selectTimeChange,
        //  删除时间表格的一行
        deleteTimeTable,
        //  清洗时间表格数据
        clearTimeTableData,
        //  计算时间框的总行数
        rowCount,
        //  单位切换
        unameChangeFn,
        //  使用量
        dosageChangeFn,
    } from '../../utils/prescription';
    import { getLoginInfo } from '../../utils/auth';
    //  选择商品表格列的意义
    const commodityTableColumns = [
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: 150,
        },
        {
            title: '购买单位',
            dataIndex: 'uintListVos',
            width: 100,
            scopedSlots: { customRender: 'uintListVos' },
        },
        {
            title: '商品单价',
            dataIndex: 'unitPrice',
            width: 100,
            scopedSlots: { customRender: 'unitPrice' },
        },
        {
            title: '数量',
            width: 150,
            scopedSlots: { customRender: 'quantity' },
        },
        {
            title: '操作',
            width: 150,
            scopedSlots: { customRender: 'operation' },
        },
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
            SelectCommodity,
            ChoosePlanBox,
            ChooseCommodityBox,
        },
        props: ['dataTitle'],
        computed: {
            //  处方类型-处方类型 (1.院内配置,2门诊领药)
            prescriptionType(){
                const { basicInfoEditData } = this.$store.state.intervention;
                if (!basicInfoEditData) {
                    return;
                }
                return basicInfoEditData[0].prescriptionType;
            },
            //  被选中的处方-口服肠内营养补充数据
            kqcnData(){
                return this.$store.state.intervention.kqcnData;
            },
            //  被选中的处方-肠内营养支持数据
            cnyyzcData(){
                return this.$store.state.intervention.cnyyzcData;
            },
            //  单元map
            unitTypeMap(){
                return this.$store.state.constants.unitTypeMap;
            },
        },
        data(){
            const loginInfo = getLoginInfo();
            return {
                loginInfo,
                //  商品源的数据
                originCommodityList: null,
                //  选择时间表格里的选择商品按钮写入的数据
                timeOriginList: null,
                //  选择弹框是来自于主按钮？
                isMainButton: true,
                //  时间按钮操作的数据行
                addCommodityTimeList: null,

                //  处方模板类型map
                templateTypeMap,
                //	能量Map
                energyMap,
                //  选择方案弹框
                modal1: false,
                //  选择商品莫泰框
                modal2: false,

                //  食用方法下拉
                usageMethodList,
                commodityTableColumns,
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
                        width: 80,
                    },
                    {
                        title: '商品名称',
                        width: 150,
                        scopedSlots: { customRender: 'goodsName' },
                    },
                    {
                        title: '使用量',
                        width: 120,
                        scopedSlots: { customRender: 'dosage' }
                    },
                    {
                        title: '温水/ml',
                        width: 150,
                        scopedSlots: { customRender: 'warmWater' }
                    },
                    {
                        title: '操作',
                        width: 80,
                        scopedSlots: { customRender: 'operation' },
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        width: 100,
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
                commoditySelectModal: false,

                //  处方模板管理 - 增加口服肠内补充方案 - 选择时间
                timeSelectModal: false,
                //  选择时间的值的对象
                selectTimeMoment: null,
                //  选择时间的值
                selectTimeValue: null,
            };
        },
        watch: {
            //  处方类型
            prescriptionType(value){
                console.log(value);
                this.resetTableData();
                this.setPrescriptionType(value);
            }
        },
        created(){
            this.searchFn();
            console.log(JSON.parse(JSON.stringify(this.dataTitle)));
        },
        methods: {
            //  主要请求
            searchFn(){
                //  单位下拉
                requestGoodsUnitType()
                    .then(unitTypeList => {
                        this.setUnitTypeList(unitTypeList);
                    });
            },
            //  选择方案
            choosePlanFn(){
                this.modal1 = true;
            },
            //  关闭选择方案
            choosePlanModalCheck(refChoosePlanBox){
                //  去弹框组件中拿数据
                const promise = this.$refs[refChoosePlanBox].handleSubmit();
                promise.then(dataTitle => {
                    //  关闭弹框
                    this.modal1 = false;
                    const { templateType } = this.dataTitle;
                    //  1.口服；2.肠内
                    const { commodityTableData, timeTableData } = (templateType === 1 ? this.kqcnData : this.cnyyzcData);
                    console.log('被选中的方案');
                    //  console.log((JSON.stringify(commodityTableData)));
                    this.commodityTableData = commodityTableData;
                    //  console.log(JSON.parse(JSON.stringify(timeTableData)));
                    this.timeTableData = timeTableData;
                    //  console.log(JSON.parse(JSON.stringify(this.dataTitle)));
                    Object.assign(this.dataTitle, dataTitle);
                })
                    .catch(err => {
                        console.log(err);
                    });
            },

            //  选择商品，筛出多余字段
            selectCommodity(isMainButton, addCommodityTimeList){
                this.isMainButton = isMainButton;
                this.addCommodityTimeList = addCommodityTimeList;
                //  必须选择处方类型
                if (!this.prescriptionType) {
                    this.$message.error('请先选择处方类型');
                    return;
                }
                if (!this.loginInfo || !this.loginInfo.hospitalId) {
                    this.$message.error('您无权限进行此操作');
                    return;
                }
                const { hospitalId } = this.loginInfo;
                this.getGoodsListByHospital(hospitalId, isMainButton, addCommodityTimeList);
            },

            //  确认选择商品莫泰框
            selectCommodityModalCheck,
            //  获取该医院下的商品
            getGoodsListByHospital,
            //  删除选择商品表格的一行
            deleteTypeTable,
            //  确定选择的时间
            selectTimeModalCheck,
            //  选择时间
            chooseTime,
            //  选择时间的变换
            selectTimeChange,
            //  删除时间表格的一行
            deleteTimeTable,
            //  清洗时间表格数据
            clearTimeTableData,
            //  计算时间框的总行数
            rowCount,
            //  单位切换
            unameChangeFn,
            //  使用量
            dosageChangeFn,

            //  使用方法下拉                  ✅
            usageMethodChangeFn(){
                this.resetTableData();
            },
            //  重置table的数据               ✅
            resetTableData(){
                //  基础表格数据
                this.commodityTableData = [];
                //  选择时间表格数据
                this.timeTableData = [];
                //  已选的方案清空
                Object.assign(this.dataTitle, { planId: undefined, energyId: undefined });
            },

            ...mapActions('prescriptionTemplate', [
                //  设置remark的行数
                'setRowForRemark',
                //  设置商品列表数据
                'setRemark',
            ]),
            ...mapActions('constants', [
                //  设置单元数据
                'setUnitTypeList',
            ]),
            ...mapActions('intervention', [
                //  更换处方类型
                'setPrescriptionType',
            ]),
        },
    };
</script>
<style scoped>
    @import "~@/css/table.css";
</style>
