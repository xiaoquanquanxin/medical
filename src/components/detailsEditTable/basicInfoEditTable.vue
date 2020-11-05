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
                <a-input-number
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
                    <a-select-option v-for="item in prescriptionTypeList"
                                     :value="item.id"
                    >{{item.name}}
                    </a-select-option>
                </a-select>
            </div>
        </a-table>
    </div>
</template>
<script>
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
            }
        }
    };
</script>