<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.diseaseName" placeholder="请输入疾病名称"/>
            <a-select class="basic-select-width" v-model="searchData.status" placeholder="请选择状态">
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="0">关闭</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-col :span="5">
                <router-link :to="{name:'addDisease'}">
                    <a-button type="primary">
                        新增疾病
                    </a-button>
                </router-link>
            </a-col>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="a-switch"
                 slot-scope="scope,sItem,sIndex,extra"
            >
                <a-switch checked-children="开" un-checked-children="关"
                          v-model="sItem.statusBooleanFormat"
                          @change="aSwitchChange(sItem,$event)"
                />
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editDisease(sItem,sIndex,extra)">编辑</a>
                    <!--                    <a @click="deleteDisease(sItem)">删除</a>-->
                    <!--                    <a @click="relatedDisease(sItem,sIndex,)">关联疾病</a>-->
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-pagination">
            <a-pagination
                    v-if="pagination.total"
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
</template>
<script>
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { requestDiseaseChangeStatus, requestDiseasePage } from '../../api/disease';

    const columns = [
        {
            title: '疾病名称',
            dataIndex: 'diseaseName',
            width: 150,
        },
        {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'a-switch' },
            width: 150,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 150,
        },
    ];

    //  疾病管理
    export default {
        data(){
            return {
                data: [],
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),

                //    分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {},
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestDiseasePage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            //  状态需要布尔值
                            item.statusBooleanFormat = item.status === 1;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(data.records);
                    });
            },
            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                this.pagination.pageSize = pageSize;
                this.pagination.current = 1;
                this.searchFn();
            },
            //  切换分页页码
            pageChange(current){
                this.pagination.current = current;
                this.searchFn();
            },

            //  切换状态
            aSwitchChange(sItem, checked){
                console.log(sItem, checked);
                requestDiseaseChangeStatus(sItem.id)
                    .then(v => {
                        this.$message.success('操作成功');
                        this.searchFn();
                    })
                    .catch(err => {
                        sItem.statusBooleanFormat = !checked;
                        this.$message.error('操作失败');
                    });
            },
            //  编辑疾病
            editDisease(sItem, sIndex, extra){
                this.$router.push({ name: 'editDisease', params: { diseaseId: sItem.id } });
            },
//            //  删除疾病
//            deleteDisease(sItem){
//                console.log(sItem.disease);
//                this.$confirm({
//                    title: `确定删除${sItem.disease}`,
//                    //  content: 'Bla bla ...',
//                    okText: '确认',
//                    okType: 'danger',
//                    cancelText: '取消',
//                    onOk(){
//                        return new Promise((resolve, reject) => {
//                            console.log('发请求');
//                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
//                        }).catch(() => console.log('Oops errors!'));
//                    },
//                    onCancel(){
//                        console.log('取消');
//                    },
//                });
//            },
        }
    };
</script>
<style scoped lang="stylus">
</style>