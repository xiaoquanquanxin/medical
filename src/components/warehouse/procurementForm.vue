<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="商品名称">{{procurementData.goodsName}}</a-form-item>
            <a-form-item label="商品货号">{{procurementData.goodsProductCode}}</a-form-item>
            <a-form-item label="供应商">{{procurementData.supplierName}}</a-form-item>
            <a-form-item label="商品品牌">{{procurementData.brandName}}</a-form-item>
            <a-form-item label="厂家">{{procurementData.manufactorName}}</a-form-item>
            <a-form-item label="医院">
                <a-select class="add-form-input"
                          v-decorator="hospitalIdDecorator"
                          placeholder="请选择医院"
                >
                    <a-select-option v-for="(item,index) in hospitalList"
                                     :value="item.id"
                    >{{item.hospitalName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="单位">
                <a-select class="add-form-input"
                          placeholder="请选择单位"
                          v-decorator="purchaseOrderUnitIdDecorator"
                >
                    <a-select-option v-for="item in unitTypeList"
                                     :value="item.value"
                    >
                        {{item.label}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="采购数量">
                <a-input class="add-form-input"
                         v-decorator="purchaseOrderNumDecorator"
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
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestGoodsGoodsPurchase, requestGoodsStockGetHospitalStock } from '../../api/warehouse/inventory';
    import { requestHospitalGetList } from '../../api/hospital';
    import { requestGoodsUnitType } from '../../api/commodity/addCommodity';
    //  采购操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  查看的id
            warehouseId(){
                return this.$store.state.warehouse.warehouseId;
            }
        },
        data(){
            return {
                procurementData: {},
                //  商品单位下拉
                unitTypeList: [],
                //  医院下拉
                hospitalList: [],
                hospitalId: undefined,
                formItemLayout,

                //  单位
                purchaseOrderUnitIdDecorator: ['purchaseOrderUnitId', {
                    rules: [{
                        required: true,
                        message: '请选择单位'
                    },]
                }],
                //  医院
                hospitalIdDecorator: ['hospitalId', {
                    rules: [{
                        required: true,
                        message: '请选择医院'
                    },]
                }],
                //  采购数量
                purchaseOrderNumDecorator: ['purchaseOrderNum', {
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
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
//                //  todo    查询  warehouseId
                console.log(this.warehouseId);
                requestGoodsStockGetHospitalStock(this.warehouseId)
                    .then(v => {
                        console.log(v);
                    });
                  //    商品单位
                requestGoodsUnitType()
                    .then(unitTypeList => {
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
                        const {
                            hospitalId,
                            purchaseOrderNum,
                            purchaseOrderUnitId,
                            remark,
                        } = values;
                        const {
                            id,
                        } = this.procurementData;
                        const data = {
                            goodsId: id,
                            //  缺少医院id
                            hospitalId,
                            //  采购数量
                            purchaseOrderNum,
                            //  ⚠️缺少采购单位名称
                            purchaseOrderUnit: '',
                            //  采购单位id
                            purchaseOrderUnitId,
                            //  备注
                            remark,
                        };
                        console.log(data);
                        requestGoodsGoodsPurchase(data)
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