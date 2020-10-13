<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <a-space>
                <a-button type="primary" v-print="printObj">打印</a-button>
                <a-button type="primary" @click="saveScreening">保存</a-button>
                <a-button type="primary" @click="deleteScreening">删除</a-button>
            </a-space>
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
                <div style="width:250px;">
                    <div class="" style="text-align: center">疾病评分</div>
                </div>
                <div style="width:calc(100% - 250px);border-left: 1px solid #e8e8e8;">
                    <a-checkbox-group @change="riskSelectChange">
                        <ul class="check-group-list">
                            <li class="check-group-item">
                                <a-checkbox value="1">髋骨折 (1分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
                                <a-checkbox value="2">慢性疾病急性发作或有并发症者（如肝硬化、COPD、血液透析、糖尿病、恶性肿瘤）(1分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
                                <a-checkbox value="3">腹部大手术 (2分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
                                <a-checkbox value="4">脑卒中 (2分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
                                <a-checkbox value="5">重度肺炎(2分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
                                <a-checkbox value="6">血液恶性肿瘤(2分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
                                <a-checkbox value="7">颅脑损伤(3分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
                                <a-checkbox value="8">骨髓移植(3分 )</a-checkbox>
                            </li>
                            <li class="check-group-item">
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
                <div style="width:250px;">
                    <div class="" style="text-align: center">营养评分</div>
                </div>
                <div style="width:calc(100% - 250px);border-left: 1px solid #e8e8e8;">
                    <a-radio-group v-model="nutritionScore" style="width: 100%;">
                        <ul class="check-group-list">
                            <li class="check-group-item">
                                <a-radio :value="1">3个月体重丢失 > 5%或食物摄入比正常需要量低25% ~ 50%(1分 )</a-radio>
                            </li>
                            <li class="check-group-item">
                                <a-radio :value="2">一般情况差或2个月体重丢失 > 5%或食物摄入比正常需要量低50% ~ 75%(2分 )</a-radio>
                            </li>
                            <li class="check-group-item">
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
                <div style="width:250px;">
                    <div class="" style="text-align: center">营养评分</div>
                </div>
                <div style="width:calc(100% - 250px);border-left: 1px solid #e8e8e8;">
                    <a-radio-group v-model="ageScore" style="width: 100%;">
                        <ul class="check-group-list">
                            <li class="check-group-item">
                                <a-radio :value="1">年龄 >= 70(1分 )</a-radio>
                            </li>
                            <li class="check-group-item">
                                <a-radio :value="2">年龄 < 70岁(0分 )</a-radio>
                            </li>
                        </ul>
                    </a-radio-group>
                </div>
            </a-row>
            <br>
            <!--筛查人：许晓飞-->
            <!--            <a-row type="flex" justify="start" align="middle" class="add-screening-bottom">-->
            <!--                <a-col class="add-screening-bottom-item">-->
            <!--                    <a-input addon-before="筛查人：" placeholder="请输入筛查人"/>-->
            <!--                </a-col>-->
            <!--                <a-col class="add-screening-bottom-item">-->
            <!--                    <a-date-picker-->
            <!--                            addon-before="选择日期："-->
            <!--                            placeholder="请选择日期"-->
            <!--                            @change="onDateChange"-->
            <!--                    />-->
            <!--                    <a-time-picker addon-before="选择时间："-->
            <!--                                   v-model="selectTimeMoment"-->
            <!--                                   @change="selectTimeChange"-->
            <!--                                   format="HH:mm"/>-->
            <!--                </a-col>-->
            <!--            </a-row>-->
            <a-table
                    :columns="screenBottomColumns"
                    :data-source="screenBottomData"
                    :pagination="false"
                    :showHeader="false"
                    bordered
            >
                <div slot="screeningPeople" slot-scope="scope,sItem,sIndex,extra">
                    <a-input placeholder="请输入筛查人"/>
                </div>
                <div slot="date" slot-scope="scope,sItem,sIndex,extra">
                    <a-date-picker
                            addon-before="选择日期："
                            placeholder="请选择日期"
                            @change="onDateChange"
                    />
                </div>
                <div slot="time" slot-scope="scope,sItem,sIndex,extra">
                    <a-time-picker addon-before="选择时间："
                                   v-model="selectTimeMoment"
                                   @change="selectTimeChange"
                                   format="HH:mm"/>
                </div>
            </a-table>
        </div>
    </div>
</template>
<script>
    import ScreeningBasicInfo from '@/components/userList/screening/screeningBasicInfo.vue';
    import { mapGetters, mapActions } from 'vuex';

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
            value: null,
        },
        {
            key: 2,
            label: '过去三个月体重是否下降：',
            value: null,
        },
        {
            key: 3,
            label: '有严重疾病吗？（如ICU治疗）：',
            value: null,
        }
    ];

    //  底部信息
    const screenBottomColumns = [
        {
            dataIndex: 'a',
        },
        {
            dataIndex: 'b',
            scopedSlots: { customRender: 'screeningPeople' },
        },
        {
            dataIndex: 'c',
        },
        {
            dataIndex: 'd',
            scopedSlots: { customRender: 'date' }
        },
        {
            dataIndex: 'e',
        },
        {
            dataIndex: 'f',
            scopedSlots: { customRender: 'time' }
        },
    ];
    const screenBottomData = [
        {
            key: 1,
            a: '筛查人：',
            c: '日期',
            e: '时间'
        }
    ];
    export default {
        components: {
            ScreeningBasicInfo,
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

                //  选择时间的值的对象
                selectTimeMoment: null,
                //  选择时间的值
                selectTimeValue: null,

                //  底部信息
                screenBottomColumns,
                screenBottomData,
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
        methods: {
            ...mapActions('userList', [
                //  保存病人信息，这是为了给组件用，而不是页面，所以要store
                'setScreeningInfo',
            ]),
            getScreeningInfo(){
                //  发请求
                console.log('病人id', this.patientInfoId);
                console.log('详情id ,有详情id的是编辑', this.screeningDetailId);
                const data = [{
                    key: 1,
                    a: '姓名：小飞',
                    b: '性别：男',
                    c: '年龄：30',
                    d: '身高：312cm',
                    e: '现体重：32kg',
                    f: 'BMI(kg/m2)：322',
                }];
                this.setScreeningInfo({
                    screeningBasicInfo: data,
                });
            },
            //  保存
            saveScreening(){
                console.log('保存');
            },
            //  删除
            deleteScreening(){
                this.$confirm({
                    title: `确定删除${212}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  疾病评分 选中的数据
            riskSelectChange(riskSelectedList){
                console.log('selectedRowKeys changed: ', riskSelectedList);
                this.riskSelectedList = riskSelectedList;
            },

            //  选择过期日期
            onDateChange(value, selectDateValue){
                console.log(selectDateValue);
            },
            //  选择时间的变换
            selectTimeChange(value, selectTimeValue){
                this.selectTimeValue = selectTimeValue;
            },
        }
    };
</script>
<style>
    /*li*/
    .check-group-item {
        padding: 8px 16px;
        border-bottom: 1px solid #e8e8e8;
    }
    
    /*最后的li没有border-bottom*/
    .check-group-item:last-child {
        border-bottom: none;
    }
    
    /*底部*/
    .add-screening-bottom {
        border: 1px solid #e8e8e8;
    }
    
    /*底部每一项*/
    .add-screening-bottom-item {
        padding: 16px;
        border-right: 1px solid #e8e8e8;
    }
    
    .add-screening-bottom-item:last-child {
        border-right: none
    }
</style>