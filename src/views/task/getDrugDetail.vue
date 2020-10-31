<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
            <a-button class="basic-button-width" type="primary" v-print="printObj">打印</a-button>
        </div>
        <div id="printContent">
            <a-row type="flex" justify="end" align="middle">
                <b>状态：{{2323232}}</b>
            </a-row>
            <br>
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
            <!--能量表-->
            <EnergyTable
                    :data-source="energyData"
            />
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
    //  基础数据
    import BasicInfoTable from '@/components/detailsTable/basicInfoTable.vue';
    //  类似于口服的基础数据table
    import OralLikeBasicTable from '@/components/detailsTable/oralLikeBasicTable.vue';
    //  口服肠内营养补充，复杂表格
    import OralLikeComplexTable from '@/components/detailsTable/oralLikeComplexTable.vue';
    //  能量
    import EnergyTable from '@/components/detailsTable/energyTable.vue';
    //  驳回
    import RejectForm from '@/components/auditList/rejectForm.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import GoBackButton from '@/components/goBackButton.vue';

    export default {
        components: {
            GoBackButton,
            BasicInfoTable,
            OralLikeBasicTable,
            OralLikeComplexTable,
            RejectForm,
            EnergyTable,
        },
        data(){
            return {
                //  详情的id
                configurationDetailId: this.$route.params.configurationDetailId,

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

                //  能量数据
                energyData: [{
                    key: 1,
                    energy: 123,
                    protein: 234,
                    fat: 345,
                    carbohydrates: 456,
                }],

                //  缴费莫泰框
                dialogReject: this.initModal(DIALOG_TYPE.REJECT),

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '领药任务',
                },
            };
        },
        created(){
            console.log('编辑id', this.configurationDetailId);
        },
        created(){
            this.searchFn();
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
            //  莫泰框方法
            ...dialogMethods,

            //  通过
            passFn(){
                this.$confirm({
                    title: `确定领药${11}`,
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