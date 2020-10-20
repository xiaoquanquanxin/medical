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
            <a-form-item label="科室名称">
                <a-input
                        class="add-form-input"
                        v-decorator="deptNameDecorator"
                        placeholder="请输入科室名称"
                />
            </a-form-item>
            <a-form-item label="科室类型">
                <a-select v-decorator="deptTypeDecorator"
                          class="add-form-input"
                          placeholder="请选择科室类型">
                    <a-select-option :value="0">默认</a-select-option>
                    <a-select-option :value="1">公共</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="状态">
                <a-select v-decorator="statusDecorator"
                          class="add-form-input"
                          placeholder="请选择状态">
                    <a-select-option :value="0">停用</a-select-option>
                    <a-select-option :value="1">启用</a-select-option>
                </a-select>
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
    import { requestDeptSave } from '../../api/department';

    export default {
        components: {
            GoBackButton,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  科室id
                departmentId: this.$route.params.departmentId,
                //  表单大小
                formItemLayout,
                //  科室名称
                deptNameDecorator: ['deptName', {
                    rules: [{
                        required: true,
                        message: '请输入科室名称'
                    }]
                }],
                //  科室类型 0 默认 1 公共
                deptTypeDecorator: ['deptType', {
                    rules: [{
                        required: true,
                        message: '请选择科室类型'
                    }]
                }],
                //  状态 0 启动 1 停用
                statusDecorator: ['status', {
                    rules: [{
                        required: true,
                        message: '请选择状态'
                    }]
                }],
            };
        },
        created(){
            //  console.log(this.$route.params);
            console.log('是编辑？', !!this.departmentId);
        },
        created(){
            this.searchFn();
        },
        methods: {
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
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.table(values);
                    if (!err) {
                        requestDeptSave(values)
                            .then(v => {
                                console.log(v);
                            });
                    }
                });
            },
        }
    };
</script>
<style></style>