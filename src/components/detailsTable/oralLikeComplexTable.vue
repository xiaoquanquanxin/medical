<template>
    <div>
        <a-row type="flex" justify="space-between" align="middle"
               class="table-group-title no-border-bottom"
               v-if="dataTitle"
        >
            <span>{{dataTitle.name}}</span>
            <span>{{dataTitle.method}}</span>
        </a-row>
        <a-table
                :columns="columns"
                :data-source="dataSource"
                :pagination="false"
                bordered
                :hover="false"
        >
            <!--商品名称-->
            <div slot="commodityName" slot-scope="scope,sItem,sIndex,extra">
                <div class="negative-margin-16">
                    <div v-for="(item , index) in scope.childrenList"
                         class="negative-margin-item">
                        {{item.commodity}}
                    </div>
                </div>
            </div>
            <!--配置量-->
            <div slot="quality" slot-scope="scope,sItem,sIndex,extra">
                <div class="negative-margin-16">
                    <div v-for="(item , index) in scope.childrenList"
                         class="negative-margin-item">
                        {{item.quality}}
                    </div>
                </div>
            </div>
        </a-table>
    </div>
</template>
<script>
    export default {
        props: ['dataSource','dataTitle'],
        data(){
            const columns = [
                {
                    title: '时间',
                    dataIndex: 'time',
                    width: 100,
                },
                {
                    title: '商品名称',
                    width: 100,
                    scopedSlots: { customRender: 'commodityName' },
                },
                {
                    title: '配置量',
                    width: 100,
                    scopedSlots: { customRender: 'quality' },
                },
                {
                    title: '温水',
                    dataIndex: 'water',
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
        }
    };
</script>
<style scoped>
</style>