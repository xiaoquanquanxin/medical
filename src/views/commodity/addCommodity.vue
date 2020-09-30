<template>
    <div class="layout-content-inner-main">
        <p>新增商品</p>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <p>基本信息</p>
            <hr>
            <a-form-item label="商品名称">
                <a-input v-decorator="commodityNameDecorator" placeholder="请输入商品名称"/>
            </a-form-item>
            <a-form-item label="商品货号">
                <a-input placeholder="请输入商品货号"/>
            </a-form-item>
            <a-form-item label="商品类型" has-feedback>
                <a-select placeholder="请选择商品类型"
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商品买点">
                <a-input placeholder="请输入商品买点"/>
            </a-form-item>
            <a-form-item label="商品关键字">
                <a-input placeholder="请输入商品关键字"/>
            </a-form-item>
            <a-form-item label="售卖分类">
                <a-button type="primary" @click="associationSaleCategory()">关联售卖分类</a-button>
            </a-form-item>
            <a-form-item label="商品品牌" has-feedback>
                <a-select placeholder="请选择商品品牌"
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
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="业务类型" has-feedback>
                <a-select placeholder="请选择业务类型"
                >
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商户虚拟库存">
                <a-input placeholder="请输入商户虚拟库存"/>
            </a-form-item>
            <a-form-item label="虚拟销量">
                <a-input placeholder="请输入虚拟销量"/>
            </a-form-item>
            <a-form-item label="限购数量">
                <a-input placeholder="请输入限购数量"/>
            </a-form-item>
            <a-form-item label="是否为称重商品">
                <a-switch checked-children="是" un-checked-children="否"/>
            </a-form-item>
            <a-form-item label="商品图片">
                <div class="dropbox">
                    <a-upload-dragger>
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                    </a-upload-dragger>
                </div>
                <!--                <p style="white-space: nowrap;">大小：500K，格式:jpeg、png，建议700*700，最多可上传7张图片，*图片按照顺序显示，第一张图片默认为主图</p>-->
                <p style="width:calc((100vw - 200px) * .65)">
                    大小：500K，格式:jpeg、png，建议700*700，最多可上传7张图片，*图片按照顺序显示，第一张图片默认为主图</p>
            </a-form-item>
            <a-form-item label="商品视频">
                <div class="dropbox">
                    <a-upload-dragger>
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                    </a-upload-dragger>
                </div>
                <p style="white-space: nowrap;">大小：小于100MB，格式:mp4</p>
            </a-form-item>
            <a-form-item label="商品介绍️">
                ❌❌❌
                <a-input placeholder="请输入商品介绍"/>
            </a-form-item>
            <p>SKU信息</p>
            <hr>
            <a-form-item label="是否开启SKU">
                <a-switch checked-children="是" un-checked-children="否"/>
            </a-form-item>
            <p>配送方式</p>
            <hr>
            <a-form-item label="是否开启配送方式">
                <a-switch checked-children="是" un-checked-children="否"/>
            </a-form-item>
            <a-form-item label="设置配送方式">
                <a-checkbox-group style="width:400px;">
                    <a-row>
                        <a-col :span="24">
                            <a-row type="flex" align="middle">
                                <a-col :span="6">
                                    <a-checkbox value="A">
                                        A
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="14">
                                    <a-select placeholder="请选择商品类型"
                                    >
                                        <a-select-option value="1">
                                            xxx
                                        </a-select-option>
                                        <a-select-option value="2">
                                            xxx
                                        </a-select-option>
                                    </a-select>
                                </a-col>
                            </a-row>
                        </a-col>
                        <br>
                        <br>
                        <a-col :span="24">
                            <a-row type="flex" align="middle">
                                <a-col :span="6">
                                    <a-checkbox value="A">
                                        A
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="14">
                                    <a-select placeholder="请选择商品类型"
                                    >
                                        <a-select-option value="1">
                                            xxx
                                        </a-select-option>
                                        <a-select-option value="2">
                                            xxx
                                        </a-select-option>
                                    </a-select>
                                </a-col>
                            </a-row>
                        </a-col>
                        <br>
                        <br>
                        <a-col :span="24">
                            <a-row type="flex" align="middle">
                                <a-col :span="6">
                                    <a-checkbox value="A">
                                        A
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="14">
                                    <a-select placeholder="请选择商品类型"
                                    >
                                        <a-select-option value="1">
                                            xxx
                                        </a-select-option>
                                        <a-select-option value="2">
                                            xxx
                                        </a-select-option>
                                    </a-select>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
            </a-form-item>
            <a-form-item label="状态">
                <a-switch v-decorator="['switch', { valuePropName: 'checked' }]"/>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 4, offset: 7 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
        <!--莫泰框-->
        <a-modal v-model="dialogVisible"
                 v-if="dialogVisible"
                 :maskClosable="false"
                 centered
                 width="800"
                 title="关联科室"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck()">
        </a-modal>
    </div>
</template>
<script>
    import { dialogMethods } from '@/utils/methods';
    import { formItemLayout } from '@/utils/layout.js';

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
                //  表单大小
                formItemLayout,
                //  商品名称
                commodityNameDecorator: ['hospitalName', {
                    initialValue: '商品名称',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入商品名称'
                    },]
                }],
                //  展示莫泰框
                dialogVisible: false,
            };
        },
        methods: {
            ...dialogMethods,
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

            //  关联销售分类
            associationSaleCategory(){
                this.showModal();
            },

            //  检查莫泰框的值
            modalCheck(){
                console.log('检查莫泰框的值');
                console.log('发请求吧');
                return;
                this.hideModal();
            },

        }
    };
</script>
<style scoped lang="stylus">
</style>
