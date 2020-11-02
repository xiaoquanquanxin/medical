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
            <div slot="purchaseUnit"
                 slot-scope="scope,sItem,sIndex,extra"
                 class="negative-margin-16">
                <a-radio-group style="width: 100%;"
                               v-model="sItem.purchaseUnitCheckId"
                               @change="radioGroupChange(sItem)"
                >
                    <a-radio v-for="(item,index) in scope.uintListVos"
                             :value="item.id"
                             class="negative-margin-item"
                    >
                        <span v-if="+prescriptionType===1">
                            {{unitTypeMap[item.uname].label}}
                        </span>
                        <span v-else>
                            {{item}}
                        </span>
                    </a-radio>
                </a-radio-group>
            </div>
            <!--价格-->
            <div slot="price" slot-scope="scope,sItem,sIndex,extra" class="negative-margin-16">
                <p v-for="(item,index) in scope.uintListVos"
                   :key="index"
                   class="negative-margin-item"
                >{{item.unitPrice}}</p>
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
            dataIndex: 'goodsName',
            width: 150,
        },
        {
            title: '购买单位',
            width: 100,
            scopedSlots: { customRender: 'purchaseUnit' },
        },
        {
            title: '价格',
            width: 100,
            scopedSlots: { customRender: 'price' },
        },
    ];
    //  选择商品
    export default {
        computed: {
            //  选择商品弹框列表源数据
            originCommodityList(){
                //  💡修改，这地方不存了
                return this.$store.state.prescriptionTemplate.originCommodityList;
            },
            //  单元map
            unitTypeMap(){
                return this.$store.state.constants.unitTypeMap;
            }
        },
        props: ['prescriptionType'],
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
            console.log('初始化打开选择商品');
            console.log('被选中的数据', this.selectedRowKeys);
            console.log('总数据', JSON.parse(JSON.stringify(this.originCommodityList)));
        },
        methods: {
            ...mapActions('prescriptionTemplate', [
                //  商品源的数据
                'setOriginCommodityList',
            ]),
            //  多选
            onSelectChange(selectedRowKeys){
                console.log('执行多选');
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
                        item.purchaseUnitCheckId = null;
                        //  去掉多选的勾选状态
                        item.isCheckboxChecked = false;
                    } else {
                        //  得设置默认值，如果没有的话
                        if (!item.purchaseUnitCheckId) {
                            item.purchaseUnitCheckId = item.uintListVos[0].id;
                            item.uintListVos[0].isRadioChecked = true;
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
                //  console.log(sItem.uintListVos);
                //  console.log(sItem.purchaseUnitCheckId);
                //  单选的勾选状态
                sItem.uintListVos.forEach(item => {
                    item.isRadioChecked = item.id === sItem.purchaseUnitCheckId;
                });
                //  多选的勾选状态，一定勾选了
                sItem.isCheckboxChecked = true;
            },
            //  完成选择
            handleSubmit(){
                //  console.log('源数据', this.originCommodityList);
                //  console.log('别选择的多选', this.selectedRowKeys);
                return new Promise(((resolve, reject) => {
                    if (!this.selectedRowKeys.length) {
                        this.$message.error('请先选择商品');
                        reject();
                    }
                    //  ⚠️这时候我能不能直接改源数据？能，因为在外面的操作可以直接修改源数据
                    //  删除是操作的selectList，【删除】按钮删除的是选中的状态
                    this.setOriginCommodityList(this.originCommodityList);
                    resolve();
                }));
            }
        }
    };
</script>

