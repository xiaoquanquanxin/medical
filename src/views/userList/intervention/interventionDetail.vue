<template>
    <div class="layout-content-inner-main">
        <a-space>
            <a-button type="primary" @click="passFn">编辑</a-button>
            <a-button type="primary" v-print="printObj">打印</a-button>
        </a-space>
        <div id="printContent">
            <a-row class="a-input-group" type="flex" justify="space-between" align="middle">
                <span data-msg="占位"></span>
                <b>状态：{{2323232}}</b>
            </a-row>
            <!--基础表格-->
            <BasicInfoTable/>
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
            <EnergyTable/>
        </div>
    </div>
</template>
<script>
    //  基础数据
    import BasicInfoTable from '@/components/detailsTable/basicInfoTable.vue';
    //  类似于口服的基础数据
    import OralLikeBasicTable from '@/components/detailsTable/oralLikeBasicTable.vue';
    //  口服肠内营养补充，复杂表格
    import OralLikeComplexTable from '@/components/detialsComplexTable/oralLikeComplexTable.vue';
    //  膳食营养计划
    import DietaryTable from '@/components/detailsTable/dietaryTable.vue';
    //  能量
    import EnergyTable from '@/components/detailsTable/energyTable.vue';
    //  打印
    import RejectForm from '@/components/auditList/rejectForm.vue';
    import { mapGetters, mapActions } from 'vuex';

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
                interventionId: this.$route.params.interventionId,
                //  病人的id
                patientInfoId: this.$route.params.patientInfoId,
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
                        quantity: '¥20'
                    }, {
                        key: 2,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20'
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
                        quantity: '¥20'
                    }, {
                        key: 2,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20'
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

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '方案详情',
                },
            };
        },
        created(){
            console.log('参数', this.$route.params);
            //  设置基础信息数据
            this.setBasicInfoDetail([{
                key: 1,
                planName: '许晓飞123',
                cycle: '年',
                prescriptionType: '吃',
                cost: '¥20',
            }]);
            //  设置能量表数据
            this.setEnergyDetail([{
                key: 1,
                energy: 123,
                protein: 234,
                fat: 345,
                carbohydrates: 456,
            }]);
        },
        methods: {
            ...mapActions('detailsTable', [
                //  设置基础信息数据
                'setBasicInfoDetail',
                //  设置能量表数据
                'setEnergyDetail',
            ]),

            //  编辑
            passFn(){

            },
            //  打印
            rejectFn(){
                this.showModal(DIALOG_TYPE.REJECT);
            },
        }
    };
</script>