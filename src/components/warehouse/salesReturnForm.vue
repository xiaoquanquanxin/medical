<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="出库商品">sss</a-form-item>
            <a-form-item label="商品货号">xxxx</a-form-item>
            <a-form-item label="供应商">xxxx</a-form-item>
            <a-form-item label="商品品牌">xxxx</a-form-item>
            <a-form-item label="厂家">xxxx</a-form-item>
            <a-form-item label="单位">xxxx</a-form-item>
            <a-form-item label="批次">xxxx</a-form-item>
            <a-form-item label="生产时间">xxxx</a-form-item>
            <a-form-item label="过期时间">xxxx</a-form-item>
            <a-form-item label="出库数量">
                <a-input
                        v-decorator="outboundQuantityDecorator"
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
    //  出库操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                formItemLayout,
                //  出库数量
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
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
            //  表单提交 保存
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
        }
    };
</script>