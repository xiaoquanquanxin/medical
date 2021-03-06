<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group" data-msg="空"></div>
        <div class="a-input-group">
            <a-button type="primary" @click="addPatientReply">新增</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a @click="patientReplyDetail(sItem)">详情</a>
            </div>
        </a-table>
        <!--患者反馈莫泰框-->
        <a-modal v-model="dialogDataPatientReply.visible"
                 v-if="dialogDataPatientReply.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="患者反馈"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="addPatientReplyModalCheck('refPatientReplyForm')">
            <PatientReplyForm ref="refPatientReplyForm"/>
        </a-modal>
    </div>
</template>
<script>
    import { oneRowSearch } from '@/utils/tableScroll';
    import PatientReplyForm from '@/components/userList/patientReply/patientReplyForm.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import { requestFeedbackPage } from '../../../api/userList/patientReply';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { noPaginationData } from '../../../utils/pagination';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '反馈时间',
            dataIndex: 'ctime',
            width: 150,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  患者反馈
    export default {
        components: {
            PatientReplyForm,
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
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  分页信息
                pagination: paginationInit(1000),
                //  患者反馈操作
                dialogDataPatientReply: this.initModal(DIALOG_TYPE.PATIENT_REPLY),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestFeedbackPage(Object.assign({ patientId: this.patientId }, noPaginationData))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('userList', [
                //  弹框id
                'setPatientReplyId',
            ]),

            //  新增
            addPatientReply(){
                this.setPatientReplyId(0);
                this.showModal(DIALOG_TYPE.PATIENT_REPLY);
            },
            //  详情
            patientReplyDetail(sItem){
                this.setPatientReplyId(sItem.id);
                this.showModal(DIALOG_TYPE.PATIENT_REPLY);
            },

            //  确认详情
            addPatientReplyModalCheck(refPatientReplyForm){
                const promise = this.$refs[refPatientReplyForm].handleSubmit();
                promise.then(isEdit => {
                    this.hideModal(DIALOG_TYPE.PATIENT_REPLY);
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