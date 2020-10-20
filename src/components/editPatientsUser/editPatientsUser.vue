<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="姓名">
                <a-input
                        v-decorator="nameDecorator"
                        placeholder="请输入姓名"
                />
            </a-form-item>
            <a-form-item label="性别">
                <a-select
                        v-decorator="sexDecorator"
                >
                    
                    <a-select-option value="1">
                        男
                    </a-select-option>
                    <a-select-option value="2">
                        女
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="科室">
                <a-select
                        v-decorator="departmentDecorator"
                >
                    <a-select-option value="">
                        请选择科室
                    </a-select-option>
                    <a-select-option value="1">
                        山西
                    </a-select-option>
                    <a-select-option value="2">
                        陕西
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="医生">
                <a-select
                        v-decorator="doctorDecorator"
                >
                    <a-select-option value="">
                        请选择医生
                    </a-select-option>
                    <a-select-option value="1">
                        bbb
                    </a-select-option>
                    <a-select-option value="2">
                        aaa
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="是否为患者">
                <a-select
                        v-decorator="isPatientsDecorator"
                >
                    <a-select-option value="">
                        是否为患者
                    </a-select-option>
                    <a-select-option value="1">
                        是
                    </a-select-option>
                    <a-select-option value="2">
                        否
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="状态">
                <a-select
                        v-decorator="statusDecorator"
                >
                    <a-select-option value="">
                        请选择状态
                    </a-select-option>
                    <a-select-option value="1">
                        院内
                    </a-select-option>
                    <a-select-option value="2">
                        院外
                    </a-select-option>
                    <a-select-option value="2">
                        注销
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { formItemLayout } from '@/utils/layout.ts';

    export default {
        computed: {
            entrepotId(){
                return this.$store.state.entrepot.entrepotId;
            },
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                formItemLayout,
                //  姓名
                nameDecorator: ['name', {
                    rules: [{
                        required: true,
                        message: '请输入姓名'
                    },]
                }],
                //  性别
                sexDecorator: ['sex', {
                    rules: [{
                        required: true,
                        message: '请选择性别'
                    },]
                }],
                //  科室
                departmentDecorator: ['department', {
                    rules: [{
                        required: true,
                        message: '请选择科室'
                    },]
                }],
                //  医生
                doctorDecorator: ['doctor', {
                    rules: [{
                        required: true,
                        message: '请选择医生'
                    },]
                }],
                //  是否为患者
                isPatientsDecorator: ['isPatients', {
                    rules: [{
                        required: true,
                        message: '是否为患者'
                    },]
                }],
                //  状态
                statusDecorator: ['status', {
                    rules: [{
                        required: true,
                        message: '请选择状态'
                    },]
                }],
            };
        },
        created(){
            this.handleSubmit.bind(this);
            console.log('是编辑？', !!this.entrepotId);
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
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.form);
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (!err) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                }))
                    .then(v => {
                        return new Promise(((resolve, reject) => {
                            console.log('发请求吧');
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }));
                    });
            },
        },
    };
</script>