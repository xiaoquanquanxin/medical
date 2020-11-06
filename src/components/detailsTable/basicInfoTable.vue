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
            <div slot="prescriptionType" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="scope.prescriptionType == 1">院内配置</span>
                <span v-if="scope.prescriptionType == 2">门诊领药</span>
            </div>
        </a-table>
    </div>
</template>
<script>
    //  基本信息 表格 列的意义
    const basicInfoColumns = [
        {
            title: '方案名称',
            dataIndex: 'prescriptionName',
            width: 100,
        },
        {
            title: '周期/天',
            width: 80,
            dataIndex: 'priod',
        },
        {
            title: '处方类型',
            width: 100,
            scopedSlots: { customRender: 'prescriptionType' },
        },
        {
            title: '执行日期',
            width: 100,
            dataIndex: 'executionTime',
        },
    ];

    export default {
        props: ['dataSource'],
        data(){
            return {
                basicInfoColumns,
            };
        },
        created(){
            //  console.log(this.dataSource);
        }
    };
</script>