<template>
    <div class="layout-content-inner-main">
        <!--返回按钮-->
        <GoBackButton/>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-divider orientation="left">基础信息</a-divider>
            <a-form-item label="供应商名称">
                <a-input class="add-form-input"
                         v-decorator="supplierNameDecorator"
                         placeholder="请输入供应商名称"
                />
            </a-form-item>
            <a-form-item label="供应商编码">
                <a-input class="add-form-input"
                         v-decorator="supplierNumberDecorator"
                         placeholder="请输入供应商编码"
                />
            </a-form-item>
            <a-form-item label="地址-省份">
                <a-select class="add-form-input"
                          v-decorator="provinceDecorator"
                          placeholder="请选择地址-省份"
                >
                    <a-select-option value="1">
                        山西
                    </a-select-option>
                    <a-select-option value="2">
                        陕西
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="地址-市区">
                <a-select class="add-form-input"
                          v-decorator="cityDecorator"
                          placeholder="请选择地址-市区"
                >
                    <a-select-option value="1">
                        啊啊啊啊
                    </a-select-option>
                    <a-select-option value="2">
                        宝贝宝贝
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="详细地址">
                <a-input class="add-form-input"
                         v-decorator="detailedAddressDecorator"
                         placeholder="请输入详细地址"
                />
            </a-form-item>
            <a-form-item label="联系人">
                <a-input class="add-form-input"
                         v-decorator="contactsDecorator"
                         placeholder="请输入联系人"
                />
            </a-form-item>
            <a-form-item label="手机号" required>
                <a-input class="add-form-input"
                         v-decorator="phoneDecorator"
                         placeholder="请输入手机号"
                />
            </a-form-item>
            <a-form-item label="邮箱">
                <a-input class="add-form-input"
                         v-decorator="emailDecorator"
                         placeholder="请输入邮箱"
                />
            </a-form-item>
            <a-divider orientation="left">上传证件</a-divider>
            <a-form-item label="营业执照">
                <div class="add-form-input">
                    <a-upload-dragger
                            action="/api/file/upload"
                            list-type="picture-card"
                            :data="beforeUploadData"
                            @change="uploadHandleChange($event,'businessLicense','businessLicenseThumbUrl')"
                            :beforeUpload="beforeUploadFn"
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
                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="businessLicenseDecorator"
                    />
                </div>
            </a-form-item>
            <a-form-item label="合同上传">
                <div class="add-form-input">
                    <a-upload-dragger
                            action="/api/file/upload"
                            list-type="picture-card"
                            :data="beforeUploadData"
                            @change="uploadHandleChange($event,'contract','contractThumbUrl')"
                            :beforeUpload="beforeUploadFn"
                            :show-upload-list="false"
                    >
                        <img v-if="contractThumbUrl"
                             :src="contractThumbUrl"
                             class="upload-default-img"
                             alt=""/>
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传合同</p>
                    </a-upload-dragger>
                    <p class="nowrap">格式：pdf、jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="contractDecorator"
                    />
                </div>
            </a-form-item>
            <a-form-item label="食品资格证">
                <div class="add-form-input">
                    <a-upload-dragger
                            action="/api/file/upload"
                            list-type="picture-card"
                            :data="beforeUploadData"
                            @change="uploadHandleChange($event,'foodQualificationCertificate','foodQualificationCertificateThumbUrl')"
                            :beforeUpload="beforeUploadFn"
                            :show-upload-list="false"
                    >
                        <img v-if="foodQualificationCertificateThumbUrl"
                             :src="foodQualificationCertificateThumbUrl"
                             class="upload-default-img"
                             alt=""/>
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传证件</p>
                    </a-upload-dragger>
                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="foodQualificationCertificateDecorator"
                    />
                </div>
            </a-form-item>
            <a-form-item label="特医食品资格证">
                <div class="add-form-input">
                    <a-upload-dragger
                            action="/api/file/upload"
                            list-type="picture-card"
                            :data="beforeUploadData"
                            @change="uploadHandleChange($event,'specialMedicalFoodQualificationCertificate','specialMedicalFoodQualificationCertificateThumbUrl')"
                            :beforeUpload="beforeUploadFn"
                            :show-upload-list="false"
                    >
                        <img v-if="specialMedicalFoodQualificationCertificateThumbUrl"
                             :src="specialMedicalFoodQualificationCertificateThumbUrl"
                             class="upload-default-img"
                             alt=""/>
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传证件</p>
                    </a-upload-dragger>
                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="specialMedicalFoodQualificationCertificateDecorator"
                    />
                </div>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 4, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { isPhoneNumber } from '@/utils/validate';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestSupplierGet, requestSupplierInsert, requestSupplierUpdate } from '../../api/supplier';
    import { uploadHandleChange, beforeUploadFn, beforeUploadData } from '../../utils/upload';

    export default {
        components: {
            GoBackButton,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //	上传文件的数据，这样的对象只需要一个
                beforeUploadData,
                //  科室id
                supplierId: this.$route.params.supplierId,
                //  表单大小
                formItemLayout,
                //  供应商名称
                supplierNameDecorator: ['supplierName', {
                    initialValue: '供应商名称',
                    rules: [{
                        required: true,
                        message: '请输入供应商名称'
                    },]
                }],
                //  供应商编码
                supplierNumberDecorator: ['supplierNumber', {
                    initialValue: '供应商编码',
                    rules: [{
                        required: true,
                        message: '请输入供应商编码'
                    },]
                }],
                //  地址-省份
                provinceDecorator: ['province', {
                    initialValue: '1',
                    rules: [{
                        required: true,
                        message: '请选择地址-省份'
                    },]
                }],
                //  地址-市区
                cityDecorator: ['city', {
                    initialValue: '1',
                    rules: [{
                        required: true,
                        message: '请选择地址-市区'
                    },]
                }],
                //  详细地址
                detailedAddressDecorator: ['detailedAddress', {
                    initialValue: '详细地址',
                    rules: [{
                        required: true,
                        message: '请输入详细地址'
                    },]
                }],
                //  联系人
                contactsDecorator: ['contacts', {
                    initialValue: '联系人',
                    rules: [{
                        required: true,
                        message: '请输入联系人'
                    },]
                }],
                //  手机号
                phoneDecorator: ['phone', {
                    initialValue: '15559448998',
                    rules: [{
                        validator: isPhoneNumber,
                    },]
                }],
                //  邮箱
                emailDecorator: ['email', {
                    initialValue: '43@32.com',
                    rules: [{
                        required: true,
                        message: '请输入邮箱'
                    },]
                }],

                //  🎨🎨🎨🎨🎨🎨🎨🎨图片🎨🎨🎨🎨🎨🎨🎨🎨
                //  营业执照
                businessLicenseDecorator: ['businessLicense', {
                    rules: [{
                        required: true,
                        message: '请上传营业执照'
                    },]
                }],
                businessLicenseThumbUrl: null,
                //  合同
                contractDecorator: ['contract', {
                    rules: [{
                        required: true,
                        message: '请上传合同'
                    },]
                }],
                contractThumbUrl: null,
                //  食品资格证
                foodQualificationCertificateDecorator: ['foodQualificationCertificate', {
                    rules: [{
                        required: true,
                        message: '请上传食品资格证',
                    },]
                }],
                foodQualificationCertificateThumbUrl: null,
                //  特医食品资格证
                specialMedicalFoodQualificationCertificateDecorator: ['specialMedicalFoodQualificationCertificate', {
                    rules: [{
                        required: true,
                        message: '请上传特医食品资格证',
                    },]
                }],
                specialMedicalFoodQualificationCertificateThumbUrl: null,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  上传图片通用方法
            uploadHandleChange,
            beforeUploadFn,
            //  主要请求
            searchFn(){
                //  如果是新增
                if (!this.supplierId) {
                    return;
                }
                //  如果是编辑
                requestSupplierGet(this.supplierId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                    });
            },
            //    表单提交
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    console.table(values);
                    (() => {
                        //  如果是新增
                        if (!this.supplierId) {
                            return requestSupplierInsert(values);
                        }
                        //  如果是编辑
                        return requestSupplierUpdate(Object.assign(
                            { id: this.supplierId },
                            values)
                        );
                    })()
                        .then(v => {
                            this.$message.success('操作成功');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            },
        }
    };
</script>
<style></style>