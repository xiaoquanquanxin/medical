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
            <a-form-item label="医院编码">
                <a-input class="add-form-input"
                         v-decorator="hospitalCodeDecorator"
                         placeholder="请输入医院编码"
                />
            </a-form-item>
            <a-form-item label="渠道商地区-省份">
                <a-select class="add-form-input"
                          v-decorator="provinceDecorator"
                          placeholder="请选择渠道商地区-省份"
                          @change="_provinceChange"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option :value="item.id.toString()"
                                     v-for="item in areaList.provinceList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="渠道商地区-市区">
                <a-select class="add-form-input"
                          v-decorator="cityDecorator"
                          placeholder="请选择渠道商地区-市区"
                          @change="_cityChange"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option :value="item.id.toString()"
                                     v-for="item in areaList.cityList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="渠道商地区-县城">
                <a-select class="add-form-input"
                          v-decorator="countyDecorator"
                          placeholder="请选择渠道商地区-县城"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option :value="item.id.toString()"
                                     v-for="item in areaList.countyList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="选择仓库" v-if="!hospitalId">
                <a-select class="add-form-input"
                          v-decorator="warehouseIdDecorator"
                          placeholder="请选择仓库"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option :value="item.id"
                                     v-for="item in entrepotList"
                    >{{item.warehouseName}}
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
            <a-divider orientation="left"></a-divider>
            <a-form-item label="状态">
                <a-switch checked-children="开启" un-checked-children="关闭"
                          v-model="status"/>
            </a-form-item>
            <a-form-item label="支付商家为医院">
                <a-radio-group v-decorator="isHospitalDecorator">
                    <a-radio :value="0">是</a-radio>
                    <a-radio :value="1">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="运营方式">
                <a-radio-group v-decorator="operationModeDecorator">
                    <a-radio :value="0">线上</a-radio>
                    <a-radio :value="1">线下</a-radio>
                    <a-radio :value="2">线上线下</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="处方上是否有二维码用于支付">
                <a-radio-group v-decorator="displayQrCodeDecorator">
                    <a-radio :value="0">是</a-radio>
                    <a-radio :value="1">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="处方上是否有处方号条形码">
                <a-radio-group v-decorator="displayBarcodeDecorator">
                    <a-radio :value="0">是</a-radio>
                    <a-radio :value="1">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="是否需要审核">
                <a-radio-group v-decorator="isAuditRequiredDecorator">
                    <a-radio :value="0">是</a-radio>
                    <a-radio :value="1">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="是否是充值缴费方式">
                <a-radio-group v-decorator="rechargePaymentDecorator">
                    <a-radio :value="0">是</a-radio>
                    <a-radio :value="1">否</a-radio>
                </a-radio-group>
            </a-form-item>
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
    import GoBackButton from '@/components/goBackButton.vue';
    import { uploadHandleChange, beforeUploadFn, beforeUploadData } from '../../utils/upload';
    import { requestHospitalGet, requestHospitalSave, requestHospitalUpdate } from '../../api/hospital';
    import { getProvinceList, provinceChange, cityChange, areaList } from '@/utils/areaList';
    import { requestWarehouseList } from '../../api/entrepot';

    export default {
        components: {
            GoBackButton,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  医院id
            hospitalId(){
                console.log(this.$route.params.hospitalId);
                return this.$route.params.hospitalId;
            }
        },
        data(){
            return {
                entrepotList: [],
                //	地址对象
                areaList,
                //	上传文件的数据，这样的对象只需要一个
                beforeUploadData,
                formItemLayout: {
                    labelCol: { span: 7 },
                    wrapperCol: { offset: 1, span: 15 },
                },

                //  医院名称
                hospitalNameDecorator: ['hospitalName', {
                    rules: [{
                        required: true,
                        message: '请输入医院名称'
                    },]
                }],
                hospitalCodeDecorator: ['hospitalCode', {
                    rules: [{
                        required: true,
                        message: '请输入医院编码'
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
                //  选择仓库
                warehouseIdDecorator: ['warehouseId', {
                    rules: [{
                        required: true,
                        message: '请选择仓库'
                    },]
                }],

                //  医院图标
                hospitalPicDecorator: ['hospitalPic', {
                    rules: [{
                        required: true,
                        message: '请上传医院图标',
                    },]
                }],
                hospitalPicThumbUrl: null,

                //  状态
                status: true,
                //  支付商家为医院
                isHospitalDecorator: ['isHospital', {
                    initialValue: 0,
                    rules: [{
                        required: true,
                    },]
                }],
                //  运营方式
                operationModeDecorator: ['operationMode', {
                    initialValue: 0,
                    rules: [{
                        required: true,
                    },]
                }],
                //  处方上是否有二维码用于支付
                displayQrCodeDecorator: ['displayQrCode', {
                    initialValue: 0,
                    rules: [{
                        required: true,
                    },]
                }],
                //  处方上是否有处方号条形码
                displayBarcodeDecorator: ['displayBarcode', {
                    initialValue: 0,
                    rules: [{
                        required: true,
                    },]
                }],
                //  是否需要审核
                isAuditRequiredDecorator: ['isAuditRequired', {
                    initialValue: 0,
                    rules: [{
                        required: true,
                    },]
                }],
                //  是否是充值缴费方式
                rechargePaymentDecorator: ['rechargePayment', {
                    initialValue: 0,
                    rules: [{
                        required: true,
                    },]
                }]
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
                //  仓库list
                requestWarehouseList()
                    .then(entrepotList => {
                        this.entrepotList = entrepotList;
                    });
                this.getProvinceList(this);
                //  如果是新增
                if (!this.hospitalId) {
                    return;
                }
                //  如果是编辑
                requestHospitalGet(this.hospitalId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        //  alert('地区三级联动那块，如果是编辑，需要provinceId、cityId、countyId。');
                        //  alert('在列表接口，仅仅是展示字段，所以可以只需要一个string表示名字就可以了。但是在编辑页面，我需要的是id，因为用户可能直接操作某个下拉，没有id我没法去取地区lsit');
                        //  alert('涛哥的接口，比如列表里有科室，他会返回deptId和deptName');
                        const {
                            hospitalName,
                            hospitalCode,
                            province,
                            city,
                            county,
                            hospitalPic,
                            isHospital,
                            operationMode,
                            displayQrCode,
                            displayBarcode,
                            isAuditRequired,
                            rechargePayment,
                        } = data;
                        this.hospitalPicThumbUrl = hospitalPic;
                        Promise.all([
                            this._provinceChange(province),
                            this._cityChange(city)
                        ])
                            .then(v => {
                                this.form.setFieldsValue({
                                    hospitalName,
                                    hospitalCode,
                                    province,
                                    city,
                                    county,
                                    hospitalPic,
                                    isHospital,
                                    operationMode,
                                    displayQrCode,
                                    displayBarcode,
                                    isAuditRequired,
                                    rechargePayment,
                                });
                            });
                    });
            },
            //    表单提交，保存
            handleSubmit(e){
                console.log(this.status ? 0 : 1);
                e.preventDefault();
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.table(values);
                        const data = Object.assign({ status: this.status ? 0 : 1 }, values);
                        (() => {
                            //  如果是新增
                            if (!this.hospitalId) {
                                return requestHospitalSave(data);
                            }
                            //  如果是编辑
                            return requestHospitalUpdate(Object.assign(
                                { id: this.hospitalId },
                                data)
                            );
                        })()
                            .then(v => {
                                console.log(v);
                                this.$router.push({ name: 'hospital' });
                                resolve();
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                                reject(err);
                            });
                    });
                });
            },

            //  获取省份
            getProvinceList,

            //  省份变化
            provinceChange,
            _provinceChange(value){
                this.provinceChange(this, value);
            },
            //  市区变化
            cityChange,
            _cityChange(value){
                this.cityChange(this, value);
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