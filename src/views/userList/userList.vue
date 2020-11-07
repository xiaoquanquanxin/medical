<template>
    <div>
        <a-row type="flex" justify="start" align="top" v-if="false">
            <a-col style="width:300px;">
            </a-col>
            <a-col style="width:calc(100vw - 500px);min-width: 900px;">
            </a-col>
        </a-row>
        <div class="wrap">
            <div class="left-info">
                <a-card title="就诊信息">
                    <a-form class="form"
                            v-bind="{
                                 labelCol: { span: 6 },
                                 wrapperCol: { offset: 1, span: 17 },
                            }"
                            autocomplete="off"
                    >
                        <a-form-item label="姓名">
                            <a-input-search placeholder="请输入姓名"
                                            v-model="searchData.name"
                                            enter-button="搜索"
                                            @search="searchFn"/>
                        </a-form-item>
                        <a-form-item label="身份证号">
                            <a-input-search placeholder="请输入身份证号"
                                            v-model="searchData.idCard"
                                            enter-button="搜索"
                                            @search="searchFn"/>
                        </a-form-item>
                    </a-form>
                </a-card>
                <a-card title="病人列表">
                    <div class="a-input-group">
                        <a-button type="primary" @click="addAdmittedHospitalFn">新增用户</a-button>
                    </div>
                    <a-table
                            id="userListTable"
                            :columns="columns"
                            :data-source="data"
                            :pagination="false"
                            :scroll="{x: 'auto', y: 'calc(100vh - 550px)'}"
                            :filtered="true"
                            :customRow="customRow"
                            :rowClassName="rowClassNameFn"
                    >
                        <!--年龄/性别-->
                        <div slot="info" slot-scope="scope,sItem,sIndex,extra">
                            {{scope.birth}}/{{scope.sex===1?'男':'女'}}
                        </div>
                        <!--状态-->
                        <div slot="patientStatus" slot-scope="scope,sItem,sIndex,extra">
                            <span v-if="scope.patientStatus==='1'" style="color:">住院</span>
                            <span v-if="scope.patientStatus==='2'">院外</span>
                            <span v-if="scope.patientStatus==='3'">永久注销</span>
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
                </a-card>
            </div>
            <div class="tab-info">
                <a-menu v-if="currentMeta"
                        class="user-list-menu"
                        v-model="transverseSubPaths2"
                        mode="horizontal">
                    <a-menu-item
                            v-for="(item , index) in userRouteList"
                            :key="item.name"
                            @click="userListJumpTo(item)"
                    >
                        {{item.meta.chName}}
                    </a-menu-item>
                </a-menu>
                <div class="router-view">
                    <div v-if="$route.name === 'userList'" class="layout-content-inner">
                        <a-empty style="padding-top: 200px;"/>
                    </div>
                    <div v-else class="layout-content-inner">
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { jumpTo } from '@/utils/routerMeta';
    import { requestPatientPage } from '@/api/userList/userList';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 90,
        },
        {
            title: '年龄/姓别',
            width: 120,
            scopedSlots: { customRender: 'info' },
            align: 'center',
        },
        {
            title: '状态',
            scopedSlots: { customRender: 'patientStatus' },
            width: 90,
        },
    ];
    //  处方模板管理
    export default {
        computed: {
            userRouteList(){
                const { userRouteList } = this.$store.state.routeList;
                return userRouteList;
            },
            //  当前激活路由的元信息
            currentMeta(){
                const { currentMeta } = this.$store.state.routeList;
                this.transverseSubPaths2 = [currentMeta.transverseSubPaths2 || ''];
                return currentMeta;
            },
            //  页面参数 - 病人id
            patientId(){
                //  console.log(window.document.getElementById('userListTable'));
                return Number(this.$route.params.patientId);
            },
        },
        data(){
            return {
                //  分页信息
                pagination: paginationInit(),
                //  横向二级路由
                transverseSubPaths2: [],

                columns,
                data: [],

                //  搜索数据
                searchData: {},
            };
        },
        created(){
            this.searchFn();
        },
        provide(){
            return {
                userList_searchFn: this.searchFn
            };
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPatientPage(Object.assign({ param: this.searchData }, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        //  data.records.length = 0;
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(data.records))[0]);
                        //  如果没有病人
                        if (!data.records.length) {
                            return;
                        }
                        //  如果当前是在userList路由下，那么应该进入第一个病人列表的路由
                        if (this.$route.name === 'userList') {
                            //  第一个病人的id
                            const { id } = data.records[0];
                            this.$router.push({ name: 'patientInfo', params: { patientId: id.toString() } });
                        }
                        console.log(this.$route.name);
                    });
            },
            //  自定义表格事件
            customRow(scope){
                return {
                    on: {
                        click: () => {this.tableClickFn(scope);}
                    }
                };
            },
            //  被激活的颜色
            rowClassNameFn(record, index){
                if (this.patientId === record.id) {
//                    console.log('🍉🍉🍉🍉🍉🍉');
//                    console.log(this.patientId);
//                    console.log(record.id);
//                    console.log('🍉🍉🍉🍉🍉🍉');
                    return 'user-list-high-light';
                }
            },
            //  点击table事件
            tableClickFn(scope){
                console.log('选中的列表的id ', scope.id, '应该监听病人信息页面');
                //  todo    区分点击的是谁
                this.$router.push({ name: 'patientInfo', params: { patientId: scope.id.toString() } });
            },

            //  横向路由列表，点击去哪儿
            userListJumpTo(item){
                //  原来的路由参数
                const { meta: prevMeta, params } = this.$route;
                //  console.log(prevMeta.routerParamsKey, params);
                //  参数值 其实都叫 病人id 🆔 patientId
                const id = params[prevMeta.routerParamsKey];
                //  如果没有id，说明就不是正常的
                if (!id) {
                    //  去最外面就行了
                    this.$router.push({ name: 'userList' });
                    return;
                }
                //  console.log(id);
                //  要跳转的路由参数
                const { name, meta } = item;
                //  console.log('路由是', name);
                //  console.log('参数名是', meta.routerParamsKey);
                this.$router.push({ name, params: { [meta.routerParamsKey]: id } });
            },

            //  新增用户
            addAdmittedHospitalFn(){
                this.setPatientBasicInfo(null);
                this.$router.push({ name: 'addAdmittedHospital' });
            },
            ...mapActions('userList', [
                //  保存病人信息
                'setPatientBasicInfo',
            ]),
            jumpTo,
            pageChange,
            onShowSizeChange,
        }
    };
