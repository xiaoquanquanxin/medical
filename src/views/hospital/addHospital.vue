<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="医院名称">
                <a-input
                        v-decorator="hospitalNameDecorator"
                />
            </a-form-item>
            <a-form-item label="地址" has-feedback>
                <a-select placeholder="请选择地址"
                          v-decorator="addrDecorator"
                >
                    <a-select-option v-for="(item,index) in addrList"
                                     :value="index"
                                     :key="index"
                    >
                        {{item}}--{{index}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="医院图标">
                <div class="dropbox">
                    <a-upload-dragger>
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>上传图片</p>
                    </a-upload-dragger>
                </div>
            </a-form-item>
            <hr>
            <a-form-item label="状态">
                <a-switch v-decorator="['switch', { valuePropName: 'checked' }]"/>
            </a-form-item>
            <a-form-item label="支付商家为医院">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                        是
                    </a-radio>
                    <a-radio value="b">
                        否
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="方式">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                        线上
                    </a-radio>
                    <a-radio value="b">
                        线下
                    </a-radio>
                    <a-radio value="b">
                        线上线下
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="处方上是否有二维码用于支付">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                        是
                    </a-radio>
                    <a-radio value="b">
                        否
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="处方上是否有处方号条形码">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                        是
                    </a-radio>
                    <a-radio value="b">
                        否
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="是否需要审核">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                        是
                    </a-radio>
                    <a-radio value="b">
                        否
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="是否是充值缴费方式">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                        是
                    </a-radio>
                    <a-radio value="b">
                        否
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <hr>
            <a-form-item label="微信商户号">
                <a-input
                        v-decorator="['note1', {
                    rules: [
                    {
                    max:11,
                    message: '最多11位'
                    },
                    {
                    required: true,
                    message: '请输入微信商户号'
                    },
] }]"
                />
            </a-form-item>
            <a-form-item label="商户API">
                <a-input
                        v-decorator="['note', {
                    rules: [{
                    required: true,
                    message: '请输入商户API'
                    }] }]"
                />
            </a-form-item>
            <a-form-item label="API证书">
                <div class="dropbox">
                    <a-upload-dragger
                            v-decorator="['dragger',{valuePropName: 'fileList',getValueFromEvent: normFile,},]"
                            name="files"
                            action="/upload.do"
                    >
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>上传图片</p>
                    </a-upload-dragger>
                </div>
            </a-form-item>
            <a-form-item label="支付宝商户号">
                <a-input
                        v-decorator="['note', {
                    rules: [{
                    required: true,
                    message: '请输入支付宝商户号'
                    }] }]"
                />
            </a-form-item>
            <a-form-item label="商户API">
                <a-input
                        v-decorator="['note', {
                    rules: [{
                    required: true,
                    message: '请输入商户API'
                    }] }]"
                />
            </a-form-item>
            <a-form-item label="API证书">
                <div class="dropbox">
                    <a-upload-dragger
                            v-decorator="['dragger',{valuePropName: 'fileList',getValueFromEvent: normFile,},]"
                            name="files"
                            action="/upload.do"
                    >
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>上传图片</p>
                    </a-upload-dragger>
                </div>
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
            this.form = this.$form.createForm(this, {
                //  设置表单域内字段 id 的前缀
                name: '',
                //  任一表单域的值发生改变时的回调 ⚠️ 回调中手动调用 this.$forceUpdate() 更新组件
                onValuesChange: (props, values) => {},
            });
        },
        data(){
            return {
                formItemLayout,
                //  医院id
                hospitalId: this.$route.params.hospitalId,

                //  医院名称
                hospitalNameDecorator: ['hospitalName', {
                    initialValue: '经纬医院',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入医院名称'
                    },]
                }],

                //  地址
                addrDecorator: ['addr', {
                    initialValue: null,
                }],

                //  地址下拉
                addrList: []
            };
        },
        created(){

        },
        mounted(){
            //  编辑
            setTimeout(() => {
                this.addrList = ['山西', '陕西省', '北京市'];
                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        addr: 1
                    });
                });
            }, 1000);
        },
        methods: {
            //    表单提交
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(err);
                    console.table(values);
                    console.log(values.hospitalIcon);
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },

            normFile(e){
                console.log('Upload event:', e);
                if (Array.isArray(e)) {
                    return e;
                }
                return e && e.fileList;
            },
        },
    };
</script>
<style scoped lang="stylus">
    .form
        width 800px;
    
    .form .dropbox
        height: 180px;
        line-height: 1.5;
</style>