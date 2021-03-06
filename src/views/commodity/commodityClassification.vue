<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.classificationName" placeholder="请输入分类名称"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-col :span="5">
                <a-button type="primary" @click="addClassification">
                    新增分类
                </a-button>
            </a-col>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editClassification(sItem)">编辑</a>
                    <a @click="deleteClassification(sItem)">删除</a>
                </a-space>
            </div>
            <template slot="priceView" slot-scope="scope,sItem,sIndex,extra">
                <a @click="priceView(sItem)">查看</a>
            </template>
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
        <!--新增、编辑分类莫泰框-->
        <a-modal v-model="dialogDataAddClassification.visible"
                 v-if="dialogDataAddClassification.visible"
                 :confirm-loading="dialogDataAddClassification.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 :title="dialogDataAddClassification.title"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="classificationBoxModalCheck('refAddClassificationBox')">
            <AddClassificationBox ref="refAddClassificationBox"/>
        </a-modal>
    </div>
</template>
<script>
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import AddClassificationBox from '@/components/commodity/addClassificationBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { requestCategoryDelete, requestCategoryPage } from '../../api/commodity/commodityClassification';

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'categoryName',
            width: 150,
        },
        {
            title: '分类编码',
            dataIndex: 'categoryCode',
            width: 150,
        },
        {
            title: '操作',

            width: 150,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    export default {
        components: {
            AddClassificationBox
        },
        data(){
            return {
                data: [],
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),

                //  分页信息
                pagination: paginationInit(),

                //  新增、编辑分类管理莫泰框
                dialogDataAddClassification: this.initModal(DIALOG_TYPE.ADD_CLASSIFICATION),

                //  搜索数据
                searchData: {},
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestCategoryPage(paginationEncode(this.pagination))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('commodity', [
                //  设置被选中的商品列表
                'setClassificationId',
            ]),
               onShowSizeChange,
            pageChange,

            //  新增分类
            addClassification(){
                this.setDialogTitle(DIALOG_TYPE.ADD_CLASSIFICATION, '添加分类');
                this.showModal(DIALOG_TYPE.ADD_CLASSIFICATION);
                this.setClassificationId(0);
            },
            //  编辑分类
            editClassification(sItem){
                this.setDialogTitle(DIALOG_TYPE.ADD_CLASSIFICATION, '编辑分类');
                this.showModal(DIALOG_TYPE.ADD_CLASSIFICATION);
                this.setClassificationId(sItem.id);
            },
            //  删除分类
            deleteClassification(sItem){
                this.$confirm({
                    title: `确定删除${sItem.categoryName}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        requestCategoryDelete(sItem.id)
                            .then(v => {
                                this.$success({ title: '删除成功' });
                                this.searchFn();
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('删除失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },

            //  确认分类
            classificationBoxModalCheck(refAddClassificationBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ADD_CLASSIFICATION, true);
                const promise = this.$refs[refAddClassificationBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ADD_CLASSIFICATION);
                    this.$message.success('操作成功');
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ADD_CLASSIFICATION, false);
                });
            }
        }
    };
</script>