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
                    :data-source="dataSource.plain"
                    :pagination="false"
                    bordered
                    :hover="false"
            >
                <!--商品名称-->
                <div slot="goodsName" slot-scope="scope,sItem,sIndex,extra">
                    <div class="negative-margin-16">
                        <div v-for="(item , index) in scope.nutritionPlain"
                             class="negative-margin-item">
                            {{item.goodsName}}
                        </div>
                    </div>
                </div>
                <!--配置量-->
                <div slot="quality" slot-scope="scope,sItem,sIndex,extra">
                    <div class="negative-margin-16">
                        <div v-for="(item , index) in scope.nutritionPlain"
                             class="negative-margin-item">
                            {{item.configNum}}/{{item.configUnit}}
                        </div>
                    </div>
                </div>
                <!--配置量-->
                <div slot="configNum" slot-scope="scope,sItem,sIndex,extra">
                    <div class="negative-margin-16">
                        <div v-for="(item , index) in scope.nutritionPlain"
                             class="negative-margin-item">
                            {{item.configNum}}
                        </div>
                    </div>
                </div>
                <!--单位-->
                <div slot="configUnit" slot-scope="scope,sItem,sIndex,extra">
                    <div class="negative-margin-16">
                        <div v-for="(item , index) in scope.nutritionPlain"
                             class="negative-margin-item">
                            {{item.configUnit}}
                        </div>
                    </div>
                </div>
                <!--操作-->
                <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                    <a v-print="printBottle">打印瓶贴</a>
                </div>
            </a-table>
        </div>
        <!--打印-->
        <div v-show="false" class="print-wrap">
            <div id="printBottle" data-msg="打印瓶贴">
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>科室：</b>xxx</div>
                    <div class="bottle-list-label"><b>病区：</b>xxx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>姓名：</b>xxx</div>
                    <div class="bottle-list-label"><b>床号：</b>xxx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>住院号：</b>xx</div>
                    <div class="bottle-list-label"><b>总液量：</b>xxx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label"><b>热量：</b>xx</div>
                    <div class="bottle-list-label"><b>蛋白质：</b>xxx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div><b>营养师：</b>xx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div><b>配置时间：</b>xx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div><b>用法用量及餐次：</b>xx</div>
                </a-row>
                <a-row type="flex" justify="start" align="middle" class="bottle-list">
                    <div class="bottle-list-label">xxx</div>
                    <div class="bottle-list-label">xxx</div>
                </a-row>
            </div>
        </div>
    </div>
</template>
<script>
    import { usageMethodMap, templateTypeMap } from '../../utils/constants';

    export default {
        props: ['dataSource'],
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
                    scopedSlots: { customRender: 'configNum' },
                },
                {
                    title: '单位',
                    width: 100,
                    scopedSlots: { customRender: 'configUnit' },
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
//                {
//                    title: '备注',
//                    width: 100,
//                    customRender: (text, row, index) => {
//                        const obj = {
//                            children: text.remark,
//                            attrs: {},
//                        };
//                        if (index === 0) {
//                            obj.attrs.rowSpan = 1000;
//                        } else {
//                            obj.attrs.rowSpan = 0;
//                        }
//                        return obj;
//                    },
//                },
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
            const {
                plain,
                remark,
                templateType,
                usageMethod,
            } = this.dataSource;
            if (!plain.length) {
                throw new Error('缺少数据');
            }
            const { nutritionPlain } = plain[0];
            if (!nutritionPlain || !nutritionPlain.length) {
                throw new Error('缺少数据');
            }
            const { configWater } = nutritionPlain[0];
            plain.forEach((item, index) => {
                item.key = index;
                item.index = index + 1;
                item.configWater = configWater;
                item.remark = remark;
            });
            this.templateName = this.templateTypeMap[templateType].name;
            this.usageMethod = this.usageMethodMap[usageMethod || 1].name;
            //  Object.assign(this.printBottle, plain[0]);
            //  console.log(JSON.parse(JSON.stringify(this.dataSource.plain[0].nutritionPlain[0])));
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