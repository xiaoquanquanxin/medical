<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="商家名称">xxxx</a-form-item>
            <a-form-item label="商品货号">xxxx</a-form-item>
            <a-form-item label="供应商">xxxx</a-form-item>
            <a-form-item label="商品品牌">xxxx</a-form-item>
            <a-form-item label="厂家">xxxx</a-form-item>
            <a-form-item label="医院">
                <a-select class="add-form-input"
                          v-model="hospitalId"
                          placeholder="请选择医院"
                >
                    <a-select-option v-for="(item,index) in hospitalList"
                                     :value="item.id"
                    >{{item.hospitalName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="单位">
                <a-select placeholder="请选择单位"
                          v-decorator="purchaseOrderUnitDecorator"
                >
                    <a-select-option value="1">1</a-select-option>
                    <a-select-option value="2">2</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="采购数量">
                <a-input
                        v-decorator="purchaseOrderNumDecorator"
                        placeholder="请输入采购数量"
                />
            </a-form-item>
            <a-form-item label="备注">
                <a-input
                        v-decorator="remarkDecorator"
                        placeholder="请输入备注"
                />
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestGoodsGoodsPurchase } from '../../api/warehouse/inventory';
    import { requestHospitalGetList } from '../../api/hospital';
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
        props: ['procurementData'],
        data(){
            return {

                //  医院下拉
                hospitalList: [],
                hospitalId: null,
                formItemLayout,

                //  单位
                purchaseOrderUnitDecorator: ['purchaseOrderUnit', {
                    rules: [{
                        required: true,
                        message: '请选择单位'
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
                    initialValue: '备注1',
                    rules: [{
                        required: false,
                        message: '备注'
                    },]
                }],
            };
        },
        created(){
            console.log(this.procurementData);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
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
                        const data = Object.assign({
                            id: this.procurementData.id,
                            hospitalId: this.hospitalId,
                        }, values);
                        console.log(data);
                        requestGoodsGoodsPurchase(data)
                            .then(v => {
                                //  todo
                                console.log(v);
                                resolve();
                            });
                    });
                }));
            },
        }
    };
</script>