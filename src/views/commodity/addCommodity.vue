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
                <a-input
                        v-decorator="commodityNameDecorator"
                        placeholder="请输入商品名称"/>
            </a-form-item>
            <a-form-item label="商品货号">
                <a-input
                        v-decorator="itemNoDecorator"
                        placeholder="请输入商品货号"/>
            </a-form-item>
            <a-form-item label="商品条码" has-feedback>
                <a-select placeholder="请选择商品条码"
                          v-decorator="barcodeDecorator"
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商品关键字">
                <a-select mode="tags"
                          placeholder="请输入商品关键字"
                          style="width: 100%"
                          :token-separators="[',']"
                          v-decorator="keywordsDecorator"
                          @change="autoSplitChange"
                />
            </a-form-item>
            <a-form-item label="商品分类" has-feedback>
                <a-select placeholder="请选择商品分类"
                          v-decorator="classificationDecorator"
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商品品牌" has-feedback>
                <a-select placeholder="请选择商品品牌"
                          v-decorator="brandDecorator"
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="供应商" has-feedback>
                <a-select placeholder="请选择供应商"
                          v-decorator="supplierDecorator"
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="厂家">
                <a-input
                        v-decorator="manufacturerDecorator"
                        placeholder="请输入厂家"/>
            </a-form-item>
            <a-form-item label="通用名">
                <a-input
                        v-decorator="commonNameDecorator"
                        placeholder="请输入请输入通用名"/>
            </a-form-item>
            <a-form-item label="保存方式" has-feedback>
                <a-select placeholder="请选择保存方式"
                          v-decorator="saveTypeDecorator"
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="规格">
                <a-input
                        v-decorator="specificationsDecorator"
                        placeholder="请输入规格"/>
            </a-form-item>
            <a-form-item label="基本单位">
                <div style="overflow: auto;width:1230px;">
                    <a-table
                            :columns="basicTableColumns"
                            :data-source="basicTableData"
                            :pagination="false"
                    >
                        <div slot="unit" slot-scope="scope,sItem,sIndex,extra">
                            <a-select placeholder="请选择单位"
                                      v-model="sItem.unit"
                            >
                                <a-select-option value="1">
                                    xxx
                                </a-select-option>
                                <a-select-option value="2">
                                    xxx
                                </a-select-option>
                            </a-select>
                        </div>
                        <div slot="unitRelations" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入单位关系"
                                     v-model="sItem.unitRelations"
                            />
                        </div>
                        <div slot="price" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入价格"
                                     v-model="sItem.price"
                            />
                        </div>
                        <div slot="energy" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入能量"
                                     v-model="sItem.energy"
                            />
                        </div>
                        <div slot="protein" slot-scope="scope,sItem,sIndex,extra">
                            <a-input
                                    placeholder="请输入蛋白质"
                                    v-model="sItem.protein"
                            />
                        </div>
                        <div slot="fat" slot-scope="scope,sItem,sIndex,extra">
                            <a-input
                                    placeholder="请输入脂肪"
                                    v-model="sItem.fat"
                            />
                        </div>
                        <div slot="carbohydrate" slot-scope="scope,sItem,sIndex,extra">
                            <a-input
                                    placeholder="请输入碳水化合物"
                                    v-model="sItem.carbohydrate"
                            />
                        </div>
                    </a-table>
                </div>
            </a-form-item>
            <a-row style="margin-top: -20px;margin-bottom:20px;">
                <a-col :offset="4">
                    <a-form-item label="">
                        <a-input type="hidden"
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
                <div class="dropbox">
                    <a-upload-dragger
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            list-type="picture-card"
                            @change="uploadHandleChange"
                            :show-upload-list="false"
                    >
                        <img v-if="commodityImageThumbUrl"
                             :src="commodityImageThumbUrl"
                             class="upload-default-img"
                             alt=""/>
                        <p v-else class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p>点击上传证件</p>
                    </a-upload-dragger>
                    <p style="width:calc((100vw - 200px) * .65)">
                        大小：500K，格式:jpeg、png，建议700*700，最多可上传7张图片，*图片按照顺序显示，第一张图片默认为主图</p>
                    <a-input
                            type="hidden"
                            v-decorator="businessLicenseDecorator"
                    />
                </div>
            </a-form-item>
            <!--            </div>-->
            <a-form-item label="商品介绍️">
                <VueQuillEditor ref="myTextEditor"
                                style="width:calc((100vw - 200px) * .65);min-width: 800px"
                                class="editor"
                                v-model="productDescription"
                                :options="quillOption"
                                @change="onEditorChange"
                ></VueQuillEditor>
                <a-input type="hidden"/>
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
    //  基本单位表格
    const basicTableData = [
        {
            key: Math.random(),
            name: '基本单位',
            unit: undefined,
            unitRelations: null,
            price: null,
            energy: null,
            protein: null,
            fat: null,
            carbohydrate: null,
        },
    ];
    //  标准单位
    const standardUnit = {
        key: Math.random(),
        name: '标准单位',
        unit: undefined,
        unitRelations: null,
        price: null,
        energy: null,
        protein: null,
        fat: null,
        carbohydrate: null,
    };
    //  辅助单位
    const auxiliaryUnitsData = {
        key: Math.random(),
        name: '辅助单位',
        unit: undefined,
        unitRelations: null,
        price: null,
        energy: null,
        protein: null,
        fat: null,
        carbohydrate: null,
    };
    //  基本单位表格
    const basicTableColumns = [
        {
            title: '',
            key: '类型',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '单位',
            key: 'unit',
            dataIndex: 'unit',
            width: 150,
            scopedSlots: { customRender: 'unit' }
        },
        {
            title: '单位关系',
            key: 'unitRelations',
            dataIndex: 'unitRelations',
            width: 200,
            scopedSlots: { customRender: 'unitRelations' }
        },
        {
            title: '价格',
            key: 'price',
            dataIndex: 'price',
            width: 150,
            scopedSlots: { customRender: 'price' }
        },
        {
            title: '能量kcal',
            key: 'energy',
            dataIndex: 'energy',
            width: 150,
            scopedSlots: { customRender: 'energy' }
        },
        {
            title: '蛋白质g',
            key: 'protein',
            dataIndex: 'protein',
            width: 150,
            scopedSlots: { customRender: 'protein' }
        },
        {
            title: '脂肪g',
            key: 'fat',
            dataIndex: 'fat',
            width: 150,
            scopedSlots: { customRender: 'fat' }
        },
        {
            title: '碳水化合物g',
            key: 'carbohydrate',
            dataIndex: 'carbohydrate',
            width: 180,
            scopedSlots: { customRender: 'carbohydrate' }
        }
    ];
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
                return this.$store.state.userInfo.isLocalAreaNetwork;
            },
            //  是否展示添加按钮
            isAddBtn(){
                return this.basicTableData.length === 2;
            }
        },
        data(){
            return {
                //  商品id
                commodityId: this.$route.params.commodityId,
                //  表单大小
                formItemLayout,
                //  商品名称
                commodityNameDecorator: ['commodityName', {
                    rules: [{
                        required: true,
                        message: '请输入商品名称'
                    },]
                }],
                //  商品货号
                itemNoDecorator: ['itemNo', {
                    rules: [{
                        required: true,
                        message: '请输入商品货号'
                    },]
                }],
                //  商品条码
                barcodeDecorator: ['barcode', {
                    rules: [{
                        required: true,
                        message: '请选择商品条码'
                    },]
                }],
                //  商品关键字
                keywordsDecorator: ['keywords', {
                    rules: [{
                        required: true,
                        message: '请输入商品关键字'
                    },]
                }],
                //  商品分类
                classificationDecorator: ['classification', {
                    rules: [{
                        required: true,
                        message: '请选择商品分类'
                    },]
                }],
                //  商品品牌
                brandDecorator: ['brand', {
                    rules: [{
                        required: true,
                        message: '请选择商品品牌'
                    },]
                }],
                //  供应商
                supplierDecorator: ['supplier', {
                    rules: [{
                        required: true,
                        message: '请选择供应商'
                    },]
                }],
                //  供应商
                manufacturerDecorator: ['manufacturer', {
                    rules: [{
                        required: true,
                        message: '请输入供应商'
                    },]
                }],
                //  通用名
                commonNameDecorator: ['commonName', {
                    rules: [{
                        required: true,
                        message: '请输入通用名'
                    },]
                }],
                //  保存方式
                saveTypeDecorator: ['saveType', {
                    rules: [{
                        required: true,
                        message: '请选择保存方式'
                    },]
                }],
                //  规格
                specificationsDecorator: ['specifications', {
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
                businessLicenseDecorator: ['commodityImage', {
                    rules: [{
                        required: true,
                        message: '请上传商品图片'
                    },]
                }],
                //  商品介绍富文本
                productDescription: '1221',

                //  商品图片的封面
                commodityImageThumbUrl: '',

                //  第一种富文本
                quillOption: {
                    placeholder: '编辑商品介绍'
                },

                //  基本单位表格
                basicTableColumns,
                basicTableData,
            };
        },
        created(){
            console.log('是编辑？', !!this.commodityId);
            //  如果是新增，并且是院内
            if (!this.commodityId && this.isLocalAreaNetwork) {
                this.basicTableData.push(standardUnit);
            }
//            let aaa = 0
//            this.basicTableColumns.forEach((item) => {
//                aaa+=item.width
//            });
//            console.log(aaa);

        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
            //  添加辅助单位
            addAuxiliaryUnits(){
                this.basicTableData.push(auxiliaryUnitsData);
            },
            //  自动分词，商品关键字用
            autoSplitChange(value){
                console.log(`selected ${value}`);
            },
            //  营业执照
            uploadHandleChange({ fileList }){
                const { response } = fileList[0];
                if (response && response.status === 'done') {
                    //  console.log(this);
                    //  console.log('封面', response.thumbUrl);
                    //  console.log('图片', response.url);
                    this.form.setFieldsValue({
                        commodityImage: response.url,
                    });
                    this.commodityImageThumbUrl = response.thumbUrl;
                }
            },
            //  第一种编辑好富文本
            onEditorChange(data){
                this.productDescription = data.html;
            },
            //  基础单位变化，造成基础单位表单验证的结果
            basicUnitCheck(){
                let basicUnit = 1;
                for (let i = 0; i < this.basicTableData.length; i++) {
                    const {
                        unit,
                        unitRelations,
                        price,
                        energy,
                        protein,
                        fat,
                        carbohydrate,
                    } = this.basicTableData[i];
                    if (unit === undefined
                        || unitRelations === null
                        || price === null
                        || energy === null
                        || protein === null
                        || fat === null
                        || carbohydrate === null
                    ) {
                        basicUnit = '';
                        break;
                    }
                }
                this.form.setFieldsValue({
                    basicUnit,
                });
            },
            //    表单提交
            handleSubmit(e){
                e.preventDefault();
                this.basicUnitCheck();
                this.$nextTick(() => {
                    this.form.validateFields((err, values) => {
                        console.log(err);
                        console.table(values);
                        console.log(values.keywords);
                        if (!err) {
                            console.log('Received values of form: ', values);
                        }
                    });
                });
            },
        }
    };
</script>