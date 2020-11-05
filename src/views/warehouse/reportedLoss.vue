<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.commodityName" placeholder="请输入报损单号"/>
            <a-input class="lengthen-input-width" v-model="searchData.itemNo" placeholder="请输入商品货号"/>
            <a-select class="basic-select-width" v-model="searchData.hospital" placeholder="请选择医院"
            >
                <a-select-option value="1600">1600</a-select-option>
                <a-select-option value="160">160</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="reportedLostClick">报损</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space>
                    <a @click="reportedDeleteFn(sItem)">删除</a>
                    <a @click="reportSendFn(sItem)">发送报损单</a>
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
        <!--报损莫泰框-->
        <a-modal v-model="dialogDataReportedLoss.visible"
                 v-if="dialogDataReportedLoss.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="报损"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="reportedLostModalCheck('refReportedLossForm')">
            <ReportedLossForm ref="refReportedLossForm"/>
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
    import { twoRowSearch } from '@/utils/tableScroll';
    import ReportedLossForm from '@/components/warehouse/reportedLossForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import {
        requestLossReportDelete,
        requestLossReportPages,
        requestLossReportSend
    } from '../../api/warehouse/reportedLoss';

    const columns = [
        {
            title: '报损单号',
            dataIndex: 'lossReportCode',
            width: 200,
        },
        {
            title: '报损商品名称',
            dataIndex: 'goodsName',
            width: 150,
        },
        {
            title: '商品货号',
            dataIndex: 'goodsProductCode',
            width: 100,
        },
        {
            title: '报损数量',
            dataIndex: 'num',
            width: 100,
        },
        {
            title: '报损单位',
            dataIndex: 'unitName',
            width: 100,
        },
        {
            title: '操作',
            width: 150,
            scopedSlots: { customRender: 'operation' },
        }
    ];

    //  报损
    export default {
        components: {
            ReportedLossForm,
        },
        data(){
            return {
                data: [],
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),

                //  报损操作
                dialogDataReportedLoss: this.initModal(DIALOG_TYPE.REPORTED_LOST),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestLossReportPages(Object.assign(
                    {}, this.searchData, paginationEncode(this.pagination)
                ))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            //  item.createTime = item.createTime.substr(0, 10);
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                    });
            },
            //  新增报损
            reportedLostClick(){
                this.showModal(DIALOG_TYPE.REPORTED_LOST);
            },
            //  确认报损
            reportedLostModalCheck(refReportedLossForm){
                const promise = this.$refs[refReportedLossForm].handleSubmit();
                promise.then(v => {
                    this.searchFn();
                    this.$message.success('操作成功');
                    this.hideModal(DIALOG_TYPE.REPORTED_LOST);
                }).catch(error => {
                    console.log('有错');
                });
            },
            //  删除此报损
            reportedDeleteFn(sItem){
                JSON.parse(JSON.stringify(sItem));
                this.$confirm({
                    title: `确定删除${sItem.goodsName}？`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        return requestLossReportDelete(sItem.id)
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
            //  发送报损单
            reportSendFn(sItem){
                JSON.parse(JSON.stringify(sItem));
                this.$confirm({
                    title: `确定发送${sItem.goodsName}？`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        return requestLossReportSend(sItem.id)
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
            //  莫泰框方法
            ...dialogMethods,

            onShowSizeChange,
            pageChange,
        }
    };
</script>