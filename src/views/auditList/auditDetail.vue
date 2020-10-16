<template>
    <div class="layout-content-inner-main">
        <a-row class="a-input-group" type="flex" justify="space-between" align="middle">
            <a-space>
                <a-button type="primary" @click="passFn">通过</a-button>
                <a-button type="primary" @click="rejectFn">驳回</a-button>
            </a-space>
            <span data-msg="占位"></span>
            <b>状态：{{2323232}}</b>
        </a-row>
        <!--基础表格-->
        <BasicInfoTable
                :data-source="basicInfoData"
        />
        <br>
        <!--口服肠内营养补充-->
        <OralLikeBasicTable
                :data-title="oralDataTitle" :data-source="oralData"
        />
        <br>
        <!--复杂-->
        <OralLikeComplexTable
                :data-source="oralComplexData"
        />
        <br>
        <!--肠内营养支持-->
        <OralLikeBasicTable
                :data-title="intestinalDataTitle" :data-source="intestinalData"
        />
        <br>
        <!--复杂-->
        <OralLikeComplexTable
                :data-source="intestinalComplexData"
        />
        <br>
        <!--膳食营养计划-->
        <DietaryTable
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
    //  类似于口服的基础数据
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

    export default {
        components: {
            BasicInfoTable,
            OralLikeBasicTable,
            OralLikeComplexTable,
            DietaryTable,
            RejectForm,
            EnergyTable,
        },
        data(){
            return {
                //  详情的id
                auditDetailId: this.$route.params.auditDetailId,

                //  基础数据
                basicInfoData: [{
                    key: 1,
                    planName: '许晓飞123',
                    cycle: '年',
                    prescriptionType: '吃',
                    cost: '¥20',
                }],

                //  口服数据
                oralDataTitle: {
                    name: '口服肠内营养补充',
                    method: '方法1',
                },
                 oralData: [
                    {
                        key: 1,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 43,
                    }, {
                        key: 2,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 433,
                    }
                ],
                oralComplexData: [
                    {
                        key: 1,
                        time: '4:00',
                        water: 11,
                        remark: '备注',
                        childrenList: [
                            {
                                quality: 1,
                                commodity: 'commodity1',
                            },
                            {
                                quality: 2,
                                commodity: 'commodity2',
                            }
                        ]
                    },
                    {
                        key: 2,
                        time: '12:00',
                        water: 23,
                        remark: '备注',
                        childrenList: [
                            {
                                quality: 3,
                                commodity: 'commodity3',
                            },
                            {
                                quality: 4,
                                commodity: 'commodity4',
                            }
                        ]
                    },
                ],

                //  肠内数据
                intestinalDataTitle: {
                    name: '肠内营养补充',
                    method: '方法3',
                },
                intestinalData: [
                    {
                        key: 1,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 433,
                    }, {
                        key: 2,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 433,
                    }
                ],
                intestinalComplexData: [
                    {
                        key: 1,
                        time: '4:00',
                        water: 11,
                        remark: '备注',
                        childrenList: [
                            {
                                quality: 1,
                                commodity: 'commodity1',
                            },
                            {
                                quality: 2,
                                commodity: 'commodity2',
                            }
                        ]
                    },
                    {
                        key: 2,
                        time: '12:00',
                        water: 23,
                        remark: '备注',
                        childrenList: [
                            {
                                quality: 3,
                                commodity: 'commodity3',
                            },
                            {
                                quality: 4,
                                commodity: 'commodity4',
                            }
                        ]
                    },
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
                    energy: 123,
                    protein: 234,
                    fat: 345,
                    carbohydrates: 456,
                }],
                //  拒绝的莫泰框
                dialogReject: this.initModal(DIALOG_TYPE.REJECT),
            };
        },
        created(){
            console.log('编辑id', this.auditDetailId);
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,

            //  通过
            passFn(){
                this.$confirm({
                    title: `确定领药${11}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
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
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.REJECT, true);
                const promise = this.$refs[refRejectForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.REJECT);
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