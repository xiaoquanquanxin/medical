<template>
    <div>
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
                    <div v-for="(item , index) in scope.list"
                         class="negative-margin-item">
                        {{item.goodsName}}
                    </div>
                </div>
            </div>
            <!--配置量-->
            <div slot="quality" slot-scope="scope,sItem,sIndex,extra">
                <div class="negative-margin-16">
                    <div v-for="(item , index) in scope.list"
                         class="negative-margin-item">
                        {{item.dosage}}/{{item.uname}}
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
                    dataIndex: 'warmWater',
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
//        created(){
//            setTimeout(() => {
//                console.log(JSON.parse(JSON.stringify(this.dataSource[0].list)));
//            }, 1000);
//        }
    };
</script>
<style scoped>
</style>