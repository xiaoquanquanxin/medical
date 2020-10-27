<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.schemeName" placeholder="请输入方案名称"/>
            <a-select class="basic-select-width" v-model="searchData.energy" placeholder="请选择能量">
                <a-select-option :value="item.id"
                                 :key="item.id"
                                 v-for="item in energyList"
                >{{item.name}}
                </a-select-option>
            </a-select>
            <a-select class="lengthen-select-width" v-model="searchData.usageMethod" placeholder="请选择食用方法">
                <a-select-option :value="item.id"
                                 :key="item.id"
                                 v-for="item in usageMethodList"
                >{{item.name}}
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" placeholder="请选择医院" v-model="searchData.hospitalId"
            >
                <a-select-option v-for="(item,index) in hospitalList"
                                 :key="index"
                                 :value="item.id"
                >
                    {{item.hospitalName}}
                </a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addOral'}">
                <a-button type="primary">
                    新增方案
                </a-button>
            </router-link>
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
                    <router-link :to="{name:'editOral',params:{oralId:sItem.id}}">编辑</router-link>
                    <a @click="deleteScheme(sItem)">删除</a>
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
    import { paginationInit, paginationDecode, paginationEncode } from '@/utils/pagination.ts';
    import { threeRowSearch } from '@/utils/tableScroll';
    import { requestPrescriptionTemplateDelete, requestPrescriptionTemplatePage } from '../../../api/scheme/scheme';
    import { prescriptionTypeList, energyList, usageMethodList } from '../../../utils/constants';
    import { requestHospitalGetList } from '../../../api/hospital';

    const columns = [
        {
            title: '方案名称',
            dataIndex: 'prescriptionName',
            width: 100,
        },
        {
            title: '能量',
            dataIndex: 'energy',
            width: 100,
        },
        {
            title: '使用方法',
            dataIndex: 'usageMethod',
            width: 100,
        },
        {
            title: '疾病',
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];

    export default {
        computed: {},
        data(){
            return {
                data: [],
                columns,

                //  医院列表
                hospitalList: [],

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: threeRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {
                    prescriptionType: this.$route.name === 'oral' ? 1 : 2
                },
                //  处方类型下拉
                prescriptionTypeList,
                //  能量下拉
                energyList,
                //  食用方法下拉
                usageMethodList,
            };
        },
        watch: {
            $route(value){
                console.log('路由变化请求');
                this.searchData.prescriptionType = this.$route.name === 'oral' ? 1 : 2;
                this.searchFn();
            }
        },
        created(){
            console.log('create请求');
            this.searchFn();
            console.log(this.aaa);
        },
        methods: {
            //  主要请求
            searchFn(){
                requestHospitalGetList()
                    .then(v => {
                        this.hospitalList = v.data;
                        console.log(JSON.parse(JSON.stringify(v.data)));
                    });
//                this.data.push({ key: 1 });
                requestPrescriptionTemplatePage(Object.assign({},
                    this.searchData,
                    paginationEncode(this.pagination))
                )
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(this.data[0])));
                    });
            },
            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                this.pagination.pageSize = pageSize;
                this.pagination.current = 1;
                this.searchFn();
            },
            //  切换分页页码
            pageChange(current){
                this.pagination.current = current;
                this.searchFn();
            },
            //  删除管理
            deleteScheme(sItem){
                this.$confirm({
                    title: `确定删除${sItem.disease}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        return requestPrescriptionTemplateDelete(sItem.id)
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
        }
    };
</script>