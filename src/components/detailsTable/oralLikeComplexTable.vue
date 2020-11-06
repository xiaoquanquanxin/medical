<template>
    <div>
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
                columns,

            };
        },
        created(){
            const {
                plain,
                remark
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
            });
            console.log(`备注是：${remark}`);
            console.log(JSON.parse(JSON.stringify(this.dataSource.plain[0].nutritionPlain[0])));
        }
    };
</script>
<style scoped>
</style>