<template>
    <div class="layout-content-inner-main">
        <p>商品管理</p>
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input default-value=""/>
                </a-col>
                <a-col :span="5">
                    <a-select default-value="Option1" style="width:100%;">
                        <a-select-option value="Option1">
                            Option1
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-col :span="5">
                <router-link :to="{name:'addCommodity'}">
                    <a-button type="primary">
                        新增商品
                    </a-button>
                </router-link>
            </a-col>
        </a-input-group>
        <!--表格-->
        <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editCommodity(sItem,sIndex,extra)">编辑</a>
                    <a @click="onShelf(sItem,sIndex,extra)">上架</a>
                    <a @click="offShelf(sItem,sIndex,extra)">下架</a>
                </a-space>
            </div>
            <template slot="priceView" slot-scope="scope,sItem,sIndex,extra">
                <a @click="priceView(sItem)">查看</a>
            </template>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-input-group">
            <a-pagination
                    v-model="pagination.current"
                    :page-size-options="pagination.pageSizeOptions"
                    :total="pagination.total"
                    show-size-changer
                    :page-size="pagination.pageSize"
                    @showSizeChange="onShowSizeChange"
                    @change="pageChange"
            >
                <template slot="buildOptionText" slot-scope="props">
                    <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                    <span v-if="props.value === '50'">全部</span>
                </template>
            </a-pagination>
        </a-row>
        <!--莫泰框-->
        <a-modal v-model="dialogData.visible"
                 v-if="dialogData.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="查看商品"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck()">
            <a-table
                    :columns="countTableColumns"
                    :data-source="countTableData"
                    :pagination="false"
                    bordered
            >
                <!--单位-->
                <div slot="unit" slot-scope="scope,sItem,sIndex,extra">
                    <a-space size="small">
                        <a-input placeholder="输入值" v-model="sItem.price"/>
                    </a-space>
                </div>
            </a-table>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '../../utils/tableScroll';
    import { dialogMethods, dialogData } from '@/utils/dialog';

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '商品类型',
            dataIndex: 'city',
            width: 100,
        },
        {
            title: '场景',
            dataIndex: 'status',
            width: 100,
        },
        {
            title: '单位',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '价格',
            dataIndex: 'price',
            width: 100,
            scopedSlots: { customRender: 'priceView' },
        },
        {
            title: '状态',
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            scopedSlots: { customRender: 'tags' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodity: `xx商品`,
            city: '上海',
            status: String(i % 2),
            icon: '商品图标',
            tags: ['编辑', '关联科室'],
        });
    }

    //  查看详情的表格
    const countTableData = [
        {
            key: Math.random(),
            name: '山西省人民医院',
            relative: '10克',
            unit: '勺',
            shoppingType: 'A商品',
            price: null,
        },
        {
            key: Math.random(),
            name: '山西省人民医院',
            relative: '10克',
            unit: 'ml',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            name: '山西省肿瘤医院',
            relative: '110克',
            unit: '勺',
            shoppingType: 'A商品',
            price: null,
        },
        {
            key: Math.random(),
            name: '山西省肿瘤医院',
            relative: '110克',
            unit: 'ml',
            shoppingType: 'B商品',
            price: null,
        },
    ];
    export default {
        data(){
            const countTableColumns = [
                {
                    dataIndex: 'name',
                    title: 'Name',
                    width: 200,
                    customRender: (text, row, index) => {
                        const obj = {
                            children: text,
                            attrs: {},
                        };
                        if (index === 0) {
                            obj.attrs.rowSpan = 2;
                        } else if (index === 2) {
                            obj.attrs.rowSpan = 2;
                        } else {
                            obj.attrs.rowSpan = 0;
                        }
                        return obj;
                    },
                },
                {
                    //  单位
                    title: '单位',
                    key: 'unit',
                    dataIndex: 'unit',
                },
                {
                    //  单位关系
                    title: '单位关系',
                    key: 'relative',
                    dataIndex: 'relative',
                },
                {
                    //  价格
                    title: '价格',
                    key: 'price',
                    dataIndex: 'price',
                    width: 300,
                    scopedSlots: { customRender: 'unit' },
                },
            ];
            return {
                data,
                columns,
                selectedRowKeys: [], // Check here to configure the default column

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

                //  分页信息
                pagination,
                //  莫泰框
                dialogData,
                //  弹框表格的数据
                countTableColumns,
                countTableData,
            };
        },
        created(){
            this.dialogData.visible = true;
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
            //  选中表格数据
            onSelectChange(selectedRowKeys){
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            },
            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
                this.pagination.pageSize = pageSize;
            },
            //  切换分页页码
            pageChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
            },

            //  编辑商品
            editCommodity(sItem, sIndex){
                //  console.log(sIndex);
                this.$router.push({ name: 'editCommodity', params: { commodityId: sIndex } });
            },
            //  上架
            onShelf(){},
            //  下架
            offShelf(){},
            //  价格查看
            priceView(sItem){
                console.log(sItem);
                this.showModal();
            },
            //  确认查看价格
            modalCheck(){
                console.log('保存接口');
                console.log(this.countTableData[0]);
                setTimeout(() => {
                    this.hideModal();
                }, 1000);
            }
        }
    };
</script>
<style scoped lang="stylus">
</style>
