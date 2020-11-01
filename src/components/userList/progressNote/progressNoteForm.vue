<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="是否能够按照方案执行">
                <a-radio-group v-decorator="executionDecorator">
                    <a-radio value="1">是</a-radio>
                    <a-radio value="0">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input class="add-form-input"
                         v-decorator="executionContentDecorator"
                         placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="是否能够耐受">
                <a-radio-group v-decorator="toleranceDecorator">
                    <a-radio value="1">是</a-radio>
                    <a-radio value="0">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input class="add-form-input"
                         v-decorator="toleranceContentDecorator"
                         placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="有无大便">
                <a-radio-group v-decorator="shitDecorator">
                    <a-radio value="1">是</a-radio>
                    <a-radio value="0">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input class="add-form-input"
                         v-decorator="shitContentDecorator"
                         placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="有无饥饿感">
                <a-radio-group v-decorator="hungerDecorator">
                    <a-radio value="1">是</a-radio>
                    <a-radio value="0">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input class="add-form-input"
                         v-decorator="hungerContentDecorator"
                         placeholder="请输入具体原因"/>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestDiseaseRecordGet, requestDiseaseRecordSave } from '../../../api/userList/progressNote';
    //  病程记录操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  页面参数 - 病人id
            patientId(){
                return this.$route.params.patientId;
            },
            progressNoteId(){
                return this.$store.state.userList.progressNoteId;
            }
        },
        data(){
            return {
                formItemLayout,
                //  是否能够按照方案执行
                executionDecorator: ['execution', {
                
                }],
                executionContentDecorator: ['executionContent', {
                    rules: [{
                        message: '请输入具体原因'
                    },]
                }],

                //  是否能够耐受
                toleranceDecorator: ['tolerance', {
                
                }],
                toleranceContentDecorator: ['toleranceContent', {
                    rules: [{
                        message: '请输入具体原因'
                    },]
                }],

                //  有无大便
                shitDecorator: ['shit', {
                
                }],
                shitContentDecorator: ['shitContent', {
                    rules: [{
                        message: '请输入具体原因'
                    },]
                }],

                //  有无饥饿感
                hungerDecorator: ['hunger', {
                
                }],
                hungerContentDecorator: ['hungerContent', {
                    rules: [{
                        message: '请输入具体原因'
                    },]
                }],
            };
        },
        created(){
            console.log('是编辑？', this.progressNoteId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                //  如果是新增
                if (!this.progressNoteId) {
                    return;
                }
                //  如果是编辑
                requestDiseaseRecordGet(this.progressNoteId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const {
                            execution,
                            executionContent,
                            tolerance,
                            toleranceContent,
                            shit,
                            shitContent,
                            hunger,
                            hungerContent,
                        } = data;
                        console.log( execution,
                            executionContent,
                            tolerance,
                            toleranceContent,
                            shit,
                            shitContent,
                            hunger,
                            hungerContent,)
                        this.form.setFieldsValue({
                            execution,
                            executionContent,
                            tolerance,
                            toleranceContent,
                            shit,
                            shitContent,
                            hunger,
                            hungerContent,
                        });
                    });
            },
            //  表单提交 保存
            handleSubmit(){
                //  如果是编辑，直接过
                if (this.progressNoteId) {
                    return Promise.resolve(true);
                }
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
                        return new Promise((resolve, reject) => {
                            requestDiseaseRecordSave(Object.assign({
                                    dataType: 2,
                                    doctorId: 2,
                                    patientId: this.patientId,
                                    ...values,
                                },
                            ))
                                .then(v => {
                                    resolve();
                                })
                                .catch(err => {
                                    reject();
                                });
                        });
                    });
            },
        }
    };
    //	dataType	⚠️todo  数据类型(1内网，2外网)
    //	doctorId	⚠️️todo  录入医生id
</script>
