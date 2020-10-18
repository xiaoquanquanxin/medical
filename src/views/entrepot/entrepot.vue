<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.entrepotName" placeholder="请输入仓库名称"/>
            <a-input class="basic-input-width" v-model="searchData.entrepotCode" placeholder="请输入仓库代码"/>
            <a-button class="basic-button-width" type="primary">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="addEntrepot()">
                新增仓库
            </a-button>
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
                    <a @click="editEntrepot(sItem)">编辑</a>
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
        <!--莫泰框-->
        <a-modal v-model="dialogDataEntrepot.visible"
                 v-if="dialogDataEntrepot.visible"
                 :confirm-loading="dialogDataEntrepot.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 :title="dialogDataEntrepot.title"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck()">
            <AddOrEditEntrepot ref="refAddOrEditEntrepot"/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import AddOrEditEntrepot from '@/components/entrepot/addOrEditEntrepot.vue';

    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '仓库代码',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '仓库地区',
            dataIndex: 'bbb',
            width: 100,
        },
        {
            title: '添加人',
            dataIndex: 'ccc',
            width: 100,
        },
        {
            title: '添加时间',
            dataIndex: 'dddd',
            width: 100,
        },

        {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            scopedSlots: { customRender: 'operation' }
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: '许晓飞',
            sex: '男',
            familyGroup: 'xxx',
        });
    }
    //  仓库管理
    export default {
        components: {
            AddOrEditEntrepot,
        },
        data(){
            return {
                data,
                columns,
                //  搜索相关
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  分页信息
                pagination,

                //	处方模板管理 - 增加口服肠内补充方案 - 选择商品
                dialogDataEntrepot: this.initModal(DIALOG_TYPE.ENTREPOT),
            };
        },

        methods: {
            //  莫泰框方法
            ...dialogMethods,
            //  家庭组信息
            ...mapActions('entrepot', [
                'setEntrepotId',
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
            //  新增仓库
            addEntrepot(){
                this.setEntrepotId(0);
                this.setDialogTitle(DIALOG_TYPE.ENTREPOT, '新增仓库');
                this.showModal(DIALOG_TYPE.ENTREPOT);
            },
            //  编辑仓库
            editEntrepot(sItem){
                this.setEntrepotId(1234452321);
                this.setDialogTitle(DIALOG_TYPE.ENTREPOT, '编辑仓库');
                this.showModal(DIALOG_TYPE.ENTREPOT);
                console.log(sItem);
            },
            //  确定
            modalCheck(){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ENTREPOT, true);
                const promise = this.$refs.refAddOrEditEntrepot.handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ENTREPOT);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ENTREPOT, false);
                });
            }
        }
    };
</script>