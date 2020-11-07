<template>
    <div style="min-width: 860px;">
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
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-34">姓名:</div>
                    <a-input
                            v-if="activeElementId === 0 ||!patientBasicInfo.name"
                            placeholder="请输入姓名"
                            v-model="patientBasicInfo.name"
                            class="form-element"
                            @focus="descriptionFormFocusFn(0)"
                            @blur="descriptionFormBlurFn('name')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(0,$event)"
                       class="description-content"
                    >{{patientBasicInfo.name}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-34">性别:</div>
                    <a-select
                            style="width:100%"
                            v-if="activeElementId === 1 ||!patientBasicInfo.sex"
                            placeholder="请选择性别"
                            v-model="patientBasicInfo.sex"
                            class="form-element"
                            @focus="descriptionFormFocusFn(1)"
                            @dropdownVisibleChange="dropdownVisibleChangeFn($event,1)"
                    >
                        <SuffixIcon :iconNum="1" slot="suffixIcon"></SuffixIcon>
                        <a-select-option :value="1">男</a-select-option>
                        <a-select-option :value="2">女</a-select-option>
                    </a-select>
                    <p v-else
                       @click="descriptionFormClickFn(1,$event)"
                       class="description-content"
                    >{{patientBasicInfo.sex===1?'男':'女'}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-34">年龄:</div>
                    <a-input-number style='width:100%;'
                                    :precision="0"
                                    :min="1"
                                    v-if="activeElementId === 3 ||!patientBasicInfo.birth"
                                    placeholder="请输入年龄"
                                    v-model="patientBasicInfo.birth"
                                    class="form-element"
                                    @focus="descriptionFormFocusFn(3)"
                                    @blur="descriptionFormBlurFn('birth')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(3,$event)"
                       class="description-content"
                    >{{patientBasicInfo.birth}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-64">身高(cm):
                    </div>
                    <a-input-number style='width:100%;'
                                    :precision="0"
                                    :min="1"
                                    v-if="activeElementId === 4 ||!patientBasicInfo.height"
                                    placeholder="请输入身高"
                                    v-model="patientBasicInfo.height"
                                    class="form-element"
                                    @focus="descriptionFormFocusFn(4)"
                                    @blur="descriptionFormBlurFn('height')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(4,$event)"
                       class="description-content"
                    >{{patientBasicInfo.height}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-64">体重(kg):
                    </div>
                    <a-input-number style='width:100%;'
                                    :precision="0"
                                    :min="1"
                                    v-if="activeElementId === 5 ||!patientBasicInfo.weight"
                                    placeholder="请输入体重"
                                    v-model="patientBasicInfo.weight"
                                    class="form-element"
                                    @focus="descriptionFormFocusFn(5)"
                                    @blur="descriptionFormBlurFn('weight')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(5,$event)"
                       class="description-content"
                    >{{patientBasicInfo.weight}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-34">BMI:</div>
                    <p class="description-content">{{bmi}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-64">身份证号:</div>
                    <a-input
                            v-if="activeElementId === 7 ||!patientBasicInfo.idCard"
                            placeholder="请输入身份证号"
                            v-model="patientBasicInfo.idCard"
                            class="form-element"
                            @focus="descriptionFormFocusFn(7)"
                            @blur="descriptionFormBlurFn('idCard')"
                            @change="idCardChangeFn"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(7,$event)"
                       class="description-content"
                    >{{patientBasicInfo.idCard}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">社保账号:</div>
                    <a-input
                            v-if="activeElementId === 8 ||!patientBasicInfo.idSocial"
                            placeholder="请输入社保账号"
                            v-model="patientBasicInfo.idSocial"
                            class="form-element"
                            @focus="descriptionFormFocusFn(8)"
                            @blur="descriptionFormBlurFn('idSocial')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(8,$event)"
                       class="description-content"
                    >{{patientBasicInfo.idSocial}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">家庭住址:</div>
                    <a-input
                            v-if="activeElementId === 9 ||!patientBasicInfo.address"
                            placeholder="请输入家庭住址"
                            v-model="patientBasicInfo.address"
                            class="form-element"
                            @focus="descriptionFormFocusFn(9)"
                            @blur="descriptionFormBlurFn('address')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(9,$event)"
                       class="description-content"
                    >{{patientBasicInfo.address}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-34">电话:</div>
                    <a-input
                            v-if="activeElementId === 10 ||!patientBasicInfo.phone"
                            placeholder="请输入电话"
                            v-model="patientBasicInfo.phone"
                            class="form-element"
                            @focus="descriptionFormFocusFn(10)"
                            @blur="descriptionFormBlurFn('phone')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(10,$event)"
                       class="description-content"
                    >{{patientBasicInfo.phone}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">职业:</div>
                    <a-input
                            v-if="activeElementId === 11 ||!patientBasicInfo.professional"
                            placeholder="请输入职业"
                            v-model="patientBasicInfo.professional"
                            class="form-element"
                            @focus="descriptionFormFocusFn(11)"
                            @blur="descriptionFormBlurFn('professional')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(11,$event)"
                       class="description-content"
                    >{{patientBasicInfo.professional}}</p>
                </a-descriptions-item>
                <a-descriptions-item></a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">就诊号:</div>
                    {{patientBasicInfo.jzbh}}
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-64">就诊医院:</div>
                    <a-select style="min-width: 100%;"
                              placeholder="请选择就诊医院"
                              v-model="patientBasicInfo.departTreatment"
                              class="form-element basic-select-width"
                              @focus="descriptionFormFocusFn(14)"
                              @change="selectHospitalChange"
                              @dropdownVisibleChange="dropdownVisibleChangeFn($event,5)"
                    >
                        <SuffixIcon :iconNum="5" slot="suffixIcon"></SuffixIcon>
                        <a-select-option v-for="item in hospitalList"
                                         :value="item.id.toString()">
                            {{item.hospitalName}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-64">就诊科室:</div>
                    <a-select style="min-width: 100%;"
                              placeholder="请选择就诊科室"
                              v-model="patientBasicInfo.hospitalTreatment"
                              class="form-element basic-select-width"
                              @change="hospitalTreatmentChange"
                              @focus="descriptionFormFocusFn(14)"
                              @dropdownVisibleChange="dropdownVisibleChangeFn($event,2)"
                    >
                        <SuffixIcon :iconNum="2" slot="suffixIcon"></SuffixIcon>
                        <a-select-option v-for="item in hospitalDeptList"
                                         :value="item.id">
                            {{item.deptName}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">病例号:</div>
                    <a-input
                            v-if="activeElementId === 15 ||!patientBasicInfo.treatCode"
                            placeholder="请输入病例号"
                            v-model="patientBasicInfo.treatCode"
                            class="form-element"
                            @focus="descriptionFormFocusFn(15)"
                            @blur="descriptionFormBlurFn('treatCode')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(15,$event)"
                       class="description-content"
                    >{{patientBasicInfo.treatCode}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">住院号:</div>
                    <a-input
                            v-if="activeElementId === 16 ||!patientBasicInfo.hospitalCode"
                            placeholder="请输入住院号"
                            v-model="patientBasicInfo.hospitalCode"
                            class="form-element"
                            @focus="descriptionFormFocusFn(16)"
                            @blur="descriptionFormBlurFn('hospitalCode')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(16,$event)"
                       class="description-content"
                    >{{patientBasicInfo.hospitalCode}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">病床号:</div>
                    <a-input
                            v-if="activeElementId === 17 ||!patientBasicInfo.bedCode"
                            placeholder="请输入病床号"
                            v-model="patientBasicInfo.bedCode"
                            class="form-element"
                            @focus="descriptionFormFocusFn(17)"
                            @blur="descriptionFormBlurFn('bedCode')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(17,$event)"
                       class="description-content"
                    >{{patientBasicInfo.bedCode}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">ICD诊断:</div>
                    <a-select style="min-width: 100%;"
                              placeholder="请输入ICD诊断"
                              v-model="patientBasicInfo.icd"
                              class="form-element basic-select-width"
                              @focus="descriptionFormFocusFn(18)"
                              @dropdownVisibleChange="dropdownVisibleChangeFn($event,6)"
                    >
                        <SuffixIcon :iconNum="6" slot="suffixIcon"></SuffixIcon>
                        <a-select-option :value="item.code"
                                         v-for="item in ICDList"
                        >{{item.name}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">民族:</div>
                    <a-input
                            v-if="activeElementId === 19 ||!patientBasicInfo.nation"
                            placeholder="请输入民族"
                            v-model="patientBasicInfo.nation"
                            class="form-element"
                            @focus="descriptionFormFocusFn(19)"
                            @blur="descriptionFormBlurFn('nation')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(19,$event)"
                       class="description-content"
                    >{{patientBasicInfo.nation}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">现病史:</div>
                    <a-input
                            v-if="activeElementId === 20 ||!patientBasicInfo.now"
                            placeholder="请输入现病史"
                            v-model="patientBasicInfo.now"
                            class="form-element"
                            @focus="descriptionFormFocusFn(20)"
                            @blur="descriptionFormBlurFn('now')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(20,$event)"
                       class="description-content"
                    >{{patientBasicInfo.now}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">过敏史:</div>
                    <a-input
                            v-if="activeElementId === 21 ||!patientBasicInfo.allergy"
                            placeholder="请输入过敏史"
                            v-model="patientBasicInfo.allergy"
                            class="form-element"
                            @focus="descriptionFormFocusFn(21)"
                            @blur="descriptionFormBlurFn('allergy')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(21,$event)"
                       class="description-content"
                    >{{patientBasicInfo.allergy}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">既往史:</div>
                    <a-input
                            v-if="activeElementId === 22 ||!patientBasicInfo.past"
                            placeholder="请输入既往史"
                            v-model="patientBasicInfo.past"
                            class="form-element"
                            @focus="descriptionFormFocusFn(22)"
                            @blur="descriptionFormBlurFn('past')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(22,$event)"
                       class="description-content"
                    >{{patientBasicInfo.past}}</p>
                </a-descriptions-item>
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label">家族史:</div>
                    <a-input
                            v-if="activeElementId === 23 ||!patientBasicInfo.family"
                            placeholder="请输入家族史"
                            v-model="patientBasicInfo.family"
                            class="form-element"
                            @focus="descriptionFormFocusFn(23)"
                            @blur="descriptionFormBlurFn('family')"
                    />
                    <p v-else
                       @click="descriptionFormClickFn(23,$event)"
                       class="description-content"
                    >{{patientBasicInfo.family}}</p>
                </a-descriptions-item>
            </a-descriptions>
        </div>
        <br>
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <a-col>MDT信息</a-col>
            <a-col v-if="false">
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
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-64">主管医生:</div>
                    <a-select style="min-width: 100%;"
                              placeholder="请选择主管医生"
                              v-model="patientBasicInfo.doctorId"
                              @change="doctorChange"
                              @dropdownVisibleChange="dropdownVisibleChangeFn($event,3)"
                    >
                        <SuffixIcon :iconNum="3" slot="suffixIcon"></SuffixIcon>
                        <a-select-option v-for="item in doctorList"
                                         :key="item.id"
                                         :value="item.id">
                            {{item.doctorName}}
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
                <!--主管医生-->
                <a-descriptions-item>
                    <div slot="label" class="descriptions-label descriptions-label-require require-left-50">营养师:</div>
                    <a-select style="min-width: 100%;"
                              placeholder="请选择营养师"
                              v-model="patientBasicInfo.nutritionistId"
                              @change="nutritionistChange"
                              @dropdownVisibleChange="dropdownVisibleChangeFn($event,4)"
                    >
                        <SuffixIcon :iconNum="4" slot="suffixIcon"></SuffixIcon>
                        <a-select-option v-for="item in nutritionistList"
                                         :key="item.id"
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
    //  ⚠️医院下掉科室，需要调取木木掉接口

    import { dropdownVisibleChangeFn, selectSuffixIconMap } from '../../../utils/select';
    import { requestPatientSelectICD } from '../../../api/userList/userList';
    import { requestDeptListDeptHospitalId, requestHospitalGetList } from '../../../api/hospital';
    import { requestDeptList } from '../../../api/department';
    import { descriptionsMethods } from '@/utils/patientInfo';
    import { requestPatientSelectDoctorByHospital } from '../../../api/userList/userList';
    import SuffixIcon from '@/components/suffixIcon.vue';
    import { getAgeByIdCard, getSexByIdCard, isIdCard } from '../../../utils/validate';

    //  病人信息组件
    export default {
        components: {
            SuffixIcon,
        },
        computed: {
            //  基础信息，请求来了就会出现数据
            patientBasicInfo(){
                const { patientBasicInfo } = this.$store.state.userList;
                return patientBasicInfo;
            },
            bmi(){
                console.log('计算');
                if (!this.patientBasicInfo) {
                    return 0;
                }
                const bmi = this.patientBasicInfo.weight / this.patientBasicInfo.height / this.patientBasicInfo.height * 10000;
                return isNaN(bmi) ? '' : bmi.toFixed(1);
            }
        },
        data(){
            return {
                selectSuffixIconMap,
                //  编辑的index
                activeElementId: null,
                //  全部科室列表
                deptList: [],
                //  医院列表
                hospitalList: [],
                //  icd
                ICDList: [],
                //  医院筛选后的科室
                hospitalDeptList: [],
                //  医生列表
                doctorList: [],
                //  营养师列表
                nutritionistList: []
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            searchFn(){
                //  ICD
                requestPatientSelectICD()
                    .then(ICDList => {
                        this.ICDList = ICDList;
                    });
                //  医院list
                requestHospitalGetList()
                    .then(hospitalList => {
                        this.hospitalList = hospitalList;
                    });
                //  全部科室
                requestDeptList()
                    .then(deptList => {
                        this.deptList = deptList;
                    });
            },
            //  切换医院
            selectHospitalChange(value){
                this.patientBasicInfo.hospitalTreatment = undefined;
                //  清空科室
                this.hospitalDeptList = [];
                this.getDeptListDeptHospitalId(value);
            },
            //  查询科室下的医院
            getDeptListDeptHospitalId(value){
                requestDeptListDeptHospitalId(value)
                    .then(v => {
                        const map = {};
                        const mapList = v.data || [];
                        mapList.forEach(item => {
                            map[item] = true;
                        });
                        //  console.log(map);
                        this.hospitalDeptList = this.deptList.filter((item => {
                            return map[item.id];
                        }));
                        console.log(this.hospitalDeptList);
                        this.$forceUpdate();
                        //  清空医生和营养师
                        this.resetDoctorNutritionistListFn();
                    });
            },
            //  切换科室
            hospitalTreatmentChange(value){
                console.log(value);
                //  设置科室id
                this.patientBasicInfo.hospitalTreatment = value;
                //  强制更新
                this.$forceUpdate();
                //  拿医生、营养师list
                this.getDoctorNutritionistListFn(value);
            },
            //  根据当前医院查询所有医生
            getDoctorNutritionistListFn(deptId){
                const data = {
                    deptId,
                    hospitalId: this.patientBasicInfo.departTreatment,
                };
                console.log('根据当前医院查询所有医生');
                requestPatientSelectDoctorByHospital(Object.assign({
                    doctorType: 1,
                }, data))
                    .then(doctorList => {
                        this.doctorList = doctorList;
                    });
                console.log('根据当前医院查询所有营养师');
                data.deptId = 1;
                requestPatientSelectDoctorByHospital(Object.assign({
                    doctorType: 2,
                }, data))
                    .then(nutritionistList => {
                        this.nutritionistList = nutritionistList;
                    });
            },
            //  清空医生和营养师list
            resetDoctorNutritionistListFn(){
                this.patientBasicInfo.doctorId = undefined;
                this.patientBasicInfo.nutritionistId = undefined;
                this.doctorList = [];
                this.nutritionistList = [];
            },
            //  医生营养师切花
            doctorChange(doctorId){
                this.patientBasicInfo.doctorId = doctorId;
                this.$forceUpdate();
            },
            nutritionistChange(doctorId){
                this.patientBasicInfo.nutritionistId = doctorId;
                this.$forceUpdate();
            },
            //  群聊
            groupChat(e){
                console.log(e);
            },

            //  输入身份证号码
            idCardChangeFn(event){
                const { value } = event.target;
                if (!isIdCard(value)) {
                    return;
                }
                const age = getAgeByIdCard(value);
                const sex = getSexByIdCard(value);
                console.log(age, sex);
                const patientBasicInfo = this.patientBasicInfo;
                patientBasicInfo.birth = age;
                patientBasicInfo.sex = sex;
            },
            //  必填验证
            patientBasicInfoCheck(checkList){
                for (let item of checkList) {
                    if (item.value === '' || item.value === undefined || item.value === null) {
                        this.$message.error(item.message);
                        return false;
                    }
                    if (item.label === 'idCard') {
                        const res = isIdCard(item.value);
                        console.log(res);
                        if (!res) {
                            this.$message.error(item.message);
                            return false;
                        }
                    }
                }
                return true;
            },
            //  保存
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    //  console.table(JSON.parse(JSON.stringify(this.patientBasicInfo)));
                    const patientBasicInfo = this.patientBasicInfo;
                    //  设置bmi
                    patientBasicInfo.bmi = this.bmi;
                    //  规范数据
                    const {
                        address,
                        allergy,
                        bedCode,
                        birth,
                        bmi,
                        departTreatment,
                        doctorId,
                        family,
                        hospitalCode,
                        hospitalTreatment,
                        icd,
                        idCard,
                        idSocial,
                        name,
                        nation,
                        now,
                        nutritionistId,
                        past,
                        patientStatus,
                        phone,
                        professional,
                        treatCode,

                        //  数字
                        height,
                        sex,
                        weight,
                    } = patientBasicInfo;
                    const isValidated = this.patientBasicInfoCheck([
                        {
                            value: name,
                            label: 'name',
                            message: '请输入姓名'
                        },
                        {
                            value: sex,
                            label: 'sex',
                            message: '请选择年龄'
                        },
                        {
                            value: birth,
                            label: 'birth',
                            message: '请输入生日'
                        },
                        {
                            value: height,
                            label: 'height',
                            message: '请输入身高'
                        },
                        {
                            value: weight,
                            label: 'weight',
                            message: '请输入体重'
                        },
                        {
                            value: bmi,
                            label: 'bmi',
                            message: '请输入BMI'
                        },
                        {
                            value: idCard,
                            label: 'idCard',
                            message: '请输入正确身份证号'
                        },
                        {
                            value: phone,
                            label: 'phone',
                            message: '请输入电话'
                        },
                        {
                            value: departTreatment,
                            label: 'departTreatment',
                            message: '请选择就诊医院'
                        },
                        {
                            value: hospitalTreatment,
                            label: 'hospitalTreatment',
                            message: '请选择就诊科室'
                        },
                        {
                            value: doctorId,
                            label: 'doctorId',
                            message: '请选择医生'
                        },
                        {
                            value: nutritionistId,
                            label: 'nutritionistId',
                            message: '请选择营养师'
                        },
                    ]);
                    console.log('是否通过前端验证', isValidated);
                    if (!isValidated) {
                        reject(true);
                        return;
                    }
                    //  console.log(name, sex, birth, height, weight, bmi, phone, departTreatment, hospitalTreatment, doctorId, nutritionistId);
                    patientBasicInfo.address = String(address || '') || undefined;
                    patientBasicInfo.allergy = String(allergy || '') || undefined;
                    patientBasicInfo.bedCode = String(bedCode || '') || undefined;
                    patientBasicInfo.birth = String(birth || '') || undefined;
                    patientBasicInfo.bmi = String(bmi || '') || undefined;
                    patientBasicInfo.departTreatment = String(departTreatment || '') || undefined;
                    patientBasicInfo.doctorId = String(doctorId || '') || undefined;
                    patientBasicInfo.family = String(family || '') || undefined;
                    patientBasicInfo.hospitalCode = String(hospitalCode || '') || undefined;
                    patientBasicInfo.hospitalTreatment = String(hospitalTreatment || '') || undefined;
                    patientBasicInfo.icd = String(icd || '') || undefined;
                    patientBasicInfo.idCard = String(idCard || '') || undefined;
                    patientBasicInfo.idSocial = String(idSocial || '') || undefined;
                    patientBasicInfo.name = String(name || '') || undefined;
                    patientBasicInfo.nation = String(nation || '') || undefined;
                    patientBasicInfo.now = String(now || '') || undefined;
                    patientBasicInfo.nutritionistId = String(nutritionistId || '') || undefined;
                    patientBasicInfo.past = String(past || '') || undefined;
                    patientBasicInfo.patientStatus = String(patientStatus || '') || undefined;
                    patientBasicInfo.phone = String(phone || '') || undefined;
                    patientBasicInfo.professional = String(professional || '') || undefined;
                    patientBasicInfo.treatCode = String(treatCode || '') || undefined;

                    patientBasicInfo.height = Number(height) || undefined;
                    patientBasicInfo.sex = Number(sex) || undefined;
                    patientBasicInfo.weight = Number(weight) || undefined;

                    console.log('调用病人组件');
                    //  console.log(JSON.stringify(this.patientBasicInfo));
                    //  console.table(JSON.parse(JSON.stringify(this.patientBasicInfo)));
                    //  bmi赋值

                    resolve();
                });
            },

            dropdownVisibleChangeFn,
            //	病人信息、直接编辑用的 描述框的方法
            ...descriptionsMethods,
        }
    };
</script>
<style scoped>
    .descriptions-label {
        position: relative;
        float: right;
    }
    
    .descriptions-label.descriptions-label-require::after {
        content: '*';
        display: block;
        color: red;
        position: absolute;
        top: -2px;
    }
    
    .descriptions-label-require.require-left-34::after {
        right: 34px;
    }
    
    .descriptions-label-require.require-left-50::after {
        right: 50px;
    }
    
    .descriptions-label-require.require-left-64::after {
        right: 64px;
    }
</style>



