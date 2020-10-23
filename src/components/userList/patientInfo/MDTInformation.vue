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
                        <a-select-option v-for="(item,index) in doctorList" :key="index" :value="Number(item.id)">
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
                        <a-select-option v-for="(item,index) in doctorList" :key="index" :value="Number(item.id)">
                            {{item.doctorName}}
                        </a-select-option>
                    </a-select>
<!--                    <a-input placeholder="请输入营养师"-->
<!--                             v-if="activeElementId === 1 ||!patientBasicInfo.nutritionistId"-->
<!--                             v-model="patientBasicInfo.nutritionistId"-->
<!--                             class="form-element"-->
<!--                    />-->
<!--                    <p v-else-->
<!--                       @click="descriptionFormClickFn(1,$event)"-->
<!--                       class="description-content"-->
<!--                    >{{patientBasicInfo.nutritionistId}}</p>-->
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
            };
        },
        created(){
            this.getDoctorList();
        },
        methods: {
            //  根据当前医院查询所有医生
            getDoctorList(){
                requestPatientSelectDoctorByHospital()
                    .then(v => {
                        console.log('根据当前医院查询所有医生', v.data);
                        v.data.forEach(item => {
                            item.id = Number(item.id);
                        });
                        //  console.log(typeof this.patientBasicInfo.doctorId, this.patientBasicInfo.doctorId);
                        this.doctorList = v.data;
                    });
            },
            //	病人信息、直接编辑用的 描述框的方法
            ...descriptionsMethods,

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
        }
    };
</script>

