<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="是否能够按照方案执行">
                <a-radio-group v-decorator="performDecorator">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input
                        v-decorator="performCauseDecorator"
                        placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="是否能够耐受">
                <a-radio-group v-decorator="toleranceDecorator">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input
                        v-decorator="toleranceCauseDecorator"
                        placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="有无大便">
                <a-radio-group v-decorator="shitDecorator">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input
                        v-decorator="shitCauseDecorator"
                        placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="有无饥饿感">
                <a-radio-group v-decorator="hungerDecorator">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input
                        v-decorator="hungerCauseDecorator"
                        placeholder="请输入具体原因"/>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    //  病程记录操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            progressNoteId(){
                return this.$store.state.userList.progressNoteId;
            }
        },
        data(){
            return {
                formItemLayout,
                //  是否能够按照方案执行
                performDecorator: ['perform', {
                    initialValue: 1,
                }],
                performCauseDecorator: ['performCause', {
                    rules: [{
                        required: true,
                        message: '请输入具体原因'
                    },]
                }],

                //  是否能够耐受
                toleranceDecorator: ['tolerance', {
                    initialValue: 1,
                }],
                toleranceCauseDecorator: ['toleranceCause', {
                    rules: [{
                        required: true,
                        message: '请输入具体原因'
                    },]
                }],

                //  有无大便
                shitDecorator: ['shit', {
                    initialValue: 1,
                }],
                shitCauseDecorator: ['shitCause', {
                    rules: [{
                        required: true,
                        message: '请输入具体原因'
                    },]
                }],

                //  有无饥饿感
                hungerDecorator: ['hunger', {
                    initialValue: 1,
                }],
                hungerCauseDecorator: ['hungerCause', {
                    rules: [{
                        required: true,
                        message: '请输入具体原因'
                    },]
                }],
            };
        },
        created(){
            console.log('是编辑？', !!this.progressNoteId);
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
                    console.log(this.form);
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (!err) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                }))
                    .then(v => {
                        return new Promise(((resolve, reject) => {
                            console.log('发请求吧');
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }));
                    });
            },
        }
    };
</script>