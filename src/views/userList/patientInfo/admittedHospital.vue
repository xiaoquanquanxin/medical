<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
            <a-button type="primary" @click="handleCheck">保存</a-button>
        </div>
        <PatientBasicInfo ref="refPatientBasicInfo"/>
    </div>
</template>
<script>
    import PatientBasicInfo from '@/components/userList/patientInfo/patientBasicInfo.vue';
    import { mapGetters, mapActions } from 'vuex';
    import GoBackButton from '@/components/goBackButton.vue';
    import {
        requestPatientSave,
        requestPatientSelectOnePatient,
        requestPatientUpdate
    } from '../../../api/userList/userList';

    export default {
        components: {
            GoBackButton,
            PatientBasicInfo,
        },
        computed: {
            //  基础信息，请求来了就会出现数据
            patientBasicInfo(){
                const { patientBasicInfo } = this.$store.state.userList;
                return patientBasicInfo;
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
                        console.log(JSON.parse(JSON.stringify(data)));
                        //  保存到store里，基础信息、群聊信息 ⚠️这里暂时一个，看够不够了
                        this.setPatientBasicInfo(data);
                    });
            },
            //  新增病人保存
            handleCheck(){
                this.$refs.refPatientBasicInfo
                    .handleSubmit()
                    .then(v => {
                        //  新增入院所以是1    1入院，2.出院，3.永久注销;
                        const data = Object.assign({}, this.patientBasicInfo, { patientStatus: '1' });
                        //  console.log(this.patientBasicInfo);
                        console.log(data);
                        //  如果是新增
                        if (!this.patientId) {
                            requestPatientSave(data)
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
                        data.id = this.patientId;
                        requestPatientUpdate(data)
                            .then(v => {
                                console.log(v);
                                this.$success({
                                    title: '保存成功',
                                });
                                this.$router.push({ name: 'patientInfo' });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        console.log('有错');
                    });

            },
        }
    };
</script>