<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="6">
                    <a-input v-model="searchData.commodityName" placeholder="请输入报损单号"/>
                </a-col>
                <a-col :span="5">
                    <a-input v-model="searchData.itemNo" placeholder="请输入商品货号"/>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.hospital"
                            style="width:100%;"
                            placeholder="请选择医院"
                    >
                        <a-select-option value="1600">1600</a-select-option>
                        <a-select-option value="160">160</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-button type="primary"
                      @click="reportedLostClick"
            >报损
            </a-button>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
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
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '../../utils/tableScroll';
    import ReportedLossForm from '@/components/warehouse/reportedLossForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';

    const columns = [
        {
            title: '报损单号',
            dataIndex: 'commodityName',
            width: 150,
        },
        {
            title: '报损商品名称',
            dataIndex: '11',
            width: 100,
        },
        {
            title: '商品货号',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '报损数量',
            dataIndex: 'barCode',
            width: 100,
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodityName: `xx供应商`,
        });
    }

    //  报损
    export default {
        components: {
            ReportedLossForm,
        },
        data(){
            return {
                data,
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,
                //  分页信息
                pagination,

                //  报损操作
                dialogDataReportedLoss: this.initModal(DIALOG_TYPE.REPORTED_LOST),
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

            //  报损
            reportedLostClick(){
                
                this.showModal(DIALOG_TYPE.REPORTED_LOST);
            },

            //  确认市场价格
            reportedLostModalCheck(refReportedLossForm){
                const promise = this.$refs[refReportedLossForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.REPORTED_LOST);
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>