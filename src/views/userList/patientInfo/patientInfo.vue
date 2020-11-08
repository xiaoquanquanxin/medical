<template>
    <div class="layout-content-inner-main patient-basic-info-like-wrap">
        <!--头部信息-->
        <div class="a-input-group" data-msg="空"></div>
        <div class="a-input-group">
            <a-row type="flex" justify="space-between" align="middle">
                <a-col v-if="patientBasicInfo">
                    <a-button type="primary" @click="confirmOutHospital"
                              v-if="patientBasicInfo.patientStatus == 1"
                    >确认出院
                    </a-button>
                    <router-link :to="{name:'admittedHospital',params:{patientId}}"
                                 v-if="patientBasicInfo.patientStatus == 2"
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
        <div class="patient-basic-info-like" style="height: calc(100% - 20px);">
            <PatientBasicInfo ref="refPatientBasicInfo"/>
        </div>
    </div>
</template>
<script>
    import PatientBasicInfo from '@/components/userList/patientInfo/patientBasicInfo.vue';
    import { requestPatientUpdate } from '../../../api/userList/userList';
    import { getLoginInfo } from '../../../utils/auth';

    export default {
        components: {
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
        inject: ['userList_searchFn'],
        data(){
            return {};
        },
        methods: {
            //  确认出院
            confirmOutHospital(){
                this.$confirm({
                    title: `确定${this.patientBasicInfo.name}出院`,
                    okText: '确认',
                    cancelText: '取消',
                    class: 'out-of-hospital-info',
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
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  修改病人保存
            handleCheck(){
                this.$refs.refPatientBasicInfo
                    .handleSubmit()
                    .then(v => {
                        console.log('发请求');
                        requestPatientUpdate(Object.assign({ id: this.patientId }, this.patientBasicInfo))
                            .then(v => {
                                console.log(v);
                                this.$success({
                                    title: '保存成功',
                                    onOk: () => {
                                        console.log('更新左侧列表');
                                        const { doctorId } = this.patientBasicInfo;
                                        const loginInfo = getLoginInfo();
                                        const p = this.userList_searchFn();
                                        //  如果没有更新病人的医生，那么保持在这个页面，左侧的列表刷新完了就行了
                                        if (loginInfo.doctorId === doctorId) {
                                            return;
                                        }
                                        p.then(v => {
                                            //  这是换了医生了，所以要刷新路由
                                            console.log(loginInfo.doctorId);
                                            this.$router.push({ name: 'userList', params: {} });
                                        });
                                    }
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                this.$message.error('操作失败');
                            });
                    })
                    .catch(error => {
                        console.log('有错');
                    });

            },

        }
    };
</script>
<style scoped>
    .out-of-hospital-info .ant-modal {
        top: 260px;
    }
</style>