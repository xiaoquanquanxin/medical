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
                {{scope.planName}}
            </div>
            <!--周期-->
            <div slot="cycle" slot-scope="scope,sItem,sIndex,extra">
                {{scope.cycle}}
            </div>
            <!--处方类型-->
            <div slot="prescriptionType" slot-scope="scope,sItem,sIndex,extra">
                {{scope.prescriptionType}}
            </div>
            <!--咨询费/配置费-->
            <div slot="cost" slot-scope="scope,sItem,sIndex,extra">
                {{scope.cost}}
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
            width: 100,
            scopedSlots: { customRender: 'cost' },
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