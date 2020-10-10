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
                        placeholder="请选择医院"
                        v-decorator="hospitalDecorator"
                >
                    <a-select-option value="">
                        请选择性别
                    </a-select-option>
                    <a-select-option value="1">
                        男
                    </a-select-option>
                    <a-select-option value="2">
                        女
                    </a-select-option>
                </a-select>
            </a-form-item>
            <!--保存-->
            <a-form-item :wrapper-col="{ span: 4, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="recipe" slot-scope="scope,sItem,sIndex,extra">
                <a-input placeholder="请输入用餐内容"/>
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="deleteNutritionPlan(sItem)">删除</a>
                </a-space>
            </div>
        </a-table>
    </div>
</template>
<script>
    import { towRowSearch } from '@/utils/tableScroll';
    import { formItemLayout } from '@/utils/layout.ts';

    const columns = [
        {
            title: '用餐内容',
            dataIndex: 'recipe',
            width: 250,
            scopedSlots: { customRender: 'recipe' },
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            disease: `xx疾病`,
            status: String(i % 2),
            operation: null,
        });
    }

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

                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

            };
        },
        created(){
            console.log('是编辑？', !!this.dietaryId);
        },
        methods: {
            //  删除营养计划
            deleteNutritionPlan(sItem){
                this.$confirm({
                    title: `确定删除${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  表单提交 保存
            handleSubmit(e){
                e.preventDefault();
                console.log(this.commodityTableData);
                console.log('备注🍌', this.remark);
                console.log(this.timeTableData);
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
