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
            title: '时间',
            width: 100,
            dataIndex: 'time'
        },
        {
            title: '用餐内容',
            width: 100,
            dataIndex: 'content'
        }
    ];
    //  膳食
    export default {
        props: ['data-source'],
        data(){
            return {
                oralColumns,
            };
        },
        created(){
            //  console.log(this.dataSource);
        }
    };
</script>