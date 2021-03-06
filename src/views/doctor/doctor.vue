<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" placeholder="请输入姓名" v-model="searchData.doctorName"/>
            <a-input class="basic-input-width" placeholder="请输入手机号" v-model="searchData.phone"/>
            <a-select class="basic-select-width" placeholder="请选择医院" v-model="searchData.hospitalId"
                      @change="selectHospitalChange"
            >
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option v-for="item in hospitalList"
                                 :value="item.id"
                >
                    {{item.hospitalName}}
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" placeholder="请选择科室" v-model="searchData.department">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option v-for="item in deptInHospitalList"
                                 :value="item.id">
                    {{item.deptName}}
                </a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-col :span="4">
                <router-link :to="{name:'addDoctor'}">
                    <a-button type="primary">
                        新增医生
                    </a-button>
                </router-link>
            </a-col>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <!--性别-->
            <div slot="sex" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="scope.sex == 1">男</span>
                <span v-if="scope.sex == 0">女</span>
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <router-link :to="{name:'editDoctor',params:{doctorId:sItem.id}}">编辑</router-link>
<!--                    <a @click="deleteDoctor(sItem)">删除</a>-->
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
    </div>
</template>
<script>
    //    穿梭框
    import ShuttleBox from '@/components/shuttleBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { requestDoctorPage } from '../../api/doctor';
    import { requestDeptListDeptHospitalId, requestHospitalGetList } from '../../api/hospital';
    import { requestDeptList } from '../../api/department';

    const columns = [
        {
            title: '姓名',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            width: 150,
        }, {
            title: '性别',
            scopedSlots: { customRender: 'sex' },
            width: 100,
        },
        {
            title: '医院',
            dataIndex: 'hospitalName',
            width: 150,
        },
        {
            title: '科室',
            dataIndex: 'deptName',
            width: 100,
        },
        {
            title: '医生类型',
            dataIndex: 'doctorTypeName',
            width: 100,
        },
        {
            title: '医生职称',
            dataIndex: 'doctorTitleName',
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];
    //  医生管理
    export default {
        data(){
            return {
                data: [],
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),

                //  分页信息
                pagination: paginationInit(),

                //  搜索数据
                searchData: {
                    department: undefined,
                },
                //  全部科室列表
                deptList: [],
                //  关联科室列表
                deptInHospitalList: [],
                //  医院列表
                hospitalList: []
            };
        },

        created(){
            this.searchFn();
            //  全部医院list
            requestHospitalGetList()
                .then(hospitalList => {
                    this.hospitalList = hospitalList;
                });
            //  全部科室
            requestDeptList()
                .then(deptList => {
                    this.deptList = deptList;
                });
        },
        methods: {
            //  主要请求
            searchFn(){
                requestDoctorPage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
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
            //  切换医院
            selectHospitalChange(value){
                this.searchData.department = undefined;
                requestDeptListDeptHospitalId(value)
                    .then(v => {
                        const map = {};
                        v.data.forEach(item => {
                            map[item] = true;
                        });
                        const deptInHospitalList = [];
                        this.deptList.forEach(item => {
                            if (map[item.id]) {
                                deptInHospitalList.push(item);
                            }
                        });
                        this.deptInHospitalList = deptInHospitalList;
                    });
            },
            //  删除医生
            deleteDoctor(sItem){
                alert('没删除医生接口');
                console.log(sItem.doctorName);
                this.$confirm({
                    title: `确定删除${sItem.doctorName}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){

                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  莫泰框方法
            ...dialogMethods,
            onShowSizeChange,
            pageChange,
        }
    };
</script>
<style scoped lang="stylus">
</style>