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
                            {{item}}
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
                doctorList: [],
                //  营养师列表
                nutritionistList: []
            };
        },
        created(){
            this.getDoctorList();
        },
        methods: {
            //  根据当前医院查询所有医生
            getDoctorList(){
                requestPatientSelectDoctorByHospital(1)
                    .then(v => {
                        console.log('根据当前医院查询所有医生', v.data);
                        if (!v.data[0]) {
                            return;
                        }
                        console.log(typeof v.data[0].id);
                        v.data.forEach(item => {
                            item.key = item.id;
                        });
                        this.doctorList = v.data;
                    });
                requestPatientSelectDoctorByHospital(2)
                    .then(v => {
                        console.log('根据当前医院查询所有营养师', v.data);
                        if (!v.data[0]) {
                            return;
                        }
                        console.log(typeof v.data[0].id);
                        v.data.forEach(item => {
                            item.key = item.id;
                        });
                        this.nutritionistList = v.data;
                    });
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

