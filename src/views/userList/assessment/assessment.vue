<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入评估表名"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addAssessment',params:{patientInfoId}}">
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
            <!--评分结果-->
            <div slot="result" slot-scope="scope,sItem,sIndex,extra">
                xxxx
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <router-link :to="{name:'assessmentDetail',params:{assessmentDetailId:sIndex}}">详情</router-link>
                    <a @click="deleteAssessment(sItem,sIndex)">删除</a>
                </a-space>
            </div>
        </a-table>
    </div>
</template>
<script>
    import { twoRowSearch } from '@/utils/tableScroll';
    import { requestPatientAssessDelete, requestPatientAssessPage } from '../../../api/userList/assessment';
    import { noPaginationData, paginationDecode, paginationEncode } from '../../../utils/pagination';

    const columns = [
        {
            title: '名称',
            dataIndex: '名称',
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
            title: '评分结果',
            width: 150,
            scopedSlots: { customRender: 'result' },
        },
        {
            title: '评分时间',
            dataIndex: '评分时间',
            width: 150,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    //  营养评估
    export default {
        computed: {
            //  页面参数 - 病人id
            patientInfoId(){
                return this.$route.params.patientInfoId;
            },
        },
        data(){
            return {
                data: [],
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
            };
        },
        created(){
            //  请求数据
            console.log('请求数据，拿列表数据', this.patientInfoId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPatientAssessPage(noPaginationData)
                    .then(v => {
                        const { data } = v;
                        console.log(data.records);
                        this.data = data.records;
                    });
            },
            //  删除营养评估
            deleteAssessment(sItem){
                this.$confirm({
                    title: `确定删除${sItem.id}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        requestPatientAssessDelete(sItem.id)
                            .then(v => {
                                console.log('删除成功');
                                console.log(v);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            }
        }
    };
</script>