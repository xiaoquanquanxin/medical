<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
        </div>
        <!--基础数据-->
        <BasicInfoEditTable/>
        <br>
        <!--口腔肠内-->
        <OralEditTable
                v-if="true"
                :key="1"
                :data-title="kqcnOralEditDataTitle"
                ref="kqcnOralEditTableRef"
        />
        <div v-if="true">
            <br>
            <!--肠内-->
            <OralEditTable
                    :key="2"
                    :data-title="cnyyzcOralEditDataTitle"
                    ref="cnyyzcOralEditTableRef"
            />
            <br>
        </div>
        <MealEditTable/>
        <br>
        <a-button type="primary" @click="saveIntervention">保存</a-button>
    </div>
</template>
<script>
    import { requestPrescriptionSave } from '../../../api/userList/intervention';

    import { mapGetters, mapActions } from 'vuex';
    import GoBackButton from '@/components/goBackButton.vue';
    //  基础数据
    import BasicInfoEditTable from '@/components/detailsEditTable/basicInfoEditTable.vue';
    //  可编辑的主要表格
    import OralEditTable from '@/components/detailsEditTable/oralEditTable.vue';
    //  可编辑的膳食营养计划
    import MealEditTable from '@/components/detailsEditTable/mealEditTable.vue';

    export default {
        components: {
            GoBackButton,
            BasicInfoEditTable,
            OralEditTable,
            MealEditTable,
        },
        computed: {
            //	新增处方、编辑处方选择的头部数据
            basicInfoEditData(){
                return this.$store.state.intervention.basicInfoEditData;
            },
            //  被选中的处方-口服肠内营养补充数据
            kqcnData(){
                return this.$store.state.intervention.kqcnData;
            },
            //  被选中的处方-肠内营养支持数据
            cnyyzcData(){
                return this.$store.state.intervention.cnyyzcData;
            },
            //  被选中的处方-膳食营养计划
            mealData(){
                return this.$store.state.intervention.mealData;
            }
        },
        data(){
            return {
                //  详情的id
                interventionDetailId: this.$route.params.interventionDetailId,
                //  病人的id
                patientId: this.$route.params.patientId,
                //  口腔肠内数据
                kqcnOralEditDataTitle: {
                    name: '口服肠内营养补充',
                    prescriptionType: 1,
                    usageMethod: 1,
                },
                //  肠内营养支持
                cnyyzcOralEditDataTitle: {
                    name: '肠内营养支持',
                    prescriptionType: 2,
                    usageMethod: 1,
                },
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
            this.setBasicInfoEditData([{
                key: 1,
                prescriptionName: '',
                priod: '',
                prescriptionType: 1,
            }]);
            this.searchFn();
        },

        methods: {
            ...mapActions('intervention', [
                //  处方头部信息
                'setBasicInfoEditData',
            ]),
            //  主要请求
            searchFn(){

            },
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
                if (prescriptionName.trim() === '') {
                    this.$message.error('请填写处方名称');
                    return;
                }
                if (!priod) {
                    this.$message.error('请填写处方周期');
                    return;
                }

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
                const calc = (list, commodity) => {
                    list.forEach(item => {
                        const { purchaseUnitCheckId, quantity } = item;
                        item.uintListVos.forEach(_item => {
                            if (purchaseUnitCheckId === _item.id) {
                                amountPayable += quantity * _item.unitPrice;
                                carbohydrates += quantity * _item.unitCarbohydrate;
                                energy += quantity * _item.unitEnergy;
                                fat += quantity * _item.unitFat;
                                protein += quantity * _item.unitProtein;
                                const data = {
                                    key: _item.id,
                                    goodsId: _item.id,
                                    goodsName: item.goodsName,
                                    purchaseUnit: _item.uname,
                                    quantity: item.quantity,
                                    unitPrice: _item.unitPrice,
                                    subtotal: item.quantity * _item.unitPrice
                                };
                                commodity.push(data);
                            }
                        });
                    });
                };
                //  口服肠内
                const kqcnyybcCommodity = [];
                calc(this.kqcnData.commodityTableData, kqcnyybcCommodity);
                //  肠内营养
                const cnyyzcCommodity = [];
                calc(this.cnyyzcData.commodityTableData, cnyyzcCommodity);
                //  详情json
                const prescriptionDetail = {
                    //  口服肠内
                    kqcnyybc: {
                        commodity: kqcnyybcCommodity,
                        dataTitle: this.kqcnOralEditDataTitle,
                        timeTableData: this.kqcnData.timeTableData
                    },
                    cnyyzc: {
                        commodity: cnyyzcCommodity,
                        dataTitle: this.cnyyzcOralEditDataTitle,
                        timeTableData: this.cnyyzcData.timeTableData
                    },
                };
                console.log(JSON.parse(JSON.stringify(prescriptionDetail)));
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