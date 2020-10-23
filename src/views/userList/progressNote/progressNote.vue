<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group" data-msg="空"></div>
        <div class="a-input-group">
            <a-button type="primary" @click="addProgressNote">新增</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <!--医生-->
            <div slot="doctor" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="item.id === scope.doctorId"
                      v-for="item in doctorList"
                >{{item.doctorName}}</span>
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a @click="progressNoteDetail(sItem)">详情</a>
            </div>
        </a-table>
        <!--病程记录莫泰框-->
        <a-modal v-model="dialogDataProgressNote.visible"
                 v-if="dialogDataProgressNote.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="病程记录"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="addProgressNoteModalCheck('refProgressNoteForm')">
            <ProgressNoteForm ref="refProgressNoteForm"/>
        </a-modal>
    </div>
</template>
<script>
    import { oneRowSearch } from '@/utils/tableScroll';
    import ProgressNoteForm from '@/components/userList/progressNote/progressNoteForm.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import { requestDiseaseRecordPage } from '../../../api/userList/progressNote';
    import { noPaginationData } from '../../../utils/pagination';
    import { requestPatientSelectDoctorByHospital } from '../../../api/userList/userList';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 150,
        },
        {
            title: '医生',
            width: 100,
            scopedSlots: { customRender: 'doctor' }
        },
        {
            title: '记录时间',
            dataIndex: 'ctime',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  病程记录
    export default {
        components: {
            ProgressNoteForm,
        },
        computed: {
            //  页面参数 - 病人id
            patientId(){
                return this.$route.params.patientId;
            }
        },
        data(){
            return {
                data: [],
                columns,
                //  医生list
                doctorList: [],

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),

                //  病程记录操作
                dialogDataProgressNote: this.initModal(DIALOG_TYPE.PROGRESS_NOTE),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestDiseaseRecordPage(Object.assign({}, {
                    param: {
                        patientId: this.patientId,
                    }
                }, noPaginationData))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        console.table(JSON.parse(JSON.stringify(data.records[0])));
                        this.data = data.records;
                    });
                requestPatientSelectDoctorByHospital()
                    .then(v => {
                        console.log('根据当前医院查询所有医生', v.data);
                        v.data.forEach(item => {
                            item.id = Number(item.id);
                        });
                        this.doctorList = v.data;
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('userList', [
                //  弹框id
                'setProgressNoteId',
            ]),

            //  新增
            addProgressNote(){
                this.setProgressNoteId(0);
                this.showModal(DIALOG_TYPE.PROGRESS_NOTE);
            },
            //  详情
            progressNoteDetail(sItem){
                this.setProgressNoteId(sItem.id);
                this.showModal(DIALOG_TYPE.PROGRESS_NOTE);
            },

            //  确认病程记录
            addProgressNoteModalCheck(refProgressNoteForm){
                const promise = this.$refs[refProgressNoteForm].handleSubmit();
                promise.then(isEdit => {
                    this.hideModal(DIALOG_TYPE.PROGRESS_NOTE);
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