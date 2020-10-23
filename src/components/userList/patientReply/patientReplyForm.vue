<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="内容">
                <div style="width:500px;">
                    <a-textarea
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            v-decorator="feedbackDecorator"
                            placeholder="请输入患者反馈"
                    />
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestFeedbackSave, requestFeedbackGet } from '../../../api/userList/patientReply';
    //  患者反馈操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            patientReplyId(){
                return this.$store.state.userList.patientReplyId;
            },
            //  页面参数 - 病人id
            patientId(){
                return Number(this.$route.params.patientId);
            },
        },
        data(){
            return {
                formItemLayout,
                //  内容
                feedbackDecorator: ['feedback', {
                    rules: [{
                        required: true,
                        message: '请输入患者反馈'
                    },]
                }],
            };
        },
        created(){
            console.log('是编辑？', !!this.patientReplyId);
            this.searchFn();

        },
        methods: {
            //  主要请求
            searchFn(){
                //  如果是新增
                if (!this.patientReplyId) {
                    return;
                }
                requestFeedbackGet(this.patientReplyId)
                    .then(v => {
                        console.log(v.data);
                        this.form.setFieldsValue({
                            feedback: v.data.feedback,
                        });
                    });
            },
            //  表单提交 保存
            handleSubmit(){
                //  如果是编辑
                if (this.patientReplyId) {
                    return Promise.resolve(true);
                }
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (err) {
                            reject();
                            return;
                        }
                        requestFeedbackSave(Object.assign({
                            patientId: this.patientId,
                        }, values))
                            .then(v => {
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