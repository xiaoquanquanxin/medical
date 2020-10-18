<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入评估表名"/>
            <a-button class="basic-button-width" type="primary">搜索</a-button>
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
    import { oneRowSearch } from '@/utils/tableScroll';

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
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            名称: '名称',
            评分时间: `评分时间`,
            得分: `得分`,
            评分人: `评分人`,
        });
    }
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
        },
        methods: {
            //  删除营养评估
            deleteAssessment(sItem){
                this.$confirm({
                    title: `确定删除${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    //  content: (h)=>{h(test)},
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            }
        }
    };
</script>