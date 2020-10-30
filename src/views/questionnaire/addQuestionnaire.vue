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
                <a-input class="add-form-input"
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
                        const { assessName, questionnaireContent } = data;
                        this.form.setFieldsValue({
                            assessName,
                            questionnaireContent,
                        });
                    });
            },
            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    console.table(values);
                    (() => {
                        //  如果是新增
                        if (!this.questionnaireId) {
                            return requestAssessInsert(values);
                        }
                        //  如果是编辑
                        return requestAssessUpdate(Object.assign(
                            { id: this.questionnaireId },
                            values)
                        );
                    })()
                        .then(v => {
                            this.$message.success('操作成功');
                            this.$router.push({ name: 'questionnaire' });
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                });
            },
        }
    };
</script>