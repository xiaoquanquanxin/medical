<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
            <a-button class="basic-button-width" type="primary" v-print="printObj">打印
            </a-button>
            <a-button class="basic-button-width" type="primary" @click="saveScreening" v-if="!screeningDetailId">保存
            </a-button>
            <a-button class="basic-button-width" type="primary" @click="deleteScreening" v-if="screeningDetailId">删除
            </a-button>
        </div>
        <ScreeningBasicInfo/>
        <br>
        <!--营养风险筛查-->
        <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
            <a-space>
                <span>营养风险筛查</span>
                <span class="red" v-if="false">{{totalScore}}分</span>
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
                               :disabled="!!screeningDetailId"
                >
                    <a-radio value="1">是</a-radio>
                    <a-radio value="0">否</a-radio>
                </a-radio-group>
            </div>
        </a-table>
        <br>
        <!--疾病评分：-->
        <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
            <a-space>
                <span>疾病评分：</span>
                <span class="red">{{screeningDetailInfo.diseaseScore}}分</span>
            </a-space>
        </a-row>
        <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
            <div class="radio-group-item-label">
                <div class="" style="text-align: center">疾病评分</div>
            </div>
            <div class="radio-group-item-content">
                <a-checkbox-group @change="riskSelectChange($event)"
                                  v-model="diseaseSelectList"
                                  :disabled="!!screeningDetailId"
                >
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
                <span class="red">{{screeningDetailInfo.nutritionScore }}分</span>
            </a-space>
        </a-row>
        <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
            <div class="radio-group-item-label">
                <div class="" style="text-align: center">营养评分</div>
            </div>
            <div class="radio-group-item-content">
                <a-radio-group v-model="screeningDetailInfo.nutrition" style="width: 100%;"
                               @change="nutritionChange"
                               :disabled="!!screeningDetailId"
                >
                    <ul class="check-group-list">
                        <li class="radio-group-item">
                            <a-radio value="1">3个月体重丢失 > 5%或食物摄入比正常需要量低25% ~ 50%(1分 )</a-radio>
                        </li>
                        <li class="radio-group-item">
                            <a-radio value="2">一般情况差或2个月体重丢失 > 5%或食物摄入比正常需要量低50% ~ 75%(2分 )</a-radio>
                        </li>
                        <li class="radio-group-item">
                            <a-radio value="3">BMI < 18.5，且一般情况差或1个月内体重丢失 > 5%（或3个月体重下降15%）或前1周食物摄入比正常需要量低75% ~
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
                <span class="red">{{screeningDetailInfo.ageScore}}分</span>
            </a-space>
        </a-row>
        <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
            <div class="radio-group-item-label">
                <div class="" style="text-align: center">营养评分</div>
            </div>
            <div class="radio-group-item-content">
                <a-radio-group v-model="screeningDetailInfo.ageOption"
                               style="width: 100%;"
                               :disabled="true"
                >
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
        <div v-show="false">
            <div id="printContent">
                <ScreeningBasicInfo/>
                <br>
                <!--营养风险筛查-->
                <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
                    <a-space>
                        <span>营养风险筛查：</span>
                        <span class="red">{{totalScore}}分</span>
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
                            <a-radio value="1">是</a-radio>
                            <a-radio value="0">否</a-radio>
                        </a-radio-group>
                    </div>
                </a-table>
                <br>
                <!--疾病评分：-->
                <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
                    <a-space>
                        <span>疾病评分：</span>
                        <span class="red">{{screeningDetailInfo.diseaseScore}}分</span>
                    </a-space>
                </a-row>
                <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
                    <div class="radio-group-item-label">
                        <div class="" style="text-align: center">疾病评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-checkbox-group @change="riskSelectChange($event)" v-model="diseaseSelectList">
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
                        <span class="red">{{screeningDetailInfo.nutritionScore }}分</span>
                    </a-space>
                </a-row>
                <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
                    <div class="radio-group-item-label">
                        <div class="" style="text-align: center">营养评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="screeningDetailInfo.nutrition" style="width: 100%;"
                                       @change="nutritionChange">
                            <ul class="check-group-list">
                                <li class="radio-group-item">
                                    <a-radio value="1">3个月体重丢失 > 5%或食物摄入比正常需要量低25% ~ 50%(1分 )</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio value="2">一般情况差或2个月体重丢失 > 5%或食物摄入比正常需要量低50% ~ 75%(2分 )</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio value="3">BMI < 18.5，且一般情况差或1个月内体重丢失 > 5%（或3个月体重下降15%）或前1周食物摄入比正常需要量低75% ~
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
                        <span class="red">{{screeningDetailInfo.ageScore}}分</span>
                    </a-space>
                </a-row>
                <a-row type="flex" justify="space-between" align="middle" style="border: 1px solid #e8e8e8;">
                    <div class="radio-group-item-label">
                        <div class="" style="text-align: center">营养评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="screeningDetailInfo.ageOption"
                                       style="width: 100%;"
                                       :disabled="true"
                        >
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
                <a-descriptions
                        :title="null"
                        bordered
                        :column="3"
                        size="small"
                >
                    <a-descriptions-item label="筛查人">
                        <div class="basic-input-width"></div>
                    </a-descriptions-item>
                    <!--评分日期-->
                    <a-descriptions-item label="评分日期">
                        <div class="add-form-input"></div>
                    </a-descriptions-item>
                </a-descriptions>
            </div>
        </div>
    </div>
