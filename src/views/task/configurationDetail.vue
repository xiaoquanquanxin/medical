<template>
    <div class="layout-content-inner-main patient-basic-info-like-wrap">
        <a-row type="flex" justify="space-between" align="middle">
            <div class="a-input-group">
                <!--返回按钮-->
                <GoBackButton/>
                <a-button v-if="detailType === 1"
                          class="basic-button-width"
                          type="primary" v-print="printObj">打印配置单
                </a-button>
            </div>
        </a-row>
        <div class="patient-basic-info-like">
            <!--基础表格-->
            <ConfigDetailBasicInfo
                    :dataSource="basicInfoData"
            />
            <br>
            <div v-if="detailType === 1">
                <!--肠内-->
                <ConfigDetailTimeTable
                        :templateType="2"
                        v-if="enteralNutrition"
                        :dataSource="enteralNutrition"
                        :dataForPrint="basicInfoData"
                />
                <!--口服肠内-->
                <ConfigDetailTimeTable
                        :templateType="1"
                        v-if="oralIntraintestinal"
                        :dataSource="oralIntraintestinal"
                        :dataForPrint="basicInfoData"
                />
            </div>
            <!--领药商品列表-->
            <DrugCommodityListTable
                    v-if="detailType === 2 && drugDetailList.length"
                    :dataSource="drugDetailList"
            />
            <br>
        </div>
        <div class="print-wrap" v-show="true">
            <div id="printContent" data-msg="打印配置单">
                <h2 type="flex" justify="center" align="middle">营养专用配置单</h2>
                <a-row type="flex" justify="space-between" align="middle">
                    <div>配置医院：{{printObj.hospitalName}}</div>
                    <div>配置日期：{{printObj.orderTime}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">住院号：{{printObj.hospitalCode}}</div>
                    <div class="config-basic-item">姓名：{{printObj.name}}</div>
                    <div class="config-basic-item">性别：{{printObj.sex}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">科室：{{printObj.deptName}}</div>
                    <div class="config-basic-item">病区/床位：{{printObj.bedCode}}</div>
                    <div class="config-basic-item">电话：{{printObj.phone}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item"><b>营养干预方案</b></div>
                    <div>{{printObj.prescriptionName}}</div>
                </a-row>
                <div class="config-table">
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>序号</b></div>
                        <div class="list-in-table"
                             v-for="item in printObj.configList"
                             :key="item.key"
                        >{{item.key}}
                        </div>
                    </div>
                    <div class="config-table-columns" style="width:25%;">
                        <div class="list-in-table"><b>营养产品名称</b></div>
                        <div v-for="(item,index) in printObj.configList">
                            <p :class="
                            !((index+1===printObj.configList.length) && (_index+1===item.goodsList.length))
                            ? 'list-border-bottom list-in-table':'list-in-table'"
                               v-for="(_item,_index) in item.goodsList">
                                {{_item.goodsName}}
                            </p>
                        </div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>用量</b></div>
                        <div v-for="(item,index) in printObj.configList">
                            <p :class="
                            !((index+1===printObj.configList.length) && (_index+1===item.goodsList.length))
                            ? 'list-border-bottom list-in-table':'list-in-table'"
                               v-for="(_item,_index) in item.goodsList">
                                {{_item.quantity}}
                            </p>
                        </div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>温水</b></div>
                        <div class="list-in-table" v-for="item in printObj.configList">
                            {{item.configWater}}
                        </div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>时间</b></div>
                        <div class="list-in-table" v-for="item in printObj.configList">
                            {{item.usageTime}}
                        </div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>备注</b></div>
                        <div v-for="(item,index) in printObj.configList">
                            <p :class="
                            !((index+1===printObj.configList.length) && (_index+1===item.goodsList.length))
                            ? 'list-border-bottom list-in-table':'list-in-table'"
                               v-for="(_item,_index) in item.goodsList">
                                {{_item.remark}}
                            </p>
                        </div>
                    </div>
                </div>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">医生：{{printObj.doctorName}}</div>
                    <div class="config-basic-item">处方日期：{{printObj.orderTime}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">配置员：{{printObj.configurator}}</div>
                    <div class="config-basic-item">领货人：{{printObj._name}}</div>
                </a-row>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
    //  基础数据
    import ConfigDetailBasicInfo from '@/components/detailsTable/configDetailBasicInfo.vue';
    //  时间表格
    import ConfigDetailTimeTable from '@/components/detailsTable/configDetailTimeTable.vue';
    //  领药列表
    import DrugCommodityListTable from '@/components/detailsTable/drugCommodityListTable.vue';
    import GoBackButton from '@/components/goBackButton.vue';
    import {
        requestPrescriptionConfigConfirmDetail,
        requestPrescriptionConfigGetMedicineDetails
    } from '../../api/task/configuration';

    export default {
        components: {
            GoBackButton,
            ConfigDetailBasicInfo,
            ConfigDetailTimeTable,
            DrugCommodityListTable,
        },
        data(){
            const { name } = this.$route;
            let detailType;
            switch (name) {
                case 'configurationDetail':
                    //  配置任务详情
                    detailType = 1;
                    break;
                case 'getDrugDetail':
                    //  领药任务详情
                    detailType = 2;
                    break;
                default:
                    throw new Error(`这是什么页面？${name}`);
            }
            //  console.log('页面name', name);
            return {
                //  详情的类型
                detailType,

                //  详情的id
                detailId: this.$route.params.detailId,
                //  基础数据
                basicInfoData: {
                    name: undefined,
                    sex: undefined,
                    deptName: undefined,
                    bedCode: undefined,
                    doctorName: undefined,
                    orderTime: undefined,
                },
                //  打印配置单
                printObj: {
                    id: '#printContent',
                    popTitle: '配置单',
                    hospitalName: '配置医院配置医院',
                    name: '姓名姓名',
                    sex: '性别性别',
                    deptName: '科室科室',
                    hospitalCode: '住院号住院号',
                    bedCode: '床位床位',
                    phone: '电话电话',
                    prescriptionName: '营养干预方案',
                    doctorName: '医生医生',
                    orderTime: '处方日期处方日期',
                    configurator: '配置员配置员',
                    _name: '领货人领货人',
                    //  打印配置单的主体数据
                    configList: null,
                },
                //  肠内
                enteralNutrition: null,
                //  口服肠内
                oralIntraintestinal: null,
                //  领药详情
                drugDetailList: [],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                if (this.detailType === 1) {
                    //  配置详情
                    requestPrescriptionConfigConfirmDetail(this.detailId)
                        .then(v => {
                            const { data } = v;
                            const { name, sex, deptName, bedCode, doctorName, orderTime } = data;
                            //  头部
                            Object.assign(this.basicInfoData, {
                                name,
                                sex,
                                deptName,
                                bedCode,
                                doctorName,
                                orderTime
                            });
                            const { enteralNutrition, oralIntraintestinal, } = data;
                            //  肠内和口服肠内
                            if (enteralNutrition && enteralNutrition.length) {
                                this.enteralNutrition = JSON.parse(JSON.stringify(enteralNutrition));
                            }
                            if (oralIntraintestinal && oralIntraintestinal.length) {
                                this.oralIntraintestinal = JSON.parse(JSON.stringify(oralIntraintestinal));
                            }

                            const { hospitalCode, phone, prescriptionName, } = data;
                            //  打印配置单
                            Object.assign(this.printObj, {
                                orderTime,
                                name,
                                sex,
                                deptName,
                                hospitalCode,
                                bedCode,
                                phone,
                                //  prescriptionName,
                                doctorName,
                            });
                            console.log('全部详情');
                            console.log(JSON.parse(JSON.stringify(data)));
                            //  打印
                            const _enteralNutrition = JSON.parse(JSON.stringify(enteralNutrition));
                            _enteralNutrition.forEach(item => {
                                const { remark } = item;
                                item.goodsList.forEach(_item => {
                                    _item.remark = remark;
                                });
                            });
                            const _oralIntraintestinal = JSON.parse(JSON.stringify(oralIntraintestinal));
                            _oralIntraintestinal.forEach(item => {
                                const { remark } = item;
                                item.goodsList.forEach(_item => {
                                    _item.remark = remark;
                                });
                            });
                            const configList = [].concat(_enteralNutrition).concat(_oralIntraintestinal);
                            configList.forEach((item, index) => {
                                item.key = (index + 1);
                            });
                            console.log(JSON.parse(JSON.stringify(configList)));
                            //  打印配置
                            this.printObj.configList = configList;

                            //  门诊领药
                            const drugDetailList = [];
                            configList.forEach(item => {
                                item.goodsList.forEach(_item => {
                                    drugDetailList.push(_item);
                                });
                            });
                            this.drugDetailList = drugDetailList;
                            this.$forceUpdate();
                        });
                }
                if (this.detailType === 2) {
                    //  领药详情
                    requestPrescriptionConfigGetMedicineDetails(this.detailId)
                        .then(v => {

                        })
                        .catch(err => {
                            alert('领药接口报错');
                        });
                }
            },
        }
    };
</script>
<style scoped>
    .print-wrap {
        margin: 20px auto;
        width: 600px;
    }
    
    .config-basic-list {
        padding: 0.4em 0.6em;
        border-top: 1px solid var(--basic-border-color) !important;
        border-left: 1px solid var(--basic-border-color) !important;
        border-right: 1px solid var(--basic-border-color) !important;
    }
    
    .config-basic-item {
        width: 33%;
    }
    
    /*配置中间的表格*/
    .config-table {
        display: flex;
        flex-wrap: wrap;
        border-right: 1px solid var(--basic-border-color);
    }
    
    .config-table:after {
        content: '';
        flex-grow: 99999;
    }
    
    .config-table-columns {
        flex-grow: 1;
        box-sizing: border-box;
        border-left: 1px solid var(--basic-border-color);
        border-top: 1px solid var(--basic-border-color);
    }
    
    .list-in-table {
        padding: 0.4em 0.6em;
        line-height: 21px;
        height: 21px;
        box-sizing: content-box;
    }
    
    .list-in-table:not(:last-child) {
        border-bottom: 1px solid var(--basic-border-color);
    }
    
    .list-border-bottom {
        border-bottom: 1px solid var(--basic-border-color);
    }
</style>