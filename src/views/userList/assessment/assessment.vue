<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
<!--            <a-input class="basic-input-width" v-model="searchData.assesType" placeholder="请输入评估表名"/>-->
            <a-select class="basic-range-picker-width" v-model="searchData.assesType" placeholder="请选择评估表名">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option value="1">微型营养评价表</a-select-option>
                <a-select-option value="2">一般评估表</a-select-option>
                <a-select-option value="3">PG - SGA主观营养状况评估</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addAssessment',params:{patientId}}">
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
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <router-link :to="{name:'assessmentDetail',params:{assessmentDetailId:sItem.id}}">详情</router-link>
                    <a @click="deleteAssessment(sItem,sIndex)">删除</a>
                </a-space>
            </div>
        </a-table>
    </div>
</template>
<script>
    import { twoRowSearch } from '@/utils/tableScroll';
    import { requestPatientAssessDelete, requestPatientAssessPage } from '../../../api/userList/assessment';
    import { noPaginationData, paginationDecode, paginationEncode, paginationInit } from '../../../utils/pagination';

    const columns = [
        {
            title: '名称',
            dataIndex: 'assesName',
            width: 150,
        },
        {
            title: '得分',
            dataIndex: '得分',
            width: 100,
        },
        {
            title: '评分人',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '评分结果',
            width: 150,
            dataIndex: 'assesResult',
        },
        {
            title: '评分时间',
            dataIndex: 'ctime',
            width: 200,
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
            patientId(){
                return this.$route.params.patientId;
            },
        },
        data(){
            return {
                data: [],
                columns,
                //  搜索数据
                searchData: {},

                //  分页信息
                pagination: paginationInit(),

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
            };
        },
        created(){
            //  请求数据
            console.log('请求数据，拿列表数据', this.patientId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPatientAssessPage(Object.assign({},
                    {
                        param: {
                            patientId: this.patientId,
                            assesType: this.searchData.assesType,
                        },
                    }, paginationEncode(this.pagination))
                )
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        console.log(JSON.parse(JSON.stringify(data.records)));
                        this.data = data.records;
                    });
            },
            //  删除营养评估
            deleteAssessment(sItem){
                this.$confirm({
                    title: `确定删除${sItem.assesName}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        return requestPatientAssessDelete(sItem.id)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(v => {
                                this.$message.error('操作失败');
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