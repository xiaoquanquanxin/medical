<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="仓库名称">
                <a-input
                        v-decorator="entrepotNameDecorator"
                        placeholder="请输入仓库名称"
                />
            </a-form-item>
            <a-form-item label="仓库编码">
                <a-input
                        v-decorator="entrepotCodeDecorator"
                        placeholder="请输入仓库编码"
                />
            </a-form-item>
            <a-form-item label="渠道商地区-省份">
                <a-select
                        v-decorator="provinceDecorator"
                >
                    <a-select-option value="">
                        渠道商地区-省份
                    </a-select-option>
                    <a-select-option value="1">
                        山西
                    </a-select-option>
                    <a-select-option value="2">
                        陕西
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="渠道商地区-市区">
                <a-select
                        v-decorator="cityDecorator"
                >
                    <a-select-option value="">
                        渠道商地区-市区
                    </a-select-option>
                    <a-select-option value="1">
                        晋中
                    </a-select-option>
                    <a-select-option value="2">
                        大同
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { formItemLayout } from '@/utils/layout.ts';

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
                formItemLayout,
                //  仓库名称
                entrepotNameDecorator: ['entrepotName', {
                    rules: [{
                        required: true,
                        message: '请输入渠道商名称'
                    },]
                }],
                //  仓库编码
                entrepotCodeDecorator: ['entrepotCode', {
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
            this.handleSubmit.bind(this);
            console.log('是编辑？', !!this.entrepotId);
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
            //    表单提交
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.form);
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (!err) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                }))
                    .then(v => {
                        return new Promise(((resolve, reject) => {
                            console.log('发请求吧');
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }));
                    });
            },
        },
    };
</script>