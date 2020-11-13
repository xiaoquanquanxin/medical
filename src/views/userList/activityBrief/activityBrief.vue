<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group" data-msg="空"></div>
        <div class="a-input-group">
            <a-button type="primary" @click="addActivityBrief">新增</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space>
                    <a @click="activityBriefDetail(sItem)">详情</a>
                    <a @click="activityBriefDelete(sItem)">删除</a>
                </a-space>
            </div>
        </a-table>
        <!--活动小结莫泰框-->
        <a-modal v-model="dialogDataActivityBrief.visible"
                 v-if="dialogDataActivityBrief.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="活动小结"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="addActivityBriefModalCheck('refActivityBriefForm')">
            <ActivityBriefForm ref="refActivityBriefForm"/>
        </a-modal>
    </div>
</template>
<script>
    import { oneRowSearch } from '@/utils/tableScroll';
    import ActivityBriefForm from '@/components/userList/activityBrief/activityBriefForm.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { requestBriefDelete, requestBriefPage } from '../../../api/userList/activityBrief';
    import { noPaginationData } from '../../../utils/pagination';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '医生',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '记录时间',
            dataIndex: 'startTime',
            width: 200,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  活动小结
    export default {
        components: {
            ActivityBriefForm,
        },
        computed: {
            //  页面参数 - 病人id
            patientId(){
                return Number(this.$route.params.patientId);
            },
        },
        data(){
            return {
                data: [],
                columns,
                //  分页信息
                pagination: paginationInit(1000),
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),

                //  活动小结操作
                dialogDataActivityBrief: this.initModal(DIALOG_TYPE.ACTIVITY_BRIEF),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestBriefPage(Object.assign({ patientId: this.patientId }, noPaginationData,))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                        //  console.table(JSON.parse(JSON.stringify(data.records)));
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('userList', [
                //  弹框id
                'setActivityBriefId',
            ]),

            //  新增
            addActivityBrief(){
                this.setActivityBriefId(0);
                this.showModal(DIALOG_TYPE.ACTIVITY_BRIEF);
            },
            //  详情
            activityBriefDetail(sItem){
                this.setActivityBriefId(sItem.id);
                this.showModal(DIALOG_TYPE.ACTIVITY_BRIEF);
            },
            //  删除
            activityBriefDelete(sItem){
                this.$confirm({
                    title: `确定删除此数据？`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        return requestBriefDelete(sItem.id)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },

            //  确认详情
            addActivityBriefModalCheck(refActivityBriefForm){
                const promise = this.$refs[refActivityBriefForm].handleSubmit();
                promise.then(isEdit => {
                    this.hideModal(DIALOG_TYPE.ACTIVITY_BRIEF);
                    if (isEdit) {
                        return;
                    }
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>