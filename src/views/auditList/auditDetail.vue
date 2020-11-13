<template>
    <div class="layout-content-inner-main patient-basic-info-like-wrap">
        <a-row type="flex" justify="space-between" align="middle" v-if="true">
            <div class="a-input-group">
                <!--返回按钮-->
                <GoBackButton/>
                <!--只有处方审核详情 detailType === 2，且待审核 auditStatus === 1才有通过、驳回-->
                <a-button v-if="detailType ===2 && (auditStatus === 1)"
                          class="basic-button-width" type="primary" @click="passFn">通过
                </a-button>
                <a-button v-if="detailType ===2 && auditStatus === 1"
                          class="basic-button-width" type="primary" @click="rejectFn">驳回
                </a-button>
                <a-button  v-if="payStatus === 0 && orderStatus !== 3"
                        class="basic-button-width" type="primary" @click="invalidFn">作废
                </a-button>
                <a-button v-if="!false"
                          class="basic-button-width" type="primary" v-print="printObj">打印
                </a-button>
            </div>
            <span data-msg="占位"></span>
            <span>状态：</span>
            <span v-if="detailType === 1" data-msg="营养干预方案详情">
                    <span v-if="auditStatus === 1 ">待审核</span>
                    <span v-if="auditStatus === 2 ">已审核</span>
                    <span v-if="auditStatus === 3 ">已驳回</span>
                </span>
            <span v-if="detailType === 2" data-msg="处方审核详情">
                    <span v-if="auditStatus === 1 ">待审核</span>
                    <span v-if="auditStatus === 2 ">已审核</span>
                    <span v-if="auditStatus === 3 ">已驳回</span>
                </span>
            <!--                <span v-if="detailType === 订单" data-msg="配置任务详情">-->
            <!--                    <span v-if="orderStatus === 1 ">待签收</span>-->
            <!--                    <span v-if="orderStatus === 2 ">待配置</span>-->
            <!--                    <span v-if="orderStatus === 3 ">已配置</span>-->
            <!--                    <span v-if="orderStatus === 4 ">待领取</span>-->
            <!--                    <span v-if="orderStatus === 5 ">已领取</span>-->
            <!--                </span>-->
        </a-row>
        <div class="patient-basic-info-like" v-if="true">
            <!--基础表格-->
            <BasicInfoTable
                    :data-source="basicInfoData"
            />
            <br>
            <div v-for="item in detail" v-if="true">
                <!--商品表格-->
                <OralLikeBasicTable
                        :dataSource="item"
                />
                <br>
                <!--时间表格-->
                <OralLikeComplexTable
                        :dataSource="item"
                />
                <br>
            </div>
            <!--营养干预详情和处方审核详情，才有膳食的表格-->
            <div v-if="detailType === 1 || detailType === 2">
                <!--膳食营养计划-->
                <DietaryTable
                        v-if="nutrition.length"
                        :dataSource="nutrition"
                />
                <br>
            </div>
            <!--能量表-->
            <EnergyTable
                    :totalEnergyData="totalEnergyData"
            />
        </div>
        <div class="patient-basic-info-like print-wrap" v-show="false">
            <div id="printObj" data-msg="打印营养干预">
                <a-row type="flex" justify="center">
                    <h2>营养专用处方戋</h2>
                </a-row>
                <svg id="barcode"></svg>
                <a-row type="flex" justify="space-between" align="middle" class="bottle-list">
                    <div>住院号：{{printObj.hospitalCode}}</div>
                    <div>科室：{{printObj.deptName}}</div>
                    <div>费别：自费</div>
                    <div>年&emsp;月&emsp;日</div>
                </a-row>
                <a-row type="flex" justify="space-between" align="middle" class="bottle-list">
                    <div>姓名：{{printObj.name}}</div>
                    <div>病区/床号：{{printObj.bedCode}}</div>
                    <div>联系电话：{{printObj.phone}}</div>
                    <div></div>
                </a-row>
                <a-row type="flex" justify="space-between" align="middle" class="bottle-list">
                    <div>临床诊断：{{printObj.bedCode}}</div>
                    <div>库房：营养治疗室</div>
                </a-row>
                <br>
                <div style="font-size: 36px;">R</div>
                <div v-for="item in printObj.printList" style="padding-left: 1em;">
                    <div v-for="_item in item.plain">
                        <a-row type="flex" justify="space-between" align="middle"
                               v-for="__item in _item.nutritionPlain"
                        >
                            <span>{{__item.goodsName}}</span>
                            <span>
                                {{__item.configWater}}ml x {{__item.configNum}} {{__item.configUnit}}
                            </span>
                            <span>{{__item.configWater* __item.configNum}}ml</span>
                        </a-row>
                    </div>
                    用法：
                    <div style="padding-left: 2em;width:300px;">{{item.remark}}</div>
                </div>
                <br>
                <a-row type="flex" justify="end" align="middle">
                    <span style="padding-right: 5em;">医师签字：</span>
                </a-row>
                <br>
                <div>
                    <a-row type="flex" justify="space-between" align="middle" class="allocate-list">
                        <div class="allocate-label">审核/调配</div>
                        <div class="allocate-content"></div>
                        <div class="allocate-label">核对/发放</div>
                        <div class="allocate-content"></div>
                    </a-row>
                    <a-row type="flex" justify="space-between" align="middle" class="allocate-list">
                        <div class="allocate-label">缴费</div>
                        <div class="allocate-content">{{printObj.amountPayable}}</div>
                        <div class="allocate-label">划价员</div>
                        <div class="allocate-content"></div>
                    </a-row>
                </div>
                <br>
                <a-row type="flex" justify="start" align="middle">
                    <img :src="qrcode" alt="" style="width:100px;">
                    <span style="writing-mode:lr-tb;writing-mode:tb-rl;">用药指导</span>
                    <span style="padding-left: 3em;">注：处方当日有效</span>
                </a-row>
            </div>
        </div>
        <!--驳回莫泰框-->
        <a-modal v-model="dialogReject.visible"
                 v-if="dialogReject.visible"
                 :confirm-loading="dialogReject.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="驳回"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="rejectModalCheck('refRejectForm')">
            <RejectForm ref="refRejectForm"/>
        </a-modal>
    </div>
