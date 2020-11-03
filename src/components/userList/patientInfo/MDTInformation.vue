<template>
    <div>
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <a-col>MDT信息</a-col>
            <a-col>
                <a-button type="primary" @click="groupChat">群聊</a-button>
            </a-col>
        </a-row>
        <div class="item-2">
            <a-descriptions
                    :title="null"
                    bordered
                    :column="3"
                    size="small"
            >
                <!--主管医生-->
                <a-descriptions-item label="主管医生">
                    <a-select style="width:100%;"
                              placeholder="请选择主管医生"
                              v-model="patientBasicInfo.doctorId"
                    >
                        <a-select-option v-for="item in doctorList"
                                         :value="item.id">
                            {{item.doctorName}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <!--主管医生-->
                <a-descriptions-item label="营养师">
                    <a-select style="width:100%;"
                              placeholder="请选择营养师"
                              v-model="patientBasicInfo.nutritionistId"
                    >
                        <a-select-option v-for="item in nutritionistList"
                                         :value="item.id">
                            {{item.doctorName}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>
<script>
    import { descriptionsMethods } from '@/utils/patientInfo';
    import { requestPatientSelectDoctorByHospital } from '../../../api/userList/userList';
    //  MDT信息
    export default {
        computed: {
            //  群聊信息，请求来了就会出现数据
            patientBasicInfo(){
                return this.$store.state.userList.patientBasicInfo;
            },
        },
        data(){
            return {
                //  编辑的index
                activeElementId: null,
                //  医生列表
                doctorList: [{key:1,id:1,doctorName:1}],
                //  营养师列表
                nutritionistList: []
            };
        },
        provide(){
            return {
                MDTInformation_getDoctorNutritionistListFn: this.MDTInformation_getDoctorNutritionistListFn,
                MDTInformation_resetDoctorNutritionistListFn: this.MDTInformation_resetDoctorNutritionistListFn,
            };
        },
        methods: {
            //  根据当前医院查询所有医生
            MDTInformation_getDoctorNutritionistListFn(data){
                console.log('根据当前医院查询所有医生');
                return;
                requestPatientSelectDoctorByHospital(data)
                    .then(v => {
                        console.log(v);
                        return;
                        this.doctorList = v.data;
                    });
                console.log('根据当前医院查询所有营养师');
                requestPatientSelectDoctorByHospital(data)
                    .then(v => {
                        console.log(v);
                        return;
                        this.nutritionistList = v.data;
                    });
            },
            //  清空医生和营养师
            MDTInformation_resetDoctorNutritionistListFn(){
                this.patientBasicInfo.doctorId = null;
                this.patientBasicInfo.nutritionistId = null;
                this.doctorList = [];
                this.nutritionistList = [];
            },
            //  群聊
            groupChat(e){
                console.log(e);
            },

            //  验证表单
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    //  console.table(JSON.parse(JSON.stringify(this.patientBasicInfo)));

                    //  todo    缺少验证
//                    const {
//                        unit,
//                        unitRelations,
//                        price,
//                        energy,
//                        protein,
//                        fat,
//                        carbohydrate,
//                    } = this.basicTableData[i];
//                    if (unit === undefined
//                        || unitRelations === null
//                        || price === null
//                        || energy === null
//                        || protein === null
//                        || fat === null
//                        || carbohydrate === null
//                    ) {
//
//                    }
                    if (true) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            },

            //	病人信息、直接编辑用的 描述框的方法
            ...descriptionsMethods,
        }
    };
</script>

