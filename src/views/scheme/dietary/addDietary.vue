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
                    <a-select-option v-for="(item,index) in hospitalList"
                                     :value="item.id"
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
                            <a-select
                                    class="lengthen-select-width"
                                    v-model="tableForm.energy"
                                    placeholder="请选择能量"
                            >
                                <a-select-option :value="item.id"
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
                        <!--用餐时间-->
                        <div slot="time" slot-scope="scope,sItem,sIndex,extra">
                            <a-time-picker
                                    v-model="sItem.moment"
                                    format="HH:mm"/>
                        </div>
                        <!--操作-->
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
    import moment from 'moment';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { formItemLayout } from '@/utils/layout.ts';
    import GoBackButton from '@/components/goBackButton.vue';
    import { liquidEnergyList, usageMethodList } from '../../../utils/constants';
    import { requestHospitalGetList } from '../../../api/hospital';
    import { requestGoodsListByHospital } from '../../../api/commodity/commodityList';
    import {
        requestPrescriptionTemplateGet,
        requestPrescriptionTemplateInsert,
        requestPrescriptionTemplateUpdate
    } from '../../../api/scheme/scheme';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '用餐内容',
            width: 200,
            scopedSlots: { customRender: 'goodsName' },
        },
        {
            title: '用餐时间',
            scopedSlots: { customRender: 'time' },
            width: 200,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
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
                    //  医院
                    //  hospitalId: undefined,
                    //  hospitalName        医院名
                    //    处方名
//                    prescriptionName: '膳食营养计划',
                    //  处方类型
                    templateType: 3,
                    //  能量
                    energy: undefined,
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
                //  医院list
                requestHospitalGetList()
                    .then(hospitalList => {
                        this.hospitalList = hospitalList;
                    });
                //  如果是新增
                if (!this.dietaryId) {
                    return;
                }
                //  如果是编辑
                requestPrescriptionTemplateGet(this.dietaryId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const tableForm = this.tableForm;
                        const { prescriptionContent, prescriptionName, energy, hospitalId, } = data;
                        //  tableForm.prescriptionName = prescriptionName;
                        tableForm.energy = energy;
                        tableForm.hospitalId = hospitalId;
                        const { mealPlanTableData } = JSON.parse(prescriptionContent);
                        //  console.log(mealPlanTableData);
                        mealPlanTableData.forEach(item => {
                            //  console.log(item);
                            item.moment = moment(item.moment);
                        });
                        this.data = mealPlanTableData;
                        //  this.$forceUpdate();
                    });
            },
            //  切换医院
            selectHospitalChange(value){
                //  组织医院名
                this.hospitalList.forEach(item => {
                    if (item.id === value) {
                        this.tableForm.hospitalName = item.hospitalName;
                    }
                });
                requestGoodsListByHospital(value)
                    .then(v => {
                        v.data.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = v.data;
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
                this.data.forEach(item => {
                    const time = new Date(item.moment);
                    item.time = `${time.getHours()}:${time.getMinutes()}`;
                });
                console.log(JSON.parse(JSON.stringify(this.data)));
                const prescriptionContent = {
                    mealPlanTableData: this.data,
                };
                this.tableForm.prescriptionContent = JSON.stringify(prescriptionContent);
                console.log(JSON.parse(JSON.stringify(this.tableForm)));
                (() => {
                    //  如果是新增
                    if (!this.dietaryId) {
                        return requestPrescriptionTemplateInsert(this.tableForm);
                    }
                    const data = Object.assign({
                        id: this.dietaryId
                    }, this.tableForm);
                    //  如果是编辑
                    return requestPrescriptionTemplateUpdate(data);
                })()
                    .then(v => {
                        console.log(v);
                        this.$message.success('操作成功');
                        this.$router.push({ name: 'dietary' });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //  时间选择器的方法
            moment,
        }
    };
</script>
<style scoped>
</style>
