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
            <a-form-item label="医院" required>
                <a-select class="add-form-input"
                          v-model="tableForm.hospitalId"
                          placeholder="请选择医院"
                          @change="selectHospitalChange"
                >
                    <a-select-option v-for="item in hospitalList"
                                     :value="item.id"
                    >{{item.hospitalName}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="处方模板名称" required>
                <a-input class="add-form-input"
                         v-model="tableForm.templateName"
                         placeholder="请输入处方模板名称"
                />
            </a-form-item>
            <a-form-item label="膳食营养计划" required>
                <div style="width:calc((100vw - 200px)*.65)">
                    <!--表头-->
                    <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                        <a-space>
                            <span>膳食营养计划</span>
                            <a-select
                                    class="lengthen-select-width"
                                    v-model="tableForm.customFoodType"
                                    placeholder="请选择食物类型"
                            >
                                <a-select-option :value="item.id"
                                                 v-for="item in foodTypeList"
                                >{{item.name}}
                                </a-select-option>
                            </a-select>
                            <a-select
                                    class="lengthen-select-width"
                                    v-model="tableForm.customEnergy"
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
                        <div slot="entryName" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入用餐内容"
                                     v-model="sItem.entryName"
                            />
                        </div>
                        <!--用餐时间-->
                        <div slot="usageTime" slot-scope="scope,sItem,sIndex,extra">
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
                    <div class="a-input-group">
                        <a-space><a @click="addNewLine()">+新增</a></a-space>
                    </div>
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
    import { liquidEnergyList, usageMethodList, foodTypeList } from '../../../utils/constants';
    import { requestHospitalGetList } from '../../../api/hospital';
    import {
        requestPrescriptionTemplateGet,
        requestPrescriptionTemplateInsert,
        requestPrescriptionTemplateUpdate
    } from '../../../api/scheme/scheme';

    import {
        //  删除营养计划
        deleteNutritionPlan,
        //  新增营养计划
        addNewLine,
    } from '../../../utils/mealPlan';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '用餐内容',
            width: 200,
            scopedSlots: { customRender: 'entryName' },
        },
        {
            title: '用餐时间',
            scopedSlots: { customRender: 'usageTime' },
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
            const data = [
                {
                    key: 1,
                    index: 1,
                    entryName: '',
                    quantityUsed: '',
                    usageTime: ''
                },
                {
                    key: 2,
                    index: 2,
                    entryName: '',
                    quantityUsed: '',
                    usageTime: ''
                }
            ];
            return {
                //  医院下拉
                hospitalList: [],
                //  能量下拉
                liquidEnergyList,
                //  食用方法下拉
                usageMethodList,
                //	流食、普食下拉
                foodTypeList,

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

                data,
                columns,

                //  表单中表格的数据 ：膳食营养计划
                tableForm: {
                    //  处方名
                    templateName: undefined,
                    //  食物类型
                    customFoodType: undefined,
                    //  能量
                    customEnergy: undefined,
                    //  处方类型
                    templateType: 3,
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
                        const tableForm = this.tableForm;
                        const { prescriptionContent, energy, templateName, hospitalId, } = data;
                        const list = energy.split('【');
                        //  食物类型
                        tableForm.customFoodType = list[0];
                        //  能量
                        tableForm.customEnergy = list[1].split('】')[0];
                        tableForm.templateName = templateName;
                        tableForm.hospitalId = hospitalId;
                        const mealPlanTableData = JSON.parse(prescriptionContent);
                        console.log(mealPlanTableData);
                        //  console.log(mealPlanTableData);
                        mealPlanTableData.forEach((item, index) => {
                            //  console.log(item);
                            item.index = index + 1;
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
            },
            //  验证膳食计划表格变化
            mealPlanCheck(){
                let mealPlanTable = this.data.length ? 1 : '';
                for (let i = 0; i < this.data.length; i++) {
                    const {
                        entryName
                    } = this.data[i];
                    if (!entryName) {
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
                const {
                    hospitalId,
                } = this.tableForm;
                //  必须选择医院
                if (!hospitalId) {
                    this.$message.error('请先选择医院');
                    return;
                }
                //  至少要输入处方模板名称
                if (!this.tableForm.templateName) {
                    this.$message.error('请输入处方模板名称');
                    return false;
                }
                //  至少要选择食物类型
                if (!this.tableForm.customFoodType) {
                    this.$message.error('请选择食物类型');
                    return false;
                }
                //  至少要选择能量
                if (!this.tableForm.customEnergy) {
                    this.$message.error('请选择能量');
                    return false;
                }
                this.mealPlanCheck();
                this.data.forEach(item => {
                    const time = new Date(item.moment);
                    item.usageTime = `${time.getHours()}:${time.getMinutes()}`;
                });
                //  console.log(JSON.stringify(this.data));
                const prescriptionContent = JSON.stringify(this.data);
                console.log(JSON.parse(prescriptionContent));
                const data = Object.assign({}, this.tableForm,
                    {
                        prescriptionContent,
                        energy: `${this.tableForm.customFoodType}【${this.tableForm.customEnergy}】`,
                        customEnergy: undefined,
                        customFoodType: undefined
                    });
                console.log(JSON.parse(JSON.stringify(data)));
                (() => {
                    //  如果是新增
                    if (!this.dietaryId) {
                        return requestPrescriptionTemplateInsert(data);
                    }
                    data.id = this.dietaryId;
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
            //  删除营养计划
            deleteNutritionPlan,
            //  新增营养计划
            addNewLine,
        }
    };
</script>
<style scoped>
</style>
