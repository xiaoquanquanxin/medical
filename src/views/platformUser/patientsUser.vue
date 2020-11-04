<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.name" placeholder="请输入姓名"/>
            <a-select class="basic-select-width" v-model="searchData.hospital" placeholder="请选择医院">
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
                <a-select-option value="323">
                    122112
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" v-model="searchData.department" placeholder="请选择科室">
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
                <a-select-option value="323">
                    122112
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" v-model="searchData.doctor" placeholder="请选择医生">
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
                <a-select-option value="323">
                    122112
                </a-select-option>
            </a-select>
            <a-select class="longer-select-width" v-model="searchData.isPatient" placeholder="请选择是否为病患">
                <a-select-option value="3223">
                    是
                </a-select-option>
                <a-select-option value="43">
                    否
                </a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn()">搜索</a-button>
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
                    <a @click="editUser(sItem,sIndex,extra)">编辑</a>
                    <!--                    <a @click="deleteUser(sItem)">删除</a>-->
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
        <a-modal v-model="dialogDataPatientsUser.visible"
                 v-if="dialogDataPatientsUser.visible"
                 :confirm-loading="dialogDataPatientsUser.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="编辑患者用户"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck('refEditPatientsUser')">
            <EditPatientsUser ref="refEditPatientsUser"/>
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
    import { oneRowSearch } from '@/utils/tableScroll';
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import EditPatientsUser from '@/components/editPatientsUser/editPatientsUser.vue';

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
        },
        {
            title: '医院',
            dataIndex: '',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: '',
            width: 100,
        },
        {
            title: '主治医生',
            dataIndex: '',
            width: 100,
        },
        {
            title: '是否为患者',
            dataIndex: 'applets',
            width: 120,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            key: i,
            department: `xx科室`,
            status: String(i % 2),
        });
    }
    //  用户管理
    export default {
        components: {
            EditPatientsUser,
        },
        data(){
            return {
                //  搜索数据
                searchData: {},

                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),

                //  分页信息
                pagination: paginationInit(),
                //  编辑患者用户
                dialogDataPatientsUser: this.initModal(DIALOG_TYPE.PATIENTS_USER),
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
            //  编辑用userId
            ...mapActions('patientsUser', [
                'setPatientsUserId',
            ]),
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
               onShowSizeChange,
            pageChange,
            //  编辑用户
            editUser(sItem){
                this.setPatientsUserId(1243323);
                this.showModal(DIALOG_TYPE.PATIENTS_USER);
            },
            //  编辑完成
            modalCheck(refEditPatientsUser){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.PATIENTS_USER, true);
                const promise = this.$refs[refEditPatientsUser].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PATIENTS_USER);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.PATIENTS_USER, false);
                });
            },
            //  删除用户
            deleteUser(sItem){
                console.log(sItem);
                this.$confirm({
                    title: `确定删除${sItem.disease}`,
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
        }
    };
</script>
<style lang="stylus">
</style>