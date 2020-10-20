<template>
    <div>
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            基础信息
        </a-row>
        <div class="item-3">
            <a-descriptions
                    :title="null"
                    bordered
                    :column="3"
                    size="small"
            >
                <a-descriptions-item label="姓名">
                    <a-input
                            v-if="activeElementId === 0 ||!patientBasicInfo.name"
                            placeholder="请输入姓名"
                            v-model="patientBasicInfo.name"
                            class="form-element"
                            @focus="descriptionFormFocusFn(0)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(0,$event)"
                       class="description-content"
                    >{{patientBasicInfo.name}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="性别">
                    <a-input
                            v-if="activeElementId === 1 ||!patientBasicInfo.sex"
                            placeholder="请输入性别"
                            v-model="patientBasicInfo.sex"
                            class="form-element"
                            @focus="descriptionFormFocusFn(1)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(1,$event)"
                       class="description-content"
                    >{{patientBasicInfo.sex}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="年龄">
                    <a-input
                            v-if="activeElementId === 3 ||!patientBasicInfo.age"
                            placeholder="请输入年龄"
                            v-model="patientBasicInfo.age"
                            class="form-element"
                            @focus="descriptionFormFocusFn(3)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(3,$event)"
                       class="description-content"
                    >{{patientBasicInfo.age}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="身高">
                    <a-input
                            v-if="activeElementId === 4 ||!patientBasicInfo.height"
                            placeholder="请输入身高"
                            v-model="patientBasicInfo.height"
                            class="form-element"
                            @focus="descriptionFormFocusFn(4)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(4,$event)"
                       class="description-content"
                    >{{patientBasicInfo.height}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="体重">
                    <a-input
                            v-if="activeElementId === 5 ||!patientBasicInfo.weight"
                            placeholder="请输入体重"
                            v-model="patientBasicInfo.weight"
                            class="form-element"
                            @focus="descriptionFormFocusFn(5)"
                    />
                    <p v-else
                       @click="descriptionFormFocusFn(5)"
                       class="description-content"
                    >{{patientBasicInfo.weight}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="BML">
                    <a-input
                            v-if="activeElementId === 6 ||!patientBasicInfo.BML"
                            placeholder="请输入BML"
                            v-model="patientBasicInfo.BML"
                            class="form-element"
                            @focus="descriptionFormFocusFn(6)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(6,$event)"
                       class="description-content"
                    >{{patientBasicInfo.BML}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="身份证号">
                    <a-input
                            v-if="activeElementId === 7 ||!patientBasicInfo.idCard"
                            placeholder="请输入身份证号"
                            v-model="patientBasicInfo.idCard"
                            class="form-element"
                            @focus="descriptionFormFocusFn(7)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(7,$event)"
                       class="description-content"
                    >{{patientBasicInfo.idCard}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="社保账号">
                    <a-input
                            v-if="activeElementId === 8 ||!patientBasicInfo.socialSecurity"
                            placeholder="请输入社保账号"
                            v-model="patientBasicInfo.socialSecurity"
                            class="form-element"
                            @focus="descriptionFormFocusFn(8)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(8,$event)"
                       class="description-content"
                    >{{patientBasicInfo.socialSecurity}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="家庭住址">
                    <a-input
                            v-if="activeElementId === 9 ||!patientBasicInfo.addr"
                            placeholder="请输入家庭住址"
                            v-model="patientBasicInfo.addr"
                            class="form-element"
                            @focus="descriptionFormFocusFn(9)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(9,$event)"
                       class="description-content"
                    >{{patientBasicInfo.addr}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="电话">
                    <a-input
                            v-if="activeElementId === 10 ||!patientBasicInfo.phoneNumber"
                            placeholder="请输入电话"
                            v-model="patientBasicInfo.phoneNumber"
                            class="form-element"
                            @focus="descriptionFormFocusFn(10)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(10,$event)"
                       class="description-content"
                    >{{patientBasicInfo.phoneNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="职业">
                    <a-input
                            v-if="activeElementId === 11 ||!patientBasicInfo.professional"
                            placeholder="请输入职业"
                            v-model="patientBasicInfo.professional"
                            class="form-element"
                            @focus="descriptionFormFocusFn(11)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(11,$event)"
                       class="description-content"
                    >{{patientBasicInfo.professional}}</p>
                </a-descriptions-item>
                <a-descriptions-item></a-descriptions-item>
                <a-descriptions-item label="就诊号">
                    <a-input
                            v-if="activeElementId === 12 ||!patientBasicInfo.seeDoctorNumber"
                            placeholder="请输入就诊号"
                            v-model="patientBasicInfo.seeDoctorNumber"
                            class="form-element"
                            @focus="descriptionFormFocusFn(12)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(12,$event)"
                       class="description-content"
                    >{{patientBasicInfo.seeDoctorNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="就诊医院">
                    <a-input
                            v-if="activeElementId === 13 ||!patientBasicInfo.hospital"
                            placeholder="请输入就诊医院"
                            v-model="patientBasicInfo.hospital"
                            class="form-element"
                            @focus="descriptionFormFocusFn(13)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(13,$event)"
                       class="description-content"
                    >{{patientBasicInfo.hospital}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="就诊科室">
                    <a-input
                            v-if="activeElementId === 14 ||!patientBasicInfo.department"
                            placeholder="请输入就诊科室"
                            v-model="patientBasicInfo.department"
                            class="form-element"
                            @focus="descriptionFormFocusFn(14)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(14,$event)"
                       class="description-content"
                    >{{patientBasicInfo.department}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="病例号">
                    <a-input
                            v-if="activeElementId === 15 ||!patientBasicInfo.patientNumber"
                            placeholder="请输入病例号"
                            v-model="patientBasicInfo.patientNumber"
                            class="form-element"
                            @focus="descriptionFormFocusFn(15)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(15,$event)"
                       class="description-content"
                    >{{patientBasicInfo.patientNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="住院号">
                    <a-input
                            v-if="activeElementId === 16 ||!patientBasicInfo.admissionNumber"
                            placeholder="请输入住院号"
                            v-model="patientBasicInfo.admissionNumber"
                            class="form-element"
                            @focus="descriptionFormFocusFn(16)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(16,$event)"
                       class="description-content"
                    >{{patientBasicInfo.admissionNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="病床号">
                    <a-input
                            v-if="activeElementId === 17 ||!patientBasicInfo.sickbedNumber"
                            placeholder="请输入病床号"
                            v-model="patientBasicInfo.sickbedNumber"
                            class="form-element"
                            @focus="descriptionFormFocusFn(17)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(17,$event)"
                       class="description-content"
                    >{{patientBasicInfo.sickbedNumber}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="ICD诊断">
                    <a-select style="width: 100%;"
                              placeholder="请输入ICD诊断"
                              v-if="activeElementId === 18 ||!patientBasicInfo.ICDDiagnosis"
                              v-model="patientBasicInfo.ICDDiagnosis"
                              class="form-element"
                              @focus="descriptionFormFocusFn(18)"
                    >
                        <a-select-option value="1">
                            32232323
                        </a-select-option>
                        <a-select-option value="2">
                            fewmka
                        </a-select-option>
                    </a-select>
                    <p v-else
                       @click="descriptionFormClickFn(18,$event)"
                       class="description-content"
                    >{{patientBasicInfo.ICDDiagnosis}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="民族">
                    <a-input
                            v-if="activeElementId === 19 ||!patientBasicInfo.national"
                            placeholder="请输入民族"
                            v-model="patientBasicInfo.national"
                            class="form-element"
                            @focus="descriptionFormFocusFn(19)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(19,$event)"
                       class="description-content"
                    >{{patientBasicInfo.national}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="现病史">
                    <a-input
                            v-if="activeElementId === 20 ||!patientBasicInfo.hpi"
                            placeholder="请输入现病史"
                            v-model="patientBasicInfo.hpi"
                            class="form-element"
                            @focus="descriptionFormFocusFn(20)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(20,$event)"
                       class="description-content"
                    >{{patientBasicInfo.hpi}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="过敏史">
                    <a-input
                            v-if="activeElementId === 21 ||!patientBasicInfo.allergy"
                            placeholder="请输入过敏史"
                            v-model="patientBasicInfo.allergy"
                            class="form-element"
                            @focus="descriptionFormFocusFn(21)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(21,$event)"
                       class="description-content"
                    >{{patientBasicInfo.allergy}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="既往史">
                    <a-input
                            v-if="activeElementId === 22 ||!patientBasicInfo.pastHistory"
                            placeholder="请输入既往史"
                            v-model="patientBasicInfo.pastHistory"
                            class="form-element"
                            @focus="descriptionFormFocusFn(22)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(22,$event)"
                       class="description-content"
                    >{{patientBasicInfo.pastHistory}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="家族史">
                    <a-input
                            v-if="activeElementId === 23 ||!patientBasicInfo.familyHistory"
                            placeholder="请输入家族史"
                            v-model="patientBasicInfo.familyHistory"
                            class="form-element"
                            @focus="descriptionFormFocusFn(23)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(23,$event)"
                       class="description-content"
                    >{{patientBasicInfo.familyHistory}}</p>
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>
<script>
    import { descriptionsMethods } from '@/utils/patientInfo';

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
                activeElementId: null,
            };
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
            //	病人信息、直接编辑用的 描述框的方法
            ...descriptionsMethods,
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


