<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="医院">
                <a-select
                        placeholder="请选择择医院"
                        v-decorator="hospitalDecorator"
                >
                    <a-select-option value="1">
                        男
                    </a-select-option>
                    <a-select-option value="2">
                        女
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="膳食营养计划">
                <div style="width:calc((100vw - 200px)*.65)">
                    <!--表头-->
                    <a-row type="flex" justify="start" align="middle" class="table-group-title">
                        <a-col :span="4">
                            膳食营养计划
                        </a-col>
                        <a-col :span="7">
                            <a-select
                                    v-model="tableForm.mealPlan"
                                    style="width:100%;"
                                    placeholder="请选择膳食营养计划"
                                    @change="selectMealPlanChange"
                            >
                                <a-select-option value="1600">1600</a-select-option>
                                <a-select-option value="1400">1400</a-select-option>
                                <a-select-option value="1200">1200</a-select-option>
                                <a-select-option value="1000">1000</a-select-option>
                                <a-select-option value="800">800</a-select-option>
                                <a-select-option value="600">600</a-select-option>
                                <a-select-option value="400">400</a-select-option>
                                <a-select-option value="200">200</a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                    <!--表格-->
                    <a-table
                            :columns="columns"
                            :data-source="data"
                            :scroll="scroll"
                            :pagination="false"
                    >
                        <!--用餐内容-->
                        <div slot="recipe" slot-scope="scope,sItem,sIndex,extra">
                            <a-input placeholder="请输入用餐内容"
                                     v-model="sItem.recipe"
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

    const columns = [
        {
            title: '用餐内容',
            width: 250,
            scopedSlots: { customRender: 'recipe' },
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  新增、编辑营养计划
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
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
                tableForm: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch,

            };
        },
        created(){
            console.log('是编辑？', !!this.dietaryId);
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            //  切换营养计划
            selectMealPlanChange(value){
                console.log(value);
                console.log('🍎🍎🍎🍎发请求');
                setTimeout(() => {
                    //  源数据
                    this.data = [
                        {
                            'key': 0,
                            'recipe': ''
                        },
                        {
                            'key': 1,
                            'recipe': ''
                        },
                        {
                            'key': 2,
                            'recipe': ''
                        }
                    ];
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
                        recipe
                    } = this.data[i];
                    if (!recipe) {
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
                this.form.validateFields((err, values) => {
                    console.table(values);
                    console.log(!err);
                });
            },
        }
    };
</script>
<style scoped>
</style>
