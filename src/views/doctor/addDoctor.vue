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
            <a-form-item label="医生名称">
                <a-input class="add-form-input"
                         v-decorator="doctorNameDecorator"
                         placeholder="请输入医生名称"
                />
            </a-form-item>
            <a-form-item label="性别" has-feedback>
                <a-select class="add-form-input"
                          placeholder="请选择性别"
                          v-decorator="sexDecorator"
                >
                    <a-select-option value="1">男</a-select-option>
                    <a-select-option value="2">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="医院" has-feedback>
                <a-select class="add-form-input"
                          placeholder="请选择医院"
                          v-decorator="hospitalDecorator"
                >
                    <a-select-option v-for="item in hospitalList"
                                     :value="item.id"
                    >
                        {{item.hospitalName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="科室" has-feedback>
                <a-select class="add-form-input"
                          placeholder="请选择科室"
                          v-decorator="deptIdDecorator"
                >
                    <a-select-option v-for="item in deptList"
                                     :value="item.id">
                        {{item.deptName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="医生类型" has-feedback>
                <a-select class="add-form-input"
                          placeholder="请选择医生类型"
                          v-decorator="doctorTypeDecorator"
                >
                    <a-select-option v-for="item in doctorTypeList"
                                     :value="item.value"
                    >{{item.label}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="医生职称" has-feedback>
                <a-select class="add-form-input"
                          placeholder="请选择医生职称"
                          v-decorator="doctorTitleDecorator"
                >
                    <a-select-option :value="item.value"
                                     v-for="item in doctorTitleList"
                    >{{item.label}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="医生状态" has-feedback>
                <a-select class="add-form-input"
                          placeholder="请选择医生状态"
                          v-decorator="doctorStatusDecorator"
                >
                    <a-select-option value="1">可用</a-select-option>
                    <a-select-option value="0">不可用</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="手机号" required>
                <a-input class="add-form-input"
                         v-decorator="phoneNumberDecorator"
                         placeholder="请输入手机号"
                />
            </a-form-item>
            <a-form-item label="登录密码">
                <a-input class="add-form-input"
                         v-decorator="passwordDecorator"
                         placeholder="请输入登录密码"
                />
            </a-form-item>
            <a-form-item label="确认密码">
                <a-input class="add-form-input"
                         v-decorator="checkPasswordDecorator"
                         placeholder="请输入确认密码"
                />
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
    import { compareToFirstPassword } from '@/utils/validate';
    import { isPhoneNumber } from '@/utils/validate';
    import GoBackButton from '@/components/goBackButton.vue';
    import {
        requestDoctorDoctorTitle,
        requestDoctorDoctorType, requestDoctorGet,
        requestDoctorSave,
        requestDoctorUpdate
    } from '../../api/doctor';
    import { requestDeptList } from '../../api/department';
    import { requestHospitalGetList } from '../../api/hospital';

    export default {
        components: {
            GoBackButton,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                hospitalList: [],
                deptList: [],
                doctorTypeList: [],
                doctorTitleList: [],
                //  医生id
                doctorId: this.$route.params.doctorId,
                //  表单大小
                formItemLayout,
                //  医生名称
                doctorNameDecorator: ['doctorName', {
                    rules: [{
                        required: true,
                        message: '请输入医生名称'
                    },]
                }],
                //  性别
                sexDecorator: ['sex', {
                    rules: [{
                        required: true,
                        message: '请选择性别'
                    },]
                }],
                //  医院
                hospitalDecorator: ['hospitalId', {
                    rules: [{
                        required: true,
                        message: '请选择医院'
                    },]
                }],
                //  科室
                deptIdDecorator: ['deptId', {
                    rules: [{
                        required: true,
                        message: '请选择科室'
                    },]
                }],
                //  医生类型
                doctorTypeDecorator: ['doctorType', {
                    rules: [{
                        required: true,
                        message: '请选择医生类型'
                    },]
                }],
                //  医生职称
                doctorTitleDecorator: ['doctorTitle', {
                    rules: [{
                        required: true,
                        message: '请选择医生职称'
                    },]
                }],
                //  医生状态
                doctorStatusDecorator: ['doctorStatus', {
                    rules: [{
                        required: true,
                        message: '请选择医生状态'
                    },]
                }],
//                //  医生类型
//                doctorRoleDecorator: ['doctorRole', {
//                    rules: [{
//                        required: true,
//                        message: '请选择医生类型'
//                    },]
//                }],
//                //  医生咨询费
//                doctorConsultingFeesDecorator: ['doctorConsultingFees', {
//                    rules: [{
//                        required: true,
//                        message: '医生咨询费'
//                    },]
//                }],

                //  手机号
                phoneNumberDecorator: ['phoneNumber', {
                    rules: [{
                        validator: isPhoneNumber,
                    },]
                }],

                //  输入登录密码的校验
                passwordDecorator: ['password', {
                    rules: [{
                        required: true,
                        message: '请输入登录密码'
                    },]
                }],
                //  输入登录密码的校验
                checkPasswordDecorator: ['checkPassword', {
                    rules: [
                        {
                            required: true,
                            message: '请输入登录密码'
                        },
                        {
                            validator: this.compareToFirstPassword('password'),
                        },
                    ],
                }],
            };
        },
        created(){
            //  console.log(this.$route.params);
            console.log('是编辑？', !!this.doctorId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestHospitalGetList()
                    .then(hospitalList => {
                        this.hospitalList = hospitalList;
                    });
                requestDoctorDoctorType()
                    .then(v => {
                        v.data.forEach((item, index) => {
                            item.key = index;
                        });
                        this.doctorTypeList = v.data;
                    });
                requestDoctorDoctorTitle()
                    .then(v => {
                        //  alert('医生职称接口没数据，已处理');
                        v.data.forEach((item, index) => {
                            item.key = index;
                        });
                        this.doctorTitleList = v.data;
                    });
                requestDeptList()
                    .then(v => {
                        v.data.forEach(item => {
                            item.key = item.id;
                        });
                        this.deptList = v.data;
                    });
                //  如果是新增
                if (!this.doctorId) {
                    return;
                }
                //  alert('医生详情接口没数据')
                //  如果是编辑
                requestDoctorGet(this.doctorId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                    });
            },
            //    表单提交
            handleSubmit(e){
                e.preventDefault();
                alert('接口报错')
                this.form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    (() => {
                        //  如果是新增
                        if (!this.doctorId) {
                            return requestDoctorSave(values);
                        }
                        //  如果是编辑
                        return requestDoctorUpdate(Object.assign(
                            { id: this.doctorId },
                            values)
                        );
                    })()
                        .then(v => {
                            console.log(v);
                            this.$message.success('操作成功');
                            this.$router.push({ name: 'doctor' });
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                });
            },

            //  与第一密码比较，用于确认密码
            compareToFirstPassword,
        }
    };
</script>
<style></style>