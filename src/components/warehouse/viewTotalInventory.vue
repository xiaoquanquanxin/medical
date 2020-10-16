<template>
    <div class="table-in-box">
        <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :scroll="modalTableScroll"
        >
        </a-table>
    </div>
</template>
<script>
    import { modalTableScroll } from '@/utils/tableScroll';

    const columns = [
        {
            title: '医院',
            dataIndex: 'hospital',
            width: 150,
        },
        {
            title: '总库存',
            dataIndex: 'totalInventory',
            width: 150,
        },
        {
            title: '暂用库存',
            dataIndex: 'abutmentInventory',
            width: 150,
        },
        {
            title: '剩余库存',
            dataIndex: 'remainingInventory',
            width: 150,
        },

    ];
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            key: i,
            hospital: 'xx医院',
            abutmentInventory:'暂用库存',
            totalInventory:'总库存',
            remainingInventory:'剩余库存',
        });
    }
    //  查看总库存
    export default {
        computed: {
            //  查看的id
            warehouseId(){
                return this.$store.state.warehouse.warehouseId;
            }
        },
        created(){
            console.log(this.warehouseId);
        },
        data(){
            return {
                columns,
                data,
                //	弹框table的scroll
                modalTableScroll,

            };
        }
    };
</script>