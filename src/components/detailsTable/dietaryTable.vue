<template>
    <div>
        <!--膳食营养计划-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span>膳食营养计划</span>
        </a-row>
        <a-table
                :columns="oralColumns"
                :data-source="dataSource"
                :pagination="false"
                bordered
        >
        </a-table>
    </div>
</template>
<script>
    const oralColumns = [
        {
            title: '用餐时间',
            width: 100,
            dataIndex: 'usageTime'
        },
        {
            title: '用餐内容',
            width: 100,
            dataIndex: 'entryName'
        },
        {
            title: '用量',
            width: 100,
            dataIndex: 'quantityUsed',
        },
    ];
    //  膳食
    export default {
        props: ['dataSource'],
        data(){
            return {
                oralColumns,
            };
        },
    };
</script>