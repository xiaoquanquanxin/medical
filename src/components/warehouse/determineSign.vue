<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="发货数量">xxxx</a-form-item>
            <a-form-item label="收货数量">
                <a-input
                        v-decorator="quantityDecorator"
                        placeholder="请输入收货数量"
                        suffix="箱"
                />
            </a-form-item>
            <a-form-item label="物流公司">sss</a-form-item>
            <a-form-item label="快递单号">xxxx</a-form-item>
            <a-form-item label="报损数量">
                <a-input
                        v-decorator="reportedLossQuantityDecorator"
                        placeholder="请输入报损数量"
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
                //  收货数量
                quantityDecorator: ['quantity', {
                    rules: [{
                        required: true,
                        message: '请输入收货数量'
                    },]
                }],
                
                //  报损数量
                reportedLossQuantityDecorator: ['reportedLossQuantity', {
                    rules: [{
                        required: true,
                        message: '请输入报损数量'
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
