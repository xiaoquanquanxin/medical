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
                <a @click="activityBriefDetail(sItem)">详情</a>
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

    //  活动小结
    export default {
        components: {
            ActivityBriefForm,
        },
        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  活动小结操作
                dialogDataActivityBrief: this.initModal(DIALOG_TYPE.ACTIVITY_BRIEF),
            };
        },
        methods: {
            //  主要请求
            searchFn(){

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
                this.setActivityBriefId(3323);
                this.showModal(DIALOG_TYPE.ACTIVITY_BRIEF);
            },

            //  确认详情
            addActivityBriefModalCheck(refActivityBriefForm){
                const promise = this.$refs[refActivityBriefForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ACTIVITY_BRIEF);
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>