</template>
<script>
    import qrcode from '@/assets/qrcode.jpeg';
    import { mapGetters, mapActions } from 'vuex';
    //  基础数据
    import BasicInfoTable from '@/components/detailsTable/basicInfoTable.vue';
    //  类似于口服的基础数据table
    import OralLikeBasicTable from '@/components/detailsTable/oralLikeBasicTable.vue';
    //  口服肠内营养补充，复杂表格
    import OralLikeComplexTable from '@/components/detailsTable/oralLikeComplexTable.vue';
    //  膳食营养计划
    import DietaryTable from '@/components/detailsTable/dietaryTable.vue';
    //  能量
    import EnergyTable from '@/components/detailsTable/energyTable.vue';
    //  驳回
    import RejectForm from '@/components/auditList/rejectForm.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestPrescriptionDetail } from '../../api/userList/intervention';
    import { requestPrescriptionAuditUpdate } from '../../api/auditList';
    import { requestPrescriptionCancelPrescription } from '../../api/auditList';
    import { toChinesNum } from '../../utils/amount';
    import jsbarcodeFn from 'jsbarcode';

    export default {
        components: {
            GoBackButton,
            BasicInfoTable,
            OralLikeBasicTable,
            OralLikeComplexTable,
            DietaryTable,
            RejectForm,
            EnergyTable,
            
        },
        data(){
            const { name } = this.$route;
            let detailType;
            console.log('页面name', name);
            switch (name) {
                case 'interventionDetail':
                    //  营养干预方案详情
                    detailType = 1;
                    break;
                case 'auditDetail':
                    //  处方审核详情
                    detailType = 2;
                    break;
                default:
                    throw new Error(`这是什么页面？${name}`);
            }
            return {
                //  二维码
                qrcode,
                //  审核状态(1.待审核，2，已审核，3，已驳回)
                auditStatus: null,
                //  配置状态(1.待签收，2，待配置，3.已配置，4，待领取，5，已领取)
                orderStatus: null,
                //支付状态
                payStatus:null,
                //  病人id
                patientId: null,

                //  详情的类型
                detailType,

                //  详情的id
                detailId: this.$route.params.detailId,

                //  基础数据
                basicInfoData: [{
                    key: 1,
                    prescriptionName: '',
                    priod: '',
                    prescriptionType: '',
                }],
                //  膳食营养计划数据
                nutrition: [],

                //  拒绝的莫泰框
                dialogReject: this.initModal(DIALOG_TYPE.REJECT),

                //  打印对象
                printObj: {
                    id: '#printObj',
                    popTitle: '处方详情',

                    amountPayable: undefined,
                    //  打印的主要数据
                    printList: undefined,
                },

                //  主要详情
                detail: [],

                //  商品单位下拉
                unitTypeList: [],

                //  能量表数据
                totalEnergyData: [],
            };
        },
        created(){
            //  清空能量
            this.setEnergyData(null);
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
                        this.basicInfoData = [{
                            key: 1,
                            prescriptionName,
                            priod,
                            prescriptionType,
                            executionTime,
                        }];
                        this.orderStatus = data.orderStatus;
//                      if(this.orderStatus===3){
//                      	this.auditStatus=4;
//                      }else{
//                      	this.auditStatus = data.auditStatus;
//                      }
                        this.payStatus=data.payStatus;
//                      console.log(data.payStatus+"bin"+data.orderStatus);
                        this.patientId = data.patientId;
                        
                        
                        const {
                            detail,
                            nutrition
                        } = data;
                        this.detail = JSON.parse(JSON.stringify(detail));
                        nutrition.forEach((item, index) => {
                            item.key = index;
                        });
                        //  console.log(JSON.parse(JSON.stringify(nutrition)));
                        this.nutrition = nutrition;
                        //  合计
                        const { energy, protein, fat, carbohydrates } = data;
                        this.setEnergyData(
                            {
                                key: 1,
                                energy,
                                protein,
                                fat,
                                carbohydrates,
                            }
                        );
                        //  todo    这是新版本
                        //  设置能量数据
                        this.totalEnergyData = [{
                            key: 1,
                            energy,
                            protein,
                            fat,
                            carbohydrates,
                        }];
                        //  打印
                        const printObj = this.printObj;
                        const { amountPayable, prescriptionCode } = data;
                        printObj.amountPayable = toChinesNum(amountPayable);
                        const printList = [];
                        detail.forEach(item => {
                            printList.push(JSON.parse(JSON.stringify(item)));
                        });
                        printObj.printList = printList;
                        //  console.log(JSON.parse(JSON.stringify(printList))[0]);
                        console.log(JSON.parse(JSON.stringify(data)));
                        jsbarcodeFn('#barcode', prescriptionCode, {
                            format: 'pharmacode',
                            width: 4,
                            height: 36,
                            displayValue: true
                        });
                    });
            },
            //  通过
            passFn(){
                const { prescriptionType, prescriptionName } = this.basicInfoData[0];
                this.$confirm({
                    title: `确定通过${prescriptionName}`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        const data = {
                            //  审核状态auditStatus(1.待审核，2.已审核，3.已驳回)
                            id: this.detailId,
                            auditStatus: 2,
                            prescriptionType,
                        };
                        return requestPrescriptionAuditUpdate(data)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  作废按钮操作
            invalidFn(){
                const { prescriptionType, prescriptionName } = this.basicInfoData[0];
                this.$confirm({
                    title: `确定作废${prescriptionName}`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        const data = {
                            //  审核状态auditStatus(1.待审核，2.已审核，3.已驳回)
                            id: this.detailId
                        };
                        return requestPrescriptionCancelPrescription(data)
                            .then(v => {
                                this.$message.success('操作成功');
//                              this.searchFn();
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  驳回
            rejectFn(){
                this.showModal(DIALOG_TYPE.REJECT);
            },
            //  确认驳回
            rejectModalCheck(refRejectForm){
                const { prescriptionType, prescriptionName } = this.basicInfoData[0];
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.REJECT, true);
                const promise = this.$refs[refRejectForm].handleSubmit();
                promise.then(rejectReason => {
                    this.hideModal(DIALOG_TYPE.REJECT);
                    const data = {
                        //  审核状态auditStatus(1.待审核，2.已审核，3.已驳回)
                        id: this.detailId,
                        auditStatus: 3,
                        rejectReason,
                        prescriptionType,
                    };
                    return requestPrescriptionAuditUpdate(data)
                        .then(v => {
                            this.$message.success('操作成功');
                            this.searchFn();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.REJECT, false);
                });
            },
            ...mapActions('constants', [
                //  设置单元数据
                'setUnitTypeList',
            ]),
            ...mapActions('intervention', [
                //  设置能量数据
                'setEnergyData',
            ]),
            //  莫泰框方法
            ...dialogMethods,

        }
    };
</script>
<style scoped>
    .print-wrap {
        margin: 0 auto;
        width: 500px;
    }
    
    .bottle-list {
        padding: 0.5em 0.6em;
        border-bottom: 1px solid var(--basic-border-color);
    }
    
    
    /*调配表的list*/
    .allocate-list {
        line-height: 2em;
        border-top: 1px solid var(--basic-border-color);
    }
    
    .allocate-list:last-child {
        border-bottom: 1px solid var(--basic-border-color);
    }
    
    /*调配表的label*/
    .allocate-label {
        width: 100px;
        padding-left: 0.4em;
        border-left: 1px solid var(--basic-border-color);
        border-right: 1px solid var(--basic-border-color);
    }
    
    .allocate-label:first-child {
        border-left: none;
    }
    
    /*内容*/
    .allocate-content {
        flex: 1;
        padding-left: 0.4em;
    }
</style>