<template>
    <a-table
            :columns="energyColumns"
            :data-source="energyData"
            :pagination="false"
            bordered
    >
    </a-table>
</template>
<script>
    //  能量表 列的意义
    const energyColumns = [
        {
            title: '能量',
            dataIndex: 'energy',
            width: 100,
        },
        {
            title: '蛋白质',
            width: 100,
            dataIndex: 'protein',
        },
        {
            title: '脂肪',
            width: 100,
            dataIndex: 'fat',
        },
        {
            title: '碳水化合物',
            width: 100,
            dataIndex: 'carbohydrates',
        },
    ];

    export default {
        computed: {
            //  能量数据
            energyData(){
                return this.$store.state.intervention.energyData;
            }
        },
        data(){
            return {
                energyColumns,
            };
        }
    };
</script>