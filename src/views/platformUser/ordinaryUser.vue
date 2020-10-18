<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.name" placeholder="请输入姓名"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div
                    slot="familyGroup"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a-space size="small">
                    <a @click="viewFamilyGroup(sItem)">查看</a>
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
        <!--莫泰框-->
        <a-modal v-model="dialogDataViewOrdinaryUser.visible"
                 v-if="dialogDataViewOrdinaryUser.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="查看家庭组"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck()">
            <FamilyGroup/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import FamilyGroup from '@/components/familyGroup.vue';
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
        },
        {
            title: '家庭组',
            dataIndex: 'familyGroup',
            width: 100,
            scopedSlots: { customRender: 'familyGroup' }
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: '许晓飞',
            sex: '男',
            familyGroup: 'xxx',
        });
    }
    //  普通用户
    export default {
        components: {
            FamilyGroup,
        },
        data(){
            return {
                //  搜索相关
                searchData: {},

                data,
                columns,

                //  姓名
                name: null,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),

                //  分页信息
                pagination,
                //  查看普通用户
                dialogDataViewOrdinaryUser: this.initModal(DIALOG_TYPE.VIEW_ORDINARY_USER),

            };
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            //  莫泰框方法
            ...dialogMethods,
            //  家庭组信息
            ...mapActions('familyGroup', [
                'setViewFamilyGroupId',
            ]),
            //  搜索
            searchFn(){
                console.log(this.name);
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
            //  查看家庭组
            viewFamilyGroup(sItem){
                console.log(sItem);
                this.setViewFamilyGroupId(12456789876543);
                this.showModal(DIALOG_TYPE.VIEW_ORDINARY_USER);
            },
            //  关闭
            modalCheck(){
                this.hideModal(DIALOG_TYPE.VIEW_ORDINARY_USER);
            }
        }
    };
</script>
<style lang="stylus">
</style>