<template>
    <div class="table-in-box">
        <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="columns"
                :data-source="commodityList"
                :scroll="modalTableScroll"
                :pagination="false"
                bordered
        >
            <!--购买单位-->
            <div slot="buyUnit"
                 slot-scope="scope,sItem,sIndex,extra"
                 class="negative-margin-16">
                <a-radio-group style="display: block;"
                               v-model="sItem.buyUnitCheckId"
                               @change="radioGroupChange(sItem)"
                >
                    <a-radio :key="index" v-for="(item , index) in scope.customList"
                             :value="item.buyUnitId"
                             class="negative-margin-item"
                    >
                        {{item.buyUnit}}
                    </a-radio>
                </a-radio-group>
            </div>
            <!--价格-->
            <div slot="price" slot-scope="scope,sItem,sIndex,extra" class="negative-margin-16">
                <p v-for="(item , index) in scope.customList"
                   class="negative-margin-item"
                >{{item.price}}</p>
            </div>
        </a-table>
    </div>
</template>
<script>
    import { modalTableScroll } from '@/utils/tableScroll';

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: '购买单位',
            width: 200,
            scopedSlots: { customRender: 'buyUnit' },
        },
        {
            title: '价格',
            width: 200,
            scopedSlots: { customRender: 'price' },
        },
    ];
    //  重要参数⚠️
    //  buyUnitCheckId:单选的id，为了渲染用，v-model需要
    //  isCheckboxChecked:是否多选，组织selectedRowKeys
    //  内部
    //  isRadioChecked:是否单选，为了父组件渲染

    export default {
        props: ['commodityList'],
        data(){
            return {
                //	弹框table的scroll
                modalTableScroll,
                //  列的意义
                columns,
                //  被选中的key
                selectedRowKeys: [],
            };
        },
        created(){
            //  被选中的列 === 数据 被选中的 id
            this.selectedRowKeys = this.commodityList.filter((item) => {
                return item.isCheckboxChecked;
            }).map((item) => {
                return item.key;
            });
            //  console.log(this.selectedRowKeys);
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
            //  多选
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys;
                const map = {};
                selectedRowKeys.forEach(item => {
                    map[item] = true;
                });
                //  没选择的数据，右侧数据的单选状态需要清空
                this.commodityList.forEach(item => {
                    //  如果在map中没有，说明不是多选的勾选态
                    if (!map[item.key]) {
                        //  去掉单选的勾选状态
                        item.buyUnitCheckId = null;
                        //  去掉多选的勾选状态
                        item.isCheckboxChecked = false;
                    } else {
                        //  得设置默认值，如果没有的话
                        if (!item.buyUnitCheckId) {
                            item.buyUnitCheckId = item.customList[0].buyUnitId;
                        }
                        //  补充多选的勾选状态
                        item.isCheckboxChecked = true;
                    }
                });
            },
            //  单选
            radioGroupChange(sItem){
                //  左侧多选需要钩上
                this.selectedRowKeys.push(sItem.key);
                this.selectedRowKeys = [...new Set(this.selectedRowKeys)];
                //  console.log(sItem.customList);
                //  console.log(sItem.buyUnitCheckId);
                //  单选的勾选状态
                sItem.customList.forEach(item => {
                    item.isRadioChecked = item.buyUnitId === sItem.buyUnitCheckId;
                });
                //  多选的勾选状态，一定勾选了
                sItem.isCheckboxChecked = true;
            },
            //  完成选择
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    if (!this.selectedRowKeys.length) {
                        this.$message.error('请先选择商品');
                        reject();
                    }
                    //  console.log(JSON.parse(JSON.stringify(this.commodityList)));
                    //  在这里组织
                    resolve(this.commodityList);
                });
            }
        }
    };
</script>