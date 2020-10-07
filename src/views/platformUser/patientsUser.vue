<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="name" placeholder="请输入姓名"/>
                </a-col>
                <a-col :span="5">
                    <a-select v-model="hospital" style="width:100%;">
                        <a-select-option :value='null'>
                            请选择医院
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select v-model="department" style="width:100%;">
                        <a-select-option :value='null'>
                            请选择科室
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select v-model="doctor" style="width:100%;">
                        <a-select-option :value='null'>
                            请选择主治医生
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select v-model="isPatient" style="width:100%;">
                        <a-select-option :value='null'>
                            是否为患者
                        </a-select-option>
                        <a-select-option value="Option2">
                            是
                        </a-select-option>
                        <a-select-option value="Option2">
                            否
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select v-model="status" style="width:100%;">
                        <a-select-option :value='null'>
                            状态
                        </a-select-option>
                        <a-select-option value="Option2">
                            是
                        </a-select-option>
                        <a-select-option value="Option2">
                            否
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="4">
                    <a-button type="primary" @click="searchBtn()">搜索</a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editUser(sItem,sIndex,extra)">编辑</a>
                    <!--                    <a @click="deleteUser(sItem)">删除</a>-->
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
        <a-modal v-model="dialogData.visible"
                 v-if="dialogData.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="编辑患者用户"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck()">
            <EditPatientsUser ref="refEditPatientsUser"/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '../../utils/tableScroll';
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods, dialogData } from '@/utils/dialog';
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
            title: '状态',
            dataIndex: 'status',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            scopedSlots: { customRender: 'tags' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            department: `xx科室`,
            status: String(i % 2),
            tags: ['编辑', '删除', '关联疾病'],
        });
    }
    //  用户管理
    export default {
        components:{
            EditPatientsUser,
        },
        data(){
            return {
                name: null,
                hospital: null,
                department: null,
                doctor: null,
                isPatient: null,
                status: null,

                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  分页信息
                pagination,
                //  莫泰框
                dialogData,
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
            //  编辑用userId
            ...mapActions('patientsUser', [
                'setPatientsUserId',
            ]),
            //  搜索
            searchBtn(){
                console.log(this.name);
                console.log(this.doctor);
                console.log(this.hospital);
                console.log(this.department);
            },
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
            //  编辑用户
            editUser(sItem){
                this.setPatientsUserId(1243323);
                this.showModal();
            },
            //  删除用户
            deleteUser(sItem){
                console.log(sItem);
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
            //
            modalCheck(){
                const promise = this.$refs.refEditPatientsUser.handleSubmit();
                promise.then(v => {
                    this.hideModal();
                }).catch(error => {
                    console.log('有错');
                });
            }
        }
    };
</script>
<style lang="stylus">
</style>