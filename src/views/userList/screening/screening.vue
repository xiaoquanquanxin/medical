<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group" data-msg="空"></div>
        <div class="a-input-group">
            <router-link :to="{name:'addScreening',params:{patientId}}">
                <a-button type="primary">新增</a-button>
            </router-link>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <router-link :to="{name:'screeningDetail',params:{screeningDetailId:sItem.id}}">详情</router-link>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-pagination">
            <a-pagination
                    v-if="pagination.total"
                    v-model="pagination.current"
                    :page-size-options="pagination.pageSizeOptions"
                    :total="pagination.total"
                    show-size-changer
                    :page-size="pagination.pageSize"
                    @showSizeChange="onShowSizeChange"
                    @change="pageChange"
            >
                <template slot="buildOptionText" slot-scope="props">
                    <span>{{ props.value }}条/页</span>
                </template>
            </a-pagination>
        </a-row>
    </div>
</template>
<script>
    import { oneRowSearch } from '@/utils/tableScroll';
    import { requestScreenPage } from '../../../api/userList/screening';
    import {
        paginationDecode,
        paginationEncode,
        paginationInit,
        onShowSizeChange,
        pageChange,
    } from '../../../utils/pagination';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '筛查项目',
            dataIndex: 'screenType',
            width: 150,
        },
        {
            title: '得分',
            dataIndex: 'totalScore',
            width: 100,
        },
        {
            title: '评分人',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '评分时间',
            dataIndex: 'ctime',
            width: 200,
        },
        {
            title: '是否有风险',
            dataIndex: 'isRisk',
            width: 150,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  筛查
    export default {
        computed: {
            //  页面参数 - 病人id
            patientId(){
                return this.$route.params.patientId;
            },
        },
        data(){
            return {
                //  分页信息
                pagination: paginationInit(),
                data: [],
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
            };
        },
        created(){
            //  请求数据
            console.log('请求数据，拿列表数据', this.patientId);
            this.searchFn();
        },
        methods: {
            searchFn(){
                requestScreenPage(Object.assign({ patientId: this.patientId },
                    paginationEncode(this.pagination))
                )
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(data.records)));
                    });
            },
            onShowSizeChange,
            pageChange,
        }
    };
</script>