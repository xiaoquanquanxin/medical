<template>
    <div>
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            基础信息
        </a-row>
        <div @click="switchLabelEdit"
             class="patient-basic-info"
        >
            <a-descriptions
                    :title="null"
                    bordered
                    :column="3"
                    size="small"
            >
                <a-descriptions-item label="姓名">
                    <a-input
                            v-if="editDescriptionIndex === 0"
                            placeholder="请输入姓名"
                            v-model="patientBasicInfo.name"
                            class="form-element"
                    />
                    <p :edit-description-index="0"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.name}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="性别">
                    <a-input
                            v-if="editDescriptionIndex === 1"
                            placeholder="请输入性别"
                            v-model="patientBasicInfo.sex"
                            class="form-element"
                    />
                    <p :edit-description-index="1"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.sex}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="年龄">
                    <a-input
                            v-if="editDescriptionIndex === 3"
                            placeholder="请输入年龄"
                            v-model="patientBasicInfo.age"
                            class="form-element"
                    />
                    <p :edit-description-index="3"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.age}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="身高">
                    <a-input
                            v-if="editDescriptionIndex === 4"
                            placeholder="请输入身高"
                            v-model="patientBasicInfo.height"
                            class="form-element"
                    />
                    <p :edit-description-index="4"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.height}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="体重">
                    <a-input
                            v-if="editDescriptionIndex === 5 || '是添加'"
                            placeholder="请输入体重"
                            v-model="patientBasicInfo.weight"
                            class="form-element"
                    />
                    <p :edit-description-index="5"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.weight}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="BML">
                    <a-input
                            v-if="editDescriptionIndex === 6"
                            placeholder="请输入BML"
                            v-model="patientBasicInfo.BML"
                            class="form-element"
                    />
                    <p :edit-description-index="6"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.BML}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="身份证号">
                    <a-input
                            v-if="editDescriptionIndex === 7"
                            placeholder="请输入身份证号"
                            v-model="patientBasicInfo.idCard"
                            class="form-element"
                    />
                    <p :edit-description-index="7"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.idCard}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="社保账号">
                    <a-input
                            v-if="editDescriptionIndex === 8"
                            placeholder="请输入社保账号"
                            v-model="patientBasicInfo.socialSecurity"
                            class="form-element"
                    />
                    <p :edit-description-index="8"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.socialSecurity}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="家庭住址">
                    <a-input
                            v-if="editDescriptionIndex === 9"
                            placeholder="请输入家庭住址"
                            v-model="patientBasicInfo.addr"
                            class="form-element"
                    />
                    <p :edit-description-index="9"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.addr}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="电话">
                    <a-input
                            v-if="editDescriptionIndex === 10"
                            placeholder="请输入电话"
                            v-model="patientBasicInfo.phoneNumber"
                            class="form-element"
                    />
                    <p :edit-description-index="10"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.phoneNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="职业">
                    <a-input
                            v-if="editDescriptionIndex === 11"
                            placeholder="请输入职业"
                            v-model="patientBasicInfo.professional"
                            class="form-element"
                    />
                    <p :edit-description-index="11"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.professional}}</p>
                </a-descriptions-item>
                <a-descriptions-item></a-descriptions-item>
                <a-descriptions-item label="就诊号">
                    <a-input
                            v-if="editDescriptionIndex === 12"
                            placeholder="请输入就诊号"
                            v-model="patientBasicInfo.seeDoctorNumber"
                            class="form-element"
                    />
                    <p :edit-description-index="12"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.seeDoctorNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="就诊医院">
                    <a-input
                            v-if="editDescriptionIndex === 13"
                            placeholder="请输入就诊医院"
                            v-model="patientBasicInfo.hospital"
                            class="form-element"
                    />
                    <p :edit-description-index="13"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.hospital}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="就诊科室">
                    <a-input
                            v-if="editDescriptionIndex === 14"
                            placeholder="请输入就诊科室"
                            v-model="patientBasicInfo.department"
                            class="form-element"
                    />
                    <p :edit-description-index="14"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.department}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="病例号">
                    <a-input
                            v-if="editDescriptionIndex === 15"
                            placeholder="请输入病例号"
                            v-model="patientBasicInfo.patientNumber"
                            class="form-element"
                    />
                    <p :edit-description-index="15"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.patientNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="住院号">
                    <a-input
                            v-if="editDescriptionIndex === 16"
                            placeholder="请输入住院号"
                            v-model="patientBasicInfo.admissionNumber"
                            class="form-element"
                    />
                    <p :edit-description-index="16"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.admissionNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="病床号">
                    <a-input
                            v-if="editDescriptionIndex === 17"
                            placeholder="请输入病床号"
                            v-model="patientBasicInfo.sickbedNumber"
                            class="form-element"
                    />
                    <p :edit-description-index="17"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.sickbedNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="ICD诊断">
                    <a-select style="width: 100%;"
                              placeholder="请输入ICD诊断"
                              v-if="editDescriptionIndex === 18"
                              v-model="patientBasicInfo.ICDDiagnosis"
                              class="form-element"
                    >
                        <a-select-option value="1">
                            32232323
                        </a-select-option>
                        <a-select-option value="2">
                            fewmka
                        </a-select-option>
                    </a-select>
                    <p :edit-description-index="18"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.ICDDiagnosis}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="民族">
                    <a-input
                            v-if="editDescriptionIndex === 19"
                            placeholder="请输入民族"
                            v-model="patientBasicInfo.national"
                            class="form-element"
                    />
                    <p :edit-description-index="19"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.national}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="现病史">
                    <a-input
                            v-if="editDescriptionIndex === 20"
                            placeholder="请输入现病史"
                            v-model="patientBasicInfo.hpi"
                            class="form-element"
                    />
                    <p :edit-description-index="20"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.hpi}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="过敏史">
                    <a-input
                            v-if="editDescriptionIndex === 21"
                            placeholder="请输入过敏史"
                            v-model="patientBasicInfo.allergy"
                            class="form-element"
                    />
                    <p :edit-description-index="21"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.allergy}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="既往史">
                    <a-input
                            v-if="editDescriptionIndex === 22"
                            placeholder="请输入既往史"
                            v-model="patientBasicInfo.pastHistory"
                            class="form-element"
                    />
                    <p :edit-description-index="22"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.pastHistory}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="家族史">
                    <a-input
                            v-if="editDescriptionIndex === 23"
                            placeholder="请输入家族史"
                            v-model="patientBasicInfo.familyHistory"
                            class="form-element"
                    />
                    <p :edit-description-index="23"
                       v-else
                       class="description-content"
                    >{{patientBasicInfo.familyHistory}}</p>
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>
<script>
    import { switchLabelEdit } from '@/utils/patientInfo';

    export default {
        computed: {
            //  基础信息，请求来了就会出现数据
            patientBasicInfo(){
                return this.$store.state.userList.patientBasicInfo;
            },
        },
        data(){
            return {
                //  编辑的index
                editDescriptionIndex: null,
            };
        },
        created(){

        },
        methods: {
            //  切换编辑
            switchLabelEdit,

            //  验证表单
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.table(JSON.parse(JSON.stringify(this.patientBasicInfo)));

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
                }));
            }
        }
    };
</script>


