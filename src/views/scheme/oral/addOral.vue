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
                        <a-select-option v-for="item in hospitalList"
                                         :value="item.id">
                            {{item.hospitalName}}
                        </a-select-option>
                    </a-select>
                    <a-select class="lengthen-select-width"
                              v-model="tableForm.prescriptionType"
                              placeholder="请选择处方类型"
                              @change="selectPrescriptionChange"
                    >
                        <a-select-option v-for="item in prescriptionTypeList"
                                         :value="item.id"
                        >{{item.name}}
                        </a-select-option>
                    </a-select>
                    <a-input class="add-form-input"
                             v-model="tableForm.templateName"
                             placeholder="请输入处方模板名称"
                    />
                </a-space>
                <a-button type="primary" @click="handleSubmit">保存</a-button>
            </a-row>
        </div>
        <div class="a-input-group" data-msg="空"></div>
        <div class="table-group">
            <!--表头-->
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                <a-space>
                    <span v-for="item in templateTypeList" v-if="+templateType === item.id">{{item.name}}</span>
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
                            <a-input-number style='width:100%;'
                                            :precision="0"
                                            :min="1"
                                            v-if="prescriptionType===1"
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
                                    <a-input-number style='width:100%;'
                                                    :precision="0"
                                                    :min="1"
                                                    placeholder="请输入使用量"
                                                    v-model="item.dosage"
                                                    @change="dosageChangeFn(scope,item)"
                                    />
                                    <span v-if="prescriptionType===1" data-msg="院内配置" class="nowrap">
                                        {{unitTypeMap[item.basicUnitItem.uname].label}}
                                    </span>
                                    <span v-else data-msg="门诊领药" class="nowrap"
                                    >{{unitTypeMap[item.unitUse].label}}</span>
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
                                    <a-input-number style='width:100%;'
                                                    :precision="0"
                                                    :min="1"
                                                    placeholder="请输入温水" v-model="scope.warmWater"/>
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
        <div data-msg="说明">
            <p>1.使用量的单位：</p>
            <ol>
                <li>门诊领药：使用量单位取使用单位</li>
                <li>院内配置：使用量单位取这件商品的基本单位</li>
            </ol>
            <p>2.使用量的计算：</p>
            <ol>
                <li>门诊领药：使用量和数量随意填</li>
                <li>院内配置：使用量输入影响数量，数量输入不影响使用量；使用量自身输入优先级高；数量计算 = (时间中的使用量合计) / 单位关系</li>
            </ol>
            <p>3.此计算逻辑繁琐，如有错误文档说明</p>
            <p>4.处方模板列表接口区分templateType 有问题，故处方模板现只保存 templateType = 1 的口服肠内营养补充</p>
            <p>5.点击选择商品要调接口，会慢，将来优化</p>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
            <p>2020年11月3日</p>
            <p>1.切换门诊领药和院内配置，列表的数据重置。</p>
            <p>2.购买单位下拉。门诊领药的不能下拉；院内配置下拉只可能有商品里填写的那2/3种。</p>
            <p>3.购买单位下拉切换，右侧数量不变，因为右侧的数据总是根据基本单位计算出来的，或者手动填写。</p>
            <hr>
            <p>测试用例：【目前权鑫医院01下有4个可选商品用于测试】</p>
            <p>
                1.我已经选择了2条商品并且选择了时间，我再次选择商品【左侧主按钮】，数据新增的部分，完全不影响时间列表；数据减少的部分，时间列表中相应的数量也减少；如果此时新增时间，那么单条数据中应该出现现在商品列表中出现的商品。</p>
            <ol>
                <li>操作：</li>
                <li>点击【选择商品主按钮】并选择2条商品a、b</li>
                <li class="maybe">可能进行的操作：在商品列表里修改购买单位【下拉框】</li>
                <li>再次【选择商品主按钮】，有回显，并且展示已勾选的商品和被选择的购买单位</li>
                <li>添加一条时间，此时间会出现a、b两条数据</li>
                <li class="maybe">可能进行的操作：填写表格内的各种信息</li>
                <li>再次【选择商品主按钮】，并勾选额外的一种类型c</li>
                <li>原有的所有信息都维持不变，并且商品列表额外新增一条数据，时间列表不发生任何变动</li>
                <li>再次添加一条时间，此时间会出现a、b、c两条数据</li>
                <li>点击刚刚新增的时间的【选择商品按钮】，他现在勾选a、b、c三条数据，如果此时取消勾选a、b，那么此时间数据将仅保留c的数据。</li>
            </ol>
            <p>
                2.我选择了一些商品和一些时间数据，我的商品种类非常多，我只想给某个特定的时间新增某件商品。如果这件商品在商品列表里已存在自然不必说，相当于只给这个时间增加数据；如果上面的商品列表里没有，那就给他新增一条数据</p>
            <ol>
                <li>操作：【新的操作】</li>
                <li>我已经选择了商品a，并且选择了一条时间</li>
                <li>我点击时间的【选择商品按钮】，并且新增了数据b</li>
                <li>由于上方的商品列表里没有这个商品b，所以我要将商品b添加到上方的商品列表里。</li>
                <li>点击【选择商品主按钮】，a、b两件商品都会被勾选</li>
            </ol>
            <p>3.选择商品的添加商品按钮，对于上方商品列表已选择的商品，无论此时选择何种购买单位，都不影响上方列表原有的选择，因为如果变动，会影响别的列表选择过的商品单位。</p>
            <ol>
                <li>操作：【新的操作】</li>
                <li>我选择了商品a和购买单位【甲】，并且选择了两条时间</li>
                <li>我点击第一条时间的【选择商品按钮】，并且将商品a的购买单位改变成了【乙】，此时会修改商品列表里已选择的购买单位【甲】，如果修改会影响第二条时间数据的购买单位</li>
                <li class="red">【所以最好是时间列表里不可选购买单位】</li>
                <li class="red">这个逻辑需要测试验证配置量的计算</li>
            </ol>
            <p>4.删除按钮。商品里的删除按钮会删除时间数据里对应的商品、以及选择商品弹框的商品选择状态。时间列表里的删除按钮，仅仅影响此时间的下数据、和此时间下弹框中商品的选择状态</p>
            <ol>
                <li>操作：【新的操作】</li>
                <li>选择商品a、b、c，新增时间10点12点。</li>
                <li>删除商品a、两条时间数据里的a商品均被删除；【选择商品主按钮】弹框的数据，仅b、c处于勾选状态。</li>
                <li>删除10点下的商品b，仅10点的商品b被删除；【选择商品主按钮】弹框的数据，仅b、c处于勾选状态；10点下的【选择商品按钮】弹框里仅勾选商品c。</li>
                <li>删除12点下的商品b，此时没有任何时间数据有选择商品b，但商品数据里的b依然存在，因为新增的时间可能需要商品b。</li>
            </ol>
            <p class="red">5.配置量计算，需要测试</p>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import SelectCommodity from '@/components/prescriptionTemplate/selectCommodity.vue';
    import GoBackButton from '@/components/goBackButton.vue';
    import TemplateRemarkInput from '@/components/prescriptionTemplate/templateRemarkInput';
    import {
        requestPrescriptionTemplateGet,
        requestPrescriptionTemplateInsert,
        requestPrescriptionTemplateUpdate
    } from '../../../api/scheme/scheme';
    import { energyList, templateTypeList, usageMethodList, prescriptionTypeList } from '../../../utils/constants';
    import { requestHospitalGetList } from '../../../api/hospital';
    import {
        requestGoodsListByHospital,
    } from '../../../api/commodity/commodityList';
    import { requestGoodsUnitType } from '../../../api/commodity/addCommodity';
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
    } from '../../../utils/prescription';

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
            width: 80,
            scopedSlots: { customRender: 'quantity' },
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
            //  备注
            remark(){
                return this.$store.state.prescriptionTemplate.remark;
            },
            //  区分编辑
            templateId(){
                return this.$route.params.templateId;
            },
            //  全部单位map
            unitTypeMap(){
                return this.$store.state.constants.unitTypeMap;
            },
            //  处方模板类型 1 口服肠内 2 肠内营养 3 营养计划
            templateType(){
                const { name } = this.$route;
                switch (name) {
                    case 'addOral':
                    case 'editOral':
                        return 1;
                    case 'addIntestinal':
                    case 'editIntestinal':
                        return 2;
                    default:
                        throw new Error(`错误的路由${name}`);
                }
            },
            //  处方类型-处方类型 (1.院内配置,2门诊领药)
            prescriptionType(){
                const { prescriptionType } = this.$store.state.intervention;
                return prescriptionType;
            },
        },
        data(){
            return {
                //  商品源的数据
                originCommodityList: null,
                //  选择时间表格里的选择商品按钮写入的数据
                timeOriginList: null,
                //  选择弹框是来自于主按钮？
                isMainButton: true,
                //  时间按钮操作的数据行
                addCommodityTimeList: null,
                templateTypeList,
                //  医院下拉
                hospitalList: [],
                hospitalMap: null,
                //  能量下拉
                energyList,
                //  食用方法下拉
                usageMethodList,
                //  处方类型下拉
                prescriptionTypeList,

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
                        width: 80,
                    },
                    {
                        title: '商品名称',
                        width: 150,
                        scopedSlots: { customRender: 'goodsName' },
                    },
                    {
                        title: '使用量',
                        width: 110,
                        scopedSlots: { customRender: 'dosage' }
                    },
                    {
                        title: '操作',
                        width: 60,
                        scopedSlots: { customRender: 'operation' },
                    },
                    {
                        title: '温水/ml',
                        width: 120,
                        scopedSlots: { customRender: 'warmWater' }
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        width: 120,
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
                //  操作数据
                tableForm: {
                    //  医院
                    hospitalId: undefined,
                    //  hospitalId: 4,
                    //  医院名
                    hospitalName: undefined,
                    //  处方名
                    templateName: undefined,
                    //  处方类型-处方类型 (1.院内配置,2门诊领药)
                    prescriptionType: undefined,
                    //  能量
                    energy: undefined,
                    //  食用方法
                    usageMethod: undefined,
                },

                //  处方模板管理 - 增加口服肠内补充方案 - 选择时间
                timeSelectModal: false,
                //  选择时间的值的对象
                selectTimeMoment: null,
                //  选择时间的值
                selectTimeValue: null,
            };
        },
        created(){
            console.log(this.$route.meta.parentName);
            //  重置备注
            this.setRemark();
            this.searchFn();
            console.log('是编辑？', !!this.templateId);
        },
        methods: {
            //  主要请求
            searchFn(){
                Promise.all([
                    //  单位下拉
                    requestGoodsUnitType()
                        .then(unitTypeList => {
                            this.setUnitTypeList(unitTypeList);
                        }),
                    //  医院list
                    requestHospitalGetList()
                        .then(hospitalList => {
                            this.hospitalList = hospitalList;
                            const hospitalMap = {};
                            hospitalList.forEach(item => {
                                hospitalMap[item.id] = item;
                            });
                            this.hospitalMap = hospitalMap;
                        })
                ])
                    .then(v => {
                        //  如果是新增
                        if (!this.templateId) {
                            return;
                        }
                        //  如果是编辑
                        requestPrescriptionTemplateGet(this.templateId)
                            .then(v => {
                                const { data } = v;
                                const tableForm = this.tableForm;
                                tableForm.templateName = data.templateName;
                                tableForm.energy = data.energy;
                                tableForm.usageMethod = Number(data.usageMethod);
                                tableForm.prescriptionType = Number(data.prescriptionType);
                                this.setPrescriptionType(data.prescriptionType);
                                tableForm.hospitalId = data.hospitalId;
                                console.log(data);
                                console.log(JSON.parse(data.prescriptionContent));
                                const prescriptionContent = JSON.parse(data.prescriptionContent);
                                this.commodityTableData = prescriptionContent.commodityTableData;
                                //  console.log((JSON.stringify(prescriptionContent.commodityTableData)));
                                this.timeTableData = prescriptionContent.timeTableData;
                                const { remark } = this.timeTableData[0];
                                this.setRemark(remark);
                                return data.hospitalId;
                            })
                            .then(hospitalId => {
                                //  编辑的话需要拿一次医院的商品
                                requestGoodsListByHospital(hospitalId)
                                    .then(goodsListByHospital => {
                                        console.log('该医院下的商品：');
                                        console.log(goodsListByHospital);
                                        //  编辑的数据
                                        const _originCommodityList = Object.assign([], goodsListByHospital, this.commodityTableData);
                                        console.log('编辑的数据');
                                        console.log(JSON.parse(JSON.stringify(_originCommodityList)));
                                        this.originCommodityList = _originCommodityList;
                                    });
                            });
                    });
            },
            //  切换医院
            selectHospitalChange(value){
                //  组织医院名
                this.tableForm.hospitalName = this.hospitalMap[value].hospitalName;
                this.resetMainData();
            },
            //  切换处方类型
            selectPrescriptionChange(value){
                console.log(value);
                this.setPrescriptionType(value);
                this.resetMainData();
            },
            //  重置主要数据
            resetMainData(){
                //  重置数据
                this.commodityTableData = [];
                this.timeTableData = [];
            },
            //  选择商品，筛出多余字段
            selectCommodity(isMainButton, addCommodityTimeList){
                this.isMainButton = isMainButton;
                this.addCommodityTimeList = addCommodityTimeList;
                const {
                    hospitalId,
                } = this.tableForm;
                //  必须选择医院
                if (!hospitalId) {
                    this.$message.error('请先选择医院');
                    return;
                }
                //  必须选择处方类型
                if (!this.prescriptionType) {
                    this.$message.error('请先选择处方类型');
                    return;
                }
                this.getGoodsListByHospital(hospitalId, isMainButton, addCommodityTimeList);
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
                //  至少要输入处方模板名称
                if (!this.tableForm.templateName) {
                    this.$message.error('请输入处方模板名称');
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
                console.clear();
                //  console.log(JSON.stringify(this.tableForm));
                //  console.log(this.templateType);
                const data = Object.assign({
                    templateType: this.templateType,
                }, this.tableForm);
                console.log(JSON.parse(JSON.stringify(data)));
                (() => {
                    //  如果是新增
                    if (!this.templateId) {
                        return requestPrescriptionTemplateInsert(data);
                    }
                    data.id = this.templateId;
                    //  如果是编辑
                    return requestPrescriptionTemplateUpdate(data);
                })()
                    .then(v => {
                        console.log(v);
                        this.$message.success('操作成功');
                        this.$router.push({ name: this.$route.meta.parentName });
                    })
                    .catch(err => {
                        console.log(err);
                    });
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

        }
    };
</script>
<style scoped>
    @import "~@/css/table.css";
    
    .maybe {
        color: grey;
    }
    
    .red {
        color: red;
    }
</style>
