<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.brandName" placeholder="请输入品牌名称"/>
            <a-select class="lengthen-select-width"
                      v-model="searchData.status"
                      placeholder="请选择商品状态"
            >
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option :value="0">开启</a-select-option>
                <a-select-option :value="1">停用</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="addBrand">
                新增品牌
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
                    <a @click="editBrand(sItem)">编辑</a>
                    <!--                    <a @click="deleteBrand(sItem)">删除</a>-->
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
        <!--莫泰框-->
        <a-modal v-model="dialogDataAddBrand.visible"
                 v-if="dialogDataAddBrand.visible"
                 :confirm-loading="dialogDataAddBrand.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 :title="dialogDataAddBrand.title"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="brandBoxModalCheck('refAddBrandBox')">
            <AddBrandBox ref="refAddBrandBox"/>
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
    import AddBrandBox from '@/components/commodity/addBrandBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { requestBrandPage } from '../../api/commodity/brand';

    const columns = [
        {
            title: '品牌名称',
            dataIndex: 'brandName',
            width: 150,
        },
        {
            title: '品牌编码',
            dataIndex: 'brandNumber',
            width: 150,
        },
        {
            title: '生产厂家',
            dataIndex: 'brandManufactorId',
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
            AddBrandBox
        },
        data(){
            return {
                data: [],
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),

                //  分页信息
                pagination: paginationInit(),

                //  新增、编辑品牌管理莫泰框
                dialogDataAddBrand: this.initModal(DIALOG_TYPE.ADD_BRAND),

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
                requestBrandPage(paginationEncode(this.pagination))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('commodity', [
                //  设置被选中的商品列表
                'setBrandId',
            ]),
            onShowSizeChange,
            pageChange,

            //  新增品牌
            addBrand(){
                this.setDialogTitle(DIALOG_TYPE.ADD_BRAND, '添加品牌');
                this.showModal(DIALOG_TYPE.ADD_BRAND);
                this.setBrandId(0);
            },
            //  编辑品牌
            editBrand(sItem){
                this.setDialogTitle(DIALOG_TYPE.ADD_BRAND, '编辑品牌');
                this.showModal(DIALOG_TYPE.ADD_BRAND);
                this.setBrandId(sItem.id);
            },
//            //  删除品牌
//            deleteBrand(sItem){
//                this.$confirm({
//                    title: `确定删除${sItem.disease}`,
//
//                    okText: '确认',
//                    okType: 'danger',
//                    cancelText: '取消',
//                    onOk(){
//                        return new Promise((resolve, reject) => {
//                            console.log('发请求');
//                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
//                        }).catch(() => console.log('Oops errors!'));
//                    },
//                    onCancel(){
//                        console.log('取消');
//                    },
//                });
//            },

            //  确认品牌
            brandBoxModalCheck(refAddBrandBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ADD_BRAND, true);
                const promise = this.$refs[refAddBrandBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ADD_BRAND);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ADD_BRAND, false);
                });
            }
        }
    };
</script>