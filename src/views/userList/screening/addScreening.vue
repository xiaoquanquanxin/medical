<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
            <a-button class="basic-button-width" type="primary" v-print="printObj">打印</a-button>
            <a-button class="basic-button-width" type="primary" @click="saveScreening">保存</a-button>
        </div>
        <div id="printContent">
            <ScreeningBasicInfo/>
            <br>
            <!--营养风险筛查-->
            <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
                <a-space>
                    <span>营养风险筛查：</span>
                    <span class="red">{{riskScreeningScore}}分</span>
                </a-space>
            </a-row>
            <a-table
                    :columns="riskColumns"
                    :data-source="riskData"
                    :pagination="false"
                    :showHeader="false"
                    bordered
            >
                <div slot="operation"
                     slot-scope="scope,sItem,sIndex,extra"
                >
                    <a-radio-group style="display: block;"
                                   v-model="scope.value"
                    >
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>
                    </a-radio-group>
                </div>
            </a-table>
            <br>
            <!--疾病评分：-->
            <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
                <a-space>
                    <span>疾病评分：</span>
                    <span class="red">{{riskScreeningScore}}分</span>
                </a-space>
            </a-row>
            <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
                <div class="radio-group-item-label">
                    <div class="" style="text-align: center">疾病评分</div>
                </div>
                <div class="radio-group-item-content">
                    <a-checkbox-group @change="riskSelectChange">
                        <ul class="check-group-list">
                            <li class="radio-group-item">
                                <a-checkbox value="1">髋骨折 (1分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="2">慢性疾病急性发作或有并发症者（如肝硬化、COPD、血液透析、糖尿病、恶性肿瘤）(1分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="3">腹部大手术 (2分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="4">脑卒中 (2分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="5">重度肺炎(2分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="6">血液恶性肿瘤(2分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="7">颅脑损伤(3分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="8">骨髓移植(3分 )</a-checkbox>
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox value="9">大于APACHE10分的ICU患者(3分 )</a-checkbox>
                            </li>
                        </ul>
                    </a-checkbox-group>
                </div>
            </a-row>
            <br>
            <!--营养评分-->
            <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
                <a-space>
                    <span>营养评分：</span>
                    <span class="red">{{riskScreeningScore}}分</span>
                </a-space>
            </a-row>
            <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
                <div class="radio-group-item-label">
                    <div class="" style="text-align: center">营养评分</div>
                </div>
                <div class="radio-group-item-content">
                    <a-radio-group v-model="nutritionScore" style="width: 100%;">
                        <ul class="check-group-list">
                            <li class="radio-group-item">
                                <a-radio :value="1">3个月体重丢失 > 5%或食物摄入比正常需要量低25% ~ 50%(1分 )</a-radio>
                            </li>
                            <li class="radio-group-item">
                                <a-radio :value="2">一般情况差或2个月体重丢失 > 5%或食物摄入比正常需要量低50% ~ 75%(2分 )</a-radio>
                            </li>
                            <li class="radio-group-item">
                                <a-radio :value="3">BMI < 18.5，且一般情况差或1个月内体重丢失 > 5%（或3个月体重下降15%）或前1周食物摄入比正常需要量低75% ~
                                    100%(3分 )
                                </a-radio>
                            </li>
                        </ul>
                    </a-radio-group>
                </div>
            </a-row>
            <br>
            <!--年龄评分-->
            <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
                <a-space>
                    <span>年龄评分：</span>
                    <span class="red">{{riskScreeningScore}}分</span>
                </a-space>
            </a-row>
            <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
                <div class="radio-group-item-label">
                    <div class="" style="text-align: center">营养评分</div>
                </div>
                <div class="radio-group-item-content">
                    <a-radio-group v-model="ageScore" style="width: 100%;">
                        <ul class="check-group-list">
                            <li class="radio-group-item">
                                <a-radio :value="1">年龄 >= 70(1分 )</a-radio>
                            </li>
                            <li class="radio-group-item">
                                <a-radio :value="2">年龄 < 70岁(0分 )</a-radio>
                            </li>
                        </ul>
                    </a-radio-group>
                </div>
            </a-row>
            <br>
            <ScreeningBottomInfo/>
        </div>
    </div>
</template>
<script>
    import ScreeningBasicInfo from '@/components/userList/screening/screeningBasicInfo.vue';
    import ScreeningBottomInfo from '@/components/userList/screening/screeningBottomInfo.vue';
    import { mapGetters, mapActions } from 'vuex';    import GoBackButton from '@/components/goBackButton.vue';

    //  风险筛查列
    const riskColumns = [
        {
            dataIndex: 'label',
            align: 'right',
            width: 250,
        },
        {
            scopedSlots: { customRender: 'operation' }
        }
    ];
    const riskData = [
        {
            key: 1,
            label: '过去一周摄食是否有减少：',
            value: 1,
        },
        {
            key: 2,
            label: '过去三个月体重是否下降：',
            value: 1,
        },
        {
            key: 3,
            label: '有严重疾病吗？（如ICU治疗）：',
            value: 1,
        }
    ];

    export default {
        components: {
            GoBackButton,
            ScreeningBasicInfo,
            ScreeningBottomInfo,
        },
        computed: {
            //  页面参数 - 病人id
            patientInfoId(){
                return this.$route.params.patientInfoId;
            },
            //  详情id
            screeningDetailId(){
                return this.$route.params.screeningDetailId;
            },
            //  风险筛查分数
            riskScreeningScore(){
                if (!this.riskData || !this.riskData.length) {
                    return 0;
                }
                return this.riskData.reduce((a, b) => {
                    return a + b.value;
                }, 0);
            },
        },
        data(){
            return {
                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '新增营养风险筛查',
                },
                //  风险表
                riskColumns,
                riskData,

                //  疾病评分 被选中的数据
                riskSelectedList: [],

                //  营养评分
                nutritionScore: 1,
                //  年龄评分
                ageScore: 1,
            };
        },
        watch: {
            //  营养评分
            nutritionScore(value){
                console.log('营养评分', value);
            },
            //  年龄评分
            ageScore(value){
                console.log('年龄评分', value);
            }
        },
        created(){
            setTimeout(() => {
                this.getScreeningInfo();
            }, 20);
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
            ...mapActions('userList', [
                //  保存病人信息，这是为了给组件用，而不是页面，所以要store
                'setScreeningInfo',
            ]),
            getScreeningInfo(){
                //  发请求
                console.log('病人id', this.patientInfoId);
                console.log('详情id ,有详情id的是编辑', this.screeningDetailId);
                const screeningBasicInfo = [{
                    key: 1,
                    a: '姓名：小飞',
                    b: '性别：男',
                    c: '年龄：30',
                    d: '身高：312cm',
                    e: '现体重：32kg',
                    f: 'BMI(kg/m2)：322',
                }];
                const screenBottomData = [
                    {
                        key: 1,
                        a: '筛查人：',
                        c: '日期',
                        e: '时间'
                    }
                ];
                this.setScreeningInfo({
                    //  设置基础信息
                    screeningBasicInfo,
                    //  设置底部信息
                    screenBottomData,
                });

            },
            //  保存
            saveScreening(){
                console.log('保存');
            },
            //  疾病评分 选中的数据
            riskSelectChange(riskSelectedList){
                console.log('selectedRowKeys changed: ', riskSelectedList);
                this.riskSelectedList = riskSelectedList;
            },

        }
    };
</script>
<style>
    @import "~@/css/custom.css";
</style>