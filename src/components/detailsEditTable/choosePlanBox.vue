<template>
    <div class="custom-flex">
        {{dataTitle}}
        <div class="custom-flex-left">
            <a-select class="basic-select-width"
                      v-model="energyId"
                      placeholder="请选择能量"
                      @change="energyChange"
            >
                <a-select-option :value="item.id"
                                 :key="item.id"
                                 v-for="item in energyList"
                >{{item.name}}
                </a-select-option>
            </a-select>
        </div>
        <a-table class="custom-flex-right"
                 :row-selection="rowSelection"
                 :columns="columns"
                 :data-source="data"
                 :pagination="false"
                 bordered
        >
        </a-table>
    </div>
</template>
<script>
    import { requestPrescriptionPrescriptionTpl } from '../../api/userList/intervention';
    import { prescriptionTypeList, energyList, usageMethodList } from '../../utils/constants';
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '方案名',
            dataIndex: 'prescriptionName',
        },
        {
            title: '方案名内容',
            dataIndex: 'planContent',
        },
    ];
    //  选择计划
    export default {
        //  todo    choosePlanData就是 chooseInterventionData
        props: ['choosePlanData', 'planMap', 'dataTitle'],
        data(){
            let { energyId, planId } = this.choosePlanData;
            console.log(JSON.parse(JSON.stringify(this.dataTitle)));
            console.log(energyId, planId);
            //  如果没有planId
            if (!planId) {
                this.energyId = energyList[0];
            }
            return {
                //  能量下拉
                energyList,
                //  能量id
                energyId: energyId || undefined,
                //  单选的id
                planId,
                //  表格配置
                rowSelection: {
                    type: 'radio',
                    selectedRowKeys: [planId],
                    onChange: this.onSelectChange,
                },
                columns,
                data: [],
                chooseInterventionData: null,
            };
        },
        created(){
            console.log('打开弹框时候默认选择的单选', this.rowSelection.selectedRowKeys);
            this.searchFn();
        },
        methods: {
            ...mapActions('intervention', [
                //  设置被选中的营养干预方案
                'setChooseInterventionData',
            ]),
            searchFn(){
                if (!this.energyId) {
                    return;
                }
                this.energyChange(this.energyId);
            },
            //  下拉
            choosePlanChange(value){
                const planList = this.planMap[value];
                //  先置空
                this.planId = null;
                //  在判断设置为第一个值
                if (planList && planList.length) {
                    this.planId = planList[0].key;
                }
                //  console.log(this.planId);
                this.rowSelection.selectedRowKeys = [this.planId];
            },
            //  单选
            onSelectChange(selectedRowKeys, value){
                //  console.log(selectedRowKeys);
                this.rowSelection.selectedRowKeys = selectedRowKeys;
                this.planId = selectedRowKeys[0];
                //  console.log(this.planId);
                //  console.log(value);
                //  暂时保存
                this.chooseInterventionData = value[0];
            },

            //  确认数据
            handleSubmit(){
                const { energyId, planId } = this;
                //  console.log(energyId, planId);
                return new Promise(((resolve, reject) => {
                    //  如果没有选择
                    if (!energyId || !planId) {
                        this.$message.error('请选择方案');
                        reject();
                    } else {
                        //  储存
                        this.setChooseInterventionData(this.chooseInterventionData);
                        resolve({ energyId, planId });
                    }
                }));
            },
            //  切换能量
            energyChange(energy){
                console.log(this.energyId);
                const { prescriptionType, usageMethod } = this.dataTitle;
                console.log('选择的食用方法', usageMethod);
                requestPrescriptionPrescriptionTpl({ energy, prescriptionType, usageMethod })
                    .then(v => {
                        console.log(JSON.parse(JSON.stringify(v.data)));
                        console.log('打开弹框时候默认选择的单选', this.rowSelection.selectedRowKeys);
                        v.data.forEach((item) => {
                            item.key = item.id;
                            const prescriptionContentData = JSON.parse(item.prescriptionContent);
                            item.commodityTableData = prescriptionContentData.commodityTableData;
                            item.timeTableData = prescriptionContentData.timeTableData;
                            const _timeTableData = prescriptionContentData.timeTableData[0];
                            const list = _timeTableData.list;
                            let str = '';
                            list.forEach(_item => {
                                str += `${_item.goodsName}${_item.uname};`;
                            });
                            item.planContent = `${str}温水：${_timeTableData.warmWater}ml`;
                        });
                        this.data = v.data;
                    });
            }
        }
    };
</script>
<style scoped>
    @import "~@/css/custom-flex.css";
</style>