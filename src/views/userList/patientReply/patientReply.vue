<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-button type="primary" @click="addPatientReply">新增</a-button>
        </a-input-group>
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

    const columns = [
        {
            title: '序号',
            dataIndex: '序号',
            width: 150,
        },
        {
            title: '反馈时间',
            dataIndex: '反馈时间',
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
            序号: '序号',
            医生: '医生',
            反馈时间: '反馈时间',
        });
    }

    //  患者反馈
    export default {
        components: {
            PatientReplyForm,
        },
        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  患者反馈操作
                dialogDataPatientReply: this.initModal(DIALOG_TYPE.PATIENT_REPLY),
            };
        },
        methods: {
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
                this.setPatientReplyId(3323);
                this.showModal(DIALOG_TYPE.PATIENT_REPLY);
            },

            //  确认详情
            addPatientReplyModalCheck(refPatientReplyForm){
                const promise = this.$refs[refPatientReplyForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PATIENT_REPLY);
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>