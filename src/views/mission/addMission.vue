<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="文章名称">
                <a-input placeholder="请输入文章名称"
                         v-decorator="articleNameDecorator"
                />
            </a-form-item>
            <a-form-item label="文章类型" has-feedback>
                <a-select placeholder="请选择文章类型"
                          v-decorator="articleTypeDecorator"
                >
                    <a-select-option v-for="(item,index) in articleTypeList"
                                     :value="index"
                                     :key="index"
                    >
                        {{item}}--{{index}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商品关键字">
                <a-input placeholder="请输入商品关键字"
                         v-decorator="articleNameDecorator"
                />
            </a-form-item>
            <a-form-item label="文章内容">
<!--                第二种富文本，这个需要看-->
<!--                https://www.tiny.cloud/my-account/onboarding/-->
<!--                然后添加域名-->
                <editor
                        apiKey="ax7la7fczawlydmei7y1gttafpt6j86etih6n23k3w1if78e"
                        style="width:calc((100vw - 200px) * .65)"
                        api-key="no-api-key"
                        :init="tinymceOption"
                />
                <!--第一种富文本-->
                <!--                <VueQuillEditor ref="myTextEditor"-->
                <!--                                style="width:calc((100vw - 200px) * .65);min-width: 800px"-->
                <!--                                class="editor"-->
                <!--                                v-model="content"-->
                <!--                                :options="quillOption"-->
                <!--                                @change="onEditorChange"-->
                <!--                ></VueQuillEditor>-->
                <a-input type="hidden" v-decorator="contentDecorator"/>
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
    import Editor from '@tinymce/tinymce-vue';
    
    import VueQuillEditor from 'vue-quill-editor/src/editor';

    export default {
        components: {
            Editor,
            VueQuillEditor,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                formItemLayout,

                //  富文本
                //  content: `<div><p>biaotimfaefpiaw;</p><p>biaotimfaefpiaw就发i饿哦啊我屁股</p><p>biaotimfaefpiaw就发i饿哦啊我屁股</p><p>biaotimfaefpiaw就发i饿哦啊我屁股</p><img src="https://thumb1.pianshen.com/192/02/02c4960c5f2ce7ec1c93ec826e454890.png" alt=""></div>`,
                content: '',

                articleNameDecorator: ['articleName', {
                    initialValue: '经纬医院',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入医院名称'
                    },]
                }],
                articleTypeDecorator: ['articleType', {
                    initialValue: '经纬医院',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入医院名称'
                    },]
                }],
                contentDecorator: ['content', {
                    initialValue: this.content,
                    rules: [{
                        required: true,
                        message: '请输入文字内容'
                    },]
                }],

                //  文章类型列表
                articleTypeList: [],
                

                //  第一种富文本
                quillOption: {
                    placeholder: '编辑文章内容'
                },

                //  第二种富文本
                tinymceOption: {
                    height: 300,
                    menubar: false,
                    language: 'zh_CN',
                    toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
                    plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
                },
                
            };
        },
        mounted(){
            setTimeout(() => {
                this.articleTypeList = ['1111', '333'];
            }, 1111);
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

//            //  第一种编辑好富文本
//            onEditorChange(data){
//                //  console.log(data.html);
//                this.form.setFieldsValue({
//                    content: data.html
//                });
//            }

        }
    };
</script>
<style scoped>
    /*@import '~@/css/quill.css';*/
</style>