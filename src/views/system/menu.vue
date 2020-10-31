<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <a-button type="primary" @click="addMenuFn()">新建菜单</a-button>
        </div>
        <div class="a-input-group" data-msg="占位"></div>
        <a-table class="components-table-demo-nested"
                 :columns="columns"
                 :data-source="data"
                 :scroll="scroll"
                 :pagination="false"
        >
            <!--图标-->
            <img slot="icon" slot-scope="scope,sItem,sIndex,extra"
                 :src="scope.icon"/>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="addMenuFn(sItem)">新增</a>
                    <a @click="editMenuFn(sItem)">编辑</a>
                    <a @click="deleteMenuFn(sItem)">删除</a>
                </a-space>
            </div>
        </a-table>
        <!--莫泰框-->
        <a-modal v-model="dialogMenu.visible"
                 v-if="dialogMenu.visible"
                 :confirm-loading="dialogMenu.confirmLoading"
                 :title="dialogMenu.title"
                 :maskClosable="false"
                 :centered="true"
                 :width="600"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="menuBoxModalCheck('refMenuBox')">
            <MenuBox ref="refMenuBox"
                     :open-data="openData"
            />
        </a-modal>
    </div>
</template>
<script>
    const columns = [
        { title: '菜单名称', dataIndex: 'name', width: 150, },
//        { title: '图标', scopedSlots: { customRender: 'icon' }, width: 100, },
        { title: '菜单类型', dataIndex: 'typeText', width: 150, },
        { title: '操作', scopedSlots: { customRender: 'operation' }, width: 150, },
    ];
    import MenuBox from '@/components/system/menuBox.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { mapGetters, mapActions } from 'vuex';
    import { requestMenu, requestMenuAllTree, requestMenuGet } from '../../api/system/menu';

    export default {
        components: {
            MenuBox,
        },
        data(){
            return {
                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  新增、编辑、查看菜单
                dialogMenu: this.initModal(DIALOG_TYPE.MENU),
                //  向新增菜单组件传入的参数
                openData: null,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestMenuAllTree()
                    .then(data => {
                        this.data = data;
                    });
            },
            //  新增菜单
            addMenuFn(sItem){
                this.openData = {
                    operationType: 1,
                };
                //  如果是新增
                if (sItem) {
                    this.openData.parentId = sItem.id;
                    this.openData.parentName = sItem.name;
                }
                this.setDialogTitle(DIALOG_TYPE.MENU, '新增菜单');
                this.showModal(DIALOG_TYPE.MENU);
            },
            //  编辑菜单
            editMenuFn(sItem){
//                console.log(JSON.parse(JSON.stringify(sItem)));
                const { id, } = sItem;
                requestMenuGet(id)
                    .then(v => {
                        this.openData = Object.assign(v.data, { operationType: 2, });
                        this.setDialogTitle(DIALOG_TYPE.MENU, '编辑菜单');
                        this.showModal(DIALOG_TYPE.MENU);
                    });
            },
            //  查看菜单
            toViewMenuFn(sItem){
                this.setSelectRoleId(sItem.roleId);
                this.setRoleOperationType(3);
                this.setDialogTitle(DIALOG_TYPE.MENU, '查看菜单');
                this.showModal(DIALOG_TYPE.MENU);
            },
            //  检查莫泰框的值
            menuBoxModalCheck(refMenuBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.MENU, true);
                const promise = this.$refs[refMenuBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.MENU);
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.MENU, false);
                });
            },
            //  删除菜单
            deleteMenuFn(sItem){
                this.$confirm({
                    title: `确定删除${sItem.name}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        requestMenu(sItem.id)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(v => {
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  莫泰框方法
            ...dialogMethods,
            //  store
            ...mapActions('system', [
                'setSelectRoleId',
                'setRoleOperationType',
            ]),

        }
    };
</script>
