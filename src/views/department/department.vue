<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.deptName" placeholder="请输入科室名称"/>
            <a-select class="basic-select-width" v-model="searchData.status"
                      placeholder="请选择状态"
            >
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="0">关闭</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addDepartment'}">
                <a-button type="primary">
                    新增科室
                </a-button>
            </router-link>
        </div>
        <!--表格-->
        <a-table :columns="columns"
                 :data-source="data"
                 :scroll="scroll"
                 :pagination="false"
        >
            <!--选择状态-->
            <div slot="a-switch"
                 slot-scope="scope,sItem,sIndex,extra"
            >
                <a-switch checked-children="开" un-checked-children="关"
                          :checked="!!sItem.status"
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
                    v-if="pagination.total"
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
            <ShuttleBox ref="refAssociatedDisease"
                        :origin-list="shuttleOriginList"
                        :origin-target-key="shuttleOriginTargetKey"
            />
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
            <ShuttleBox ref="refQuestionnaire"
                        :origin-list="shuttleOriginList"
                        :origin-target-key="shuttleOriginTargetKey"
            />
        </a-modal>
    </div>
</template>
<script>
    //    穿梭框
    import ShuttleBox from '@/components/shuttleBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { SHUTTLE_BOX } from '../../store/modules/shuttleBox';
    import {
        requestDiseaseListDiseaseDeptId,
        requestDeptPage,
        requestDeptRelatedDiseases, requestDeptRelatedRelatedAssess,
        requestDeptUpdate, requestAssessListDiseaseDeptId
    } from '../../api/department';
    import { requestDiseaseList } from '../../api/disease';
    import { requestAssessList } from '../../api/questionnaire';

    const columns = [
        {
            title: '科室名称',
            dataIndex: 'deptName',
            width: 150,
        },
        {
            title: '状态',
            scopedSlots: { customRender: 'a-switch' },
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 250,
        },
    ];
    //  科室管理
    export default {
        components: {
            ShuttleBox,
        },

        data(){
            return {
                data: [],
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),

                //  分页信息
                pagination: paginationInit(),
                //  关联疾病
                dialogDataAssociatedDisease: this.initModal(DIALOG_TYPE.ASSOCIATED_DISEASE),
                //  关联评估调查表
                dialogDataQuestionnaire: this.initModal(DIALOG_TYPE.QUESTIONNAIRE),

                //  搜索数据
                searchData: {},

                //  穿梭框数据
                shuttleOriginList: [],
                //  穿梭框默认值
                shuttleOriginTargetKey: [],
                //  穿梭框操作的sItem
                shuttleBoxData: {},
            };
        },

        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestDeptPage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        //  console.log(JSON.parse(JSON.stringify(data.records[0])));
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('shuttleBox', [
                //  设置穿梭框类型
                'setShuttleBoxType',
                //  设置原始数据
                'setOriginList',
                //  设置被选中的数据
                'setSelectList',
            ]),
               onShowSizeChange,
            pageChange,
            //  切换状态
            aSwitchChange(sItem, checked){
                requestDeptUpdate(Object.assign({}, sItem, { status: checked ? 1 : 0 }))
                    .then(v => {
                        sItem.status = !!checked;
                        this.$message.success('操作成功');
                    })
                    .catch(err => {
                        this.$message.error('操作失败');
                        sItem.status = !checked;
                        console.log(err);
                    });
            },
            //  编辑科室
            editDepartment(sItem){
                this.$router.push({ name: 'editDepartment', params: { departmentId: sItem.id } });
            },
            //  关联疾病
            relatedDisease(sItem){
                this.shuttleBoxData = sItem;
                Promise.all([
                    requestDiseaseList(),
                    requestDiseaseListDiseaseDeptId(sItem.id),
                ])
                    .then(v => {
                        const list1 = v[0].data || [];
                        const list2 = v[1].data || [];
                        const shuttleOriginList = [];
                        const shuttleOriginTargetKey = list2.map(String);
                        list1.forEach(item => {
                            const data = {};
                            data.key = item.id.toString();
                            data.title = item.diseaseName;
                            data.description = item.diseaseName;
                            shuttleOriginList.push(data);
                        });
                        console.log(shuttleOriginList);
                        console.log(shuttleOriginTargetKey);
                        this.shuttleOriginList = shuttleOriginList;
                        this.shuttleOriginTargetKey = shuttleOriginTargetKey;
                        this.showModal(DIALOG_TYPE.ASSOCIATED_DISEASE);
                        this.setShuttleBoxType(SHUTTLE_BOX.ASSOCIATED_DISEASE);
                    })
                    .catch(err => {
                        console.log(err);
                        alert('接口报错');
                    });
            },
            //  关联疾病确定
            associatedDiseaseModalCheck(refAssociatedDisease){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_DISEASE, true);
                const promise = this.$refs[refAssociatedDisease].handleSubmit();
                promise.then(targetKeys => {
                    console.log(targetKeys);
                    console.log(this.shuttleBoxData.id);
                    return requestDeptRelatedDiseases({
                        deptId: this.shuttleBoxData.id,
                        diseasesds: targetKeys
                    })
                        .then(v => {
                            this.$message.success('操作成功');
                            this.hideModal(DIALOG_TYPE.ASSOCIATED_DISEASE);
                            this.searchFn();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_DISEASE, false);
                });
            },

            //  关联评估调查表
            relatedQuestionnaire(sItem){
                this.shuttleBoxData = sItem;
                Promise.all([
                    requestAssessList(),
                    requestAssessListDiseaseDeptId(sItem.id),
                ])
                    .then(v => {
                        const list1 = v[0].data || [];
                        const list2 = v[1].data || [];
                        const shuttleOriginList = [];
                        const shuttleOriginTargetKey = list2.map(String);
                        list1.forEach(item => {
                            const data = {};
                            data.key = item.id.toString();
                            data.title = item.assessName;
                            data.description = item.assessName;
                            shuttleOriginList.push(data);
                        });
                        //  console.log(shuttleOriginList);
                        //  console.log(shuttleOriginTargetKey);
                        this.shuttleOriginList = shuttleOriginList;
                        this.shuttleOriginTargetKey = shuttleOriginTargetKey;
                        this.showModal(DIALOG_TYPE.QUESTIONNAIRE);
                        this.setShuttleBoxType(SHUTTLE_BOX.QUESTIONNAIRE);
                    })
                    .catch(err => {
                        console.log(err);
                        alert('接口报错');
                    });
            },

            //  关联评估调查表确定
            questionnaireModalCheck(refQuestionnaire){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.QUESTIONNAIRE, true);
                const promise = this.$refs[refQuestionnaire].handleSubmit();
                promise.then(targetKeys => {
                    console.log(targetKeys);
                    console.log(this.shuttleBoxData.id);
                    alert('文档参数不对');
                    return requestDeptRelatedRelatedAssess({
                        deptId: this.shuttleBoxData.id,
                        assessId: targetKeys
                    })
                        .then(v => {
                            this.$message.success('操作成功');
                            this.hideModal(DIALOG_TYPE.QUESTIONNAIRE);
                            this.searchFn();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
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
    //
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