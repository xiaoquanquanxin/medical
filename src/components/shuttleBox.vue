<template>
    <a-transfer
            :data-source="renderOriginList"
            :show-search="true"
            :showSelectAll="true"
            :list-style="{width: '250px',height: '300px',}"
            :operations="['右移动', '左移动']"
            :target-keys="targetKeys"
            :render="item => `${item.title}`"
            @change="handleChange"
            :titles="shuttleBoxBasicData.title"
    >
        <span slot="notFoundContent">暂无数据</span>
        <a-button
                slot="footer"
                slot-scope="props"
                size="small"
                style="float:right;margin: 5px"
                @click="reset(props)"
        >
            重置
        </a-button>
    </a-transfer>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { SHUTTLE_BOX } from '../store/modules/shuttleBox';
    import { requestDiseaseList } from '../api/disease';

    //	穿梭框的基础数据
    export const SHUTTLE_BOX_BASIC_DATA = {};

    //  穿梭框
    export default {
        computed: {
            //  穿梭框类型
            shuttleBoxType(){
                return this.$store.state.shuttleBox.shuttleBoxType;
            },
            //  原始数据
//            originList(){
//                return this.$store.state.shuttleBox.originList;
//            }
        },
        props: ['originList'],
        data(){
            return {
                renderOriginList: [],
                mockData: [],
                targetKeys: [],
                //  请求相关数据
                shuttleBoxBasicData: {},
            };
        },
        created(){
            this.renderOriginList = JSON.parse(JSON.stringify(this.originList));
            this.shuttleBoxBasicData = (() => {
                switch (this.shuttleBoxType) {
                    //	商品列表 - 授权
                    case SHUTTLE_BOX.DIALOG_AUTHORIZATION:
                        return {
                            title: ['渠道商列表', '已选渠道商列表'],
                            //	请求数据
                            requestDataUrl: 'requestDataUrl',
                            //	提交数据
                            submitDataUrl: 'submitDataUrl',
                        };
                    //	医院管理 - 关联科室
                    case SHUTTLE_BOX.RELATED_DEPARTMENTS:
                        return {
                            title: ['科室列表', '已选科室列表'],
                            //	请求数据
                            requestDataUrl: 'requestDataUrl',
                            //	提交数据
                            submitDataUrl: 'submitDataUrl',
                        };

                    //	科室管理 - 关联疾病
                    case SHUTTLE_BOX.ASSOCIATED_DISEASE:
                        return {
                            title: ['疾病列表', '已选疾病列表'],
                            //	提交数据
                            submitDataUrl: 'submitDataUrl',
                        };
                    //	科室管理 - 关联评估调查表
                    case SHUTTLE_BOX.QUESTIONNAIRE:
                        return {
                            title: ['评估调查列表', '已选评估调查列表'],
                            //	请求数据
                            requestDataUrl: 'requestDataUrl',
                            //	提交数据
                            submitDataUrl: 'submitDataUrl',
                        };

                    default:
                        return {};
                }
            })();
        },
        methods: {
            handleChange(targetKeys, direction, moveKeys){
                //  console.log(targetKeys, direction, moveKeys);
                console.log(targetKeys);
                this.targetKeys = targetKeys;
            },
            //  重置
            reset(props){
                console.log('重置');
                console.log(props);
                this.targetKeys = [];
            },

            //  发请求
            handleSubmit(){
                if (this.targetKeys.length) {
                    return Promise.resolve(this.targetKeys);
                }
                this.$message.error('请先选择数据');
                return Promise.reject();
            },
        },
    };
</script>

