<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <p>基础信息</p>
            <hr>
            <br>
            <a-form-item label="供应商名称">
                <a-input
                        v-decorator="supplierNameDecorator"
                        placeholder="请输入供应商名称"
                />
            </a-form-item>
            <div style="display: none">
                <a-form-item label="供应商编码">
                    <a-input
                            v-decorator="supplierCodeDecorator"
                            placeholder="请输入供应商编码"
                    />
                </a-form-item>
                <a-form-item label="地址">
                    <a-select placeholder="请选择地址"
                              v-decorator="addressDecorator"
                    >
                        <a-select-option value="">
                            请选择地址
                        </a-select-option>
                        <!--                    <a-select-option v-for="(item,index) in addrList"-->
                        <!--                                     :value="index"-->
                        <!--                                     :key="index"-->
                        <!--                    >-->
                        <!--                        {{item}}&#45;&#45;{{index}}-->
                        <!--                    </a-select-option>-->
                    </a-select>
                </a-form-item>
                <a-form-item label="详细地址">
                    <a-input
                            v-decorator="detailedAddressDecorator"
                            placeholder="请输入详细地址"
                    />
                </a-form-item>
                <a-form-item label="联系人">
                    <a-input
                            v-decorator="contactDecorator"
                            placeholder="请输入联系人"
                    />
                </a-form-item>
                <a-form-item label="手机号">
                    <a-input
                            v-decorator="phoneNumberDecorator"
                            placeholder="请输入手机号"
                    />
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input
                            v-decorator="emailDecorator"
                            placeholder="请输入邮箱"
                    />
                </a-form-item>
            </div>
            <p>上传证件</p>
            <hr>
            <br>
            <a-form-item label="营业执照">
                <div class="dropbox">
                    <a-upload-dragger
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            list-type="picture-card"
                            @change="uploadHandleChange"
                            :show-upload-list="false"
                    >
                        <img v-if="businessLicenseThumbUrl"
                             :src="businessLicenseThumbUrl"
                             class="upload-default-img"
                             alt=""/>
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传证件</p>
                    </a-upload-dragger>
                    <p>建议尺寸:750*300,格式:jpg、png</p>
                    <a-input
                            type="hidden"
                            v-decorator="businessLicenseDecorator"
                    />
                </div>
            </a-form-item>
            <a-form-item label="合同上传">
                <div class="dropbox">
                    <a-upload-dragger>
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传合同</p>
                    </a-upload-dragger>
                    <p>格式：pdf、jpg、png</p>
                </div>
            </a-form-item>
            <a-form-item label="食品资格证">
                <div class="dropbox">
                    <a-upload-dragger>
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传证件</p>
                    </a-upload-dragger>
                    <p>建议尺寸:750*300,格式:jpg、png</p>
                </div>
            </a-form-item>
            <a-form-item label="特医食品资格证">
                <div class="dropbox">
                    <a-upload-dragger>
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传证件</p>
                    </a-upload-dragger>
                    <p>建议尺寸:750*300,格式:jpg、png</p>
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
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  科室id
                supplierId: this.$route.params.supplierId,
                //  表单大小
                formItemLayout,
                //  供应商名称
                supplierNameDecorator: ['supplierName', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入供应商名称'
                    },]
                }],
                //  供应商编码
                supplierCodeDecorator: ['supplierCode', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入供应商编码'
                    },]
                }],
                //  地址
                addressDecorator: ['address', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请选择地址'
                    },]
                }],
                //  详细地址
                detailedAddressDecorator: ['detailedAddress', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入详细地址'
                    },]
                }],
                //  联系人
                contactDecorator: ['contact', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入联系人'
                    },]
                }],
                //  手机号
                phoneNumberDecorator: ['phoneNumber', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入手机号'
                    },]
                }],
                //  邮箱
                emailDecorator: ['email', {
                    initialValue: '',
                }],

                //  营业执照
                businessLicenseDecorator: ['businessLicense', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请上传营业执照'
                    },]
                }],
                businessLicenseThumbUrl: null,
            };
        },
        created(){
            //  console.log(this.$route.params);
            console.log('是编辑？', !!this.supplierId);
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
            //  营业执照
            uploadHandleChange({ fileList }){
                const { response } = fileList[0];
                if (response && response.status === 'done') {
                    //  console.log(this);
                    //  console.log('封面', response.thumbUrl);
                    //  console.log('图片', response.url);
                    this.form.setFieldsValue({
                        businessLicense: response.url,
                    });
                    this.businessLicenseThumbUrl = response.thumbUrl;
                }
            },
        }
    };
</script>
<style></style>