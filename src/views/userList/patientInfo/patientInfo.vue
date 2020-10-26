<template>
    <div class="layout-content-inner-main">
        <!--头部信息-->
        <div class="a-input-group" data-msg="空"></div>
        <div class="a-input-group">
            <a-row type="flex" justify="space-between" align="middle">
                <a-col v-if="patientInfo">
                    <a-button type="primary" @click="confirmOutHospital"
                              v-if="patientInfo.patientStatus == 1"
                    >确认出院
                    </a-button>
                    <router-link :to="{name:'admittedHospital',params:{patientId}}"
                                 v-if="patientInfo.patientStatus == 2"
                    >
                        <a-button type="primary">
                            确认入院
                        </a-button>
                    </router-link>
                </a-col>
                <a-col>
                    <a-button type="primary" @click="handleCheck">保存</a-button>
                </a-col>
            </a-row>
        </div>
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
    import { requestPatientSelectOnePatient, requestPatientUpdate } from '../../../api/userList/userList';
    import { calcAgeByBirth } from '../../../utils/common';

    export default {
        components: {
            MDTInformation,
            PatientBasicInfo,
        },
        computed: {
            //  基础信息，请求来了就会出现数据
            patientBasicInfo(){
                return this.$store.state.userList.patientBasicInfo;
            },
            //  群聊信息
            groupChatMessage(){
                return this.$store.state.userList.groupChatMessage;
            },
            //  页面参数 - 病人id
            patientId(){
                return this.$route.params.patientId;
            }
        },
        watch: {
            //  检测这个变化⚠️发请求
            $route(){
                this.searchFn();
            }
        },
        inject: ['userList_searchFn'],
        data(){
            return {
                //  病人信息
                patientInfo: null,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                //  console.log('病人信息tab-病人id', this.patientId);
                requestPatientSelectOnePatient(this.patientId)
                    .then(v => {
                        const { data } = v;
                        console.log(JSON.parse(JSON.stringify(data)));
                        //  this.patientInfo.patientStatus
                        this.patientInfo = data;
                        //  保存到store里，基础信息、群聊信息 ⚠️这里暂时一个，看够不够了
                        this.setPatientBasicInfo(this.patientInfo);
                    });
            },
            ...mapActions('userList', [
                //  保存病人信息，这是为了给组件用，而不是页面，所以要store
                'setPatientBasicInfo',
            ]),
            //  确认出院
            confirmOutHospital(){
                this.$confirm({
                    title: `确定${this.patientInfo.name}出院`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        console.log(this.patientBasicInfo);
                        this.patientBasicInfo.id = this.patientId;
                        this.patientBasicInfo.patientStatus = 2;
                        requestPatientUpdate(this.patientBasicInfo)
                            .then(v => {
                                console.log(v);
                                this.$success({
                                    title: '保存成功',
                                    onOk: () => {
                                        console.log('更新左侧列表');
                                        this.userList_searchFn();
                                        this.$router.push({ name: 'patientInfo' });
                                    }
                                });
                            });

                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  保存按钮
            handleCheck(){
                const p1 = this.$refs.refPatientBasicInfo.handleSubmit();
                const p2 = this.$refs.refMDTInformation.handleSubmit();
                Promise.all([
                    p1,
                    p2,
                ])
                    .then(v => {
                        console.log('发请求');
//                        //  todo    就诊科室没有数据
//                        this.patientBasicInfo.hospitalTreatment = 1;
//                        //  todo    还有啥叫病区和劳动强度？
//                        this.patientBasicInfo.pla = '1';
//                        this.patientBasicInfo.ward = '传染病区';
//                        //  todo    删除jzbh
//                        delete this.patientBasicInfo.jzbh;
                        this.patientBasicInfo.id = this.patientId;
                        console.log(JSON.stringify(this.patientBasicInfo));
                        console.table(JSON.parse(JSON.stringify(this.patientBasicInfo)));
                        requestPatientUpdate(this.patientBasicInfo)
                            .then(v => {
                                console.log(v);
                                this.$success({
                                    title: '保存成功',
                                    onOk: () => {
                                        console.log('更新左侧列表');
                                        this.userList_searchFn();
                                    }
                                });
                            });
                    })
                    .catch(error => {
                        console.log('有错');
                    });

            },
        }
    };
</script>
