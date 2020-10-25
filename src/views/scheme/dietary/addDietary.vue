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
            <a-form-item label="医院">
                <a-select class="add-form-input"
                          v-model="tableForm.hospitalId"
                          placeholder="请选择医院"
                          @change="selectHospitalChange"
                >
                    <a-select-option :value="item.id"
                                     :key="item.id"
                                     v-for="item in hospitalList"
                    >{{item.hospitalName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="膳食营养计划">
                <div style="width:calc((100vw - 200px)*.65)">
                    <!--表头-->
                    <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                        <a-space>
                            <span>膳食营养计划</span>
                            <!--@change="selectEnergyChange"-->
                            <a-select
                                    class="lengthen-select-width"
                                    v-model="tableForm.energy"
                                    placeholder="请选择能量"
                            >
                                <a-select-option :value="item.id"
                                                 :key="item.id"
                                                 v-for="item in liquidEnergyList"
                                >{{item.name}}
                                </a-select-option>
                            </a-select>
                        </a-space>
                    </a-row>
                    <!--表格-->
                    <a-table
                            :columns="columns"
                            :data-source="data"
                            :scroll="scroll"
                            :pagination="false"
                    >
                        <!--用餐内容-->
                        <div slot="goodsName" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入用餐内容"
                                     v-model="sItem.goodsName"
                            />
                        </div>
                        <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                            <a-space size="small">
                                <a @click="deleteNutritionPlan(sItem,sIndex)">删除</a>
                            </a-space>
                        </div>
                    </a-table>
                </div>
            </a-form-item>
            <a-row style="margin-top: -20px;margin-bottom:20px;">
                <a-col :offset="4">
                    <a-form-item label="">
                        <a-input type="hidden"
                                 v-decorator="mealPlanTableDecorator"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <!--保存-->
            <a-form-item :wrapper-col="{ span: 4, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { twoRowSearch } from '@/utils/tableScroll';
    import { formItemLayout } from '@/utils/layout.ts';
    import GoBackButton from '@/components/goBackButton.vue';
    import { prescriptionTypeList, liquidEnergyList, usageMethodList } from '../../../utils/constants';
    import { requestHospitalGetList } from '../../../api/hospital';
    import { requestGoodsListByHospital } from '../../../api/commodity/commodityList';
    import { requestPrescriptionTemplateInsert, requestPrescriptionTemplateUpdate } from '../../../api/scheme/scheme';

    const columns = [
        {
            title: '用餐内容',
            width: 250,
            scopedSlots: { customRender: 'goodsName' },
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  新增、编辑营养计划
    export default {
        components: {
            GoBackButton,
        },
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  医院下拉
                hospitalList: [],
                //  处方类型下拉
                prescriptionTypeList,
                //  能量下拉
                liquidEnergyList,
                //  食用方法下拉
                usageMethodList,

                dietaryId: this.$route.params.dietaryId,

                formItemLayout,

                //  请选择医院
                hospitalDecorator: ['hospital', {
                    rules: [{
                        required: true,
                        message: '请选择医院'
                    },]
                }],
                //  膳食计划
                mealPlanTableDecorator: ['mealPlanTable', {
                    rules: [{
                        required: true,
                        message: '请输入膳食营养计划'
                    },]
                }],

                data: [],
                columns,

                //  表单中表格的数据 ：膳食营养计划
                tableForm: {
                    //  hospitalId          医院
                    //  hospitalName        医院名
                    //    处方名
                    prescriptionName: '膳食营养计划',
                    //  处方类型
                    prescriptionType: 3,
                    //  energy              能量
                    //  usageMethod         食用方法
                },

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),

            };
        },
        created(){
            console.log('是编辑？', !!this.dietaryId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestHospitalGetList()
                    .then(v => {
                        this.hospitalList = v.data;
                    });
                //  如果是新增
                if (!this.dietaryId) {
                    return;
                }
                //  如果是编辑
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
            //  切换医院
            selectHospitalChange(value){
                //  计算医院名
                this.hospitalList.forEach(item => {
                    if (item.id === value) {
                        console.log(item);
                        this.tableForm.hospitalName = item.hospitalName;
                    }
                });
                console.log('🍎🍎🍎🍎发请求，🍉🍉🍉改造数据结构', '医院的id', value);
                setTimeout(() => {
                    requestGoodsListByHospital(value)
                        .then(v => {
                            console.log('该医院下的商品：');
                            console.log(v.data);
                            if (!v.data || !v.data.length) {
                                return;
                            }
                            v.data.forEach((item, index) => {
                                item.key = index;
                            });
                            this.data = v.data;
                        });
                });
            },
            //  删除营养计划
            deleteNutritionPlan(sItem, sIndex){
                this.data.splice(sIndex, 1);
            },
            //  验证膳食计划表格变化
            mealPlanCheck(){
                let mealPlanTable = this.data.length ? 1 : '';
                for (let i = 0; i < this.data.length; i++) {
                    const {
                        goodsName
                    } = this.data[i];
                    if (!goodsName) {
                        mealPlanTable = '';
                        break;
                    }
                }
                this.form.setFieldsValue({
                    mealPlanTable,
                });
            },
            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                this.mealPlanCheck();
                console.log(this.data);
//                this.form.validateFields((err, values) => {
//                    console.table(values);
//                    console.log(!err);
//                });
                
                console.log('备注🍌', this.remark);
//                console.log(JSON.parse(JSON.stringify(this.timeTableData)));
                const prescriptionContent = {
                    mealPlanTableData: this.data,
//                    timeTableData: this.timeTableData,
                };
                this.tableForm.prescriptionContent = JSON.stringify(prescriptionContent);
                console.log(JSON.parse(JSON.stringify(this.tableForm)));
                (() => {
                    //  如果是新增
                    if (!this.oralId) {
                        return requestPrescriptionTemplateInsert(this.tableForm);
                    }
                    data.id = this.oralId;
                    //  如果是编辑
                    return requestPrescriptionTemplateUpdate(this.tableForm);
                })()
                    .then(v => {
                        console.log(v);
                        this.$message.success('操作成功');
                        this.$router.push({ name: 'scheme' });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        }
    };
</script>
<style scoped>
</style>
