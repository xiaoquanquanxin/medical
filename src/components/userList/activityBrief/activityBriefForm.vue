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
    import { requestBriefSave, requestBriefUpdate } from '../../../api/userList/activityBrief';
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
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
            //  表单提交 保存
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (!err) {
                            resolve(values);
                        } else {
                            reject();
                        }
                    });
                }))
                    .then(values => {
                        return new Promise(((resolve, reject) => {
                            console.log('发请求吧');
                            (() => {
                                if (!this.patientReplyId) {
                                    return requestBriefSave(Object.assign({
                                        patientId: this.patientId,
                                    }, values));
                                } else {
                                    return requestBriefUpdate(Object.assign({
                                        patientId: this.patientId,
                                    }, values));
                                }
                            })()
                                .then(v => {
                                    resolve(v);
                                    console.log(v);
                                })
                                .catch(err => {
                                    console.log(err);
                                    reject(err);
                                });
                        }));
                    });
            },
        }
    };
</script>