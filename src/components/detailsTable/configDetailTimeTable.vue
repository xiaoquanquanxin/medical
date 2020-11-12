<template>
    <div>
        <div v-if="true">
            <p class="red">如果使用量和使用单位分开【以前是配置量】那么使用量应该放前面并且使用量不要单位</p>
            <p class="red">食用方法什么时候整合到列表里了？填营养干预只有那一类，那应该抽出来</p>
            <p class="red">打印瓶贴，由于是根据时间区，所以木木提供的营养干预保存接口，得在每一项里加额外的字段</p>
            <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
                <span>{{templateName}}</span>
                <span>{{usageMethod}}</span>
            </a-row>
            <a-table
                    :columns="columns"
                    :data-source="dataSource"
                    :pagination="false"
                    bordered
                    :hover="false"
            >
                <!--商品名称-->
                <div slot="goodsName" slot-scope="scope,sItem,sIndex,extra">
                    <div class="negative-margin-16">
                        <div v-for="(item , index) in scope.goodsList"
                             class="negative-margin-item">
                            {{item.goodsName}}
                        </div>
                    </div>
                </div>
                <!--使用量-->
                <div slot="quantity" slot-scope="scope,sItem,sIndex,extra">
                    <div class="negative-margin-16">
                        <div v-for="(item , index) in scope.goodsList"
                             class="negative-margin-item">
                            {{item.quantity}}
                        </div>
                    </div>
                </div>
                <!--单位-->
                <div slot="goodsUnit" slot-scope="scope,sItem,sIndex,extra">
                    <div class="negative-margin-16">
                        <div v-for="(item , index) in scope.goodsList"
                             class="negative-margin-item">
                            {{item.goodsUnit}}
                        </div>
                    </div>
                </div>
                <!--操作-->
                <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                    <a v-print="printBottle" @click="printBottleFn(sItem)">打印瓶贴</a>
                </div>
            </a-table>
        </div>
        <!--打印-->
        <div v-show="false" class="print-wrap">
            <div id="printBottle" data-msg="打印瓶贴">
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>科室：</b>{{dataForPrint.deptName}}</div>
                    <div class="bottle-list-label"><b>病区：</b>{{dataForPrint.bedCode}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>姓名：</b>{{dataForPrint.name}}</div>
                    <div class="bottle-list-label"><b>床号：</b>{{dataForPrint.bedCode}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>住院号：</b>{{dataForPrint.bedCode}}</div>
                    <div class="bottle-list-label"><b>总液量：</b>{{printBottle.configWater}}ml</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>热量：</b>{{dataForPrint.fat}}kcal</div>
                    <div class="bottle-list-label"><b>蛋白质：</b>{{dataForPrint.protein}}g</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div><b>营养师：</b>{{dataForPrint.doctorName}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div><b>配置时间：</b>{{dataForPrint.orderTime}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div><b>用法用量及餐次：</b>{{usageMethod}}</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label">{{printBottle.usageTime}}</div>
                    <div class="bottle-list-label">{{printBottle.configWater}}ml</div>
                </a-row>
            </div>
        </div>
    </div>
</template>
<script>
    import { usageMethodMap, templateTypeMap } from '../../utils/constants';

    export default {
        props: ['dataSource', 'templateType', 'dataForPrint'],
        data(){
            const columns = [
                {
                    title: '序号',
                    dataIndex: 'index',
                    width: 40,
                },
                {
                    title: '时间',
                    dataIndex: 'usageTime',
                    width: 100,
                },
                {
                    title: '商品名称',
                    width: 100,
                    scopedSlots: { customRender: 'goodsName' },
                },
                {
                    title: '使用量',
                    width: 100,
                    scopedSlots: { customRender: 'quantity' },
                },
                {
                    title: '单位',
                    width: 100,
                    scopedSlots: { customRender: 'goodsUnit' },
                },
                {
                    title: '温水/ml',
                    dataIndex: 'configWater',
                    width: 100,
                },
                {
                    title: '操作',
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                },
            ];
            return {
                //  打印瓶贴
                printBottle: {
                    id: '#printBottle',
                    popTitle: '打印瓶贴',
                },
                columns,
                //  模板类型
                templateName: undefined,
                //  食用方法
                usageMethod: undefined,
                //  食用方法
                usageMethodMap,
                //  模板类型
                templateTypeMap,
            };
        },
        created(){
            const { configWater, usageMethod } = this.dataSource[0];
            //  console.log(configWater, usageMethod, this.templateType);
            this.dataSource.forEach((item, index) => {
                item.key = index;
                item.index = index + 1;
                item.configWater = configWater;
                //  console.log('每一条数据');
                //  console.log(JSON.parse(JSON.stringify(item.goodsList[0])));
            });
            this.templateName = this.templateTypeMap[this.templateType].name;
            this.usageMethod = this.usageMethodMap[usageMethod || 1].name;
        },
        methods: {
            //  打印瓶贴
            printBottleFn(sItem){
                const {
                    protein,
                    fat,
                    usageTime,
                    configWater,
                } = sItem;
                this.printBottle = Object.assign({}, this.printBottle, {
                    //  蛋白质
                    protein: protein || 0,
                    //  热量
                    fat: fat || 0,
                    //  时间
                    usageTime: usageTime || null,
                    //  总液量
                    configWater: configWater || 0,
                });
                console.log('打印的单项数据是');
                console.log(this.printBottle);
            }
        }
    };
</script>
<style scoped>
    .print-wrap {
        margin: 20px auto;
        width: 400px;
    }
    
    .bottle-list {
        padding: 0.5em 0.6em;
        border-bottom: 1px solid var(--basic-border-color);
    }
    
    .bottle-list-label {
        margin-right: 2em;
        width: 120px;
    }
</style>