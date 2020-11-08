<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <!--            <a-form-item label="采购单号">-->
            <!--                <a-input class="add-form-input"-->
            <!--                         v-decorator="purchaseOrderCodeDecorator"-->
            <!--                         placeholder="请输入采购单号"-->
            <!--                />-->
            <!--            </a-form-item>-->
            <a-form-item label="商品">
                <a-select class="add-form-input"
                          v-decorator="goodsIdDecorator"
                          placeholder="请选择商品"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option v-for="item in goodsPurchaseList"
                                     :value="item.value"
                    >
                        {{item.label}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="采购单位">
                <a-select class="add-form-input"
                          v-decorator="purchaseOrderUnitIdDecorator"
                          placeholder="请选择单位"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option v-for="item in unitTypeList"
                                     :value="item.value"
                    >
                        {{item.label}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <!--            <a-form-item label="医院">-->
            <!--                <a-select class="add-form-input"-->
            <!--                          v-decorator="hospitalIdDecorator"-->
            <!--                          placeholder="请选择医院"-->
            <!--                >-->
            <!--                    <a-select-option v-for="(item,index) in hospitalList"-->
            <!--                                     :value="item.id"-->
            <!--                    >{{item.hospitalName}}-->
            <!--                    </a-select-option>-->
            <!--                </a-select>-->
            <!--            </a-form-item>-->
            <a-form-item label="采购数量">
                <a-input class="add-form-input"
                         v-decorator="outboundQuantityDecorator"
                         placeholder="请输入采购数量"
                />
            </a-form-item>
            <a-form-item label="备注">
                <a-input class="add-form-input"
                         v-decorator="remarkDecorator"
                         placeholder="请输入备注"
                />
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    //  新增采购单
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestHospitalGetList } from '../../api/hospital';
    import { requestGoodsUnitType } from '../../api/commodity/addCommodity';
    import { requestGoodsGoodsPurchaseList, requestPurchaseOrderInsert } from '../../api/warehouse/purchaseList';
    //  采购操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                formItemLayout,
                //  采购单号
                purchaseOrderCodeDecorator: ['purchaseOrderCode', {
                    rules: [{
                        required: true,
                        message: '请输入采购单号'
                    },]
                }],
                //  医院
                hospitalIdDecorator: ['hospitalId', {
                    rules: [{
                        required: true,
                        message: '请选择医院'
                    },]
                }],
                //  商品id
                goodsIdDecorator: ['goodsId', {
                    rules: [{
                        required: true,
                        message: '请选择采购商品'
                    },]
                }],
                //  单位id
                purchaseOrderUnitIdDecorator: ['purchaseOrderUnitId', {
                    rules: [{
                        required: true,
                        message: '请选择采购商品'
                    },]
                }],
                //  采购数量
                outboundQuantityDecorator: ['outboundQuantity', {
                    rules: [{
                        required: true,
                        message: '请输入采购数量'
                    },]
                }],

                //  备注
                remarkDecorator: ['remark', {
                    rules: [{
                        required: false,
                        message: '备注'
                    },]
                }],

                //  医院下拉
                hospitalList: [],
                //  商品单位下拉
                unitTypeList: [],
                unitTypeMap: {},
                //  商品列表        ⚠️特殊
                goodsPurchaseList: [],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                //	获取商品列表			⚠️特殊的采购单用的
                requestGoodsGoodsPurchaseList()
                    .then(goodsPurchaseList => {
                        //  this.goodsPurchaseList = goodsPurchaseList;
                        console.log(goodsPurchaseList);
                    });
                //  单位下拉
                requestGoodsUnitType()
                    .then(unitTypeList => {
                        const unitTypeMap = this.unitTypeMap;
                        unitTypeList.forEach(item => {
                            unitTypeMap[item.value] = item.label;
                        });
                        this.unitTypeList = unitTypeList;
                    });
                //  医院list
                requestHospitalGetList()
                    .then(hospitalList => {
                        this.hospitalList = hospitalList;
                    });
            },
            //  表单提交 保存
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (err) {
                            reject();
                        }
                        const purchaseOrderUnit = this.unitTypeMap[this.purchaseOrderUnitId];
                        console.log(values);
                        debugger;
                        return;
                        const {} = values;

                        requestPurchaseOrderInsert(data)
                            .then(v => {

                                console.log(v);
                                resolve();
                            });
                    });
                }));
            },
        }
    };
</script>