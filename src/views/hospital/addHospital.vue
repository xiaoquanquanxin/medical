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
                         placeholder="请输入医院名称"
                />
            </a-form-item>
            <a-form-item label="渠道商地区-省份">
                <a-select class="add-form-input"
                          v-decorator="provinceDecorator"
                          placeholder="请选择渠道商地区-省份"
                          @change="provinceChange"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in areaList.provinceList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="渠道商地区-市区">
                <a-select class="add-form-input"
                          v-decorator="cityDecorator"
                          placeholder="请选择渠道商地区-市区"
                          @change="cityChange"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in areaList.cityList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="渠道商地区-县城">
                <a-select class="add-form-input"
                          v-decorator="countyDecorator"
                          placeholder="请选择渠道商地区-县城"
                          @change="cityChange"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in areaList.countyList"
                    >{{item.name}}
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
                        />
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击图片</p>
                    </a-upload-dragger>
                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="hospitalPicDecorator"
                    />
                </div>
            </a-form-item>
            <!--            <a-divider orientation="left"></a-divider>-->
            <!--            <a-form-item label="状态">-->
            <!--                <a-switch v-decorator="['switch', { valuePropName: 'checked' }]"/>-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="支付商家为医院">-->
            <!--                <a-radio-group v-decorator="['radio-group']">-->
            <!--                    <a-radio value="a">-->
            <!--                        是-->
            <!--                    </a-radio>-->
            <!--                    <a-radio value="b">-->
            <!--                        否-->
            <!--                    </a-radio>-->
            <!--                </a-radio-group>-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="方式">-->
            <!--                <a-radio-group v-decorator="['radio-group']">-->
            <!--                    <a-radio value="a">-->
            <!--                        线上-->
            <!--                    </a-radio>-->
            <!--                    <a-radio value="b">-->
            <!--                        线下-->
            <!--                    </a-radio>-->
            <!--                    <a-radio value="b">-->
            <!--                        线上线下-->
            <!--                    </a-radio>-->
            <!--                </a-radio-group>-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="是否有支付二维码">-->
            <!--                <a-radio-group v-decorator="['radio-group']">-->
            <!--                    <a-radio value="a">-->
            <!--                        是-->
            <!--                    </a-radio>-->
            <!--                    <a-radio value="b">-->
            <!--                        否-->
            <!--                    </a-radio>-->
            <!--                </a-radio-group>-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="是否有处方号条形码">-->
            <!--                <a-radio-group v-decorator="['radio-group']">-->
            <!--                    <a-radio value="a">-->
            <!--                        是-->
            <!--                    </a-radio>-->
            <!--                    <a-radio value="b">-->
            <!--                        否-->
            <!--                    </a-radio>-->
            <!--                </a-radio-group>-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="是否需要审核">-->
            <!--                <a-radio-group v-decorator="['radio-group']">-->
            <!--                    <a-radio value="a">-->
            <!--                        是-->
            <!--                    </a-radio>-->
            <!--                    <a-radio value="b">-->
            <!--                        否-->
            <!--                    </a-radio>-->
            <!--                </a-radio-group>-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="是否是充值缴费方式">-->
            <!--                <a-radio-group v-decorator="['radio-group']">-->
            <!--                    <a-radio value="a">-->
            <!--                        是-->
            <!--                    </a-radio>-->
            <!--                    <a-radio value="b">-->
            <!--                        否-->
            <!--                    </a-radio>-->
            <!--                </a-radio-group>-->
            <!--            </a-form-item>-->
            <!--            <a-divider orientation="left"></a-divider>-->
            <!--            <a-form-item label="微信商户号">-->
            <!--                <a-input class="add-form-input"-->
            <!--                         v-decorator="['note1', {-->
            <!--                    rules: [-->
            <!--                    {-->
            <!--                    max:11,-->
            <!--                    message: '最多11位'-->
            <!--                    },-->
            <!--                    {-->
            <!--                    required: true,-->
            <!--                    message: '请输入微信商户号'-->
            <!--                    },] }]"-->
            <!--                />-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="商户API">-->
            <!--                <a-input class="add-form-input"-->
            <!--                         v-decorator="['note', {-->
            <!--                    rules: [{-->
            <!--                    required: true,-->
            <!--                    message: '请输入商户API'-->
            <!--                    }] }]"-->
            <!--                />-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="API证书">-->
            <!--                <div class="add-form-input">-->
            <!--                    <a-upload-dragger-->
            <!--                            action="/api/file/upload"-->
            <!--                            list-type="picture-card"-->
            <!--                            :data="beforeUploadData"-->
            <!--                            @change="uploadHandleChange($event,'foodQualificationCertificate','foodQualificationCertificateThumbUrl')"-->
            <!--                            :beforeUpload="beforeUploadFn"-->
            <!--                            :show-upload-list="false"-->
            <!--                    >-->
            <!--                        <img v-if="foodQualificationCertificateThumbUrl"-->
            <!--                             :src="foodQualificationCertificateThumbUrl"-->
            <!--                             class="upload-default-img"-->
            <!--                             alt=""/>-->
            <!--                        <p v-else class="ant-upload-drag-icon">-->
            <!--                            <a-icon type="inbox"/>-->
            <!--                        </p>-->
            <!--                        <p>点击图片</p>-->
            <!--                    </a-upload-dragger>-->
            <!--                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>-->
            <!--                    <a-input class="add-form-input"-->
            <!--                             type="hidden"-->
            <!--                             v-decorator="foodQualificationCertificateDecorator"-->
            <!--                    />-->
            <!--                </div>-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="支付宝商户号">-->
            <!--                <a-input class="add-form-input"-->
            <!--                         v-decorator="['note', {-->
            <!--                    rules: [{-->
            <!--                    required: true,-->
            <!--                    message: '请输入支付宝商户号'-->
            <!--                    }] }]"-->
            <!--                />-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="商户API">-->
            <!--                <a-input class="add-form-input"-->
            <!--                         v-decorator="['note', {-->
            <!--                    rules: [{-->
            <!--                    required: true,-->
            <!--                    message: '请输入商户API'-->
            <!--                    }] }]"-->
            <!--                />-->
            <!--            </a-form-item>-->
            <!--            <a-form-item label="API证书">-->
            <!--                <div class="add-form-input">-->
            <!--                    <a-upload-dragger-->
            <!--                            action="/api/file/upload"-->
            <!--                            list-type="picture-card"-->
            <!--                            :data="beforeUploadData"-->
            <!--                            @change="uploadHandleChange($event,'foodQualificationCertificate','foodQualificationCertificateThumbUrl')"-->
            <!--                            :beforeUpload="beforeUploadFn"-->
            <!--                            :show-upload-list="false"-->
            <!--                    >-->
            <!--                        <img v-if="foodQualificationCertificateThumbUrl"-->
            <!--                             :src="foodQualificationCertificateThumbUrl"-->
            <!--                             class="upload-default-img"-->
            <!--                             alt=""/>-->
            <!--                        <p v-else class="ant-upload-drag-icon">-->
            <!--                            <a-icon type="inbox"/>-->
            <!--                        </p>-->
            <!--                        <p>点击图片</p>-->
            <!--                    </a-upload-dragger>-->
            <!--                    <p class="nowrap">建议尺寸:750*300,格式:jpg、png</p>-->
            <!--                    <a-input class="add-form-input"-->
            <!--                             type="hidden"-->
            <!--                             v-decorator="foodQualificationCertificateDecorator"-->
            <!--                    />-->
            <!--                </div>-->
            <!--            </a-form-item>-->
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
    import { getProvinceList, provinceChange, cityChange, areaList } from '@/utils/areaList';

    export default {
        components: {
            GoBackButton,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //	地址对象
                areaList,
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
                    rules: [{
                        required: true,
                        message: '请选择地址-省份'
                    },]
                }],
                //  地址-市区
                cityDecorator: ['city', {
                    rules: [{
                        required: true,
                        message: '请选择地址-市区'
                    },]
                }],
                //  地址-县城
                countyDecorator: ['county', {
                    rules: [{
                        required: true,
                        message: '请选择地址-县城'
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
                this.getProvinceList();
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
            handleSubmit(e){
                e.preventDefault();
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

            //  获取省份
            getProvinceList,
            //  省份变化
            provinceChange,
            //  市区变化
            cityChange,
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