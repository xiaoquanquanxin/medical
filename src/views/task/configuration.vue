<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-space>
                <div class="basic-input-width">
                    <a-input v-model="searchData.commodityName" placeholder="请输入处方号"/>
                </div>
                <div class="basic-input-width">
                    <a-input v-model="searchData.commodityName" placeholder="请输入处方名称"/>
                </div>
                <div class="basic-input-width">
                    <a-input v-model="searchData.commodityName" placeholder="请输入患者姓名"/>
                </div>
                <div class="basic-input-width">
                    <a-date-picker
                            placeholder="请选择日期"
                            v-model="selectDateMoment"
                            @change="onDateChange"
                    />
                </div>
                <a-select v-model="searchData.brand" class="basic-select-width" placeholder="请选择科室">
                    <a-select-option value="">
                        品牌
                    </a-select-option>
                    <a-select-option value="Option2">
                        Option2
                    </a-select-option>
                </a-select>
                <a-select v-model="searchData.status" class="basic-select-width" placeholder="请选择状态">
                    <a-select-option value="">
                        状态
                    </a-select-option>
                    <a-select-option value="Option2">
                        Option2
                    </a-select-option>
                </a-select>
                <a-button type="primary">
                    搜索
                </a-button>
            </a-space>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-space>
                <a-button type="primary" v-print="printBottle">打印瓶贴</a-button>
                <a-button type="primary" v-print="printMenu">打印配置单</a-button>
            </a-space>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space>
                    <router-link :to="{name:'auditDetail',params:{auditDetailId:sIndex}}">详情</router-link>
                    <a @click="confirmReceiving(sItem)">确定签收</a>
                    <a @click="confirmConfig(sItem)">确定配置</a>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-pagination">
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
                    <span>{{ props.value }}条/页</span>
                </template>
            </a-pagination>
        </a-row>
        <div></div>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '../../utils/tableScroll';

    const columns = [
        {
            title: '序号',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '处方名称',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '处方医生',
            dataIndex: '通用名',
            width: 100,
        },
        {
            title: '使用时间',
            dataIndex: '商品分类',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '姓名',
            dataIndex: 'specifications',
            width: 100,
        },
        {
            title: '性别',
            dataIndex: 'marketPrice',
            width: 100,
        },
        {
            title: '支付状态',
            dataIndex: 'manufacturer',
            width: 100,
        },
        {
            title: '状态',
            dataIndex: 'update',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 200,
            scopedSlots: { customRender: 'operation' },
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
            aaa: '商品货号',
            通用名: '通用名',
            商品分类: '商品分类',
            unit: '基本单位',
            specifications: '规格',
            manufacturer: '生产厂家',
        });
    }

    export default {
        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,
                //  分页信息
                pagination,
                //  搜索数据
                searchData: {},

                //  选择日期的值的对象
                selectDateMoment: null,

                //  打印瓶贴
                printBottle: {
                    id: '#printContent',
                    popTitle: '打印瓶贴',
                },
                //  打印配置单
                printMenu: {
                    id: '#printContent',
                    popTitle: '打印配置单',
                },

                
            };
        },
        methods: {
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
            //  选择过期日期
            onDateChange(value, selectDateValue){
                console.log(selectDateValue);
            },
            //  确定签收
            confirmReceiving(sItem){},
            //  确定配置
            confirmConfig(sItem){},
        }
    };
</script>
<style scoped lang="stylus">
</style>

<!--确定签收莫泰框-->
<!--        <a-modal v-model="dialogDataActivityBrief.visible"-->
<!--                 v-if="dialogDataActivityBrief.visible"-->
<!--                 :maskClosable="false"-->
<!--                 centered-->
<!--                 :width="800"-->
<!--                 title="活动小结"-->
<!--                 ok-text="确认"-->
<!--                 cancel-text="取消"-->
<!--                 @ok="addActivityBriefModalCheck('refActivityBriefForm')">-->
<!--            <ActivityBriefForm ref="refActivityBriefForm"/>-->
<!--        </a-modal>-->