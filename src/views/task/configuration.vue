<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.name" placeholder="请输入患者姓名"/>
            <a-input class="basic-input-width" v-model="searchData.prescriptionCode" placeholder="请输入处方号"/>
            <a-date-picker
                    data-msg="只有配置历史有"
                    v-if="!isConfigurationPage"
                    class="lengthen-select-width"
                    placeholder="请选择配置日期"
                    v-model="selectDateMoment"
                    :disabledDate="beforeToday"
                    @change="onDateChange"
            />
            <a-select class="basic-select-width" placeholder="请选择科室" v-model="searchData.deptId">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option v-for="item in deptList"
                                 :value="item.id">
                    {{item.deptName}}
                </a-select-option>
            </a-select>
            <!--            &lt;!&ndash;审核状态(1.待审核，2，已审核，3，已驳回)&ndash;&gt;-->
            <!--            <a-select v-model="searchData.auditStatus" class="basic-select-width" placeholder="请选择状态">-->
            <!--                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>-->
            <!--                <a-select-option value="1">待审核</a-select-option>-->
            <!--                <a-select-option value="2">已审核</a-select-option>-->
            <!--                <a-select-option value="3">已驳回</a-select-option>-->
            <!--            </a-select>-->
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
            <span v-if="isConfigurationPage">配置历史按钮在左侧菜单</span>
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
            <!--处方状态\审核状态(1.待审核，2已审核，3已驳回)-->
            <div slot="auditStatus" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="sItem.auditStatus == 1">待审核</span>
                <span v-if="sItem.auditStatus == 2">已审核</span>
                <span v-if="sItem.auditStatus == 3">已驳回</span>
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
            <!--是否签收-->
            <div slot="signFor" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="scope.configStatus == 4 ">已签收</span>
                <span v-else-if="scope.configStatus == 5 ">未签收</span>
                <span v-else>其他</span>
            </div>
            <!--配置状态✅-->
            <div slot="alreadyOfTotal" slot-scope="scope,sItem,sIndex,extra">
                {{scope.already}}/{{scope.total}}
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space>
                    <router-link :to="{name:'configurationDetail',params:{detailId:sItem.id}}">详情
                    </router-link>
                    <a @click="confirmReceiving(sItem)" v-if="scope.configStatus == 5 && isConfigurationPage">确定签收</a>
                    <a @click="confirmConfig(sItem)" v-if="scope.configStatus == 0 && isConfigurationPage">确定配置</a>
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
    import { oneRowSearch } from '@/utils/tableScroll';
    import { requestPrescriptionConfigConfirmSave, requestPrescriptionConfigPzrw } from '../../api/task/configuration';
    import { requestDeptList } from '../../api/department';
    import moment from 'moment';
    import { beforeToday, todayAndAfterToday } from '../../utils/monthly';
    import { oneDataTimestamp } from '../../utils/constants';

    //  configStatus
    //  0 未配置  1 已配置  2 已过期  3 已作废 4 已签收 5 未签收

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 40,
        },
        {
            title: '处方名称',
            dataIndex: 'prescriptionName',
            width: 150,
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
            title: '科室',
            dataIndex: 'deptName',
            width: 100,
        },
        {
            title: '病区/床号',
            dataIndex: 'bedCode',
            width: 100,
        },
        {
            title: '处方医生',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '处方开具时间',
            dataIndex: 'orderTime',
            width: 200,
        },
        {
            title: '处方状态',
            scopedSlots: { customRender: 'auditStatus' },
            width: 100,
        },
        {
            title: '支付状态',
            scopedSlots: { customRender: 'payStatus' },
            width: 100,
        },
        {
            title: '是否签收',
            scopedSlots: { customRender: 'signFor' },
            width: 100,
        },
        {
            title: '配置状态',
            scopedSlots: { customRender: 'alreadyOfTotal' },
            width: 100,
        },
        {
            title: '操作',
            width: 200,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    export default {
        computed: {
            //  是配置任务页
            isConfigurationPage(){
                return this.$route.name === 'configuration';
            }
        },
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
                selectDateMoment: moment(new Date() - oneDataTimestamp),

            };
        },
        watch: {
            $route(){
                this.searchFn();
            }
        },
        created(){
            //  是配置
            //  console.log(this.isConfigurationPage);
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
                //  如果是配置
                if (this.isConfigurationPage) {
                    delete this.searchData.orderTime;
                } else {
                    //  如果是历史
                    this.searchData.orderTime = this.selectDateMoment.format('YYYY-MM-DD');
                }
                console.log(JSON.parse(JSON.stringify(this.searchData)));
                requestPrescriptionConfigPzrw(Object.assign({},
                    this.searchData,
                    paginationEncode(this.pagination)
                ))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                    });
            },
            //  选择过期日期
            onDateChange(value, orderTime){
                this.searchData.orderTime = orderTime;
            },
            //  确定签收
            confirmReceiving(sItem){
                //  0 未配置  1 已配置  2 已过期  3 已作废 4 已签收 5 未签收
                //  所以configStatus = 4 已签收
                this.$confirm({
                    title: `确定签收${sItem.prescriptionName}`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        const data = {
                            configStatus: 4,
                            id: sItem.configId,
                            patientId: sItem.patientId,
                            type: 1
                        };
                        return requestPrescriptionConfigConfirmSave(data)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  确定配置
            confirmConfig(sItem){
                //  0 未配置  1 已配置  2 已过期  3 已作废 4 已签收 5 未签收
                //  所以configStatus = 1 已配置
                this.$confirm({
                    title: `确定配置${sItem.prescriptionName}`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        const data = {
                            configStatus: 1,
                            id: sItem.configId,
                            patientId: sItem.patientId,
                            type: 2,
                        };
                        return requestPrescriptionConfigConfirmSave(data)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            todayAndAfterToday,
            beforeToday,
            pageChange,
            onShowSizeChange,
        }
    };
</script>
<style scoped>
    /*@import "~@/css/cost.css";*/
</style>