<template>
    <a-transfer
            :data-source="mockData"
            :show-search="true"
            :showSelectAll="true"
            :list-style="{width: '250px',height: '300px',}"
            :operations="['右移动', '左移动']"
            :target-keys="targetKeys"
            :render="item => `${item.title}-${item.description}`"
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

    //	穿梭框的基础数据
    export const SHUTTLE_BOX_BASIC_DATA = {};

    //  穿梭框
    export default {
        computed: {
            //  穿梭框类型
            shuttleBoxType(){
                return this.$store.state.shuttleBox.shuttleBoxType;
            },
        },
        data(){
            return {
                mockData: [],
                targetKeys: [],
                //  请求相关数据
                shuttleBoxBasicData: {},
            };
        },
        created(){
            //  console.log(SHUTTLE_BOX_BASIC_DATA);
            //  console.log(this.shuttleBoxType);
            //  console.log(this.shuttleBoxBasicData);
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
                            //	请求数据
                            requestDataUrl: 'requestDataUrl',
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
            this.handleSubmit = this.handleSubmit.bind(this);
            this.getMock();
            console.log('mounted🍉，发请求', '类型是', this.shuttleBoxType);
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
            getMock(props){
                //  console.log(props);
                const targetKeys = [];
                const mockData = [];
                for (let i = 0; i < 20; i++) {
                    const data = {
                        key: i.toString(),
                        title: `渠道商${i + 1}`,
                        description: `渠道商${i + 1}`,
                        chosen: Math.random() * 2 > 1,
                    };
                    if (data.chosen) {
                        targetKeys.push(data.key);
                    }
                    mockData.push(data);
                }
                this.mockData = mockData;
                //  this.targetKeys = targetKeys;
            },
            handleChange(targetKeys, direction, moveKeys){
                //  console.log(targetKeys, direction, moveKeys);
                console.log(targetKeys);
                this.targetKeys = targetKeys;
            },
            //  重置
            reset(props){
                console.log('重置');
                console.log(props);
                console.log(props.dataSource);
                this.targetKeys = [];
            },

            //  发请求
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.targetKeys);
                    resolve();
                }))
                    .then(v => {
                        return new Promise(((resolve, reject) => {
                            console.log('发请求吧');
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }));
                    });
            },
        },
    };
</script>

