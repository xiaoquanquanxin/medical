<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <a-row type="flex" justify="space-between" align="middle">
                <!--返回按钮-->
                <GoBackButton/>
                <a-button type="primary" @click="handleSubmit">保存</a-button>
            </a-row>
        </div>
        <a-divider orientation="left">基础信息</a-divider>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="评估表名称">
                <a-input
                        v-decorator="assessNameDecorator"
                        placeholder="请输入评估表名称"
                />
            </a-form-item>
            <a-form-item label="评估表内容">
                <div>
                    <a-textarea
                            v-decorator="questionnaireContentDecorator"
                            placeholder="请输入评估表内容"
                    />
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestAssessGet, requestAssessInsert, requestAssessUpdate } from '../../api/questionnaire';

    export default {
        components: {
            GoBackButton,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                questionnaireId: this.$route.params.questionnaireId,

                formItemLayout,

                //  评估表名称
                assessNameDecorator: ['assessName', {
                    rules: [{
                        required: true,
                        message: '请输入评估表名称'
                    },]
                }],
                //  评估表内容
                questionnaireContentDecorator: ['questionnaireContent', {
                    rules: [{
                        required: true,
                        message: '请输入评估表内容'
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
                if (!this.questionnaireId) {
                    return;
                }
                requestAssessGet(this.questionnaireId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        this.form.setFieldsValue({
                            assessName: data.assessName,
                        });
                    });
            },
            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.table(values);
                    console.log(!err);
                    const data = { assessName: values.assessName };
                    if (!err) {
                        if (this.questionnaireId) {
                            data.id = this.questionnaireId;
                            requestAssessUpdate(data)
                                .then(v => {
                                    console.log(v);
                                });
                        } else {
                            requestAssessInsert(data)
                                .then(v => {
                                    console.log(v);
                                });
                        }
                    }
                });
            },
        }
    };
</script>