</template>
<script>
    import ScreeningBasicInfo from '@/components/userList/screening/screeningBasicInfo.vue';
    import ScreeningBottomInfo from '@/components/userList/screening/screeningBottomInfo.vue';
    import { mapGetters, mapActions } from 'vuex';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestPatientSelectOnePatient } from '../../../api/userList/userList';
    import { requestScreenDelete, requestScreenSave, requestScreenSelectOne } from '../../../api/userList/screening';

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

    export default {
        components: {
            GoBackButton,
            ScreeningBasicInfo,
            ScreeningBottomInfo,
        },
        computed: {
            //  页面参数 - 病人id
            patientId(){
                return this.$route.params.patientId;
            },
            //  详情id
            screeningDetailId(){
                return this.$route.params.screeningDetailId;
            },
            //  计算总分
            totalScore(){
                let { ageScore, diseaseScore, nutritionScore } = this.screeningDetailInfo;
                ageScore = ageScore || 0;
                diseaseScore = diseaseScore || 0;
                nutritionScore = nutritionScore || 0;
                console.log(ageScore, diseaseScore, nutritionScore);
                return +ageScore + +diseaseScore + +nutritionScore;
            },
            //  基础信息，请求来了就会出现数据
            patientBasicInfo(){
                return this.$store.state.userList.patientBasicInfo;
            },
            //  筛查人底部信息
            screenBottomData(){
                //  console.log(this.$store.state.userList.screeningInfo);
                return this.$store.state.userList.screeningInfo.screenBottomData;
            },
            //  登录人信息
            loginInfo(){
                return this.$store.state.login.loginInfo;
            }
        },
        data(){
            const riskData = [
                {
                    key: 1,
                    label: '过去一周摄食是否有减少：',
                    value: '',
                },
                {
                    key: 2,
                    label: '过去三个月体重是否下降：',
                    value: '',
                },
                {
                    key: 3,
                    label: '有严重疾病吗？（如ICU治疗）：',
                    value: '',
                }
            ];
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
                diseaseSelectList: [],
                //  分数表 ，id ： 分数
                diseaseScoreMap: {
                    1: 1,
                    2: 1,
                    3: 2,
                    4: 2,
                    5: 2,
                    6: 2,
                    7: 3,
                    8: 3,
                    9: 3,
                },

                //  整个表单
                screeningDetailInfo: {
                    //
//                    name: '',
                    //
//                    patientId: 0,
                    //  性别
//                    sex: '',
                    //  总评分，大于3分则为有风险，小于等于3分则为无风险 ,示例值(3)
                    totalScore: 0,

//                    //  过去一周摄食是否有减少,单选，选中第一项则用1来表示第一项被选中 ,示例值(1)
//                    food: '1',
//                    //  过去三个月体重是否下降,单选，选中第一项则用1来表示第一项被选中 ,示例值(1)
//                    lose: '1',
//                    //  有严重疾病吗？（如ICU治疗）,单选，选中第一项则用1来表示第一项被选中 ,示例值(1)
//                    icu: '1',

                    //  疾病选项：多选，如第一，第三项被勾选，其他没有被勾选，则为1,3格式 ,示例值(1,3)
                    disease: '',
                    //  疾病分数，多选项情况，分数取选中的最大值 ,示例值(2)
                    diseaseScore: '0',

                    //  营养选项： 单选，选中第一项则用1来表示第一项被选中 ,示例值(1)
                    nutrition: '0',
                    //  营养分数 ,示例值(3)
                    nutritionScore: '0',

                    //  年龄选项： 单选，选中第一项则用1来表示第一项被选中 ,示例值(1)
                    ageOption: '1',
                    //  年龄评分 ,示例值(1)
                    ageScore: '0',
                }
            };
        },
        created(){
            //  相当于初始化
            this.nutritionChange();
            this.calcDiseaseScore();
            this.searchFn();
        },
        methods: {
            ...mapActions('userList', [
                //  保存病人信息，这是为了给组件用，而不是页面，所以要store
                'setScreeningInfo',
                //  保存病人信息，这是为了给组件用，而不是页面，所以要store
                'setPatientBasicInfo',
            ]),
            searchFn(){
                //  重置头部信息
                this.setScreeningInfo({ screeningBasicInfo: [] });
                //  发请求
                console.log('病人id', this.patientId);
                console.log('详情id ,有详情id的是编辑', this.screeningDetailId);
                requestPatientSelectOnePatient(this.patientId)
                    .then(v => {
                        const { data } = v;
                        this.setPatientBasicInfo(data);
                        const screeningBasicInfo = [{
                            key: 1,
                            a: `姓名：${data.name}`,
                            b: `性别：${data.sex === 1 ? '男' : '女'}`,
                            c: `年龄：${data.birth}`,
                            d: `身高：${data.height}cm`,
                            e: `现体重：${data.weight}kg`,
                            f: `BMI(kg/m2)：${data.bmi}`,
                        }];
                        console.log(this.loginInfo.username);
                        const screenBottomData = {};
                        //  如果是新增
                        if (!this.screeningDetailId) {
                            this.setScreeningInfo({
                                //  设置基础信息
                                screeningBasicInfo,
                                //  设置底部信息
                                screenBottomData,
                            });
                            const ageOption = this.patientBasicInfo.birth >= 70;
                            this.screeningDetailInfo.ageOption = ageOption ? 1 : 2;
                            this.screeningDetailInfo.ageScore = ageOption ? 1 : 0;
                            return;
                        }
                        //  如果是编辑
                        requestScreenSelectOne(this.screeningDetailId)
                            .then(v => {
                                this.screeningDetailInfo = v.data;
                                const ageOption = this.patientBasicInfo.birth >= 70;
                                this.screeningDetailInfo.ageOption = ageOption ? 1 : 2;
                                this.screeningDetailInfo.ageScore = ageOption ? 1 : 0;
                                this.riskData[0].value = this.screeningDetailInfo.food;
                                this.riskData[1].value = this.screeningDetailInfo.lose;
                                this.riskData[2].value = this.screeningDetailInfo.icu;
                                console.log(this.riskData);
                                this.nutritionChange();
                                this.calcDiseaseScore();
                                //console.log(JSON.parse(JSON.stringify(v.data)));
                                console.log(v.data.ctime);
                                //  如果有处方时间
                                const { ctime } = v.data;
                                const { username } = this.loginInfo;
                                const screenBottomData = {
                                    username,
                                    ctime,
                                };
                                this.setScreeningInfo({
                                    //  设置基础信息
                                    screeningBasicInfo,
                                    //  设置底部信息
                                    screenBottomData,
                                });
                            });
                    });
            },
            //  疾病评分 选中的数据
            riskSelectChange(diseaseSelectList){
                console.log('selectedRowKeys changed: ', diseaseSelectList);
                this.diseaseSelectList = diseaseSelectList;
                this.screeningDetailInfo.disease = diseaseSelectList.join(',');
                this.calcDiseaseScore();
            },
            //  计算疾病分数
            calcDiseaseScore(){
                this.diseaseSelectList = this.screeningDetailInfo.disease.split(',');
                let maxScore = 0;
                this.diseaseSelectList.forEach(item => {
                    const score = this.diseaseScoreMap[item];
                    if (score > maxScore) {
                        maxScore = score;
                    }
                });
                this.screeningDetailInfo.diseaseScore = maxScore;
            },

            //  营养评分变化
            nutritionChange(){
                const map = { 1: 1, 2: 2, 3: 3 };
                this.screeningDetailInfo.nutritionScore = map[this.screeningDetailInfo.nutrition] || 0;
            },
            //  删除
            deleteScreening(){
                console.log(this.screeningDetailId);
                this.$confirm({
                    title: `确定删除${this.screeningDetailId}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        requestScreenDelete(this.screeningDetailId)
                            .then(v => {
                                console.log('删除成功');
                                console.log(v);
                                this.$router.push({ name: 'screening', params: { patientId: this.patientId } });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },

            //  保存
            saveScreening(){
                console.log(this.screenBottomData);
                //  底部评分数据
                const screenBottomData = this.screenBottomData[0];
                let ctime;
                if (screenBottomData) {
                    ctime = `${screenBottomData.c} ${screenBottomData.e}`;
                }

                console.log('保存');
                //  如果是编辑
                if (this.screeningDetailId) {
                    this.$router.push({ name: 'userList' });
                    return;
                }
                const screeningDetailInfo = this.screeningDetailInfo;
                const riskData = this.riskData;
                screeningDetailInfo.food = riskData[0].value;
                screeningDetailInfo.lose = riskData[1].value;
                screeningDetailInfo.icu = riskData[2].value;
                screeningDetailInfo.patientId = this.patientId;
                screeningDetailInfo.totalScore = this.totalScore;
                screeningDetailInfo.ctime = ctime;
                console.log(JSON.parse(JSON.stringify(screeningDetailInfo)));
                requestScreenSave(screeningDetailInfo)
                    .then(v => {
                        console.log(v);
                        this.$router.push({ name: 'screening', params: { patientId: this.patientId } });
                    });

            },
        }
    };
</script>
<style>
    @import "~@/css/custom.css";
</style>