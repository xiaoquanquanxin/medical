<template>
    <div class="layout-content-inner-main">
        <a-button type="primary" @click="handleCheck">保存</a-button>
        <br>
        <br>
        <PatientBasicInfo ref="refPatientBasicInfo"/>
        <br>
        <!--群聊-->
        <MDTInformation ref="refMDTInformation"/>
    </div>
</template>
<script>
    import MDTInformation from '@/components/userList/patientInfo/MDTInformation.vue';
    import PatientBasicInfo from '@/components/userList/patientInfo/patientBasicInfo.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            MDTInformation,
            PatientBasicInfo,
        },
        computed: {},
        watch: {
            //  检测这个变化⚠️发请求
            $route(value){
                console.log(value);
            }
        },
        data(){
            return {
                //  如果有就是编辑
                patientInfoId: this.$route.params.patientInfoId,
            };
        },
        created(){
            console.log('是编辑？', !!this.patientInfoId);
            //  如果是添加，清空 保存病人信息
            if (!this.patientInfoId) {
                this.setPatientBasicInfo(null);
            } else {
                //  如果是编辑，重新拉一次数据
                this.getPatientInfo();
            }
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            ...mapActions('userList', [
                //  保存病人信息
                'setPatientBasicInfo',
            ]),
            //  获取病人信息数据
            getPatientInfo(){
                setTimeout(() => {
                    //  监听的参数 id病人id
                    //  console.log(this.$route.params.patientInfoId);
                    this.patientInfo = {
                        name: '许晓飞',
                        sex: '男',
                        age: 3232,
                        height: 'height',
                        weight: 'weight',
                        BML: 32,
                        idCard: 'idCard',
                        //  社保
                        socialSecurity: '社保',
                        addr: '山西',
                        phoneNumber: 87743993292,
                        //  职业
                        professional: '职业',
                        //  就诊号
                        seeDoctorNumber: '就诊号',
                        hospital: '就诊医院',
                        department: '就诊科室',
                        //  病例号
                        patientNumber: '病例号',
                        //  住院号
                        admissionNumber: '住院号',
                        //  病床号
                        sickbedNumber: '病床号',
                        //  ICD诊断
                        ICDDiagnosis: 'ICD诊断',
                        //  民族
                        national: '汉',
                        //  现病史
                        hpi: '现病史',
                        //  过敏史
                        allergy: 'allergy',
                        //  既往史
                        pastHistory: 'pastHistory',
                        //  家族史
                        familyHistory: 'familyHistory'
                    };
                    //  保存到store里，基础信息、群聊信息 ⚠️这里暂时一个，看够不够了
                    this.setPatientBasicInfo(this.patientInfo);
                }, 40);
            },
            //  保存按钮
            handleCheck(){
                const p1 = this.$refs.refPatientBasicInfo.handleSubmit();
//                const p2 = this.$refs.refMDTInformation.handleSubmit();
                Promise.all([
                    p1,
//                    p2,
                ])
                    .then(v => {
                        //  发请求

                    })
                    .catch(error => {
                        console.log('有错');
                    });

            },
            
        }
    };
</script>