<template>
    <div class="layout-content-inner-main">
        <div v-if="true">
            <!--搜索相关-->
            <div class="a-input-group">
                <a-input class="basic-input-width" v-model="searchData.name" placeholder="请输入患者姓名"/>
                <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入处方号"/>
                <a-date-picker
                        class="lengthen-select-width"
                        placeholder="请选择配置日期"
                        v-model="selectDateMoment"
                        @change="onDateChange"
                />
                <a-select class="basic-select-width" placeholder="请选择科室" v-model="searchData.deptId">
                    <a-select-option v-for="item in deptList"
                                     :value="item.id">
                        {{item.deptName}}
                    </a-select-option>
                </a-select>
                <!--(1.待签收，2，待配置，3.已配置，4，待领取，5，已领取)-->
                <a-select v-model="searchData.orderStatus" class="basic-select-width" placeholder="请选择状态">
                    <a-select-option value="1">待签收</a-select-option>
                    <a-select-option value="2">待配置</a-select-option>
                    <a-select-option value="3">已配置</a-select-option>
                    <a-select-option value="4">待领取</a-select-option>
                    <a-select-option value="5">已领取</a-select-option>
                </a-select>
                <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
                <b>没有时间参数 前端暂时叫orderTime</b>
                <br>
                <b>请选择状态不管用</b>
            </div>
            <div class="a-input-group" v-if="false" data-msg="暂时不做">
                <a-space>
                    <!--<a-button type="primary" v-print="printBottle">打印处方</a-button>-->
                    <a-button type="primary" v-print="printMenu">打印配置单</a-button>
                </a-space>
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
                <!--支付状态-->
                <div slot="payStatus" slot-scope="scope,sItem,sIndex,extra">
                    <span v-if="scope.payStatus == 1">已支付</span>
                    <span v-if="scope.payStatus == 0">待支付</span>
                </div>
                <!-- 配置状态(1.待签收，2，待配置，3.已配置，4，待领取，5，已领取)-->
                <div slot="orderStatus" slot-scope="scope,sItem,sIndex,extra">
                    <span v-if="scope.orderStatus == 1">待签收</span>
                    <span v-if="scope.orderStatus == 2">待配置</span>
                    <span v-if="scope.orderStatus == 3">已配置</span>
                    <span v-if="scope.orderStatus == 4">待领取</span>
                    <span v-if="scope.orderStatus == 5">已领取</span>
                </div>
                <!--操作-->
                <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                    <a-space>
                        <router-link :to="{name:'getDrugDetail',params:{detailId:sItem.id}}">详情
                        </router-link>
                        <a @click="confirmGetDrug(sItem)" v-if="scope.orderStatus == 4">确定领药</a>
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
        <!--打印-->
        <div v-show="false">
            <div id="printBottle" data-msg="打印处方">
                <ul class="bottle-list">
                    <li class="bottle-item">3290；外壳</li>
                    <li class="bottle-item"><b>功能处方</b></li>
                    <li class="bottle-item">
                        <ul class="bottle-inner-list">
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'><b>序号</b></div>
                                <div class="bottle-inner-prod"><b>产品</b></div>
                                <div class="bottle-inner-count"><b>用量</b></div>
                            </li>
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'>序号</div>
                                <div class="bottle-inner-prod">产品</div>
                                <div class="bottle-inner-count">用量</div>
                            </li>
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'>序号</div>
                                <div class="bottle-inner-prod">产品</div>
                                <div class="bottle-inner-count">用量</div>
                            </li>
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'>序号</div>
                                <div class="bottle-inner-prod">产品</div>
                                <div class="bottle-inner-count">用量</div>
                            </li>
                        </ul>
                    </li>
                    <li class="bottle-item"><b>用法用量：</b>sss</li>
                    <li class="bottle-item"><b>营养医师：</b>feaw <b>处方日期：</b>恩爱fae</li>
                    <li class="bottle-item"><b>领药员：</b>额发<b>领货人：</b>额发</li>
                </ul>
            </div>
            <div id="printMenu" data-msg="打印配置单">
                <ul class="menu-list">
                    <li class="menu-item">
                        <div><b>科室：</b>蛇精</div>
                        <div class="menu-item-last"><b>病区：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <div><b>姓名：</b>蛇精</div>
                        <div class="menu-item-last"><b>床号：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <div><b>住院号：</b>蛇精</div>
                        <div class="menu-item-last"><b>液量：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <div><b>热量：</b>蛇精</div>
                        <div class="menu-item-last"><b>蛋白质：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <b>营养师</b>xxx
                    </li>
                    <li class="menu-item">
                        <b>用法用量</b>
                        xxxx
                    </li>
                    <li class="menu-item">
                        <b>领药时间</b>
                        xxxx
                    </li>
                    <li class="menu-item">
                        <b>餐次</b>
                        xxxx
                    </li>
                </ul>
            </div>
        </div>
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
    import { requestPrescriptionConfigCfly } from '../../api/task/getDrug';
    import { requestPrescriptionConfigConfirmSave } from '../../api/task/configuration';
    import { requestDeptList } from '../../api/department';
    import moment from 'moment';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '处方名称',
            dataIndex: 'prescriptionName',
            width: 200,
        },
        {
            title: '处方医生',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'deptName',
            width: 100,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '性别',
            scopedSlots: { customRender: 'sex' },
            width: 100,
        },
        {
            title: '支付状态',
            scopedSlots: { customRender: 'payStatus' },
            width: 100,
        },
        {
            title: '领药状态',
            scopedSlots: { customRender: 'orderStatus' },
            width: 100,
        },
        {
            title: '操作',
            width: 200,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    export default {
        data(){
            return {
                //  全部科室列表
                deptList: [],
                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {},

                //  选择日期的值的对象
                selectDateMoment: moment(new Date()),

                //  打印处方
                printBottle: {
                    id: '#printBottle',
                    popTitle: '打印处方',
                },
                //  打印配置单
                printMenu: {
                    id: '#printMenu',
                    popTitle: '打印配置单',
                },
            };
        },
        created(){
            this.searchFn();
            //  全部科室
            requestDeptList()
                .then(deptList => {
                    this.deptList = deptList;
                });
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPrescriptionConfigCfly(Object.assign({},
                    { param: this.searchData },
                    paginationEncode(this.pagination)
                ))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  选择过期日期
            onDateChange(value, orderTime){
                this.searchData.orderTime = orderTime;
            },
            //  确定领药
            confirmGetDrug(sItem){
                //  确认签收接口:orderStatus=2，确认配置，orderStatus=3,确认领药接口：orderStatus=5
                this.$confirm({
                    title: `确定领药${sItem.prescriptionName}`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        const data = { orderStatus: 5, id: sItem.id, patientId: sItem.patientId };
                        return requestPrescriptionConfigConfirmSave(data)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(err => {
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },

            pageChange,
            onShowSizeChange,
        }
    };
</script>
<style scoped>
    @import "~@/css/cost.css";
</style>