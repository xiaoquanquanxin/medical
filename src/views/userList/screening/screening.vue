<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-row class="a-input-group">
            <a-col>
                <router-link :to="{name:'addScreening',params:{patientInfoId}}">
                    <a-button type="primary">新增</a-button>
                </router-link>
            </a-col>
        </a-row>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <router-link :to="{name:'screeningDetail',params:{screeningDetailId:sIndex}}">详情</router-link>
                </a-space>
            </div>
        </a-table>
    </div>
</template>
<script>
    import { oneRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 100,
        },
        {
            title: '筛查项目',
            dataIndex: '筛查项目',
            width: 150,
        },
        {
            title: '得分',
            dataIndex: '得分',
            width: 100,
        },
        {
            title: '评分人',
            dataIndex: '评分人',
            width: 100,
        },
        {
            title: '评分时间',
            dataIndex: '评分时间',
            width: 150,
        },
        {
            title: '是否有风险',
            dataIndex: 'fefewawa',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodityName: `xx供应商`,
        });
    }
    //  筛查
    export default {
        computed: {
            //  页面参数 - 病人id
            patientInfoId(){
                return this.$route.params.patientInfoId;
            },
        },
        data(){
            return {
                data,
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,
            };
        },
        created(){
            //  请求数据
            console.log('请求数据，拿列表数据', this.patientInfoId);
        }
    };
</script>