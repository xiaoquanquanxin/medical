<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="驳回原因">
            <div style="width:100%;">
                <a-textarea
                        placeholder="请输入驳回原因"
                        v-decorator="rejectReasonDecorator"
                        :auto-size="{ minRows: 3, maxRows: 5 }"
                />
            </div>
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestPrescriptionAuditUpdate } from '../../api/auditList';
    //  驳回原因
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  详情的id
                detailId: this.$route.params.detailId,
                formItemLayout,

                //  驳回原因
                rejectReasonDecorator: ['rejectReason', {
                    rules: [{
                        required: true,
                        message: '请输入驳回原因',
                    },]
                }]
            };
        },
        methods: {
            //  表单提交 保存
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (err) {
                            reject();
                        }
                        resolve(values.rejectReason);
                    });
                });
            },
        }
    };
</script>