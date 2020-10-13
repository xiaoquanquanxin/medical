<template>
    <div class="layout-content-inner-main">
        <!--表单头-->
        <a-input-group class="a-input-group">
            <a-col :span="5">
                <a-button type="primary" v-print="printObj">打印</a-button>
            </a-col>
        </a-input-group>
        <div id="printContent">
            <a-input-group class="a-input-group">
                <a-row type="flex" justify="start" align="middle">
                    <a-col :span="2">状态：</a-col>
                    <a-col :span="5">
                        <a-select style="width:100%;"
                                  placeholder="请选择状态"
                                  v-model="formData.status"
                        >
                            <a-select-option :value="1">
                                已领药
                            </a-select-option>
                            <a-select-option :value="2">
                                未领药
                            </a-select-option>
                        </a-select>
                    </a-col>
                </a-row>
            </a-input-group>
            <!--基础表格-->
            <a-row type="flex" justify="start" align="middle" class="table-group-title">
                <a-col :span="4">
                    基本信息
                </a-col>
            </a-row>
            <a-table
                    :columns="basicColumns"
                    :data-source="basicData"
                    :pagination="false"
            >
                <!--方案名称-->
                <div slot="planName" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.planName}}
                </div>
                <!--周期-->
                <div slot="cycle" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.cycle}}
                </div>
                <!--处方类型-->
                <div slot="prescriptionType" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.prescriptionType}}
                </div>
                <!--咨询费/配置费-->
                <div slot="cost" slot-scope="scope,sItem,sIndex,extra">
                    {{scope.cost}}
                </div>
            </a-table>
            <br>
            <!--口服肠内营养补充-->
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                <a-col :span="4">
                    口服肠内营养补充
                </a-col>
                <a-col :span="4">
                    <a-select v-model="formData.eatingWay1"
                              style="width:100%;"
                              placeholder="请选择食用方法"
                    >
                        <a-select-option :value="1">
                            方法1
                        </a-select-option>
                        <a-select-option :value="2">
                            吃菜
                        </a-select-option>
                    </a-select>
                </a-col>
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
                <a-col :span="4">
                    肠内营养支持
                </a-col>
                <a-col :span="4">
                    <a-select v-model="formData.eatingWay2"
                              style="width:100%;"
                              placeholder="请选择食用方法"
                    >
                        <a-select-option :value="1">
                            方法1
                        </a-select-option>
                        <a-select-option :value="2">
                            吃菜
                        </a-select-option>
                    </a-select>
                </a-col>
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
            <a-table
                    :columns="energyMeterColumns"
                    :data-source="energyMeterData"
                    :pagination="false"
            >
            </a-table>
        </div>
    </div>
</template>
<script>
    //  基本信息 表格 列的意义
    const basicColumns = [
        {
            title: '方案名称',
            scopedSlots: { customRender: 'planName' },
            width: 100,
        },
        {
            title: '周期',
            width: 100,
            scopedSlots: { customRender: 'cycle' },
        },
        {
            title: '处方类型',
            width: 100,
            scopedSlots: { customRender: 'prescriptionType' },
        },
        {
            title: '咨询费/配置费',
            width: 100,
            scopedSlots: { customRender: 'cost' },
        },
    ];
    const basicData = [{
        key: 1,
        planName: '许晓飞123',
        cycle: '年',
        prescriptionType: '吃',
        cost: '¥20'
    }];

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
    //  能量表 列的意义
    const energyMeterColumns = [
        {
            title: '能量',
            dataIndex: 'energy',
            width: 100,
        },
        {
            title: '蛋白质',
            width: 100,
            dataIndex: 'protein',
        },
        {
            title: '脂肪',
            width: 100,
            dataIndex: 'fat',
        },
        {
            title: '碳水化合物',
            width: 100,
            dataIndex: 'carbohydrates',
        },
    ];
    const energyMeterData = [
        {
            key: 1,
            energy: 123,
            protein: 234,
            fat: 345,
            carbohydrates: 456,
        },
    ];

    export default {
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

                //  基础表格
                basicData,
                basicColumns,

                //  口服肠内营养支持 表格
                oralColumns,
                oralData,

                //  肠内营养支持 表格
                intestinalData,

                //  能量表
                energyMeterColumns,
                energyMeterData,

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '订单详情',

                }
            };
        },
    };
</script>
