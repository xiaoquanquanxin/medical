<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
        </div>
        <!--基础数据-->
        <BasicInfoEditTable/>
        <br>
        <!--肠内-->
        <OralEditTable
                :dataTitle="cnyyzcOralEditDataTitle"
                ref="cnyyzcOralEditTableRef"
        />
        <br>
        <!--口腔肠内-->
        <OralEditTable
                :dataTitle="kqcnOralEditDataTitle"
                ref="kqcnOralEditTableRef"
        />
        <br>
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
            //  单元map
            unitTypeMap(){
                console.log('单元map');
                return this.$store.state.constants.unitTypeMap;
            },
            //  处方类型-处方类型 (1.院内配置,2门诊领药)
            prescriptionType(){
                const { prescriptionType } = this.$store.state.intervention;
                return prescriptionType;
            },
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
                //  肠内营养支持
                cnyyzcOralEditDataTitle: {
                    //  选择的能量
                    energy: undefined,
                    //  选择的具体的方案，是一个结果。如果是编辑，需要反向设计到planMap里
                    planId: undefined,
                    templateType: 2,
                    usageMethod: 1,
                },
                //  口腔肠内数据
                kqcnOralEditDataTitle: {
                    //  选择的能量
                    energy: undefined,
                    //  选择的具体的方案，是一个结果。如果是编辑，需要反向设计到planMap里
                    planId: undefined,
                    templateType: 1,
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
                prescriptionName: '处方02',
                priod: '1',
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

                //  商品数据
                const getDetailGoods = (commodity) => {
                    //  console.log(JSON.parse(JSON.stringify(commodity)));
                    return commodity.map(item => {
                        const {
                            id: goodsId,
                            quantity,
                            goodsName,
                            subtotal,
                            purchaseUnitCheckId,
                            uintListVos,
                        } = item;
                        const checkedItem = uintListVos.find(_item => {
                            return _item.id === purchaseUnitCheckId;
                        });
                        const { type, uname, unitPrice: price } = checkedItem;
                        let goodsUnit;
                        //  如果是院内，取单位
                        if (type === 1) {
                            goodsUnit = this.unitTypeMap[uname].label;
                        } else {
                            //  如果是院外，取使用单位
                            goodsUnit = this.unitTypeMap[unitUse].label;
                        }
                        return {
                            goodsId,
                            goodsName,
                            quantity: Number(quantity) || 0,
                            subtotal: Number(subtotal) || 0,
                            goodsUnit,
                            price,
                        };
                    });
                };
                //  时间数据
                const getPlain = (timeData) => {
                    //  console.log(JSON.parse(JSON.stringify(timeData)));
                    return timeData.map(item => {
                        const { time: usageTime, warmWater: configWater, list } = item;
                        const nutritionPlain = list.map(_item => {
                            const { type, goodsId, goodsName, dosage, uname, unitUse } = _item;
                            let configUnit;
                            //  如果是院内，取单位
                            if (type === 1) {
                                configUnit = this.unitTypeMap[uname].label;
                            } else {
                                //  如果是院外，取使用单位
                                configUnit = this.unitTypeMap[unitUse].label;
                            }
                            return {
                                configWater,
                                goodsId,
                                goodsName,
                                configNum: Number(dosage) || 0,
                                configUnit,
                            };
                        });
                        return {
                            nutritionPlain,
                            usageTime,
                        };
                    });
                };
                //  详情对象
                const detail = [];
                //  肠内营养
                const cnyyzcData = this.$refs.cnyyzcOralEditTableRef;
                const cnyyzcCommodity = [];
                if (cnyyzcData.commodityTableData.length) {
                    const { commodityTableData, timeTableData } = cnyyzcData;
                    calc(commodityTableData, cnyyzcCommodity);
                    const detailGoods = getDetailGoods(commodityTableData);
                    const plain = getPlain(timeTableData);
                    //  console.log(plain);
                    //  return;
                    detail.push({
                        detailGoods,
                        plain,
                        remark: '',
                        templateType: 2,
                    });
                }

                //  口服肠内
                const kqcnData = this.$refs.kqcnOralEditTableRef;
                const kqcnyybcCommodity = [];
                if (kqcnData.commodityTableData.length) {
                    const { commodityTableData, timeTableData } = kqcnData;
                    calc(commodityTableData, kqcnyybcCommodity);
                    const detailGoods = getDetailGoods(commodityTableData);
                    const plain = getPlain(timeTableData);
                    //  console.log(detailGoods);
                    detail.push({
                        detailGoods,
                        plain,
                        remark: '',
                        templateType: 1,
                    });
                }
                //  详情json
                const prescriptionDetail = {
                    //  口服肠内
                    kqcnyybc: {
                        commodity: kqcnyybcCommodity,
                        dataTitle: this.kqcnOralEditDataTitle,
                        timeTableData: kqcnData.timeTableData
                    },
                    cnyyzc: {
                        commodity: cnyyzcCommodity,
                        dataTitle: this.cnyyzcOralEditDataTitle,
                        timeTableData: this.cnyyzcData.timeTableData
                    },
                };

                console.log(cnyyzcData.commodityTableData);
                console.log(kqcnData.commodityTableData);
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
                    detail,
                    //  prescriptionDetail: JSON.stringify(prescriptionDetail)
                };
                console.log(JSON.stringify(saveData));
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