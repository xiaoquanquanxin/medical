<template>
    <div>
        <a-space size="small">
            <a @click="chooseShoppingClick">选择商品</a>
        </a-space>
        <div v-if="show">
            <!--莫泰框-->
            <a-modal v-model="dialogData.visible"
                     v-if="dialogData.visible"
                     :maskClosable="false"
                     centered
                     :width="800"
                     title="选择商品"
                     ok-text="确认"
                     cancel-text="取消"
                     @ok="checkShopping()">
                <a-table
                        :row-selection="{ selectedRowKeys: chooseShoppingList,onChange: onSelectChange }"
                        :columns="columns"
                        :data-source="shoppingList"
                        :pagination="false"
                >
                </a-table>
            </a-modal>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';

    const columns = [
        {
            title: '医院名称',
            dataIndex: 'hospital',
            width: 100,
        },
        {
            title: '城市',
            dataIndex: 'city',
            width: 100,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            scopedSlots: { customRender: 'a-switch' },
        },
    ];
    export default {
        computed: {
            ...mapGetters([
                'addOral',
            ]),
            shoppingList(){
                return this.$store.state.addOral.shoppingList;
            },
            chooseShoppingList(){
                return this.$store.state.addOral.chooseShoppingList;
            },
        },
        data(){
            return {
                //  莫泰框
                dialogData,
                columns,
                //
                show: false,
            };
        },
        mounted(){
            //  this.dialogData.visible = true;
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
            ...mapActions('addOral', [
                //  设置被选中的商品列表
                'setChooseShoppingList',
            ]),
            ...dialogMethods,
            //  选中表格数据
            onSelectChange(chooseShoppingListData){
                console.log('selectedRowKeys changed: ', chooseShoppingListData);
                this.setChooseShoppingList(chooseShoppingListData);
            },
            //  确认商品
            checkShopping(){
                this.hideModal();
                this.show = this.dialogData.visible;
            },

            //  选择商品
            chooseShoppingClick(){
                this.showModal();
                this.show = this.dialogData.visible;
            }
        }
    };
</script>