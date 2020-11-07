<template>
    <a-table
            :columns="energyColumns"
            :data-source="totalEnergyData"
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
        //  能量数据
        props: ['totalEnergyData'],
        data(){
            return {
                energyColumns,
            };
        }
    };
</script>