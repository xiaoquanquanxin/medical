<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="searchData.classificationName" placeholder="请输入分类名称"/>
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
                <a-button type="primary" @click="addClassification">
                    新增分类
                </a-button>
            </a-col>
        </a-input-group>
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
        <!--莫泰框-->
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
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import AddClassificationBox from '@/components/commodity/addClassificationBox.vue';
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'commodity',
            width: 150,
        },
        {
            title: '分类编码',
            dataIndex: 'city',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'operation',

            width: 150,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodity: `xx分类`,
            city: '上海',
            status: String(i % 2),
            icon: '分类图标',

        });
    }

    export default {
        components: {
            AddClassificationBox
        },
        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

                //  分页信息
                pagination,

                //  新增、编辑分类管理莫泰框
                dialogDataAddClassification: this.initModal(DIALOG_TYPE.ADD_CLASSIFICATION),

                //  搜索数据
                searchData: {},
            };
        },
        created(){
            //  this.dialogData.visible = true;
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('commodity', [
                //  设置被选中的商品列表
                'setClassificationId',
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
                this.setClassificationId(123344);
            },
            //  删除分类
            deleteClassification(sItem){
                this.$confirm({
                    title: `确定删除${sItem.disease}`,
                    //  content: 'Bla bla ...',
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
            },

            //  确认分类
            classificationBoxModalCheck(refAddClassificationBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ADD_CLASSIFICATION, true);
                const promise = this.$refs[refAddClassificationBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ADD_CLASSIFICATION);
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