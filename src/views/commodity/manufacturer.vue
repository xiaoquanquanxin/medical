<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="selectData.manufacturerName" placeholder="请输入生产厂家名称"/>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="selectData.status"
                            placeholder="请选择商品状态"
                            style="width:100%;"
                    >
                        <a-select-option value="">
                            商品状态
                        </a-select-option>
                        <a-select-option value="1">
                            山西
                        </a-select-option>
                        <a-select-option value="2">
                            陕西
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
                <a-button type="primary" @click="addManufacturer">
                    新增生产厂家
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
                    <a @click="editManufacturer(sItem)">编辑</a>
                    <!--                    <a @click="deleteManufacturer(sItem)">删除</a>-->
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-input-group">
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
                    <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                    <span v-if="props.value === '50'">全部</span>
                </template>
            </a-pagination>
        </a-row>
        <!--莫泰框-->
        <a-modal v-model="dialogDataAddManufacturer.visible"
                 v-if="dialogDataAddManufacturer.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 :title="dialogDataAddManufacturer.title"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="manufacturerBoxModalCheck('refAddManufacturerBox')">
            <AddManufacturerBox ref="refAddManufacturerBox"/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '../../utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import AddManufacturerBox from '@/components/commodity/addManufacturerBox.vue';
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '生产厂家名称',
            dataIndex: 'commodity',
            width: 150,
        },
        {
            title: '生产厂家编码',
            dataIndex: 'city',
            width: 150,
        },
        {
            title: '地址',
            dataIndex: 'manufacturer',
            width: 150,
        },
        {
            title: '联系方式',
            dataIndex: 'manufac1turer',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 150,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodity: `xx生产厂家`,
            city: '上海',
            status: String(i % 2),
            icon: '生产厂家图标',
            operation: ['编辑', '关联科室'],
        });
    }

    //  生产厂家
    export default {
        components: {
            AddManufacturerBox
        },
        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

                //  分页信息
                pagination,

                //  新增、编辑生产厂家管理莫泰框
                dialogDataAddManufacturer: this.initModal(DIALOG_TYPE.ADD_MANUFACTURER),

                //  搜索数据
                selectData: {
                    //  manufacturerName: null,
                    //  status: null,
                }
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
                'setManufacturerId',
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

            //  新增生产厂家
            addManufacturer(){
                this.setDialogTitle(DIALOG_TYPE.ADD_MANUFACTURER, '添加生产厂家');
                this.showModal(DIALOG_TYPE.ADD_MANUFACTURER);
                this.setManufacturerId(0);
            },
            //  编辑生产厂家
            editManufacturer(sItem){
                this.setDialogTitle(DIALOG_TYPE.ADD_MANUFACTURER, '编辑生产厂家');
                this.showModal(DIALOG_TYPE.ADD_MANUFACTURER);
                this.setManufacturerId(123344);
            },
//            //  删除生产厂家
//            deleteManufacturer(sItem){
//                this.$confirm({
//                    title: `确定删除${sItem.disease}`,
//                    //  content: 'Bla bla ...',
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

            //  确认生产厂家
            manufacturerBoxModalCheck(refAddManufacturerBox){
                const promise = this.$refs[refAddManufacturerBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ADD_MANUFACTURER);
                }).catch(error => {
                    console.log('有错');
                });
            }
        }
    };
</script>
<style scoped lang="stylus">
</style>