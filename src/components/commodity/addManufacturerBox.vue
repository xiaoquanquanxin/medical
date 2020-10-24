<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="生产厂家名称">
            <a-input class="add-form-input"
                    v-decorator="manufactorNameDecorator"
                    placeholder="请输入生产厂家名称"
            />
        </a-form-item>
        <a-form-item label="生产厂家编码">
            <p>后台自动生成</p>
        </a-form-item>
        <a-form-item label="是否展示">
            <a-switch checked-children="开" un-checked-children="关"
                      v-model="whetherShow"
            />
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import {
        requestManufactorGet,
        requestManufactorInsert,
        requestManufactorUpdate
    } from '../../api/commodity/manufacturer';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  生产厂家id
            manufacturerId(){
                return this.$store.state.commodity.manufacturerId;
            },
        },
        data(){
            return {
                formItemLayout,
                //  生产厂家名称
                manufactorNameDecorator: ['manufactorName', {
                    rules: [{
                        required: true,
                        message: '请输入生产厂家名称'
                    },]
                }],
                //  是否展示
                whetherShow: false,
            };
        },
        created(){
            console.log('是编辑？', !!this.manufacturerId);
        },
        methods: {
            //  主要请求
            searchFn(){
                //  如果是新增
                if (!this.manufacturerId) {
                    return;
                }
                //  如果是编辑
                requestManufactorGet(this.manufacturerId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const { manufactorName } = data;
                        this.form.setFieldsValue({
                            manufactorName,
                        });
                    });
            },
            //    表单提交
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.table(values);
                        (() => {
                            //  如果是新增
                            if (!this.manufacturerId) {
                                return requestManufactorInsert(values);
                            }
                            //  如果是编辑
                            return requestManufactorUpdate(Object.assign(
                                { id: this.manufacturerId },
                                values)
                            );
                        })()
                            .then(v => {
                                console.log(v);
                                resolve();
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
                });
            },
        }
    };
</script>