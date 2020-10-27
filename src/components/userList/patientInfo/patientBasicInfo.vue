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
                    <a-select
                            style="width:100%"
                            v-if="activeElementId === 1 ||!patientBasicInfo.sex"
                            placeholder="请选择性别"
                            v-model="patientBasicInfo.sex"
                            class="form-element"
                            @focus="descriptionFormFocusFn(1)"
                    >
                        <a-select-option :value="1">男</a-select-option>
                        <a-select-option :value="2">女</a-select-option>
                    </a-select>
                    <p v-else
                       @click="descriptionFormClickFn(1,$event)"
                       class="description-content"
                    >{{patientBasicInfo.sex===1?'男':'女'}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="年龄">
                    <a-input
                            v-if="activeElementId === 3 ||!patientBasicInfo.birth"
                            placeholder="请输入年龄"
                            v-model="patientBasicInfo.birth"
                            class="form-element"
                            @focus="descriptionFormFocusFn(3)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(3,$event)"
                       class="description-content"
                    >{{patientBasicInfo.birth}}</p>
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
                <a-descriptions-item label="BMI">
                    <p class="description-content">{{patientBasicInfo.bmi}}</p>
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
                            v-if="activeElementId === 8 ||!patientBasicInfo.idSocial"
                            placeholder="请输入社保账号"
                            v-model="patientBasicInfo.idSocial"
                            class="form-element"
                            @focus="descriptionFormFocusFn(8)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(8,$event)"
                       class="description-content"
                    >{{patientBasicInfo.idSocial}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="家庭住址">
                    <a-input
                            v-if="activeElementId === 9 ||!patientBasicInfo.address"
                            placeholder="请输入家庭住址"
                            v-model="patientBasicInfo.address"
                            class="form-element"
                            @focus="descriptionFormFocusFn(9)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(9,$event)"
                       class="description-content"
                    >{{patientBasicInfo.address}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="电话">
                    <a-input
                            v-if="activeElementId === 10 ||!patientBasicInfo.phone"
                            placeholder="请输入电话"
                            v-model="patientBasicInfo.phone"
                            class="form-element"
                            @focus="descriptionFormFocusFn(10)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(10,$event)"
                       class="description-content"
                    >{{patientBasicInfo.phone}}</p>
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
                            v-if="activeElementId === 12 ||!patientBasicInfo.jzbh"
                            placeholder="请输入就诊号"
                            v-model="patientBasicInfo.jzbh"
                            class="form-element"
                            @focus="descriptionFormFocusFn(12)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(12,$event)"
                       class="description-content"
                    >{{patientBasicInfo.jzbh}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="就诊医院">
                    <a-select placeholder="请输入就诊医院"
                              v-model="patientBasicInfo.departTreatment"
                              class="form-element basic-select-width"
                              @focus="descriptionFormFocusFn(14)"
                              @change="selectHospitalChange"
                    >
                        <a-select-option v-for="(item,index) in hospitalList" :key="index" :value="item.id">
                            {{item.hospitalName}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <a-descriptions-item label="就诊科室">
                    <a-select style="width: 100%;"
                              placeholder="请选择就诊科室"
                              v-model="patientBasicInfo.hospitalTreatment"
                              class="form-element"
                              @focus="descriptionFormFocusFn(14)"
                    >
                        <a-select-option v-for="(item,index) in deptList" :key="index" :value="item.id">
                            {{item.deptName}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <a-descriptions-item label="病例号">
                    <a-input
                            v-if="activeElementId === 15 ||!patientBasicInfo.treatCode"
                            placeholder="请输入病例号"
                            v-model="patientBasicInfo.treatCode"
                            class="form-element"
                            @focus="descriptionFormFocusFn(15)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(15,$event)"
                       class="description-content"
                    >{{patientBasicInfo.treatCode}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="住院号">
                    <a-input
                            v-if="activeElementId === 16 ||!patientBasicInfo.hospitalCode"
                            placeholder="请输入住院号"
                            v-model="patientBasicInfo.hospitalCode"
                            class="form-element"
                            @focus="descriptionFormFocusFn(16)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(16,$event)"
                       class="description-content"
                    >{{patientBasicInfo.hospitalCode}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="病床号">
                    <a-input
                            v-if="activeElementId === 17 ||!patientBasicInfo.bedCode"
                            placeholder="请输入病床号"
                            v-model="patientBasicInfo.bedCode"
                            class="form-element"
                            @focus="descriptionFormFocusFn(17)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(17,$event)"
                       class="description-content"
                    >{{patientBasicInfo.bedCode}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="ICD诊断">
                    <a-select style="width: 100%;"
                              placeholder="请输入ICD诊断"
                              v-model="patientBasicInfo.icd"
                              class="form-element"
                              @focus="descriptionFormFocusFn(18)"
                    >
                        <a-select-option value="1">
                            诊断1
                        </a-select-option>
                        <a-select-option value="2">
                            诊断2
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <a-descriptions-item label="民族">
                    <a-input
                            v-if="activeElementId === 19 ||!patientBasicInfo.nation"
                            placeholder="请输入民族"
                            v-model="patientBasicInfo.nation"
                            class="form-element"
                            @focus="descriptionFormFocusFn(19)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(19,$event)"
                       class="description-content"
                    >{{patientBasicInfo.nation}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="现病史">
                    <a-input
                            v-if="activeElementId === 20 ||!patientBasicInfo.now"
                            placeholder="请输入现病史"
                            v-model="patientBasicInfo.now"
                            class="form-element"
                            @focus="descriptionFormFocusFn(20)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(20,$event)"
                       class="description-content"
                    >{{patientBasicInfo.now}}</p>
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
                            v-if="activeElementId === 22 ||!patientBasicInfo.past"
                            placeholder="请输入既往史"
                            v-model="patientBasicInfo.past"
                            class="form-element"
                            @focus="descriptionFormFocusFn(22)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(22,$event)"
                       class="description-content"
                    >{{patientBasicInfo.past}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="家族史">
                    <a-input
                            v-if="activeElementId === 23 ||!patientBasicInfo.family"
                            placeholder="请输入家族史"
                            v-model="patientBasicInfo.family"
                            class="form-element"
                            @focus="descriptionFormFocusFn(23)"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(23,$event)"
                       class="description-content"
                    >{{patientBasicInfo.family}}</p>
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>
<script>
    import { descriptionsMethods } from '@/utils/patientInfo';
    import { requestPatientSelectDeptByHospital } from '../../../api/userList/userList';
    import { requestHospitalGetList } from '../../../api/hospital';

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
                //  科室列表
                deptList: [],
                //  医院列表
                hospitalList: []
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            searchFn(){
                requestHospitalGetList()
                    .then(v => {
                        this.hospitalList = v.data;
                        //console.log(JSON.parse(JSON.stringify(v.data)));
                    });
            },
            //  切换医院
            selectHospitalChange(value){
                requestPatientSelectDeptByHospital()
                    .then(v => {
                        console.log('根据当前医院查询科室', v.data);
                        v.data.forEach(item => {
                            item.id = Number(item.id);
                        });
                        this.deptList = v.data;
                    });
            },
            //	病人信息、直接编辑用的 描述框的方法
            ...descriptionsMethods,
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
            }
        }
    };
</script>


