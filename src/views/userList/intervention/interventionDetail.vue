<template>
    <div class="layout-content-inner-main">
        <a-space>
            <router-link :to="{name:'editIntervention'}">
                <a-button type="primary">编辑</a-button>
            </router-link>
            <a-button type="primary" v-print="printObj">打印</a-button>
        </a-space>
        <div id="printContent">
            <a-row class="a-input-group" type="flex" justify="space-between" align="middle">
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
                    :data-title="oralDataTitle"
                    :data-source="oralData"
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
        </div>
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
                interventionDetailId: this.$route.params.interventionDetailId,
                //  病人的id
                patientInfoId: this.$route.params.patientInfoId,

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

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '方案详情',
                },
            };
        },
        created(){
            console.log(this.patientInfoId);
            console.log(this.interventionDetailId);
        }
    };
</script>