<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="仓库名称">
                <a-input class="add-form-input"
                         v-decorator="warehouseNameDecorator"
                         placeholder="请输入仓库名称"
                />
            </a-form-item>
            <a-form-item label="仓库编码">
                <a-input class="add-form-input"
                         v-decorator="warehouseNumberDecorator"
                         placeholder="请输入仓库编码"
                />
            </a-form-item>
            <a-form-item label="仓库地址-省份">
                <a-select class="add-form-input"
                          v-decorator="provinceDecorator"
                          placeholder="请选择仓库地址-省份"
                          @change="_provinceChange"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in areaList.provinceList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="仓库地址-市区">
                <a-select class="add-form-input"
                          v-decorator="cityDecorator"
                          placeholder="请选择仓库地址-市区"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in areaList.cityList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestWarehouseGet, requestWarehouseInsert, requestWarehouseUpdate } from '../../api/entrepot';
    import { getProvinceList, provinceChange, areaList } from '@/utils/areaList';
    //  新增、编辑仓库
    export default {
        computed: {
            entrepotId(){
                return this.$store.state.entrepot.entrepotId;
            },
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //	地址对象
                areaList,
                formItemLayout,
                //  仓库名称
                warehouseNameDecorator: ['warehouseName', {
                    rules: [{
                        required: true,
                        message: '请输入仓库名称'
                    },]
                }],
                //  仓库编码
                warehouseNumberDecorator: ['warehouseNumber', {
                    rules: [{
                        required: true,
                        message: '请输入仓库编码'
                    },]
                }],
                //  仓库地区-省份
                provinceDecorator: ['province', {
                    rules: [{
                        required: true,
                        message: '请选择仓库地区-省份'
                    },]
                }],
                //  仓库地区-市区
                cityDecorator: ['city', {
                    rules: [{
                        required: true,
                        message: '请选择仓库地区-市区'
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
                this.getProvinceList(this);
                //  如果是新增
                if (!this.entrepotId) {
                    return;
                }
                //  如果是编辑
                requestWarehouseGet(this.entrepotId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const {
                            warehouseName,
                            warehouseNumber,
                            province,
                            city,
                        } = data;
                        this.form.setFieldsValue({
                            warehouseName,
                            warehouseNumber,
                            province,
                            city,
                        });
                        this._provinceChange(province);
                    });
            },
            //    表单提交
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.log(values);
                        if (err) {
                            reject();
                            return;
                        }
                        return (() => {
                            //  如果是新增
                            if (!this.entrepotId) {
                                return requestWarehouseInsert(values);
                            }
                            //  如果是编辑
                            return requestWarehouseUpdate(Object.assign({ id: this.entrepotId }, values));
                        })()
                            .then(v => {
                                console.log(v);
                                resolve();
                            })
                            .catch(err => {
                                reject(err);
                            });
                    });
                });
            },
            //  获取省份
            getProvinceList,
            //  省份变化
            provinceChange,
            _provinceChange(value){
                this.provinceChange(this, value);
            },
        },
    };
</script>