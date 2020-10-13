<template>
    <div class="layout-content-inner-main">
        <div class="a-input-group">
            <a-space>
                <a-button type="primary" v-print="printObj">打印</a-button>
                <a-button type="primary" @click="saveScreening">保存</a-button>
                <a-select
                        style="width: 200px;"
                        placeholder="请选择主管医生"
                        v-model="tableTypeSelect"
                >
                    <a-select-option :value="1">微型营养评价表</a-select-option>
                    <a-select-option :value="2">一般评估表</a-select-option>
                    <a-select-option :value="3">PG - SGA主观营养状况评估</a-select-option>
                </a-select>
            </a-space>
        </div>
        <div id="printContent">
            <ScreeningBasicInfo/>
            <br>
            <div class="table-flex-title table-group-title no-border-bottom">
                <div style="width: 201px;">名称</div>
                <div>评订内容</div>
            </div>
            <!--微型营养评价表-->
            <div v-if="tableTypeSelect === 1">
                <!--1-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>1、 既往3个月内，是否因食欲下降、咀嚼或吞咽等消化问题导致食物摄入减少？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[0]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">严重的食欲减退</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">中等程度食欲减退</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">食欲减退</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--2-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>2、 最近三个月内体重是否减轻</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[1]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">体重减轻超过3千克</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">不清楚</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">体重减轻1 ~ 3kg</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="4">无体重下降</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--3-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>3、活动情况如何</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[2]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">卧床或长期坐着</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">能离床或椅子，但不能外出</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">能独立外出</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--4-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>4、在过去3个月内是否受过心里创伤或x患急性疾病？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[3]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--5-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>5、是否有神经心理问题</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[4]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">严重痴呆或抑郁</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">轻度痴呆</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">无心里问题</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--6-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>6、BMI（kg/m2）是多少</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[5]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">小于19</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">19 - 21</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">21 - 23</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">大于或等于23</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--7-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>7、是独立生活吗（不住在养老机构或医院）？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[6]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--8-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>8、每日应用处方药超过三种？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[7]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--9-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>9、有压力性疼痛或皮肤性溃疡吗？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[8]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--10-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>10、患者每日完成几餐？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[9]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">1餐</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">2餐</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">3餐</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--11-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>11、每日至少一份奶制品（牛奶、奶酪、酸奶）？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[10]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--12-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>12、每周2 - 3份豆制品或鸡蛋</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[11]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--13-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>13、每日吃肉、鱼或家禽</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[12]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--14-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>14、每日能吃2份以上的水果或蔬菜吗？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[13]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">是</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">否</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--15-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>15、每日喝多少杯液体（水、果汁、咖啡、茶、奶等）？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[14]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">小于3杯</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">3 ~ 5杯</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">大于5杯</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--16-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>16、喂养方式</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[15]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">无法独立进食</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">独立进食稍有困难</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">完全独立进食</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--17-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>17、对营养状态的自我评价如何？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[16]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">营养不良</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">不能确定</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">营养良好</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--18-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>18、与同龄人相比，你如何评价自己的健康状况？</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[17]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">不太好</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">不知道</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">一样好</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="4">更好</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--19-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>19、中臀围（AMC）是多少cm</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[18]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">小于21</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">21 ~ 22</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">大于等于22</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--20-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>20、排肠肌围（cc）是多少？cm</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeOneList[19]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">小于31</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">大于等于31</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
            </div>
            <!--一般评估表-->
            <div v-if="tableTypeSelect === 2">
                <!--1-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>1、精神状况</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeTwoList[0]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">饱满（0分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">一般（1分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">差（2分）</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--2-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>2、 进食途径</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeTwoList[1]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">经口（0分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">鼻胃管（1分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">鼻肠管（2分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="4">禁食（3分）</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--3-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>3、大便次数</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeTwoList[2]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">1 ~ 2次/每日（0分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">2 ~ 3天1次（1分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">3次及以上/每日（2分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="4">常年便秘，需要通便药物（3分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="5">1周1次（4分）</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--4-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>4、大便形状</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeTwoList[3]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">呈球状（2分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">呈水状（2分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">呈泥状（2分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="4">呈半链状（1分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="5">呈块状（1分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="6">呈香蕉状（0分）</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
                <!--5-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>5、腹痛、胀痛（可多选）</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-checkbox-group v-model="typeTwoList[4]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-checkbox :value="1">腹胀（1分）</a-checkbox>
                                </li>
                                <li class="radio-group-item">
                                    <a-checkbox :value="2">腹痛（2分）</a-checkbox>
                                </li>
                                <li class="radio-group-item">
                                    <a-checkbox :value="3">无（0分）</a-checkbox>
                                </li>
                            </ul>
                        </a-checkbox-group>
                    </div>
                </a-row>
                <!--6-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div>6、膳食调查</div>
                    </div>
                    <div class="radio-group-item-content">
                        <a-radio-group v-model="typeTwoList[5]" class="radio-group">
                            <ul class="radio-group-list">
                                <li class="radio-group-item">
                                    <a-radio :value="1">一天只能喝点纯液体的流食（4分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="2">一天喝三晚粥、烂面条或半流食，吃一点小菜，偶尔吃个鸡蛋、喝点奶，基本不吃肉（3分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="3">一天吃一餐比较正常的饮食，常在早餐或中餐，其他两餐仍然是以稀粥为主的半流食，有时能是1两肉、1个鸡蛋（2分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="4">一天可以吃两餐比较正常的饮食，会有一餐半流食或流食，肉在1 ~ 2两，少油脂（1分）</a-radio>
                                </li>
                                <li class="radio-group-item">
                                    <a-radio :value="5">一天三餐基本正常，可以吃到5 ~ 6两主食，3两肉及相应的油脂，1个鸡蛋，奶及加餐水果（0分）</a-radio>
                                </li>
                            </ul>
                        </a-radio-group>
                    </div>
                </a-row>
            </div>
            <!--PG - SGA主观营养状况评估-->
            <div v-if="tableTypeSelect === 3">
                <!--1-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div class="text-align-center">体重评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <ul class="radio-group-list">
                            <li class="radio-group-item">
                                <a-space>
                                    <span>目前患者的体重约为</span>
                                    <a-input placeholder="目前患者的体重约为"/>
                                    <span>kg</span>
                                </a-space>
                            </li>
                            <li class="radio-group-item">
                                <a-space>
                                    <span>目前患者的身高约为</span>
                                    <a-input placeholder="目前患者的身高约为"/>
                                    <span>cm</span>
                                </a-space>
                            </li>
                            <li class="radio-group-item">
                                <a-space>
                                    <span>一个月前患者的体重约为</span>
                                    <a-input placeholder="一个月前患者的体重约为"/>
                                    <span>kg</span>
                                </a-space>
                            </li>
                            <li class="radio-group-item">
                                <a-space>
                                    <span>六个月前患者的体重约为</span>
                                    <a-input placeholder="六个月前患者的体重约为"/>
                                    <span>cm</span>
                                </a-space>
                            </li>
                            <li class="radio-group-item">
                                <a-space>
                                    <span>在过去的两周，患者的体重</span>
                                    <a-radio-group name="radioGroup">
                                        <a-radio :value="1">减少（1分）</a-radio>
                                        <a-radio :value="2">没有改变（0分）</a-radio>
                                        <a-radio :value="3">增加（0分）</a-radio>
                                    </a-radio-group>
                                </a-space>
                            </li>
                        </ul>
                    </div>
                </a-row>
                <!--2-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div class="text-align-center">进食情况评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <ul class="radio-group-list">
                            <li class="radio-group-item radio-group-item-title">1、过去的1个月以来，患者的进食情况与平时情况相比（以最高分选项为本项计分）
                            </li>
                            <li class="radio-group-item">
                                <a-radio-group name="radioGroup">
                                    <a-radio :value="1">没有改变（0分）</a-radio>
                                    <a-radio :value="2">比以前多（0分）</a-radio>
                                    <a-radio :value="3">比以前少（0分）</a-radio>
                                </a-radio-group>
                            </li>
                            <li class="radio-group-item radio-group-item-title">2、患者目前进食</li>
                            <li class="radio-group-item">
                                <a-radio-group name="radioGroup">
                                    <a-radio :value="1">正常饮食（0分）</a-radio>
                                    <a-radio :value="2">但比正常情况少(1分）</a-radio>
                                    <a-radio :value="3">软饭（2分）</a-radio>
                                    <a-radio :value="4">流食（3分）</a-radio>
                                    <a-radio :value="5">只能进食营养制剂（4分）</a-radio>
                                    <a-radio :value="6">只能通过管饲或静脉营养（0分）</a-radio>
                                </a-radio-group>
                            </li>
                        </ul>
                    </div>
                </a-row>
                <!--3-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div class="text-align-center">症状评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <ul class="radio-group-list">
                            <li class="radio-group-item radio-group-item-title">1、近2周来，患者有以下的问题，影响患者摄入足够的饮食（多选，累计计分）
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox-group class="radio-group">
                                    <a-checkbox :value="1">吃饭没有问题（0分）</a-checkbox>
                                    <a-checkbox :value="2">恶心（1分）</a-checkbox>
                                    <a-checkbox :value="3">便秘（1分）</a-checkbox>
                                    <a-checkbox :value="4">口干（1分）</a-checkbox>
                                    <a-checkbox :value="5">一会就吃不了（1分）</a-checkbox>
                                    <a-checkbox :value="6">食品没味（1分）</a-checkbox>
                                    <a-checkbox :value="7">食品气味不好（1分）</a-checkbox>
                                    <a-checkbox :value="8">口腔溃疡（2分）</a-checkbox>
                                    <a-checkbox :value="9">吞咽困难（2分）</a-checkbox>
                                    <a-checkbox :value="10">没有食欲，不想吃（3分）</a-checkbox>
                                    <a-checkbox :value="11">呕吐（3分）</a-checkbox>
                                    <a-checkbox :value="12">腹泻（3分）</a-checkbox>
                                    <a-checkbox :value="13">
                                        <a-space>
                                            <span>其他</span>
                                            <a-input placeholder="其他原因" size="small"/>
                                            <span>（如抑郁、经济、牙齿）(1分)</span>
                                        </a-space>
                                    </a-checkbox>
                                    <a-checkbox :value="14">
                                        <a-space>
                                            <span>疼痛</span>
                                            <a-input placeholder="疼痛部位" size="small"/>
                                            <span>（部位）（3分）</span>
                                        </a-space>
                                    </a-checkbox>
                                </a-checkbox-group>
                            </li>
                        </ul>
                    </div>
                </a-row>
                <!--4-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div class="text-align-center">活动和身体功能情况评估</div>
                    </div>
                    <div class="radio-group-item-content">
                        <ul class="radio-group-list">
                            <li class="radio-group-item radio-group-item-title">1、在过去的1个月，患者的活动（）单选</li>
                            <li class="radio-group-item">
                                <a-radio-group name="radioGroup">
                                    <a-radio :value="1">正常，无限制（0分）</a-radio>
                                    <a-radio :value="2">不像往常，但是还能够起床进行轻微的活动（1分）</a-radio>
                                    <a-radio :value="3">多数时候不想起床活动，但卧床或桌椅时间不超过半天（2分）</a-radio>
                                    <a-radio :value="4">几乎干不了什么，一天大多是时间都卧床或坐在椅子上（3分）</a-radio>
                                    <a-radio :value="5">几乎完全卧床，无法起床（3分）</a-radio>
                                </a-radio-group>
                            </li>
                        </ul>
                    </div>
                </a-row>
                <!--5-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div class="text-align-center">疾病与营养需求的关系评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <ul class="radio-group-list">
                            <li class="radio-group-item radio-group-item-title">1、相关诊断（特定，多选）
                            </li>
                            <li class="radio-group-item">
                                <a-checkbox-group class="radio-group">
                                    <a-checkbox :value="1">
                                        <a-space>
                                            <span>癌症（1分）</span>
                                            <a-input placeholder="请输入癌症类型" size="small"/>
                                        </a-space>
                                    </a-checkbox>
                                    <a-checkbox :value="2">AIDS（1分）</a-checkbox>
                                    <a-checkbox :value="3">呼吸或心脏病恶液质（1分）</a-checkbox>
                                    <a-checkbox :value="4">存在开放性伤口或肠瘘或压疮（1分）</a-checkbox>
                                    <a-checkbox :value="5">创伤（1分）</a-checkbox>
                                </a-checkbox-group>
                            </li>
                            <li class="radio-group-item radio-group-item-title">2、年龄</li>
                            <li class="radio-group-item">
                                <a-space>
                                    <a-input placeholder="请输入年龄" size="small"/>
                                </a-space>
                            </li>
                            <li class="radio-group-item radio-group-item-title">3、原发疾病分期</li>
                            <li class="radio-group-item">
                                <a-radio-group name="radioGroup">
                                    <a-radio :value="1">1期</a-radio>
                                    <a-radio :value="2">2期</a-radio>
                                    <a-radio :value="3">3期</a-radio>
                                    <a-radio :value="4">4期</a-radio>
                                    <a-radio :value="5">
                                        <a-space>
                                            <span>其他</span>
                                            <a-input placeholder="请输入其他" size="small"/>
                                        </a-space>
                                    </a-radio>
                                </a-radio-group>
                            </li>
                            <li class="radio-group-item radio-group-item-title">4、放疗次数</li>
                            <li class="radio-group-item">
                                <a-space>
                                    <a-input placeholder="请输入放疗次数" size="small"/>
                                </a-space>
                            </li>
                        </ul>
                    </div>
                </a-row>
                <!--6-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div class="text-align-center">代谢方面需求评估</div>
                    </div>
                    <div class="radio-group-item-content">
                        <ul class="radio-group-list">
                            <li class="radio-group-item radio-group-item-title">1、发热</li>
                            <li class="radio-group-item">
                                <a-radio-group name="radioGroup">
                                    <a-radio :value="1">无（0分）</a-radio>
                                    <a-radio :value="2">37.2 ~ 38.3（1分）</a-radio>
                                    <a-radio :value="3">38.3 ~ 38.8（2分）</a-radio>
                                    <a-radio :value="4">> 38.8（3分）</a-radio>
                                </a-radio-group>
                            </li>
                            <li class="radio-group-item radio-group-item-title">2、持续发热时间</li>
                            <li class="radio-group-item">
                                <a-radio-group name="radioGroup">
                                    <a-radio :value="1">无（0分）</a-radio>
                                    <a-radio :value="2">< 72小时（1分）</a-radio>
                                    <a-radio :value="3">72小时（2分）</a-radio>
                                    <a-radio :value="4">> 72小时（3分）</a-radio>
                                </a-radio-group>
                            </li>
                            <li class="radio-group-item radio-group-item-title">3、是否使用激素（如波尼松或相当剂量的其他激素/天）</li>
                            <li class="radio-group-item">
                                <a-radio-group name="radioGroup">
                                    <a-radio :value="1">无（0分）</a-radio>
                                    <a-radio :value="2">低剂量（< 10mg）（1分）</a-radio>
                                    <a-radio :value="3">中剂量（10 ~ 30mg）（2分）</a-radio>
                                    <a-radio :value="4">高剂量（>30mg）（3分）</a-radio>
                                </a-radio-group>
                            </li>
                        </ul>
                    </div>
                </a-row>
                <!--7-->
                <a-row type="flex" justify="space-between" align="middle" class="radio-group-row">
                    <div class="radio-group-item-label">
                        <div class="text-align-center">体格检查评分</div>
                    </div>
                    <div class="radio-group-item-content">
                        <ul class="radio-group-list">
                            <li class="radio-group-item" style="padding:0;">
                                <a-row type="flex" justify="space-between" align="middle">
                                    <div class="radio-group-item-label">
                                        <div class="text-align-center">脂肪储备</div>
                                    </div>
                                    <div class="radio-group-item-content">
                                        <ul class="radio-group-list">
                                            <li class="radio-group-item radio-group-item-title">1、眼眶脂肪垫
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">2、三头肌皮褶厚度
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">3、下肋脂肪厚度
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">4、总体脂肪缺乏程度
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                        </ul>
                                    </div>
                                </a-row>
                                <hr>
                                <a-row type="flex" justify="space-between" align="middle">
                                    <div class="radio-group-item-label">
                                        <div class="text-align-center">脂肪储备</div>
                                    </div>
                                    <div class="radio-group-item-content">
                                        <ul class="radio-group-list">
                                            <li class="radio-group-item radio-group-item-title">1、颞部（颞肌）
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">2、锁骨部位（胸部三角肌）
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">3、肩部（三角肌）
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">4、肩胛部（背阔肌、斜方肌、三角肌）
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                    <a-radio :value="3">严重</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">5、手背骨间肌
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">6、大腿（四头肌）
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">7、小腿（腓肠肌）
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                </a-radio-group>
                                            </li>
                                        </ul>
                                    </div>
                                </a-row>
                                <hr>
                                <a-row type="flex" justify="space-between" align="middle">
                                    <div class="radio-group-item-label">
                                        <div class="text-align-center">液体状况</div>
                                    </div>
                                    <div class="radio-group-item-content">
                                        <ul class="radio-group-list">
                                            <li class="radio-group-item radio-group-item-title">1、踝水肿
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                    <a-radio :value="3">中度</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">2、骶部水肿
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                </a-radio-group>
                                            </li>
                                            <li class="radio-group-item radio-group-item-title">3、腹水
                                            </li>
                                            <li class="radio-group-item">
                                                <a-radio-group name="radioGroup">
                                                    <a-radio :value="1">正常</a-radio>
                                                    <a-radio :value="2">轻度</a-radio>
                                                </a-radio-group>
                                            </li>
                                        </ul>
                                    </div>
                                </a-row>
                                <hr>
                                <ul class="radio-group-list">
                                    <li class="radio-group-item radio-group-item-title">本项计分（以肌肉状况情况，主观计分）
                                    </li>
                                    <li class="radio-group-item">
                                        <a-radio-group name="radioGroup">
                                            <a-radio :value="1">0分</a-radio>
                                            <a-radio :value="2">1分</a-radio>
                                            <a-radio :value="3">2分</a-radio>
                                            <a-radio :value="4">3分</a-radio>
                                        </a-radio-group>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </a-row>
            </div>
            <br>
            <ScreeningBottomInfo/>
        </div>
    </div>
</template>
<script>
    import ScreeningBasicInfo from '@/components/userList/screening/screeningBasicInfo.vue';
    import ScreeningBottomInfo from '@/components/userList/screening/screeningBottomInfo.vue';
    import { mapGetters, mapActions } from 'vuex';
    //  新增评估
    export default {
        components: {
            ScreeningBasicInfo,
            ScreeningBottomInfo,
        },
        computed: {
            //  页面参数 - 病人id
            patientInfoId(){
                return this.$route.params.patientInfoId;
            },
            //  详情id
            assessmentDetailId(){
                return this.$route.params.assessmentDetailId;
            },
        },
        data(){
            return {
                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '微型营养评价表',
                },
                //  表格类型
                tableTypeSelect: 3,
                //  类型1
                typeOneList: [],
                //  类型2
                typeTwoList: [],
            };
        },
        created(){
            setTimeout(() => {
                this.getAssessmentDetail();
            }, 20);
        },
        methods: {
            ...mapActions('userList', [
                //  保存病人信息，这是为了给组件用，而不是页面，所以要store
                'setScreeningInfo',
            ]),
            //  请求
            getAssessmentDetail(){
                //  发请求
                console.log('病人id', this.patientInfoId);
                console.log('详情id ,有详情id的是编辑', this.assessmentDetailId);
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
                console.log(this.typeOneList);
                console.log(this.typeTwoList);
            },
        }
    };
</script>
<style scoped>
    @import "~@/css/custom.css";
    
    /*表头*/
    .table-flex-title {
        display: flex;
        justify-content: start;
        line-height: 50px;
        padding: 0;
    }
    
    .table-flex-title > div {
        padding: 0 16px;
    }
    
    .table-flex-title > div:not(:last-child) {
        border-right: 1px solid #e8e8e8;
    }
    
    /*左侧的项*/
    .radio-group-item-label > div {
        padding: 10px;
    }
    
    /*右侧内容，作为title了*/
    .radio-group-item.radio-group-item-title {
        background-color: #fafafa;
    }
</style>
