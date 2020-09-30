<template>
    <div class="layout-content-inner-main">
        <p>新增科室</p>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="科室名称">
                <a-input
                        v-decorator="departmentNameDecorator"
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
                //  科室id
                departmentId: this.$route.params.departmentId,
                //  表单大小
                formItemLayout: {
                    labelCol: { span: 6 },
                    wrapperCol: { offset: 1, span: 8 },
                },
                //  科室名称
                departmentNameDecorator: ['departmentName', {
                    initialValue: '普通科室',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入科室名称'
                    },]
                }],
            };
        },
        created(){
            //  console.log(this.$route.params);
            console.log('是编辑？', !!this.departmentId);
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