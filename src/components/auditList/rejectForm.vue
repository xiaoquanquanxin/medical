<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="驳回原因">
            <div style="width:calc((100vw - 200px)*.65)">
                <a-textarea
                        placeholder="请输入驳回原因"
                        v-decorator="rejectDecorator"
                        :auto-size="{ minRows: 3, maxRows: 5 }"
                />
            </div>
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    //  驳回原因
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  详情的id
                auditDetailId: this.$route.params.auditDetailId,
                formItemLayout,

                //  驳回原因
                rejectDecorator: ['reject', {
                    rules: [{
                        required: true,
                        message: '请输入驳回原因',
                    },]
                }]
            };
        },
        methods: {
            //  主要请求
            searchFn(){

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