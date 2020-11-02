<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.schemeName" placeholder="请输入方案名称"/>
            <a-select class="basic-select-width" v-model="searchData.energy" placeholder="请选择能量">
                <a-select-option :value="item.id"
                                 v-for="item in energyList"
                >{{item.name}}
                </a-select-option>
            </a-select>
            <a-select class="lengthen-select-width" v-model="searchData.usageMethod" placeholder="请选择食用方法">
                <a-select-option :value="item.id"
                                 v-for="item in usageMethodList"
                >{{item.name}}
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" placeholder="请选择医院" v-model="searchData.hospitalId"
            >
                <a-select-option v-for="(item,index) in hospitalList"
                                 :value="item.id"
                >{{item.hospitalName}}
                </a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name: typeData.addRouter}">
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
    import {
        paginationInit,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { threeRowSearch } from '@/utils/tableScroll';
    import { prescriptionTypeList, energyList, usageMethodList } from '../../../utils/constants';
    import { requestHospitalGetList } from '../../../api/hospital';
    import { deleteSchemeFn, getSchemeListFn } from '../../../utils/scheme';

    const columns = [
        {
            title: '方案名称',
            dataIndex: 'prescriptionName',
            width: 150,
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
        computed: {
            typeData(){
                const isOral = this.$route.name === 'oral';
                return {
                    prescriptionType: isOral ? 1 : 2,
                    addRouter: isOral ? 'addOral' : 'addIntestinal',
                };
            }
        },
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
                    prescriptionType: null,
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
            $route(){
                this.searchData.prescriptionType = this.typeData.prescriptionType;
                this.searchFn();
            }
        },
        created(){
            this.searchData.prescriptionType = this.typeData.prescriptionType;
            requestHospitalGetList()
                .then(hospitalList => {
                    this.hospitalList = hospitalList;
                });
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                this.getSchemeListFn();
            },
            getSchemeListFn,
            deleteSchemeFn,
            pageChange,
            onShowSizeChange,
        }
    };
</script>