</script>
<style scoped>
    @import "~@/css/table.css";
    
    .router-view {
        height: calc(100vh - 180px);
        overflow: auto;
        width: 900px;
    }
    
    
    /*页面左右分块*/
    .wrap {
        display: flex;
        justify-content: flex-start;
        min-width: 1200px;
    }
    
    .left-info {
        min-width: 300px;
        max-width: 300px;
        /*background-color: lightyellow;*/
    }
    
    .tab-info {
        flex: 1 auto auto;
        /*background-color: lightblue;*/
    }
    
    .user-list-menu {
        padding-top: 4px;
        background-color: #eaecf1;;
    }
    
    
    /*未激活的*/
    .ant-menu-horizontal > .ant-menu-item {
        background-color: var(--user-list-ant-menu-item-bgc);
        width: 100px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        transition: background, color .3s;
    }
    
    /*鼠标敷于浮于*/
    .ant-menu-horizontal > .ant-menu-item-active,
    .ant-menu-horizontal > .ant-menu-submenu-active,
    .ant-menu-horizontal > .ant-menu-item-open,
    .ant-menu-horizontal > .ant-menu-submenu-open {
        background-color: var(--user-list-ant-menu-item-active-bgc) !important;;
        color: var(--user-list-ant-menu-item-active-c) !important;
    }
    
    
    /*被选中的*/
    .ant-menu-horizontal > .ant-menu-item-selected,
    .ant-menu-horizontal > .ant-menu-submenu-selected {
        color: var(--user-list-ant-menu-item-active-c) !important;;
        background-color: white !important;;
        height: 58px;
        line-height: 58px;
    }
    
    .ant-menu-horizontal > .ant-menu-item:hover,
    .ant-menu-horizontal > .ant-menu-submenu:hover {
    }
</style>
