<template>
    <div class="layout-content-inner-main">
        <p>新增疾病</p>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="疾病名称">
                <a-input
                        v-decorator="diseaseNameDecorator"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 4, offset: 7 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  疾病id
                diseaseId: this.$route.params.diseaseId,
                //  表单大小
                formItemLayout: {
                    labelCol: { span: 6 },
                    wrapperCol: { offset: 1, span: 8 },
                },
                //  疾病名称
                diseaseNameDecorator: ['diseaseName', {
                    initialValue: '普通疾病',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入疾病名称'
                    },]
                }],
            };
        },
        created(){
            //  console.log(this.$route.params);
            console.log('是编辑？', !!this.diseaseId);
        },
        methods: {
            //    表单提交
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(err);
                    console.table(values);
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
    };
</script>
<style></style>