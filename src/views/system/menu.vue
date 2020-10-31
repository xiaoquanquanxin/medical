<template>
    <div class="layout-content-inner-main">
        <a-table :columns="columns"
                 :data-source="data"
                 class="components-table-demo-nested">
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
    </div>
</template>
<script>
    const columns = [
        { title: '菜单名称', dataIndex: 'name', width: 150, },
        { title: '图标', scopedSlots: { customRender: 'icon' }, width: 100, },
        { title: '菜单类型', dataIndex: 'roleType', width: 150, },
        { title: '操作', scopedSlots: { customRender: 'operation' }, width: 150, },
    ];
    import MenuBox from '@/components/system/menuBox.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { mapGetters, mapActions } from 'vuex';
    import { requestMenuAllTree } from '../../api/system/menu';

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
                dialogDataRole: this.initModal(DIALOG_TYPE.MENU),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestMenuAllTree()
                    .then(v => {
                        const { data } = v;
                        data.forEach((item, index) => {
                            item.key = index;
                            const { children } = item;
                            children.forEach((_item, _index) => {
                                _item.key = `${index}-${_index}`;
                                //  筛掉自页面的路由
                                if (!_item.children) {
                                    return;
                                }
                                if (!_item.children.length) {
                                    delete _item.children;
                                }
                            });
                        });
                        this.data = data;
                        console.log(data[0].children);
                    });
            },
            //  新增菜单
            addMenuFn(){
                this.setSelectRoleId(0);
                this.setRoleOperationType(1);
                this.setDialogTitle(DIALOG_TYPE.MENU, '新增菜单');
                this.showModal(DIALOG_TYPE.MENU);
            },
            //  编辑菜单
            editMenuFn(sItem){
                this.setSelectRoleId(sItem.roleId);
                this.setRoleOperationType(2);
                this.setDialogTitle(DIALOG_TYPE.MENU, '编辑菜单');
                this.showModal(DIALOG_TYPE.MENU);
            },
            //  查看菜单
            toViewMenuFn(sItem){
                this.setSelectRoleId(sItem.roleId);
                this.setRoleOperationType(3);
                this.setDialogTitle(DIALOG_TYPE.MENU, '查看菜单');
                this.showModal(DIALOG_TYPE.MENU);
            },
            //  检查莫泰框的值
            roleBoxModalCheck(refMenuBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.MENU, true);
                const promise = this.$refs[refMenuBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.MENU);
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
                        return;
                        return requestSettlementMosSave(this.searchData)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.$router.push({ name: 'monthly' });
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
