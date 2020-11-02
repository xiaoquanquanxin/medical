<template>
    <div class="layout-content-inner-main">
        <!--返回按钮-->
        <div class="a-input-group">
            <GoBackButton/>
        </div>
        <div class="a-input-group">
            <a-row type="flex" justify="space-between" align="middle">
                <a-space>
                    <a-select class="add-form-input"
                              v-model="tableForm.hospitalId"
                              placeholder="请选择医院"
                              @change="selectHospitalChange"
                    >
                        <a-select-option v-for="(item,index) in hospitalList"
                                         :value="item.id"
                        >{{item.hospitalName}}
                        </a-select-option>
                    </a-select>
                    <a-select class="lengthen-select-width"
                              v-model="tableForm.prescriptionType"
                              placeholder="请选择处方类型"
                              @change="selectPrescriptionChange"
                    >
                        <a-select-option value="1">院内配置</a-select-option>
                        <a-select-option value="2">门诊领药</a-select-option>
                    </a-select>
                </a-space>
                <a-button type="primary" @click="handleSubmit">保存</a-button>
            </a-row>
        </div>
        <div class="a-input-group" data-msg="空"></div>
        <div class="table-group">
            <!--表头-->
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                <a-space>
                    <span>肠内营养支持</span>
                    <!--@change="selectEnergyChange"-->
                    <a-select
                            class="basic-select-width"
                            v-model="tableForm.energy"
                            placeholder="请选择能量"
                    >
                        <a-select-option :value="item.id"
                                         :key="index"
                                         v-for="(item,index) in energyList"
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
                                     :key="index"
                                     v-for="(item,index) in usageMethodList"
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
                        <div slot="uintListVos" slot-scope="scope,sItem,sIndex,extra">
                            <p v-for="(item,index) in sItem.uintListVos"
                               v-if="item.id === sItem.purchaseUnitCheckId"
                            >{{unitTypeMap[item.uname].label}}</p>
                        </div>
                        <!--单价-->
                        <div slot="unitPrice" slot-scope="scope,sItem,sIndex,extra">
                            <p v-for="(item , index) in sItem.uintListVos"
                               :key="index"
                               v-if="item.id === sItem.purchaseUnitCheckId"
                            >{{item.unitPrice}}元/{{unitTypeMap[item.uname].label}}</p>
                        </div>
                        <!--数量-->
                        <div slot="quantity" slot-scope="scope,sItem,sIndex,extra">
                            <a-input v-model="sItem.quantity" placeholder="请输入数量"/>
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
                                    <span v-if="+tableForm.prescriptionType===1" data-msg="院内配置">
                                        {{scope}}
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        {{scope.list}}
<!--                                        ⚠️⚠️⚠️-->
                                        <!--                                        {{unitTypeMap[item.uname].label}}-->
                                        {{unitTypeMap[scope.list[0].uname].label}}
                                    </span>
                                    <!--<span v-else>{{scope.list[0]}}</span>-->
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
        <!--选择商品莫泰框-->
        <a-modal v-model="dialogDataSelectCommodity.visible"
                 v-if="dialogDataSelectCommodity.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="选择商品"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="selectCommodityModalCheck('refSelectCommodity')">
            <SelectCommodity ref="refSelectCommodity"
                             :prescription-type="tableForm.prescriptionType"
            />
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
    import {
        requestPrescriptionTemplateGet,
        requestPrescriptionTemplateInsert,
        requestPrescriptionTemplateUpdate
    } from '../../../api/scheme/scheme';
    import { prescriptionTypeList, energyList, usageMethodList } from '../../../utils/constants';
    import { requestHospitalGetList } from '../../../api/hospital';
    import {
        requestGoodsListByHospital,
    } from '../../../api/commodity/commodityList';
    import { requestGoodsUnitType } from '../../../api/commodity/addCommodity';

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
            dataIndex: 'quantity',
            width: 150,
            scopedSlots: { customRender: 'quantity' },
        },
        {
            title: '操作',
            width: 150,
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
            },
            //  单元map
            unitTypeMap(){
                return this.$store.state.constants.unitTypeMap;
            }
        },
        data(){
            return {
                //  医院下拉
                hospitalList: [],
                hospitalMap: null,
                //  处方类型下拉
                //  prescriptionTypeList,
                //  能量下拉
                energyList,
                //  食用方法下拉
                usageMethodList,

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
                dialogDataSelectCommodity: this.initModal(DIALOG_TYPE.TEMPLATE_SELECT_COMMODITY),
                //  处方模板管理 - 增加口服肠内补充方案 - 选择时间
                dialogDataSelectTime: this.initModal(DIALOG_TYPE.TEMPLATE_SELECT_TIME),

                //  表单中表格的数据
                tableForm: {
                    //  医院
                    hospitalId: undefined,
                    //  医院名
                    hospitalName: undefined,
                    //  处方名
                    prescriptionName: undefined,
                    //  处方类型
                    prescriptionType: undefined,
                    //  能量
                    energy: undefined,
                    //  食用方法
                    usageMethod: undefined,
                },

                //  选择时间的值的对象
                selectTimeMoment: null,
                //  选择时间的值
                selectTimeValue: null,
            };
        },
        created(){
            this.searchFn();
            console.log('是编辑？', !!this.oralId);
        },
        methods: {
            //  主要请求
            searchFn(){
                //  单位下拉
                requestGoodsUnitType()
                    .then(unitTypeList => {
                        this.setUnitTypeList(unitTypeList);
                    });
                //  医院list
                requestHospitalGetList()
                    .then(hospitalList => {
                        this.hospitalList = hospitalList;
                        const hospitalMap = {};
                        hospitalList.forEach(item => {
                            hospitalMap[item.id] = item;
                        });
                        this.hospitalMap = hospitalMap;
                    });
                //  如果是新增
                if (!this.oralId) {
                    return;
                }
                //  如果是编辑
                requestPrescriptionTemplateGet(this.oralId)
                    .then(v => {
                        const { data } = v;
                        const tableForm = this.tableForm;
                        tableForm.prescriptionName = data.prescriptionName;
                        tableForm.energy = data.energy;
                        tableForm.usageMethod = Number(data.usageMethod);
                        tableForm.prescriptionType = data.prescriptionType;
                        tableForm.hospitalId = data.hospitalId;
                        console.log(data);
                        console.log(JSON.parse(data.prescriptionContent));
                        const prescriptionContent = JSON.parse(data.prescriptionContent);
                        this.commodityTableData = prescriptionContent.commodityTableData;
                        this.timeTableData = prescriptionContent.timeTableData;
                        const { remark } = this.timeTableData[0];
                        this.setRemark(remark);
                        return data.hospitalId;
                    })
                    .then(hospitalId => {
                        //  拿一次医院的商品
                        requestGoodsListByHospital(hospitalId)
                            .then(v => {
                                console.log('该医院下的商品：');
                                if (!v.data || !v.data) {
                                    return;
                                }
                                v.data.forEach(item => {
                                    item.key = item.id;
                                });
                                const originCommodityList = v.data;
                                //  编辑的数据
                                const _originCommodityList = Object.assign([], originCommodityList, this.commodityTableData);
                                console.log('编辑的数据');
                                console.log(JSON.parse(JSON.stringify(_originCommodityList)));
                                this.setOriginCommodityList(originCommodityList);
                            });
                    });
            },
            //  切换医院
            selectHospitalChange(value){
                //  组织医院名
                this.tableForm.hospitalName = this.hospitalMap[value];
                this.resetMainData();
            },
            //  切换处方类型
            selectPrescriptionChange(){
                this.resetMainData();
            },
            //  重置主要数据
            resetMainData(){
                //  重置数据
                this.commodityTableData = [];
                this.timeTableData = [];
            },
            //  选择商品
            selectCommodity(){
                const {
                    hospitalId,
                    prescriptionType,
                } = this.tableForm;
                //  必须选择医院
                if (!hospitalId) {
                    this.$message.error('请先选择医院');
                    return;
                }
                //  必须选择处方类型
                if (!prescriptionType) {
                    this.$message.error('请先选择处方类型');
                    return;
                }
                requestGoodsListByHospital(hospitalId)
                    .then(v => {
                        const originCommodityList = [];
                        v.data.forEach(item => {
                            item.key = item.id;
                            item.uintListVos = item.uintListVos.filter(_item => {
                                return _item.type === +prescriptionType;
                            });
                            originCommodityList.push(item);
                        });
                        this.setOriginCommodityList(originCommodityList);
                        this.showModal(DIALOG_TYPE.TEMPLATE_SELECT_COMMODITY);
                    });
            },
            //  确认选择商品莫泰框
            selectCommodityModalCheck(refSelectCommodity){
                const promise = this.$refs[refSelectCommodity].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.TEMPLATE_SELECT_COMMODITY);
                    //  console.log('源数据', JSON.stringify(this.originCommodityList));
                    //  只展示被选中的
                    this.commodityTableData = this.originCommodityList.filter(item => item.isCheckboxChecked);
                    //  重置时间表格数据
                    this.timeTableData = [];
                    //  清除备注
                    this.setRemark('');
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
                const commodityTableData = JSON.parse(JSON.stringify(this.commodityTableData));
                //  子列表数据
                const list = commodityTableData.map(item => {
                    const child = item.uintListVos.filter((_item) => {
                        //  console.log(_item.isRadioChecked);
                        return _item.isRadioChecked;
                    });
                    //  console.log(child);
                    return Object.assign(child[0], { goodsName: item.goodsName });
                });
                //  console.log(list);

                //  console.log(JSON.parse(JSON.stringify(this.timeTableData)));
                //  时间的最后一条数据
                const timeTableDataLastItem = this.timeTableData[this.timeTableData.length - 1] || { key: 0 };
                console.log(timeTableDataLastItem);
                //  一条数据
                const data = {
                    //  key
                    key: timeTableDataLastItem.key + 1,
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
                const { purchaseUnitCheckId } = sItem;
                //  洗主数据
                delete sItem.purchaseUnitCheckId;
                delete sItem.isCheckboxChecked;
                sItem.uintListVos.forEach((item => {
                    if (item.isRadioChecked) {
                        delete item.isRadioChecked;
                    }
                }));
                //  清洗时间表格数据，只删除一行
                this.timeTableData.forEach(item => {
                    for (let i = 0; i < item.list.length; i++) {
                        //  要被删除的商品类型
                        if (item.list[i].id === purchaseUnitCheckId) {
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

            //  表单验证
            basicFormCheck(){
                //  至少要选择商品
                if (!this.commodityTableData.length) {
                    this.$message.error('请选择商品');
                    return false;
                }
                //  至少要选择时间
                if (!this.timeTableData.length) {
                    this.$message.error('请选择时间');
                    return false;
                }
                //  至少要选择能量
                if (!this.tableForm.energy) {
                    this.$message.error('请选择能量');
                    return false;
                }
                //  至少要选择食用方法
                if (!this.tableForm.usageMethod) {
                    this.$message.error('请选择食用方法');
                    return false;
                }
                return true;
            },
            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                if (!this.basicFormCheck()) {
                    return;
                }
                this.timeTableData.forEach(item => {
                    item.remark = this.remark;
                });
                //  console.log(JSON.parse(JSON.stringify(this.timeTableData)));
                const prescriptionContent = {
                    commodityTableData: this.commodityTableData,
                    timeTableData: this.timeTableData,
                };
                this.tableForm.prescriptionContent = JSON.stringify(prescriptionContent);
                //  console.log(JSON.parse(JSON.stringify(this.tableForm)));
                console.log(prescriptionContent);
                console.log(JSON.stringify(prescriptionContent));
                (() => {
                    //  如果是新增
                    if (!this.oralId) {
                        return requestPrescriptionTemplateInsert(this.tableForm);
                    }
                    //  如果是编辑
                    return requestPrescriptionTemplateUpdate(Object.assign({}, this.tableForm, { id: this.oralId }));
                })()
                    .then(v => {
                        console.log(v);
                        this.$message.success('操作成功');
                        this.$router.push({ name: 'scheme' });
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },

            //  时间选择器的方法
            moment,
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('prescriptionTemplate', [
                //  处方模板，请求选择商品的源数据
                'setOriginCommodityList',
                //  设置remark的行数
                'setRowForRemark',
                //  设置商品列表数据
                'setRemark',
            ]),
            ...mapActions('constants', [
                //  设置单元数据
                'setUnitTypeList',
            ]),
        }
    };
</script>
<style scoped>
    @import "~@/css/table.css";
    
    .layout-content-inner-main {
        min-width: 900px;
    }
    
    .col-right {
        border-left: 1px solid #e8e8e8;
    }
</style>
