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
            <a-form-item label="医院名称">
                <a-input class="add-form-input"
                         v-decorator="hospitalNameDecorator"
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
            <a-form-item label="地址-县城">
                <a-select class="add-form-input"
                          v-decorator="countyDecorator"
                          placeholder="请选择地址-县城"
                >
                    <a-select-option value="1">
                        啊啊啊啊
                    </a-select-option>
                    <a-select-option value="2">
                        宝贝宝贝
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="医院图标" required>
                <div class="add-form-input">
                    <a-upload-dragger
                            action="/api/file/upload"
                            list-type="picture-card"
                            :data="beforeUploadData"
                            @change="uploadHandleChange($event,'hospitalPic','hospitalPicThumbUrl')"
                            :beforeUpload="beforeUploadFn"
                            :show-upload-list="false"
                    >
                        <img v-if="hospitalPicThumbUrl"
                             :src="hospitalPicThumbUrl"
                             class="upload-default-img"
                             alt=""/>
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击图片</p>
                    </a-upload-dragger>
                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="hospitalPicThumbUrl"
                    />
                </div>
            </a-form-item>
            <a-divider orientation="left"></a-divider>
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
            <a-form-item label="是否有支付二维码">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                        是
                    </a-radio>
                    <a-radio value="b">
                        否
                    </a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="是否有处方号条形码">
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
            <a-divider orientation="left"></a-divider>
            <a-form-item label="微信商户号">
                <a-input class="add-form-input"
                         v-decorator="['note1', {
                    rules: [
                    {
                    max:11,
                    message: '最多11位'
                    },
                    {
                    required: true,
                    message: '请输入微信商户号'
                    },] }]"
                />
            </a-form-item>
            <a-form-item label="商户API">
                <a-input class="add-form-input"
                         v-decorator="['note', {
                    rules: [{
                    required: true,
                    message: '请输入商户API'
                    }] }]"
                />
            </a-form-item>
            <a-form-item label="API证书">
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
                        <p>点击图片</p>
                    </a-upload-dragger>
                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="foodQualificationCertificateDecorator"
                    />
                </div>
            </a-form-item>
            <a-form-item label="支付宝商户号">
                <a-input class="add-form-input"
                         v-decorator="['note', {
                    rules: [{
                    required: true,
                    message: '请输入支付宝商户号'
                    }] }]"
                />
            </a-form-item>
            <a-form-item label="商户API">
                <a-input class="add-form-input"
                         v-decorator="['note', {
                    rules: [{
                    required: true,
                    message: '请输入商户API'
                    }] }]"
                />
            </a-form-item>
            <a-form-item label="API证书">
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
                        <p>点击图片</p>
                    </a-upload-dragger>
                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="foodQualificationCertificateDecorator"
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
    import GoBackButton from '@/components/goBackButton.vue';
    import { uploadHandleChange, beforeUploadFn, beforeUploadData } from '../../utils/upload';
    import { requestHospitalSave, requestHospitalUpdate } from '../../api/hospital';

    export default {
        components: {
            GoBackButton,
        },
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
                //	上传文件的数据，这样的对象只需要一个
                beforeUploadData,
                formItemLayout,
                //  医院id
                hospitalId: this.$route.params.hospitalId,

                //  医院名称
                hospitalNameDecorator: ['hospitalName', {
                    rules: [{
                        required: true,
                        message: '请输入医院名称'
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
                //  地址-县城
                countyDecorator: ['county', {
                    initialValue: '1',
                    rules: [{
                        required: true,
                        message: '请选择地址-县城'
                    },]
                }],
                Decorator: ['', {
                    rules: [{
                        required: true,
                        message: '请输入'
                    },]
                }],
                Decorator: ['', {
                    rules: [{
                        required: true,
                        message: '请输入'
                    },]
                }],
                Decorator: ['', {
                    rules: [{
                        required: true,
                        message: '请输入'
                    },]
                }],
                Decorator: ['', {
                    rules: [{
                        required: true,
                        message: '请输入'
                    },]
                }],
                Decorator: ['', {
                    rules: [{
                        required: true,
                        message: '请输入'
                    },]
                }],
                Decorator: ['', {
                    rules: [{
                        required: true,
                        message: '请输入'
                    },]
                }],

                //  地址
                addrDecorator: ['addr', {
                    initialValue: null,
                }],
                

                //  地址下拉
                addrList: [],


                //  医院图标
                hospitalPicDecorator: ['hospitalPic', {
                    rules: [{
                        required: true,
                        message: '请上传医院图标',
                    },]
                }],
                hospitalPicThumbUrl: null,
                
                //  微信API证书
                hospitalPicDecorator: ['hospitalPic', {
                    rules: [{
                        required: true,
                        message: '请上传微信API证书',
                    },]
                }],
                hospitalPicThumbUrl: null,
                //  支付宝API证书
                hospitalPicDecorator: ['hospitalPic', {
                    rules: [{
                        required: true,
                        message: '请上传支付宝API证书',
                    },]
                }],
                hospitalPicThumbUrl: null,
                
                
            };
        },
        created(){
            //  this.form.setFieldsValue
            this.searchFn();
        },
        methods: {
            //  上传图片通用方法
            uploadHandleChange,
            beforeUploadFn,
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
            //    表单提交
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.table(values);
                        (() => {
                            //  如果是新增
                            if (!this.manufacturerId) {
                                return requestHospitalSave(values);
                            }
                            //  如果是编辑
                            return requestHospitalUpdate(Object.assign(
                                { id: this.manufacturerId },
                                values)
                            );
                        })()
                            .then(v => {
                                console.log(v);
                                resolve();
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
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