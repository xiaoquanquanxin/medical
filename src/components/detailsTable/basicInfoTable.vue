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
        </a-table>
    </div>
</template>
<script>
    //  基本信息 表格 列的意义
    const basicInfoColumns = [
        {
            title: '方案名称',
            dataIndex: 'planName',
            width: 100,
        },
        {
            title: '周期',
            width: 100,
            dataIndex: 'cycle',
        },
        {
            title: '处方类型',
            width: 100,
            dataIndex: 'prescriptionType',
        },
        {
            title: '咨询费/配置费',
            width: 100,
            dataIndex: 'cost',
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