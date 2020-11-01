<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
            <a-button type="primary" @click="handleCheck">保存</a-button>
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
    import GoBackButton from '@/components/goBackButton.vue';
    import {
        requestPatientSave,
        requestPatientSelectOnePatient,
        requestPatientUpdate
    } from '../../../api/userList/userList';
    import { calcAgeByBirth } from '../../../utils/common';

    export default {
        components: {
            GoBackButton,
            MDTInformation,
            PatientBasicInfo,
        },
        computed: {
            //  基础信息，请求来了就会出现数据
            patientBasicInfo(){
                const patientBasicInfo = this.$store.state.userList.patientBasicInfo;
                //  console.log(patientBasicInfo);
                return this.$store.state.userList.patientBasicInfo;
            },
        },
        watch: {
            //  检测这个变化⚠️发请求
            $route(value){
                console.log(value);
            }
        },
        data(){
            return {
                //  如果有就是编辑
                patientId: this.$route.params.patientId,
            };
        },
        created(){
            console.log('是编辑？', !!this.patientId);
            this.setPatientBasicInfo(null);
            this.searchFn();
        },
        methods: {
            ...mapActions('userList', [
                //  保存病人信息
                'setPatientBasicInfo',
            ]),
            //  获取病人信息数据
            searchFn(){
                //  如果是添加，清空 保存病人信息
                if (!this.patientId) {
                    return;
                }
                //  如果是编辑，重新拉一次数据
                requestPatientSelectOnePatient(this.patientId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        this.patientInfo = data;
                        //  保存到store里，基础信息、群聊信息 ⚠️这里暂时一个，看够不够了
                        this.setPatientBasicInfo(this.patientInfo);
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
                        console.log(JSON.stringify(this.patientBasicInfo));
                        console.table(JSON.parse(JSON.stringify(this.patientBasicInfo)));
                        //  如果是新增
                        if (!this.patientId) {
                            requestPatientSave(this.patientBasicInfo)
                                .then(v => {
                                    console.log(v);
                                    this.$success({
                                        title: '保存成功',
                                    });
                                    this.$router.push({ name: 'userList' });
                                });
                            return;
                        }
                        //  如果是编辑
                        this.patientBasicInfo.id = this.patientId;
                        requestPatientUpdate(this.patientBasicInfo)
                            .then(v => {
                                console.log(v);
                                this.$success({
                                    title: '保存成功',
                                });
                                this.$router.push({ name: 'patientInfo' });
                            });
                    })
                    .catch(error => {
                        console.log('有错');
                    });

            },
        }
    };
</script>