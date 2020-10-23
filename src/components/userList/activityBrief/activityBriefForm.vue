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
                            v-decorator="contentDecorator"
                            placeholder="请输入活动小结"
                    />
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestBriefSave, requestBriefGet } from '../../../api/userList/activityBrief';
    //  活动小结操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            activityBriefId(){
                return this.$store.state.userList.activityBriefId;
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
                contentDecorator: ['content', {
                    rules: [{
                        required: true,
                        message: '请输入活动小结'
                    },]
                }],
            };
        },
        created(){
            console.log('是编辑？', !!this.activityBriefId);
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                //  如果是新增
                if (!this.activityBriefId) {
                    return;
                }
                //  如果是编辑
                requestBriefGet(this.activityBriefId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        this.form.setFieldsValue({
                            content: data.content,
                        });
                    });
            },
            //  表单提交 保存
            handleSubmit(){
                //  如果是编辑
                if (this.activityBriefId) {
                    return Promise.resolve(true);
                }
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (err) {
                            reject();
                            return;
                        }
                        console.log('发请求吧');
                        requestBriefSave(Object.assign({
                            patientId: this.patientId,
                        }, values))
                            .then(v => {
                                resolve();
                                console.log(v);
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