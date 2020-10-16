<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="4">
                    <a-input placeholder="请输入姓名" v-model="searchData.doctorName"/>
                </a-col>
                <a-col :span="4">
                    <a-input placeholder="请输入手机号" v-model="searchData.phoneNumber"/>
                </a-col>
                <a-col :span="4">
                    <a-select style="width:100%;"
                              placeholder="请选择医院"
                              v-model="searchData.hospital"
                    >
                        <a-select-option value="Option1">
                            Option1
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="4">
                    <a-select style="width:100%;"
                              placeholder="请选择科室"
                              v-model="searchData.department"
                    >
                        <a-select-option value="Option1">
                            Option1
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="4">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-col :span="4">
                <router-link :to="{name:'addDoctor'}">
                    <a-button type="primary">
                        新增医生
                    </a-button>
                </router-link>
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
                    <router-link :to="{name:'editDoctor',params:{doctorId:'32'}}">编辑</router-link>
                    <a @click="deleteDoctor(sItem)">删除</a>
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
    </div>
</template>
<script>
    //    穿梭框
    import ShuttleBox from '@/components/shuttleBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '姓名',
            dataIndex: 'doctor',
            width: 100,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            width: 100,
        }, {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
        },
        {
            title: '医院',
            dataIndex: 'hospital',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'department',
            width: 100,
        },
        {
            title: '医生类型',
            dataIndex: 'doctorType',
            width: 100,
        },
        {
            title: '医生职称',
            dataIndex: 'doctorTitle',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'operation',

            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            doctor: `xx医生`,
            status: String(i % 2),
        });
    }
    //  医生管理
    export default {
        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

                //  分页信息
                pagination,

                //  搜索数据
                searchData: {},
            };
        },

        methods: {
            //  莫泰框方法
            ...dialogMethods,
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
            //  删除医生
            deleteDoctor(sItem){
                console.log(sItem.doctor);
                this.$confirm({
                    title: `确定删除${sItem.doctor}`,
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
        }
    };
</script>
<style scoped lang="stylus">
</style>