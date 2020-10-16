<template>
    <div>
        <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
            <a-col :span="4">
                基本信息
            </a-col>
        </a-row>
        <a-table
                :columns="basicInfoColumns"
                :data-source="dataSource"
                :pagination="false"
                bordered
        >
            <!--方案名称-->
            <div slot="planName" slot-scope="scope,sItem,sIndex,extra">
                <a-input placeholder="请输入方案名称"
                         v-model="scope.planName"
                         class="basic-input-width"
                />
            </div>
            <!--周期-->
            <div slot="cycle" slot-scope="scope,sItem,sIndex,extra">
                <a-input-number
                        placeholder="请输入周期"
                        v-model="scope.cycle"
                        class="basic-input-width"
                />
                天
            </div>
            <!--处方类型-->
            <div slot="prescriptionType" slot-scope="scope,sItem,sIndex,extra">
                <a-select v-model="scope.prescriptionType"
                          class="basic-select-width"
                          placeholder="请选择处方类型">
                    <a-select-option :value="1">
                        院内配置
                    </a-select-option>
                    <a-select-option :value="2">
                        门诊领药
                    </a-select-option>
                </a-select>
            </div>
            <!--咨询费/配置费-->
            <div slot="cost" slot-scope="scope,sItem,sIndex,extra">
                <a-select v-model="scope.cost"
                          class="basic-select-width"
                          placeholder="请选择咨询费">
                    <a-select-option :value="1">
                        恰
                    </a-select-option>
                    <a-select-option value="2">
                        就
                    </a-select-option>
                </a-select>
            </div>
        </a-table>
    </div>
</template>
<script>
    //  基本信息 表格 列的意义
    const basicInfoColumns = [
        {
            title: '方案名称',
            scopedSlots: { customRender: 'planName' },
            width: 100,
        },
        {
            title: '周期',
            width: 100,
            scopedSlots: { customRender: 'cycle' },
        },
        {
            title: '处方类型',
            width: 100,
            scopedSlots: { customRender: 'prescriptionType' },
        },
        {
            title: '咨询费/配置费',
            width: 140,
            scopedSlots: { customRender: 'cost' },
        },
    ];

    export default {
        props: ['dataSource'],
        data(){
            return {
                basicInfoColumns,
            };
        }
    };
</script>