<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="searchData.departmentName"
                             placeholder="请输入科室名称"
                    />
                </a-col>
                <a-col :span="5">
                    <a-select v-model="searchData.status"
                              style="width:100%;"
                              placeholder="请选择状态"
                    >
                        <a-select-option value="Option1">
                            Option1
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-col :span="5">
                <router-link :to="{name:'addDepartment'}">
                    <a-button type="primary">
                        新增科室
                    </a-button>
                </router-link>
            </a-col>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div
                    slot="a-switch"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a-switch checked-children="开" un-checked-children="关"
                          :default-checked="!!sIndex"
                          @change="aSwitchChange(sItem,$event)"
                />
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editDepartment(sItem)">编辑</a>
                    <!--                    <a @click="deleteDepartment(sItem)">删除</a>-->
                    <a @click="relatedDisease(sItem)">关联疾病</a>
                    <a @click="relatedQuestionnaire(sItem)">关联评估调查表</a>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-pagination">
            <a-pagination
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
        <!--关联疾病-->
        <a-modal v-model="dialogDataAssociatedDisease.visible"
                 v-if="dialogDataAssociatedDisease.visible"
                 :confirm-loading="dialogDataAssociatedDisease.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="关联疾病"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="associatedDiseaseModalCheck('refAssociatedDisease')">
            <ShuttleBox ref="refAssociatedDisease"/>
        </a-modal>
        <!--关联评估调查表-->
        <a-modal v-model="dialogDataQuestionnaire.visible"
                 v-if="dialogDataQuestionnaire.visible"
                 :confirm-loading="dialogDataQuestionnaire.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="关联评估调查表"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="questionnaireModalCheck('refQuestionnaire')">
            <ShuttleBox ref="refQuestionnaire"/>
        </a-modal>
    </div>
</template>
<script>
    //    穿梭框
    import ShuttleBox from '@/components/shuttleBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '../../utils/tableScroll';
    import { SHUTTLE_BOX } from '../../store/modules/shuttleBox';

    const columns = [
        {
            title: '科室名称',
            dataIndex: 'department',
            width: 150,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 150,
            scopedSlots: { customRender: 'a-switch' },
        },
        {
            title: '操作',
            dataIndex: 'operation',

            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            department: `xx科室`,
            status: String(i % 2),
        });
    }
    //  科室管理
    export default {
        components: {
            ShuttleBox,
        },

        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

                //  分页信息
                pagination,
                //  关联疾病
                dialogDataAssociatedDisease: this.initModal(DIALOG_TYPE.ASSOCIATED_DISEASE),
                //  关联评估调查表
                dialogDataQuestionnaire: this.initModal(DIALOG_TYPE.QUESTIONNAIRE),

                //  搜索数据
                searchData: {},
            };
        },

        methods: {
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('shuttleBox', [
                //  设置穿梭框类型
                'setShuttleBoxType',
            ]),
            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
                this.pagination.pageSize = pageSize;
            },
            //  切换分页页码
            pageChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
            },
            //  切换状态
            aSwitchChange(sItem, checked){
                console.log(sItem, checked);
            },
            //  编辑科室
            editDepartment(sItem){
                this.$router.push({ name: 'editDepartment', params: { departmentId: '12343312' } });
            },

            //  关联疾病
            relatedDisease(sItem){
                this.showModal(DIALOG_TYPE.ASSOCIATED_DISEASE);
                this.setShuttleBoxType(SHUTTLE_BOX.ASSOCIATED_DISEASE);
            },
            //  关联评估调查表
            relatedQuestionnaire(sItem){
                this.showModal(DIALOG_TYPE.QUESTIONNAIRE);
                this.setShuttleBoxType(SHUTTLE_BOX.QUESTIONNAIRE);
            },
            //  关联疾病
            associatedDiseaseModalCheck(refAssociatedDisease){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_DISEASE, true);
                const promise = this.$refs[refAssociatedDisease].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ASSOCIATED_DISEASE);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_DISEASE, false);
                });
            },
            //  关联评估调查表
            questionnaireModalCheck(refQuestionnaire){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.QUESTIONNAIRE, true);
                const promise = this.$refs[refQuestionnaire].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.QUESTIONNAIRE);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.QUESTIONNAIRE, false);
                });
            },
        }
    };
    //  删除科室
    //    deleteDepartment(sItem){
    //        console.log(sItem.department);
    //        this.$confirm({
    //            title: `确定删除${sItem.department}`,
    //            //  content: 'Bla bla ...',
    //            okText: '确认',
    //            okType: 'danger',
    //            cancelText: '取消',
    //            onOk(){
    //                return new Promise((resolve, reject) => {
    //                    console.log('发请求');
    //                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
    //                }).catch(() => console.log('Oops errors!'));
    //            },
    //            onCancel(){
    //                console.log('取消');
    //            },
    //        });
    //    },
</script>
<style scoped lang="stylus">
</style>