<template>
    <div class="layout-content-inner-main">
        <div v-if="true">
            <!--搜索相关-->
            <div class="a-input-group">
                <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入处方号"/>
                <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入处方名称"/>
                <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入患者姓名"/>
                <a-date-picker
                        class="lengthen-select-width"
                        placeholder="请选择配置日期"
                        v-model="selectDateMoment"
                        @change="onDateChange"
                />
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
            </div>
            <div class="a-input-group" v-if="false" data-msg="暂时不做">
                <a-space>
                    <!--<a-button type="primary" v-print="printBottle">打印处方</a-button>-->
                    <a-button type="primary" v-print="printMenu">打印配置单</a-button>
                </a-space>
            </div>
            <!--表格-->
            <a-table
                    :columns="columns"
                    :data-source="data"
                    :scroll="scroll"
                    :pagination="false"
            >
                <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                    <a-space>
                        <router-link :to="{name:'getDrugDetail',params:{getDrugDetailId:sIndex}}">详情
                        </router-link>
                        <a @click="confirmGetDrug(sItem)">确定领药</a>
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
        </div>
        <!--打印-->
        <div v-show="false">
            <div id="printBottle" data-msg="打印处方">
                <ul class="bottle-list">
                    <li class="bottle-item">3290；外壳</li>
                    <li class="bottle-item"><b>功能处方</b></li>
                    <li class="bottle-item">
                        <ul class="bottle-inner-list">
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'><b>序号</b></div>
                                <div class="bottle-inner-prod"><b>产品</b></div>
                                <div class="bottle-inner-count"><b>用量</b></div>
                            </li>
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'>序号</div>
                                <div class="bottle-inner-prod">产品</div>
                                <div class="bottle-inner-count">用量</div>
                            </li>
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'>序号</div>
                                <div class="bottle-inner-prod">产品</div>
                                <div class="bottle-inner-count">用量</div>
                            </li>
                            <li class="bottle-item bottle-item-flex">
                                <div class='bottle-inner-no'>序号</div>
                                <div class="bottle-inner-prod">产品</div>
                                <div class="bottle-inner-count">用量</div>
                            </li>
                        </ul>
                    </li>
                    <li class="bottle-item"><b>用法用量：</b>sss</li>
                    <li class="bottle-item"><b>营养医师：</b>feaw <b>处方日期：</b>恩爱fae</li>
                    <li class="bottle-item"><b>领药员：</b>额发<b>领货人：</b>额发</li>
                </ul>
            </div>
            <div id="printMenu" data-msg="打印配置单">
                <ul class="menu-list">
                    <li class="menu-item">
                        <div><b>科室：</b>蛇精</div>
                        <div class="menu-item-last"><b>病区：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <div><b>姓名：</b>蛇精</div>
                        <div class="menu-item-last"><b>床号：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <div><b>住院号：</b>蛇精</div>
                        <div class="menu-item-last"><b>液量：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <div><b>热量：</b>蛇精</div>
                        <div class="menu-item-last"><b>蛋白质：</b>蛇精</div>
                    </li>
                    <li class="menu-item">
                        <b>营养师</b>xxx
                    </li>
                    <li class="menu-item">
                        <b>用法用量</b>
                        xxxx
                    </li>
                    <li class="menu-item">
                        <b>领药时间</b>
                        xxxx
                    </li>
                    <li class="menu-item">
                        <b>餐次</b>
                        xxxx
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';

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
            title: '领药状态',
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
                scroll: oneRowSearch,
                //  分页信息
                pagination,
                //  搜索数据
                searchData: {},

                //  选择日期的值的对象
                selectDateMoment: null,

                //  打印处方
                printBottle: {
                    id: '#printBottle',
                    popTitle: '打印处方',
                },
                //  打印配置单
                printMenu: {
                    id: '#printMenu',
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
            //  确定领药
            confirmGetDrug(sItem){
                this.$confirm({
                    title: `确定领药${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
        }
    };
</script>
<style scoped>
    @import "~@/css/cost.css";
</style>