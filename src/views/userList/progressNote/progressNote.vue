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

    const columns = [
        {
            title: '序号',
            dataIndex: '序号',
            width: 150,
        },
        {
            title: '医生',
            dataIndex: '医生',
            width: 100,
        },
        {
            title: '记录时间',
            dataIndex: '记录时间',
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
            记录时间: '记录时间',
        });
    }

    //  病程记录
    export default {
        components: {
            ProgressNoteForm,
        },
        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  病程记录操作
                dialogDataProgressNote: this.initModal(DIALOG_TYPE.PROGRESS_NOTE),
            };
        },
        methods: {
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
                this.setProgressNoteId(3323);
                this.showModal(DIALOG_TYPE.PROGRESS_NOTE);
            },

            //  确认市场价格
            addProgressNoteModalCheck(refProgressNoteForm){
                const promise = this.$refs[refProgressNoteForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PROGRESS_NOTE);
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>