<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <div v-if="false">
                <a-form-item label="商品货号">xxxx</a-form-item>
                <a-form-item label="供应商">xxxx</a-form-item>
                <a-form-item label="商品品牌">xxxx</a-form-item>
                <a-form-item label="厂家">xxxx</a-form-item>
                <a-form-item label="单位">xxxx</a-form-item>
                <a-form-item label="生产时间">xxxx</a-form-item>
            </div>
            <a-form-item label="商品">
                <a-select class="add-form-input"
                          v-decorator="goodsIdDecorator"
                          placeholder="请选择商品"
                >
                    <a-select-option v-for="item in goodsPurchaseList"
                                     :value="item.id"
                    >
                        {{item.goodsName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="报损单位">
                <a-select class="add-form-input"
                          v-decorator="unitNameIdDecorator"
                          placeholder="请选择单位"
                >
                    <a-select-option v-for="item in unitTypeList"
                                     :value="item.value"
                    >
                        {{item.label}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="报损数量">
                <a-input class="add-form-input"
                         v-decorator="numDecorator"
                         placeholder="请输入报损数量"
                />
            </a-form-item>
            <a-form-item label="配置日期">
                <a-date-picker
                        class="lengthen-select-width"
                        placeholder="请选择配置日期"
                        @change="onDateChange"
                />
            </a-form-item>
            <a-form-item label="报损原因">
                <div style="width:calc((100vw - 200px)*.65)">
                    <a-textarea
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            v-decorator="reasonDecorator"
                            placeholder="请输入报损原因"
                    />
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestGoodsLossReportGoodsList, requestLossReportInsert } from '../../api/warehouse/reportedLoss';
    import { requestGoodsUnitType } from '../../api/commodity/addCommodity';
    import { requestHospitalGetList } from '../../api/hospital';
    //  报损操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                formItemLayout,
                //  单位id
                unitNameIdDecorator: ['unitNameId', {
                    rules: [{
                        required: true,
                        message: '请选择报损商品'
                    },]
                }],
                //  报损商品
                goodsIdDecorator: ['goodsId', {
                    rules: [{
                        required: true,
                        message: '请选择报损商品'
                    },]
                }],
                //  报损数量
                numDecorator: ['num', {
                    rules: [{
                        required: true,
                        message: '请输入报损数量'
                    },]
                }],
                //  报损原因
                reasonDecorator: ['reason', {
                    rules: [{
                        required: true,
                        message: '请输入报损原因'
                    },]
                }],

                //  生成日期
                manufactureDate: '',

                //  医院下拉
                hospitalList: [],
                //  商品单位下拉
                unitTypeList: [],
                unitTypeMap: {},
                //  商品列表        ⚠️特殊
                goodsPurchaseList: [],
                goodsPurchaseMap: {},
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                //	获取商品列表			⚠️特殊的报损单用的
                requestGoodsLossReportGoodsList()
                    .then(goodsPurchaseList => {
                        console.log('获取商品列表 ⚠️特殊的报损单用的');
                        console.log(goodsPurchaseList);
                        const goodsPurchaseMap = this.goodsPurchaseMap;
                        goodsPurchaseList.forEach(item => {
                            goodsPurchaseMap[item.id] = item;
                        });
                        this.goodsPurchaseList = goodsPurchaseList;
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

            //  生成日期
            onDateChange(value, manufactureDate){
                this.manufactureDate = manufactureDate;
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
                            //  商品id
                            goodsId,
                            //  单位名称
                            unitNameId,
                            //  报损数量
                            num,
                            //  医院id
                            // hospitalId: number,
                            //  报损原因
                            reason,
                            //  备注
                            remark,
                        } = values;

                        const unitName = this.unitTypeMap[unitNameId];
                        const batchNumber = this.goodsPurchaseMap[goodsId].batchNumber;
                        const manufactureDate = this.manufactureDate;
                        const data = {
                            //  商品id
                            goodsId,
                            //  批号
                            batchNumber,
                            //  单位名称
                            unitName,
                            //  报损数量
                            num,
                            //  医院id
                            // hospitalId: number,
                            //  报损原因
                            reason,
                            //  生成日期
                            manufactureDate,
                            //  备注
                            remark,
                        };
                        console.log(data);
                        requestLossReportInsert(data)
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