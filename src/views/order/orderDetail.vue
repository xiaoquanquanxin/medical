<template>
    <div class="layout-content-inner-main">
        <!--表单头-->
        <a-input-group class="a-input-group">
            <a-col :span="5">
                <a-button type="primary" v-print="printObj">打印</a-button>
            </a-col>
        </a-input-group>
        <div id="printContent">
            <p class="a-input-group">
                <b>状态：已领药</b>
            </p>
            <!--基础表格-->
            <BasicInfoTable/>
            <br>
            <!--口服肠内营养补充-->
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                <span>口服肠内营养补充</span>
                <span>方法1</span>
            </a-row>
            <a-table
                    :columns="oralColumns"
                    :data-source="oralData"
                    :pagination="false"
            >
                <!--商品名称名称-->
                <div slot="commodityName" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.commodityName}}
                </div>
                <!--购买单位-->
                <div slot="buyer" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.buyer}}
                </div>
                <!--商品单价-->
                <div slot="unitPrice" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.unitPrice}}
                </div>
                <!--数量-->
                <div slot="quantity" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.quantity}}
                </div>
            </a-table>
            <br>
            <!--肠内营养支持-->
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                <span>肠内营养支持</span>
                <span>方法1</span>
            </a-row>
            <a-table
                    :columns="oralColumns"
                    :data-source="oralData"
                    :pagination="false"
            >
                <!--商品名称名称-->
                <div slot="commodityName" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.commodityName}}
                </div>
                <!--购买单位-->
                <div slot="buyer" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.buyer}}
                </div>
                <!--商品单价-->
                <div slot="unitPrice" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.unitPrice}}
                </div>
                <!--数量-->
                <div slot="quantity" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.quantity}}
                </div>
            </a-table>
            <br>
            <!--能量表-->
            <EnergyTable/>
        </div>
    </div>
</template>
<script>
    import BasicInfoTable from '@/components/detailsTable/basicInfoTable.vue';
    import EnergyTable from '@/components/detailsTable/energyTable.vue';
    import { mapGetters, mapActions } from 'vuex';
    //  口服肠内营养支持 表格 列的意义
    const oralColumns = [
        {
            title: '商品名称',
            scopedSlots: { customRender: 'commodityName' },
            width: 100,
        },
        {
            title: '购买单位',
            width: 100,
            scopedSlots: { customRender: 'buyer' },
        },
        {
            title: '商品单价',
            width: 100,
            scopedSlots: { customRender: 'unitPrice' },
        },
        {
            title: '数量',
            width: 100,
            scopedSlots: { customRender: 'quantity' },
        },
    ];
    const oralData = [{
        key: 1,
        commodityName: '许晓飞123',
        buyer: '年',
        unitPrice: '吃',
        quantity: '¥20'
    }, {
        key: 2,
        commodityName: '许晓飞123',
        buyer: '年',
        unitPrice: '吃',
        quantity: '¥20'
    }];
    //  肠内营养支持 数据
    const intestinalData = [{
        key: 1,
        commodityName: '许晓飞123',
        buyer: '年',
        unitPrice: '吃',
        quantity: '¥20'
    }, {
        key: 2,
        commodityName: '许晓飞123',
        buyer: '年',
        unitPrice: '吃',
        quantity: '¥20'
    }];

    export default {
        components: {
            BasicInfoTable,
            EnergyTable,
        },
        data(){
            return {
                //  表单数据
                formData: {
                    //  订单状态
                    status: 2,
                    //  食用方法
                    eatingWay1: 1,
                    //  食用方法
                    eatingWay2: 1,
                },

                //  口服肠内营养支持 表格
                oralColumns,
                oralData,

                //  肠内营养支持 表格
                intestinalData,

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '订单详情',
                }
            };
        },
        created(){
            //  设置基础信息数据
            this.setBasicInfoDetail([{
                key: 1,
                planName: '许晓飞123',
                cycle: '年',
                prescriptionType: '吃',
                cost: '¥20',
            }]);
            //  设置能量表数据
            this.setEnergyDetail([{
                key: 1,
                energy: 123,
                protein: 234,
                fat: 345,
                carbohydrates: 456,
            }]);
        },
        methods: {
            ...mapActions('detailsTable', [
                //  设置基础信息数据
                'setBasicInfoDetail',
                //  设置能量表数据
                'setEnergyDetail',
            ]),
        }
    };
</script>
