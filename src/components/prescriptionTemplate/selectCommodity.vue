<template>
    <div class="table-in-box">
        <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="countTableColumns"
                :data-source="originCommodityList"
                :scroll="modalTableScroll"
                :pagination="false"
                bordered
        >
            <!--购买单位-->
            <div slot="buyUnit"
                 slot-scope="scope,sItem,sIndex,extra"
                 class="negative-margin-16">
                <a-radio-group block
                               v-model="sItem.buyUnitCheckId"
                               @change="radioGroupChange(sItem)"
                >
                    <a-radio :key="index"
                             v-for="(item,index) in scope.buyUnitList"
                             :value="item.buyUnitId"
                             class="negative-margin-item"
                    >
                        {{item.buyUnit}}
                    </a-radio>
                </a-radio-group>
            </div>
            <!--价格-->
            <div slot="price" slot-scope="scope,sItem,sIndex,extra" class="negative-margin-16">
                <p v-for="(item,index) in scope.buyUnitList"
                   :key="index"
                   class="negative-margin-item"
                >{{item.price}}</p>
            </div>
        </a-table>
    </div>
</template>
<script>
    import { modalTableScroll } from '@/utils/tableScroll';
    import { mapGetters, mapActions } from 'vuex';

    const countTableColumns = [
        {
            title: '商品名称',
            dataIndex: 'commodityName',
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
    //  选择商品
    export default {
        computed: {
            //  选择商品弹框列表源数据
            originCommodityList(){
                return JSON.parse(JSON.stringify(this.$store.state.prescriptionTemplate.originCommodityList));
            },
        },
        data(){
            return {
                //	弹框table的scroll
                modalTableScroll,
                //  列的意义
                countTableColumns,
                //  被选中的列
                selectedRowKeys: [],
            };
        },
        created(){
            //  被选中的列 === 数据 被选中的 id
            this.selectedRowKeys = this.originCommodityList.filter(item => item.isCheckboxChecked).map(item => item.key);
            console.log(this.selectedRowKeys);
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            ...mapActions('prescriptionTemplate', [
                //  商品源的数据
                'setOriginCommodityList',
            ]),
            //  选中表格数据
            onSelectChange(selectedRowKeys){
                //  console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
                const map = {};
                selectedRowKeys.forEach(item => {
                    map[item] = true;
                });
                //  console.log(map);
                //  没选择的数据，右侧数据的单选状态需要清空
                this.originCommodityList.forEach(item => {
                    //  如果在map中没有，说明不是多选的勾选态
                    if (!map[item.key]) {
                        //  去掉单选的勾选状态
                        item.buyUnitCheckId = null;
                        //  去掉多选的勾选状态
                        item.isCheckboxChecked = false;
                    } else {
                        //  得设置默认值，如果没有的话
                        if (!item.buyUnitCheckId) {
                            item.buyUnitCheckId = item.buyUnitList[0].buyUnitId;
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
                //  console.log(sItem.buyUnitList);
                //  console.log(sItem.buyUnitCheckId);
                //  单选的勾选状态
                sItem.buyUnitList.forEach(item => {
                    item.isRadioChecked = item.buyUnitId === sItem.buyUnitCheckId;
                });
                //  多选的勾选状态，一定勾选了
                sItem.isCheckboxChecked = true;
            },
            //  完成选择
            handleSubmit(){
                if (!this.selectedRowKeys.length) {
                    this.$message.error('请先选择商品');
                }
                //  console.log('源数据', this.originCommodityList);
                //  console.log('别选择的多选', this.selectedRowKeys);
                return new Promise(((resolve, reject) => {
                    //  ⚠️这时候我能不能直接改源数据？能，因为在外面的操作可以直接修改源数据
                    //  删除是操作的selectList，【删除】按钮删除的是选中的状态
                    this.setOriginCommodityList(this.originCommodityList);
                    resolve();
                }));
            }
        }
    };
</script>

