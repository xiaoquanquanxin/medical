<template>
    <div class="layout-content-inner-main">
        <!--头部信息-->
        <a-row type="flex" justify="space-between" align="middle">
            <a-col>
                <a-button type="primary" @click="confirmOutHospital">确认出院</a-button>
                <router-link :to="{name:'admittedHospital',params:{patientInfoId}}">
                    <a-button type="primary">
                        确认入院
                    </a-button>
                </router-link>
            </a-col>
            <a-col>
                <a-button type="primary" @click="handleCheck">保存</a-button>
            </a-col>
        </a-row>
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
        computed: {
            //  群聊信息
            groupChatMessage(){
                return this.$store.state.userList.groupChatMessage;
            },
            //  页面参数 - 病人id
            patientInfoId(){
                return this.$route.params.patientInfoId;
            }
        },
        watch: {
            //  检测这个变化⚠️发请求
            $route(){
                this.getPatientInfo();
            }
        },
        data(){
            return {
                //  病人信息
                patientInfo: null,
            };
        },
        created(){
            this.getPatientInfo();
        },
        methods: {
            ...mapActions('userList', [
                //  保存病人信息，这是为了给组件用，而不是页面，所以要store
                'setPatientBasicInfo',
            ]),
            //  获取病人信息数据
            getPatientInfo(){
                console.log('病人信息tab-病人id', this.patientInfoId);
                setTimeout(() => {
                    //  监听的参数 id病人id
                    //  console.log(this.$route.params.patientInfoId);
                    this.patientInfo = {
                        name: '奋武',
                        sex: '男',
                        age: 3232,
                        height: 32,
                        weight: 43,
                        BML: 32,
                        idCard: '32323232',
                        //  社保
                        socialSecurity: 'fjioaw',
                        addr: '山西',
                        phoneNumber: 87743993292,
                        //  职业
                        professional: '32ji',
                        //  就诊号
                        seeDoctorNumber: 'ljhgr',
                        hospital: '就诊医院',
                        department: '就诊科室',
                        //  病例号
                        patientNumber: 'jfeiopw',
                        //  住院号
                        admissionNumber: 'fjioewngreiso',
                        //  病床号
                        sickbedNumber: 'ng',
                        //  ICD诊断
                        ICDDiagnosis: 'feawiohu',
                        //  民族
                        national: '汉',
                        //  现病史
                        hpi: 'fejwi',
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
            //  确认出院
            confirmOutHospital(){
                this.$confirm({
                    title: `确定${this.patientInfo.name}出院`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                            //  这里要通知的有很多
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
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
