<template>
    <div class="layout-content-inner-main">
        <p>新增医生</p>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="医生名称">
                <a-input
                        v-decorator="doctorNameDecorator"
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
    import { formItemLayout } from '@/utils/layout.ts';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  医生id
                doctorId: this.$route.params.doctorId,
                //  表单大小
                formItemLayout,
                //  医生名称
                doctorNameDecorator: ['doctorName', {
                    initialValue: '普通医生',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入医生名称'
                    },]
                }],
            };
        },
        created(){
            //  console.log(this.$route.params);
            console.log('是编辑？', !!this.doctorId);
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