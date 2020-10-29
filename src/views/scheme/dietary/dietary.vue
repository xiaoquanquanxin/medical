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
            <a-select class="lengthen-select-width" v-model="searchData.method" placeholder="请选择食物类型">
                <a-select-option value="1">
                    流食
                </a-select-option>
                <a-select-option value="2">
                    普食
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
            <router-link :to="{name:'addDietary'}">
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
                    <router-link :to="{name:'editDietary',params:{dietaryId:'123'}}">编辑</router-link>
                    <a @click="deleteScheme(sItem,sIndex)">删除</a>
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
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { threeRowSearch } from '@/utils/tableScroll';
    import { requestPrescriptionTemplatePage } from '../../../api/scheme/scheme';
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
            title: '食物类型',
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

    //  膳食营养计划
    export default {
        data(){
            return {
                //  处方类型下拉
                prescriptionTypeList,
                //  能量下拉
                energyList,

                //  医院列表
                hospitalList: [],
                //  食用方法下拉
                usageMethodList,
                data: [],
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: threeRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据,
                searchData: {
                    prescriptionType: 3,
                },
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestHospitalGetList()
                    .then(v => {
                        this.hospitalList = v.data;
                        //console.log(JSON.parse(JSON.stringify(v.data)));
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
                        //  console.log(JSON.parse(JSON.stringify(this.data[0])));
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
            deleteScheme(sItem, sIndex){
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