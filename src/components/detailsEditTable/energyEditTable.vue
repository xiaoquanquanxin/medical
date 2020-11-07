<template>
    <a-table
            :columns="energyColumns"
            :data-source="energyTableData"
            :pagination="false"
            bordered
    >
        <!--能量-->
        <div slot="energy" slot-scope="scope,sItem,sIndex,extra">
            <a-input-number style='width:100%;'
                            :precision="0"
                            :min="1"
                            placeholder="请输入能量"
                            v-model="scope.energy"
            />
        </div>
        <!--蛋白质-->
        <div slot="protein" slot-scope="scope,sItem,sIndex,extra">
            <a-input-number style='width:100%;'
                            :precision="0"
                            :min="1"
                            placeholder="请输入蛋白质"
                            v-model="scope.protein"
            />
        </div>
        <!--脂肪-->
        <div slot="fat" slot-scope="scope,sItem,sIndex,extra">
            <a-input-number style='width:100%;'
                            :precision="0"
                            :min="1"
                            placeholder="请输入脂肪"
                            v-model="scope.fat"
            />
        </div>
        <!--碳水化合物-->
        <div slot="carbohydrates" slot-scope="scope,sItem,sIndex,extra">
            <a-input-number style='width:100%;'
                            :precision="0"
                            :min="1"
                            placeholder="请输入碳水化合物"
                            v-model="scope.carbohydrates"
            />
        </div>
    </a-table>
</template>
<script>
    //  可编辑的能量表 列的意义
    const energyColumns = [
        {
            title: '能量',
            scopedSlots: { customRender: 'energy', },
            width: 100,
        },
        {
            title: '蛋白质',
            width: 100,
            scopedSlots: { customRender: 'protein', },
        },
        {
            title: '脂肪',
            width: 100,
            scopedSlots: { customRender: 'fat', },
        },
        {
            title: '碳水化合物',
            width: 100,
            scopedSlots: { customRender: 'carbohydrates', },
        }
    ];

    export default {

        //  能量数据
        props: ['energyTableData'],

        data(){
            return {
                energyColumns,
            };
        }
    };
</script>