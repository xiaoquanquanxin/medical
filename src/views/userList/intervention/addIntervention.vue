<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
        </div>
        <!--基础数据-->
        <BasicInfoEditTable
                :data-source="basicInfoEditData"
        />
        <br>
        <!--口腔肠内-->
        <OralEditTable
                :key="1"
                :data-title="kqcnOralEditDataTitle"
        />
        <br>
        <!--肠内-->
        <OralEditTable
                :key="2"
                :data-title="cnyyzcOralEditDataTitle"
        />
        <br>
        <a-button type="primary" @click="saveIntervention">保存</a-button>
    </div>
</template>
<script>
    import GoBackButton from '@/components/goBackButton.vue';
    //  基础数据
    import BasicInfoEditTable from '@/components/detailsEditTable/basicInfoEditTable.vue';
    //  可编辑的主要表格
    import OralEditTable from '@/components/detailsEditTable/oralEditTable.vue';
    import { requestPrescriptionSave } from '../../../api/userList/intervention';
    //    //  膳食营养计划
    //    import DietaryEditTable from '@/components/detailsEditTable/dietaryEditTable.vue';
    //    //  能量
    //    import EnergyEditTable from '@/components/detailsEditTable/energyEditTable.vue';
    export default {
        components: {
            GoBackButton,
            BasicInfoEditTable,
            OralEditTable,
        },
        computed: {
            //  被选中的处方
            chooseInterventionData(){
                return this.$store.state.intervention.chooseInterventionData;
            }
        },
        data(){
            return {
                //  详情的id
                interventionDetailId: this.$route.params.interventionDetailId,
                //  病人的id
                patientId: this.$route.params.patientId,

                //  基础数据
                basicInfoEditData: [
                    {
                        key: 1,
                        prescriptionName: '',
                        priod: '',
                        prescriptionType: 1,
                    }
                ],
                //  口腔肠内数据
                kqcnOralEditDataTitle: {
                    name: '口服肠内营养补充',
                    prescriptionType: 1,
                },
                //
                cnyyzcOralEditDataTitle: {
                    name: '肠内营养支持',
                    prescriptionType: 2,
                }
            };
        },
        created(){
            console.log('参数', this.$route.params);
            //  如果是编辑
            if (this.$route.params.interventionDetailId) {
//                //  设置能量表数据
//                this.setEnergyDetail([{
//                    key: 1,
//                    energy: 123,
//                    protein: 234,
//                    fat: 345,
//                    carbohydrates: 456,
//                }]);
            }
            this.searchFn();
        },

        methods: {
            //  主要请求
            searchFn(){},
            //  保存
            saveIntervention(){
                //  病人id
                const patientId = this.patientId;
                const basicInfoEditData = this.basicInfoEditData[0];
                const {
                    //  周期
                    priod,
                    //  处方类型
                    prescriptionType,
                    //  处方名称
                    prescriptionName,
                } = basicInfoEditData;
                console.log(JSON.parse(JSON.stringify(this.chooseInterventionData)));
                //  被选中的方案
                const { commodityTableData, timeTableData } = this.chooseInterventionData;
                console.log(JSON.parse(JSON.stringify(commodityTableData)));
                console.log(JSON.parse(JSON.stringify(timeTableData)));
                //  金额
                let amountPayable = 0;
                //  碳水化合物
                let carbohydrates = 0;
                //  能量
                let energy = 0;
                //  脂肪
                let fat = 0;
                //  蛋白质
                let protein = 0;
                //  todo    肠内only
                const commodity = [];
                commodityTableData.forEach(item => {
                    const { purchaseUnitCheckId, quantity } = item;
                    item.uintListVos.forEach(_item => {
                        if (purchaseUnitCheckId === _item.id) {
                            amountPayable += quantity * _item.unitPrice;
                            carbohydrates += quantity * _item.unitCarbohydrate;
                            energy += quantity * _item.unitEnergy;
                            fat += quantity * _item.unitFat;
                            protein += quantity * _item.unitProtein;
                            const data = {
                                goodsId: _item.id,
                                goodsName: item.goodsName,
                                purchaseUnit: _item.uname,
                                quantity: item.quantity,
                                subtotal: item.quantity * _item.unitPrice
                            };
                            commodity.push(data);
                        }
                    });
                });
                //  详情json
                const prescriptionDetail = {
                    cnyyzc: commodity,
                };

                const saveData = {
                    patientId,
                    priod,
                    prescriptionType,
                    prescriptionName,
                    amountPayable,
                    carbohydrates,
                    energy,
                    fat,
                    protein,
                    prescriptionDetail: JSON.stringify(prescriptionDetail)
                };
                console.log(saveData);
                requestPrescriptionSave(saveData)
                    .then(v => {
                        console.log(v);
                        this.$message.success('操作成功');
                        this.$router.push({ name: 'intervention' });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
</script>