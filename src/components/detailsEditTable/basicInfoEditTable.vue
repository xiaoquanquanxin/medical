<template>
    <div>
        <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
            <a-col :span="4">
                基本信息
            </a-col>
        </a-row>
        <a-table
                :columns="basicInfoColumns"
                :data-source="basicInfoEditData"
                :pagination="false"
                bordered
        >
            <!--方案名称-->
            <div slot="prescriptionName" slot-scope="scope,sItem,sIndex,extra">
                <a-input placeholder="请输入方案名称"
                         v-model="scope.prescriptionName"
                         class="basic-input-width"
                />
            </div>
            <!--周期-->
            <div slot="priod" slot-scope="scope,sItem,sIndex,extra">
                <a-input-number style='width:100%;'
                                :precision="0"
                                :min="1"
                                placeholder="请输入周期"
                                v-model="scope.priod"
                                class="basic-input-width"
                />
                天
            </div>
            <!--处方类型-->
            <div slot="prescriptionType" slot-scope="scope,sItem,sIndex,extra">
                <a-select v-model="scope.prescriptionType"
                          class="basic-select-width"
                          placeholder="请选择处方类型"
                          @change="changeFn"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option v-for="item in prescriptionTypeList"
                                     :value="item.id"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </div>
            <!--执行日期-->
            <div slot="executionTime" slot-scope="scope,sItem,sIndex,extra">
                <a-date-picker
                        v-model="scope.executionTimeMoment"
                        class="lengthen-select-width"
                        placeholder="请选择执行日期"
                        :disabledDate="disabledDateForExecutionTime"
                />
                <!--                @change="executionTimeChangeFn"-->
            </div>
        </a-table>
    </div>
</template>
<script>
    import moment from 'moment';
    import { mapGetters, mapActions } from 'vuex';
    import { prescriptionTypeList } from '../../utils/constants';
    //  基本信息 表格 列的意义
    const basicInfoColumns = [
        {
            title: '方案名称',
            scopedSlots: { customRender: 'prescriptionName' },
            width: 100,
        },
        {
            title: '周期',
            width: 100,
            scopedSlots: { customRender: 'priod' },
        },
        {
            title: '处方类型',
            width: 100,
            scopedSlots: { customRender: 'prescriptionType' },
        },
        {
            title: '执行日期',
            width: 10,
            scopedSlots: { customRender: 'executionTime' },
        }
    ];

    export default {
        computed: {
            //	新增处方、编辑处方选择的头部数据
            basicInfoEditData(){
                return this.$store.state.intervention.basicInfoEditData;
            },
            //  处方类型-处方类型 (1.院内配置,2门诊领药)
            prescriptionType(){
                const { prescriptionType } = this.$store.state.intervention;
                return prescriptionType;
            },
        },
        data(){
            return {
                basicInfoColumns,
                //  处方类型下拉
                prescriptionTypeList,
            };
        },
        methods: {
            ...mapActions('intervention', [
                //  处方头部信息
                'setBasicInfoEditData',
                //  更换处方类型
                'setPrescriptionType',
            ]),
            //  切换处方类型
            changeFn(value){
                this.setPrescriptionType(value);
            },
            //  执行日期切换
//            executionTimeChangeFn(value, executionTime){
//                const data = Object.assign({}, this.basicInfoEditData[0], { executionTime });
//                this.setBasicInfoEditData([data]);
//            },
            //  执行日期选择规则
            disabledDateForExecutionTime(current){
                return current && current <= moment(new Date(new Date().getTime() - 60 * 60 * 24));
            },
            moment,
        }
    };
</script>