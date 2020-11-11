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
        <div class="patient-basic-info-like" v-show="true">
            <!--基础表格-->
            <ConfigDetailBasicInfo
                    :dataSource="basicInfoData"
            />
            <br>
            <div v-for="item in detail" v-if="true">
                <!--时间表格-->
                <ConfigDetailTimeTable
                        :dataSource="item"
                />
                <br>
            </div>
        </div>
        <div class="print-wrap" v-show="false">
            <div id="printContent" data-msg="打印配置单">
                <h2 type="flex" justify="center" align="middle">营养专用配置单</h2>
                <a-row type="flex" justify="space-between" align="middle">
                    <div>配置医院：xxx</div>
                    <div>配置日期：xxxx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">住院号：xxx</div>
                    <div class="config-basic-item">姓名：xxxx</div>
                    <div class="config-basic-item">性别：xxxx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">科室：xxx</div>
                    <div class="config-basic-item">病区/床位：xxxx</div>
                    <div class="config-basic-item">电话：xxxx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item"><b>营养干预方案</b></div>
                    <div>干预第 1 天 ；第 1 / 5 人次</div>
                </a-row>
                <div class="config-table">
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>序号</b></div>
                        <div class="list-in-table">1</div>
                        <div class="list-in-table">2</div>
                        <div class="list-in-table">3</div>
                    </div>
                    <div class="config-table-columns" style="width:25%;">
                        <div class="list-in-table"><b>营养产品名称</b></div>
                        <div class="list-in-table">1</div>
                        <div class="list-in-table">2</div>
                        <div class="list-in-table">3</div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>用量</b></div>
                        <div class="list-in-table">1</div>
                        <div class="list-in-table">2</div>
                        <div class="list-in-table">3</div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>温水</b></div>
                        <div class="list-in-table">100ml</div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>时间</b></div>
                        <div class="list-in-table">10:03</div>
                    </div>
                    <div class="config-table-columns" style="width:15%;">
                        <div class="list-in-table"><b>备注</b></div>
                        <div class="list-in-table">备注。。</div>
                    </div>
                </div>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">医生：xxx</div>
                    <div class="config-basic-item">处方日期</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="config-basic-list">
                    <div class="config-basic-item">配置员：xxx</div>
                    <div class="config-basic-item">领货人：xxxx</div>
                </a-row>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    //  基础数据
    import ConfigDetailBasicInfo from '@/components/detailsTable/configDetailBasicInfo.vue';
    //  时间表格
    import ConfigDetailTimeTable from '@/components/detailsTable/configDetailTimeTable.vue';
    //  膳食营养计划
    import DietaryTable from '@/components/detailsTable/dietaryTable.vue';
    //  驳回
    import RejectForm from '@/components/auditList/rejectForm.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestPrescriptionDetail } from '../../api/userList/intervention';

    export default {
        components: {
            GoBackButton,
            ConfigDetailBasicInfo,
            ConfigDetailTimeTable,
            DietaryTable,
            RejectForm,
        },
        data(){
            const { name } = this.$route;
            let detailType;
            console.log('页面name', name);
            switch (name) {
                case 'configurationDetail':
                    //  配置任务详情
                    detailType = 1;
                    break;
                case 'getDrugDetail':
                    //  领药任务详情
                    detailType = 2;
                    break;
                case  'costDetail':
                    //  收计费详情
                    detailType = 3;
                    break;
                default:
                    throw new Error(`这是什么页面？${name}`);
            }
            return {
                //  审核状态(1.待审核，2，已审核，3，已驳回)
                auditStatus: null,
                //  配置状态(1.待签收，2，待配置，3.已配置，4，待领取，5，已领取)
                orderStatus: null,
                //  病人id
                patientId: null,

                //  详情的类型
                detailType,

                //  详情的id
                detailId: this.$route.params.detailId,

                //  基础数据
                basicInfoData: {},
                //  膳食营养计划数据
                nutrition: [],

                //  拒绝的莫泰框
                dialogReject: this.initModal(DIALOG_TYPE.REJECT),

                //  打印配置单
                printObj: {
                    id: '#printContent',
                    popTitle: '配置单',
                },

                //  主要详情
                detail: [],

                //  商品单位下拉
                unitTypeList: [],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPrescriptionDetail(this.detailId)
                    .then(v => {
                        const { data } = v;
                        const {
                            prescriptionName,
                            priod,
                            prescriptionType,
                            executionTime,
                        } = data;

                        //  头部
                        this.basicInfoData = {};
                        this.auditStatus = data.auditStatus;
                        this.orderStatus = data.orderStatus;
                        this.patientId = data.patientId;
                        const {
                            detail,
                            nutrition
                        } = data;
                        this.detail = detail;
                        nutrition.forEach((item, index) => {
                            item.key = index;
                        });
                        //  console.log(JSON.parse(JSON.stringify(nutrition)));
                        this.nutrition = nutrition;
                        //  合计
//                        const { energy, protein, fat, carbohydrates } = data;
//                        this.setEnergyData(
//                            {
//                                key: 1,
//                                energy,
//                                protein,
//                                fat,
//                                carbohydrates,
//                            }
//                        );
                        //  todo    这是新版本
                        //  设置能量数据
//                        this.totalEnergyData = [{
//                            key: 1,
//                            energy,
//                            protein,
//                            fat,
//                            carbohydrates,
//                        }];
                        console.log(JSON.parse(JSON.stringify(data)));
                    });
            },

            ...mapActions('constants', [
                //  设置单元数据
                'setUnitTypeList',
            ]),
//            ...mapActions('intervention', [
            //  设置能量数据
//                'setEnergyData',
//            ]),
            //    莫泰框方法
            ...dialogMethods,

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
    }
    
    .list-in-table:not(:last-child) {
        border-bottom: 1px solid var(--basic-border-color);
    }
</style>