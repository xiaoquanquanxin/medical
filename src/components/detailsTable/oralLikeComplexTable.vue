<template>
    <div>
        <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
            <span>{{templateName}}</span>
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
        </a-table>
    </div>
</template>
<script>
    import { usageMethodMap, templateTypeMap } from '../../utils/constants';

    export default {
        props: ['dataSource'],
        data(){
            const columns = [
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
                    title: '配置量',
                    width: 100,
                    scopedSlots: { customRender: 'quality' },
                },
                {
                    title: '温水/ml',
                    dataIndex: 'configWater',
                    width: 100,
                },
                {
                    title: '备注',
                    width: 100,
                    customRender: (text, row, index) => {
                        const obj = {
                            children: text.remark,
                            attrs: {},
                        };
                        if (index === 0) {
                            obj.attrs.rowSpan = 1000;
                        } else {
                            obj.attrs.rowSpan = 0;
                        }
                        return obj;
                    },
                },
            ];
            return {
                //  食用方法
                usageMethodMap,
                //  模板类型
                templateTypeMap,
                columns,
                //  模板类型
                templateName: undefined,
                //  食用方法
                usageMethod: undefined,
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
                item.configWater = configWater;
                item.remark = remark;
            });
            this.templateName = this.templateTypeMap[templateType].name;
            this.usageMethod = this.usageMethodMap[usageMethod || 1].name;
            //  console.log(JSON.parse(JSON.stringify(this.dataSource.plain[0].nutritionPlain[0])));
        }
    };
</script>
<style scoped>
</style>