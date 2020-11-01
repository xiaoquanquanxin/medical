<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="渠道商名称">
                <a-input class="add-form-input"
                         v-decorator="channelBusinessNameDecorator"
                         placeholder="请输入渠道商名称"
                />
            </a-form-item>
            <a-form-item label="渠道商编码">
                <a-input class="add-form-input"
                         v-decorator="channelBusinessNumberDecorator"
                         placeholder="请输入渠道商编码"
                />
            </a-form-item>
            <a-form-item label="渠道商地区-省份">
                <a-select class="add-form-input"
                          v-decorator="provinceDecorator"
                          placeholder="请选择渠道商地区-省份"
                          @change="_provinceChange"
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
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in areaList.cityList"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="选择仓库">
                <a-select class="add-form-input"
                          v-decorator="channelBusunessWarehouseIdDecorator"
                          placeholder="请选择仓库"
                >
                    <a-select-option :value="item.id"
                                     v-for="item in entrepotList"
                    >{{item.warehouseName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="渠道商角色" has-feedback v-if="!channelId">
                <a-select class="add-form-input"
                          placeholder="渠道商角色"
                          v-decorator="roleIdDecorator"
                >
                    <a-select-option :value="item.roleId"
                                     v-for="item in roleList"
                    >{{item.roleName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="登录账户" v-if="!channelId">
                <a-input class="add-form-input"
                         v-decorator="usernameDecorator"
                         placeholder="请输入登录账户"
                />
            </a-form-item>
            <a-form-item label="登录密码" v-if="!channelId">
                <a-input class="add-form-input"
                         v-decorator="passwordDecorator"
                         placeholder="请输入登录密码"
                />
            </a-form-item>
            <a-form-item label="确认密码" required v-if="!channelId">
                <a-input class="add-form-input"
                         v-decorator="confirmPasswordDecorator"
                         placeholder="请输入确认密码"
                />
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { compareToFirstPassword } from '@/utils/validate';
    import {
        requestChannelBusinessGet,
        requestChannelBusinessInsert,
        requestChannelBusinessUpdate
    } from '../api/distributors';
    import { getProvinceList, provinceChange, areaList } from '@/utils/areaList';
    import { noPaginationData } from '../utils/pagination';
    import { requestWarehousePage } from '../api/entrepot';
    import { requestRoleRoleAll } from '../api/system';
    //  新增或编辑渠道商
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        components: {},
        computed: {
            //	渠道商id
            channelId(){
                return this.$store.state.distributors.channelId;
            },
        },
        data(){
            return {
                roleList: [],
                entrepotList: [],
                //	地址对象
                areaList,
                formItemLayout,
                //  渠道商名称
                channelBusinessNameDecorator: ['channelBusinessName', {
                    rules: [{
                        required: true,
                        message: '请输入渠道商名称'
                    },]
                }],
                //  渠道商编码
                channelBusinessNumberDecorator: ['channelBusinessNumber', {
                    rules: [{
                        required: true,
                        message: '请输入渠道商编码'
                    },]
                }],
                //  渠道商地区-省份
                provinceDecorator: ['province', {
                    rules: [{
                        required: true,
                        message: '请选择渠道商地区-省份'
                    },]
                }],
                //  渠道商地区-市区
                cityDecorator: ['city', {
                    rules: [{
                        required: true,
                        message: '请选择渠道商地区-市区'
                    },]
                }],
                //  选择仓库
                channelBusunessWarehouseIdDecorator: ['channelBusunessWarehouseId', {
                    rules: [{
                        required: true,
                        message: '请选择仓库'
                    },]
                }],
                //  登录账户
                usernameDecorator: ['username', {
                    rules: [{
                        required: true,
                        message: '请输入登录账户'
                    },]
                }],
                //  登录密码
                passwordDecorator: ['password', {
                    rules: [{
                        required: true,
                        message: '请输入登录密码'
                    },]
                }],
                //  确认密码
                confirmPasswordDecorator: ['confirmPassword', {
                    rules: [
                        {
                            validator: this.compareToFirstPassword('password'),
                        }
                    ]
                }],
                //  角色
                roleIdDecorator: ['roleId', {
                    rules: [{
                        required: true,
                        message: '请选择角色'
                    },]
                }],
            };
        },
        created(){
            console.log('是编辑？', !!this.channelId);
            this.searchFn();
        },
        methods: {
            //  获取省份
            getProvinceList,
            //  省份变化
            provinceChange,
            _provinceChange(value){
                console.log('手动', value);
                this.provinceChange(this, value);
            },
            //  主要请求
            searchFn(){
                requestRoleRoleAll()
                    .then(roleList => {
                        this.roleList = roleList;
                    });
                //  仓库list
                requestWarehousePage(noPaginationData)
                    .then(v => {
                        v.data.records.forEach((item) => {
                            item.key = item.id;
                        });
                        this.entrepotList = v.data.records;
                    });
                this.getProvinceList(this);
                //  如果是新增
                if (!this.channelId) {
                    return;
                }
                //  修改编辑的表单验证
                this.form.validateFields(['username']);
                this.form.validateFields(['password']);
                this.form.validateFields(['confirmPassword']);
                //  如果是编辑
                requestChannelBusinessGet(this.channelId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const {
                            channelBusinessName,
                            channelBusinessNumber,
                            province,
                            city,
                            channelBusunessWarehouseId,
                        } = data;
                        this.form.setFieldsValue({
                            channelBusinessName,
                            channelBusinessNumber,
                            province: Number(province),
                            city: Number(city),
                            channelBusunessWarehouseId,
                        });
                        this._provinceChange(province);
                    });
            },
            //  与第一密码比较，用于确认密码
            compareToFirstPassword,
            //    表单提交
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.log(values);
                        return (() => {
                            //  如果是新增
                            if (!this.channelId) {
                                return requestChannelBusinessInsert(values);
                            }
                            //  如果是编辑
                            return requestChannelBusinessUpdate(Object.assign({
                                    id: this.channelId,
                                }, values
                            ));
                        })()
                            .then(v => {
                                console.log(v);
                                resolve();
                            })
                            .catch(err => {
                                reject(err);
                            });
                    });
                });
            },
        },
    };
</script>