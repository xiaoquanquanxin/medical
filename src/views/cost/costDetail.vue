<template>
    <div class="layout-content-inner-main patient-basic-info-like-wrap">
        <a-row type="flex" justify="space-between" align="middle">
            <div class="a-input-group">
                <!--返回按钮-->
                <GoBackButton/>
            </div>
        </a-row>
        <div class="patient-basic-info-like">
            <!--基础表格-->
            <ConfigDetailBasicInfo
                    :dataSource="basicInfoData"
            />
            <!--收费明细-->
            <div data-msg="收费明细">
                <a-divider orientation="left">收费明细</a-divider>
                <a-row type="flex" justify="start" align="middle" class="detail-list">
                    <a-col class="detail-label">收费时间:</a-col>
                    <a-col>{{mainData.payTime}}</a-col>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="detail-list">
                    <a-col class="detail-label">操作员:</a-col>
                    <a-col>{{mainData.name}}</a-col>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="detail-list">
                    <a-col class="detail-label">详情如下:</a-col>
                </a-row>
            </div>
            <a-table
                    :columns="columns"
                    :data-source="data"
                    :pagination="false"
            >
                <!--单价-->
                <div slot="price" slot-scope="scope,sItem,sIndex,extra" style="color:var(--basic-red);">
                    ¥{{sItem.price}}
                </div>
            </a-table>
            <a-row type="flex" justify="end" align="middle" class="combined">
                合计：<b>{{combined}}</b>
            </a-row>
            <!--退费说明，退费才展示-->
            <div data-msg="退费说明" v-if="+mainData.isRefund === 1 ">
                <a-divider orientation="left">退费说明</a-divider>
                <a-row type="flex" justify="start" align="middle" class="detail-list">
                    <a-col class="detail-label">退费时间:</a-col>
                    <a-col>{{mainData.refundTime}}</a-col>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="detail-list">
                    <a-col class="detail-label">退费原因:</a-col>
                    <a-col>{{mainData.refund_reason}}</a-col>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="detail-list">
                    <a-col class="detail-label">操作员:</a-col>
                    <a-col>{{mainData.refundByName}}</a-col>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="detail-list">
                    <a-col class="detail-label">退费金额:</a-col>
                    <a-col>{{mainData.refundMoney}}</a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>
<script>
    //  基础数据
    import ConfigDetailBasicInfo from '@/components/detailsTable/configDetailBasicInfo.vue';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestBillingsBillingDetails } from '../../api/cost/costList';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 80,
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: 200,
        },
        {
            title: '单位',
            dataIndex: 'goodsUnit',
            width: 80,
        },
        {
            title: '数量',
            dataIndex: 'quantity',
            width: 80,
        },
        {
            title: '单价',
            width: 100,
            scopedSlots: { customRender: 'price' },
        },
        {
            title: '小计',
            dataIndex: 'subtotal',
            width: 100,
        },
    ];
    export default {
        components: {
            GoBackButton,
            ConfigDetailBasicInfo,
        },
        computed: {
            //  合计
            combined(){
                return this.data.reduce(((previousValue, currentValue) => {
                    return previousValue + currentValue.subtotal;
                }), 0);
            }
        },
        data(){
            const { name } = this.$route;
            let detailType;
            //  switch是为了拓展
            switch (name) {
                case  'costDetail':
                    //  收计费详情
                    detailType = 1;
                    break;
                default:
                    throw new Error(`这是什么页面？${name}`);
            }
            return {
                //  详情的类型
                detailType,

                //  详情的id
                detailId: this.$route.params.detailId,

                //  基础数据
                basicInfoData: {},

                //  详情数据
                mainData: {},

                columns,
                data: [],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestBillingsBillingDetails(this.detailId)
                    .then(v => {
                        const { data } = v;
                        const {
                            name,
                            sex,
                            deptName,
                            bedCode,
                            payTime,
                            payStatus,
                        } = data;
                        //  头部
                        this.basicInfoData = {
                            name,
                            sex,
                            deptName,
                            bedCode,
                            payTime,
                            payStatus,
                        };
                        const {
                            goodsList
                        } = data;
                        goodsList.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        console.log(JSON.parse(JSON.stringify(goodsList)));
                        this.data = goodsList;
                        this.mainData = data;
                    });
            },
        }
    };
</script>
<style scoped>
    .detail-list {
        line-height: 2em;
    }
    
    .detail-label {
        width: 100px;
    }
    
    /*合计*/
    .combined {
        padding: 16px 2em;
        border-bottom: 1px solid var(--basic-border-color);
        margin-bottom: 2em;
    }
</style>