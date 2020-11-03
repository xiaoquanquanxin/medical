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
                {{sItem.goodsName}}
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
</template>
<script>
    import { liquidEnergyList, usageMethodList } from '../../utils/constants';
    import { oneRowSearch } from '../../utils/tableScroll';
    import ChoosePlanBox from './choosePlanBox';
    import { requestPrescriptionPrescriptionTpl } from '../../api/userList/intervention';

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
    export default {
        components: { ChoosePlanBox },
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
                columns,
                data: [],
                //  能量下拉
                liquidEnergyList,
                //  食用方法下拉
                usageMethodList,
            };
        },
        methods: {
            //  切换能量
            energyChangeFn(energy){
                //  console.log(JSON.parse(JSON.stringify(this.choosePlanData)));
                requestPrescriptionPrescriptionTpl({ energy, prescriptionType: 3 })
                    .then(v => {
                        const { data } = v;
                        const { mealPlanTableData } = JSON.parse(item.prescriptionContent);
                        console.log(JSON.parse(JSON.stringify(mealPlanTableData)));
                        this.data = mealPlanTableData;
                    });
            }
        }
    };
</script>