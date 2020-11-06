<template>
    <div>
        <!--表头-->
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
            <a-space>
                <span>膳食营养计划</span>
                <a-select
                        class="lengthen-select-width"
                        v-model="choosePlanData.energyId"
                        placeholder="请选择能量"
                        @change="energyChangeFn"
                >
                    <a-select-option :value="item.id"
                                     v-for="item in mealPlanList"
                    >{{item.energy}}
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
            <br>
            <a-space><a @click="addNewLine()">+新增</a></a-space>
            <br>
            <br>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    import { oneRowSearch } from '../../utils/tableScroll';
    import { requestPrescriptionPrescriptionTpl } from '../../api/userList/intervention';
    import {
        //  删除营养计划
        deleteNutritionPlan,
        //  新增营养计划
        addNewLine,
    } from '../../utils/mealPlan';

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
    export default {
        data(){
            return {
                //  选择方案数据
                choosePlanData: {
                    //  选择的能量
                    energyId: undefined,
                    //  选择的具体的方案，是一个结果。如果是编辑，需要反向设计到planMap里
                    planId: null,
                },
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),

                //  营养计划下拉
                mealPlanList: [],
                mealPlanMap: {},
                columns,
                data: [],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            searchFn(){
                const data = { templateType: 3 };
                requestPrescriptionPrescriptionTpl(data)
                    .then(v => {
                        const { data } = v;
                        data.forEach((item, index) => {
                            item.key = item.id;
                            item.list = JSON.parse(item.prescriptionContent);
                            this.mealPlanMap[item.id] = item.list;
                        });
                        this.mealPlanList = data;
                    });
            },
            //  切换能量
            energyChangeFn(id){
                const data = JSON.parse(JSON.stringify(this.mealPlanMap[id]));
                data.forEach(item => {
                    item.moment = moment(item.moment);
                });
                this.data = data;

            },
            //  删除营养计划
            deleteNutritionPlan,
            //  新增营养计划
            addNewLine,
        }
    };
</script>