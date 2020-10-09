<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-select v-model="searchData.hospital"
                              style="width:100%;"
                              placeholder="请选医院"
                    >
                        <a-select-option value="">
                            分类
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="6">
                    <a-select v-model="searchData.nutritionPlan"
                              style="width:100%;"
                              placeholder="请选膳食营养计划"
                    >
                        <a-select-option value="">
                            分类
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="3">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
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
        <br>
        <a-button key="submit" type="primary" @click="submitFn">
            确定
        </a-button>
    </div>
</template>
<script>
    import { towRowSearch } from '@/utils/tableScroll';

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
        data(){
            return {
                dietaryId: this.$route.params.dietaryId,
                
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

                //  搜索数据
                searchData: {},
            };
        },
        created(){
            console.log('是编辑？', !!this.dietaryId);
        },
        methods: {
            //  确定按钮
            submitFn(){

            },
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
        }
    };
</script>
<style scoped>
</style>
