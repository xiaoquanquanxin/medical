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
            <!--            <div style="display: none">-->
            <a-form-item label="商品名称">
                <a-input class="add-form-input"
                         v-decorator="goodsNameDecorator"
                         placeholder="请输入商品名称"/>
            </a-form-item>
            <a-form-item label="商品货号">
                <a-input class="add-form-input"
                         v-decorator="goodsProductCodeDecorator"
                         placeholder="请输入商品货号"/>
            </a-form-item>
            <a-form-item label="商品条码">
                <a-input class="add-form-input"
                         placeholder="请输入商品条码"
                         v-decorator="goodsBarCodeDecorator"
                />
            </a-form-item>
            <a-form-item label="商品关键字">
                <a-select class="add-form-input"
                          mode="tags"
                          placeholder="请输入商品关键字"
                          :token-separators="[',']"
                          @change="autoSplitChange"
                />
                <a-input type="hidden" v-decorator="goodsKeyWordDecorator"/>
            </a-form-item>
            <a-form-item label="商品分类">
                <a-select class="add-form-input"
                          placeholder="请选择商品分类"
                          v-decorator="goodsCategoryIdDecorator"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in goodsCategoryList"
                    >{{item.categoryName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商品品牌">
                <a-select class="add-form-input"
                          placeholder="请选择商品品牌"
                          v-decorator="goodsBrandIdDecorator"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in goodsBrandList"
                    >{{item.brandName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="供应商">
                <a-select class="add-form-input"
                          placeholder="请选择供应商"
                          v-decorator="supplierIdDecorator"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in supplierList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="厂家">
                <a-select class="add-form-input"
                          placeholder="请选择厂家"
                          v-decorator="manufactorIdDecorator"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in manufactorList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="通用名">
                <a-input class="add-form-input"
                         v-decorator="goodsTradeNameDecorator"
                         placeholder="请输入请输入通用名"/>
            </a-form-item>
            <a-form-item label="保存方式">
                <a-select class="add-form-input"
                          placeholder="请选择保存方式"
                          v-decorator="preservationMethodDecorator"
                >
                    <a-select-option value="1">冷藏</a-select-option>
                    <a-select-option value="2">常温</a-select-option>
                    <a-select-option value="3">冷冻</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="状态">
                <a-select class="add-form-input"
                          placeholder="请选择状态"
                          v-decorator="statusDecorator"
                >
                    <a-select-option value="0">启用</a-select-option>
                    <a-select-option value="1">停用</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="规格">
                <a-input class="add-form-input"
                         v-decorator="goodsSpecificationsDecorator"
                         placeholder="请输入规格"/>
            </a-form-item>
            <a-form-item label="基本单位">
                <div style="overflow: auto;width:1230px;">
                    <a-table
                            :columns="columns"
                            :data-source="uintParams"
                            :pagination="false"
                    >
                        <div slot="uname" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入单位" v-model="sItem.uname"/>
                        </div>
                        <div slot="unitExchangeRate" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入单位关系"
                                     v-model="sItem.unitExchangeRate"
                            />
                        </div>
                        <div slot="unitPrice" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入价格"
                                     v-model="sItem.unitPrice"
                            />
                        </div>
                        <div slot="unitEnergy" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入能量"
                                     v-model="sItem.unitEnergy"
                            />
                        </div>
                        <div slot="unitProtein" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入蛋白质"
                                     v-model="sItem.unitProtein"
                            />
                        </div>
                        <div slot="unitFat" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入脂肪"
                                     v-model="sItem.unitFat"
                            />
                        </div>
                        <div slot="unitCarbohydrate" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入碳水化合物"
                                     v-model="sItem.unitCarbohydrate"
                            />
                        </div>
                        <div slot="unitValue" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入使用单位"
                                     v-model="sItem.unitValue"
                            />
                        </div>
                    </a-table>
                </div>
            </a-form-item>
            <a-row style="margin-top: -20px;margin-bottom:20px;">
                <a-col :offset="4">
                    <a-form-item label="">
                        <a-input class="add-form-input"
                                 type="hidden"
                                 v-decorator="basicUnitDecorator"
                        />
                    </a-form-item>
                </a-col>
                <a-col :offset="5">
                    <a-button type="primary" v-if="isAddBtn" @click="addAuxiliaryUnits">
                        添加
                    </a-button>
                </a-col>
            </a-row>
            <a-form-item label="商品图片">
                <div class="add-form-input">
                    <a-upload-dragger
                            action="/api/file/upload"
                            list-type="picture-card"
                            :data="beforeUploadData"
                            @change="uploadHandleChange($event,'goodsImg','goodsImgThumbUrl')"
                            :beforeUpload="beforeUploadFn"
                            :show-upload-list="false"
                    >
                        <img v-if="goodsImgThumbUrl"
                             :src="goodsImgThumbUrl"
                             class="upload-default-img"
                             alt=""/>
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传证件</p>
                    </a-upload-dragger>
                    <p class="nowrap">
                        大小：500K，格式:jpeg、png，建议700*700，最多可上传7张图片，*图片按照顺序显示，第一张图片默认为主图</p>
                    <a-input class="add-form-input"
                             type="hidden"
                             v-decorator="goodsImgDecorator"
                    />
                </div>
            </a-form-item>
            <a-form-item label="商品介绍️">
                <VueQuillEditor ref="myTextEditor"
                                style="width:calc((100vw - 200px) * .65);min-width: 800px"
                                class="editor"
                                v-model="goodsDetails"
                                :options="quillOption"
                                @change="onEditorChange"
                ></VueQuillEditor>
                <a-input class="add-form-input"
                         type="hidden"/>
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
    import VueQuillEditor from 'vue-quill-editor/src/editor';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestGoodsGet, requestGoodsInsert, requestGoodsUpdate } from '../../api/commodity/commodityList';
    import { uploadHandleChange, beforeUploadFn, beforeUploadData } from '../../utils/upload';
    import { requestCategoryList } from '../../api/commodity/commodityClassification';
    import { requestBrandList } from '../../api/commodity/brand';
    import { requestSupplierList } from '../../api/supplier';
    import { requestManufactorList } from '../../api/commodity/manufacturer';

    //  基础单位
    const basicUnit = {
        sort: 1,
        key: 1,
        name: '基本单位',
        uname: '',
        unitExchangeRate: '',
        unitPrice: '',
        unitEnergy: '',
        unitProtein: '',
        unitFat: '',
        unitCarbohydrate: '',
    };
    //  标准单位
    const standardUnit = {
        sort: 2,
        key: 2,
        name: '标准单位',
        uname: '',
        unitExchangeRate: '',
        unitPrice: '',
        unitEnergy: '',
        unitProtein: '',
        unitFat: '',
        unitCarbohydrate: '',
    };
    //  辅助单位
    const auxiliaryUnitsData = {
        sort: 3,
        key: 3,
        name: '辅助单位',
        uname: '',
        unitExchangeRate: '',
        unitPrice: '',
        unitEnergy: '',
        unitProtein: '',
        unitFat: '',
        unitCarbohydrate: '',
    };
    export default {
        components: {
            GoBackButton,
            VueQuillEditor,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  网络环境
            isLocalAreaNetwork(){
                return this.$store.state.login.isLocalAreaNetwork;
            },
            //  是否展示添加按钮
            isAddBtn(){
                return this.uintParams.length === 2;
            }
        },
        data(){
            return {
                //  商品分类list
                goodsCategoryList: [],
                //  商品品牌list
                goodsBrandList: [],
                //  供应商list
                supplierList: [],
                //  厂家list
                manufactorList: [],
                //	上传文件的数据，这样的对象只需要一个
                beforeUploadData,
                //  商品id
                commodityId: this.$route.params.commodityId,
                //  表单大小
                formItemLayout,
                //  商品名称
                goodsNameDecorator: ['goodsName', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请输入商品名称'
                    },]
                }],
                //  商品货号
                goodsProductCodeDecorator: ['goodsProductCode', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请输入商品货号'
                    },]
                }],
                //  商品条码
                goodsBarCodeDecorator: ['goodsBarCode', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请输入商品条码'
                    },]
                }],
                //  商品关键字
                goodsKeyWordDecorator: ['goodsKeyWord', {
                    rules: [{
                        required: true,
                        message: '请输入商品关键字'
                    },]
                }],
                //  商品分类
                goodsCategoryIdDecorator: ['goodsCategoryId', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请选择商品分类'
                    },]
                }],
                //  商品品牌
                goodsBrandIdDecorator: ['goodsBrandId', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请选择商品品牌'
                    },]
                }],
                //  供应商
                supplierIdDecorator: ['supplierId', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请选择供应商'
                    },]
                }],
                //  厂家
                manufactorIdDecorator: ['manufactorId', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请选择厂家'
                    },]
                }],
                //  通用名
                goodsTradeNameDecorator: ['goodsTradeName', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请输入通用名'
                    },]
                }],
                //  保存方式
                preservationMethodDecorator: ['preservationMethod', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请选择保存方式'
                    },]
                }],
                //  状态
                statusDecorator: ['status', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请选择状态'
                    },]
                }],
                //  规格
                goodsSpecificationsDecorator: ['goodsSpecifications', {
                    initialValue: '11',
                    rules: [{
                        required: true,
                        message: '请输入规格'
                    },]
                }],
                //  基本单位
                basicUnitDecorator: ['basicUnit', {
                    rules: [{
                        required: true,
                        message: '请输入基本单位',
                    },]
                }],

                //  商品图片
                goodsImgDecorator: ['goodsImg', {
                    rules: [{
                        required: true,
                        message: '请上传商品图片'
                    },]
                }],

                //  商品图片的封面
                goodsImgThumbUrl: '',

                //  商品介绍富文本
                goodsDetails: '',

                //  第一种富文本
                quillOption: {
                    placeholder: '编辑商品介绍'
                },

                //  基本单位表格
                columns: [],
                uintParams: [],
            };
        },
        created(){
            this.searchFn();
            console.log('是编辑？', !!this.commodityId);
            //  基本单位表格
            const columns = [
                {
                    title: '',
                    key: '类型',
                    dataIndex: 'name',
                    width: 100,
                },
                {
                    title: '单位',
                    width: 100,
                    scopedSlots: { customRender: 'uname' }
                },
                {
                    title: '单位关系',
                    width: 120,
                    scopedSlots: { customRender: 'unitExchangeRate' }
                },
                {
                    title: '价格',
                    width: 100,
                    scopedSlots: { customRender: 'unitPrice' }
                },
                {
                    title: '能量kcal',
                    width: 100,
                    scopedSlots: { customRender: 'unitEnergy' }
                },
                {
                    title: '蛋白质g',
                    width: 120,
                    scopedSlots: { customRender: 'unitProtein' }
                },
                {
                    title: '脂肪g',
                    width: 100,
                    scopedSlots: { customRender: 'unitFat' }
                },
                {
                    title: '碳水化合物g',
                    width: 150,
                    scopedSlots: { customRender: 'unitCarbohydrate' }
                }
            ];
            //  如果是院内
            if (this.isLocalAreaNetwork) {
                columns.splice(2, 1);
                columns.push({
                    title: '使用单位',
                    width: 120,
                    scopedSlots: { customRender: 'unitValue' }
                });
            } else {
                this.uintParams.push(standardUnit);
            }
            //  单位列表院内/院外
            this.uintParams.forEach((item => {
                item.type = this.isLocalAreaNetwork ? 1 : 2;
            }));
            //  设置表格列的意义
            this.columns = columns;
        },
        methods: {
            //  上传图片通用方法
            uploadHandleChange,
            beforeUploadFn,
            //  主要请求
            searchFn(){
                requestCategoryList()
                    .then(v => {
                        //  商品分类list
                        console.log(v.data);
                        this.goodsCategoryList = v.data;
                    });
                requestBrandList()
                    .then(v => {
                        //  商品品牌list
                        console.log(v.data);
                        this.goodsBrandList = v.data;
                    });
                requestSupplierList()
                    .then(v => {
                        //  供应商list
                        console.log(v.data);
                        this.supplierList = v.data;
                    });
                requestManufactorList()
                    .then(v => {
                        //  厂家list
                        console.log(v.data);
                        this.manufactorList = v.data;
                    });
                //  如果是新增
                if (!this.commodityId) {
                    return;
                }
                //  如果是编辑
                requestGoodsGet(this.commodityId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                    });
            },
            //  添加辅助单位
            addAuxiliaryUnits(){
                this.uintParams.push(auxiliaryUnitsData);
            },
            //  自动分词，商品关键字用
            autoSplitChange(value){
                this.form.setFieldsValue({
                    goodsKeyWord: value.toString(),
                });
            },

            //  第一种编辑好富文本
            onEditorChange(data){
                this.goodsDetails = data.html;
            },
            //  基础单位变化，造成基础单位表单验证的结果
            basicUnitCheck(){
                let basicUnit = 1;
                for (let i = 0; i < this.uintParams.length; i++) {
                    this.uintParams[i].type = this.isLocalAreaNetwork ? 1 : 2;
                    const {
                        uname,
                        unitPrice,
                        unitEnergy,
                        unitProtein,
                        unitFat,
                        unitCarbohydrate,
                        unitValue,
                        unitExchangeRate,
                    } = this.uintParams[i];
                    if (uname === ''
                        || unitPrice === ''
                        || unitEnergy === ''
                        || unitProtein === ''
                        || unitFat === ''
                        || unitCarbohydrate === ''
                    ) {
                        basicUnit = '';
                        break;
                    }
                    //  如果是院内
                    if ((this.isLocalAreaNetwork && unitValue === '')
                        || (!this.isLocalAreaNetwork && unitExchangeRate === '')
                    ) {
                        basicUnit = '';
                        break;
                    }
                }
                this.form.setFieldsValue({
                    basicUnit,
                });
            },
            //  保存
            handleSubmit(e){
                e.preventDefault();
                this.basicUnitCheck();
                this.$nextTick(() => {
                    this.form.validateFields((err, values) => {
                        console.log(err);
                        if (err) {
                            return;
                        }
                        console.log(values);
                        console.log(this.uintParams);
                        const goodsDetails = this.goodsDetails;
                        console.log(JSON.stringify(this.uintParams));
                        const uintParams = this.uintParams;
                        const {
                            goodsBarCode,
                            goodsBrandId,
                            goodsCategoryId,
                            goodsImg,
                            goodsKeyWord,
                            goodsName,
                            goodsProductCode,
                            goodsSpecifications,
                            goodsTradeName,
                            id,
                            manufactorId,
                            preservationMethod,
                            status,
                            supplierId,
                        } = values;
                        const data = {
                            goodsBarCode,
                            goodsBrandId,
                            goodsCategoryId,
                            goodsDetails,
                            goodsImg,
                            goodsKeyWord,
                            goodsName,
                            goodsProductCode,
                            goodsSpecifications,
                            goodsTradeName,
                            id,
                            manufactorId,
                            preservationMethod,
                            status,
                            supplierId,
                            uintParams
                        };
                        console.log(data);
                        (() => {
                            //  如果是新增
                            if (!this.commodityId) {
                                return requestGoodsInsert(data);
                            }
                            data.id = this.commodityId;
                            //  如果是编辑
                            return requestGoodsUpdate(data);
                        })()
                            .then(v => {
                                console.log(v);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                });
            },
        }
    };
</script>