<template>
    <div class="custom-flex">
        <div class="custom-flex-left">
            <a-select v-model="energyId"
                      class="basic-select-width"
                      placeholder="请选择方案"
                      @change="choosePlanChange"
            >
                <a-select-option :value="1">1000</a-select-option>
                <a-select-option :value="2">2000</a-select-option>
                <a-select-option :value="3">3000</a-select-option>
            </a-select>
        </div>
        <a-table class="custom-flex-right"
                 :row-selection="rowSelection"
                 :columns="columns"
                 :data-source="planMap[energyId]"
                 :pagination="false"
                 bordered
        >
        </a-table>
    </div>
</template>
<script>
    const columns = [
        {
            title: '方案名',
            dataIndex: 'planName',
        },
        {
            title: '方案名内容',
            dataIndex: 'planContent',
        },
    ];
    //  选择计划
    export default {
        props: ['choosePlanData', 'planMap'],
        data(){
            let { energyId, planId } = this.choosePlanData;
            //  console.log(energyId, planId);
            //  如果没有planId
            if (!planId) {
                //  如果有数据list
                if (this.planMap[energyId]) {
                    //  默认选择第一个
                    planId = this.planMap[energyId][0].key;
                }
            }
            return {
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
            };
        },
        created(){
            console.log('打开弹框时候默认选择的单选', this.rowSelection.selectedRowKeys);
        },
        methods: {
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
            },

            //  确认数据
            handleSubmit(){
                const { energyId, planId } = this;
                //  console.log(energyId, planId);
                return new Promise(((resolve, reject) => {
                    //  如果没有选择
                    if (!energyId || !planId) {
                        this.$error({ title: '请选择方案' });
                        reject();
                    } else {
                        resolve({ energyId, planId });
                    }
                }));
            }
        }
    };
</script>
<style scoped>
    @import "~@/css/custom-flex.css";
</style>