<template>
    <div class="layout-content-inner-main">
        <!--返回按钮-->
        <GoBackButton/>
        <a-divider orientation="left">基础信息</a-divider>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="评估表名称">
                <a-input
                        v-decorator="questionnaireNameDecorator"
                        placeholder="请输入评估表名称"
                />
            </a-form-item>
            <a-form-item label="评估表内容">
                <div style="width:calc((100vw - 200px)*.65)">
                    <a-textarea
                            :auto-size="{ minRows: 3, maxRows: 5 }"
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
                questionnaireNameDecorator: ['questionnaireName', {
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
            console.log('是编辑？', !!this.questionnaireId);
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                this.mealPlanCheck();
                this.form.validateFields((err, values) => {
                    console.table(values);
                    console.log(!err);
                });
            },
        }
    };
</script>