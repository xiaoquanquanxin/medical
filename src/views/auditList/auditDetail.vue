<template>
    <div class="layout-content-inner-main">
        <a-row type="flex" justify="space-between" align="middle">
            <div class="a-input-group">
                <!--返回按钮-->
                <GoBackButton/>
                <!--只有营养干预详情 、 待审核才能编辑-->
                <router-link v-if="detailType === 1 && auditStatus === 1"
                             :to="{name:'editIntervention',params:{patientId,detailId}}">
                    <a-button class="basic-button-width" type="primary">编辑</a-button>
                </router-link>
                <!--只有处方审核才有通过、驳回-->
                <a-button v-if="detailType ===2 && (auditStatus === 1||auditStatus === 3)"
                          class="basic-button-width" type="primary" @click="passFn">通过
                </a-button>
                <a-button v-if="detailType ===2 && auditStatus === 2"
                          class="basic-button-width" type="primary" @click="rejectFn">驳回
                </a-button>
            </div>
            <span data-msg="占位"></span>
            <b>状态：
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
                <span v-if="detailType === 3" data-msg="配置任务详情">
                    <span v-if="orderStatus === 1 ">待签收</span>
                    <span v-if="orderStatus === 2 ">待配置</span>
                    <span v-if="orderStatus === 3 ">已配置</span>
                    <span v-if="orderStatus === 4 ">待领取</span>
                    <span v-if="orderStatus === 5 ">已领取</span>
                </span>
            </b>
        </a-row>
        <!--基础表格-->
        <BasicInfoTable
                :data-source="basicInfoData"
        />
        <br>
        <!--口服肠内营养补充-->
        <OralLikeBasicTable
                :data-title="kqcnyybcDataTitle" :data-source="kqcnyybcCommodity"
        />
        <br>
        <!--复杂-->
        <OralLikeComplexTable
                :data-source="kqcnyybcTimeTableData"
        />
        <br>
        <!--肠内营养支持-->
        <OralLikeBasicTable
                :data-title="cnyyzcDataTitle"
                :data-source="cnyyzcCommodity"
        />
        <br>
        <!--复杂-->
        <OralLikeComplexTable
                :data-source="cnyyzcTimeTableData"
        />
        <br>
        <!--膳食营养计划-->
        <DietaryTable v-if="false"
                      :data-source="dietaryData"
        />
        <br>
        <!--能量表-->
        <EnergyTable
                :data-source="energyData"
        />
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
            switch (name) {
                case 'interventionDetail':
                    //  营养干预方案详情
                    detailType = 1;
                    break;
                case 'auditDetail':
                    //  处方审核详情
                    detailType = 2;
                    break;
                case 'configurationDetail':
                    //  配置任务详情
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
                basicInfoData: [{
                    key: 1,
                    prescriptionName: '',
                    priod: '',
                    prescriptionType: '',
                }],

                //  口服数据
                kqcnyybcDataTitle: {},
                kqcnyybcCommodity: [
//                    {
//                        key: 1,
//                        commodityName: '许晓飞123',
//                        buyer: '年',
//                        unitPrice: '吃',
//                        quantity: '¥20',
//                        subtotal: 43,
//                    }, {
//                        key: 2,
//                        commodityName: '许晓飞123',
//                        buyer: '年',
//                        unitPrice: '吃',
//                        quantity: '¥20',
//                        subtotal: 433,
//                    }
                ],
                kqcnyybcTimeTableData: [
//                    {
//                        key: 1,
//                        time: '4:00',
//                        water: 11,
//                        remark: '备注',
//                        childrenList: [
//                            {
//                                quality: 1,
//                                commodity: 'commodity1',
//                            },
//                            {
//                                quality: 2,
//                                commodity: 'commodity2',
//                            }
//                        ]
//                    },
//                    {
//                        key: 2,
//                        time: '12:00',
//                        water: 23,
//                        remark: '备注',
//                        childrenList: [
//                            {
//                                quality: 3,
//                                commodity: 'commodity3',
//                            },
//                            {
//                                quality: 4,
//                                commodity: 'commodity4',
//                            }
//                        ]
//                    },
                ],

                //  肠内数据
                cnyyzcDataTitle: {},
                cnyyzcCommodity: [
//                    {
//                        key: 1,
//                        commodityName: '许晓飞123',
//                        buyer: '年',
//                        unitPrice: '吃',
//                        quantity: '¥20',
//                        subtotal: 433,
//                    }, {
//                        key: 2,
//                        commodityName: '许晓飞123',
//                        buyer: '年',
//                        unitPrice: '吃',
//                        quantity: '¥20',
//                        subtotal: 433,
//                    }
                ],
                cnyyzcTimeTableData: [
//                    {
//                        key: 1,
//                        time: '4:00',
//                        water: 11,
//                        remark: '备注',
//                        childrenList: [
//                            {
//                                quality: 1,
//                                commodity: 'commodity1',
//                            },
//                            {
//                                quality: 2,
//                                commodity: 'commodity2',
//                            }
//                        ]
//                    },
//                    {
//                        key: 2,
//                        time: '12:00',
//                        water: 23,
//                        remark: '备注',
//                        childrenList: [
//                            {
//                                quality: 3,
//                                commodity: 'commodity3',
//                            },
//                            {
//                                quality: 4,
//                                commodity: 'commodity4',
//                            }
//                        ]
//                    },
                ],

                //  膳食营养计划数据
                dietaryData: [
                    {
                        key: 1,
                        time: '3:10',
                        content: 'xxx',
                    },
                    {
                        key: 2,
                        time: '4:10',
                        content: 'xxx',
                    }
                ],

                //  能量数据
                energyData: [{
                    key: 1,
                    energy: null,
                    protein: null,
                    fat: null,
                    carbohydrates: null,
                }],
                //  拒绝的莫泰框
                dialogReject: this.initModal(DIALOG_TYPE.REJECT),
            };
        },
        created(){
            console.log('编辑detailId', this.detailId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPrescriptionDetail(this.detailId)
                    .then(v => {
                        const { data } = v;
                        this.auditStatus = data.auditStatus;
                        this.orderStatus = data.orderStatus;
                        this.patientId = data.patientId;
                        const prescriptionDetail = JSON.parse(data.prescriptionDetail);
                        const { prescriptionName, priod, prescriptionType, } = data;
                        //  头部
                        this.basicInfoData = [{
                            key: 1,
                            prescriptionName,
                            priod,
                            prescriptionType,
                        }];
                        //  合计
                        const { energy, protein, fat, carbohydrates } = data;
                        this.energyData = [{
                            key: 1,
                            energy,
                            protein,
                            fat,
                            carbohydrates,
                        }];
                        const { cnyyzc, kqcnyybc } = prescriptionDetail;
                        const { dataTitle: kqcnyybcDataTitle, commodity: kqcnyybcCommodity, timeTableData: kqcnyybcTimeTableData } = kqcnyybc;
                        const { dataTitle: cnyyzcDataTitle, commodity: cnyyzcCommodity, timeTableData: cnyyzcTimeTableData } = cnyyzc;
                        console.log(data);
                        console.log('结果');
//                        console.log(kqcnyybcDataTitle);
//                        console.log(kqcnyybcCommodity);
//                        console.log(cnyyzcDataTitle);
//                        console.log(cnyyzcCommodity);
                        this.kqcnyybcDataTitle = kqcnyybcDataTitle;
                        this.kqcnyybcCommodity = kqcnyybcCommodity;
                        this.kqcnyybcTimeTableData = kqcnyybcTimeTableData;
                        this.cnyyzcDataTitle = cnyyzcDataTitle;
                        this.cnyyzcCommodity = cnyyzcCommodity;
                        this.cnyyzcTimeTableData = cnyyzcTimeTableData;
                        console.log(this.kqcnyybcTimeTableData);
                        console.log(this.cnyyzcTimeTableData);
                    });
            },
            //  莫泰框方法
            ...dialogMethods,

            //  通过
            passFn(){
                const { prescriptionType, prescriptionName } = this.basicInfoData[0];
                this.$confirm({
                    title: `确定通过${prescriptionName}`,
                    //  content: 'Bla bla ...',
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
                            this.$message.error('操作失败');
                        });
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.REJECT, false);
                });
            }
        }
    };
</script>