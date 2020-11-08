<template>
    <div class="wrap">
        <div class="left-info">
            <a-card title="就诊信息" style='border-bottom: none;margin-bottom: -10px;'>
                <a-form class="form"
                        v-bind="{
                                 labelCol: { span: 6 },
                                 wrapperCol: { offset: 1, span: 17 },
                            }"
                        autocomplete="off"
                >
                    <a-form-item label="姓名">
                        <a-input-search size="" placeholder="请输入姓名"
                                        v-model="searchData.name"
                                        enter-button="搜索"
                                        @search="searchFn"/>
                    </a-form-item>
                    <a-form-item label="身份证号">
                        <a-input-search size="" placeholder="请输入身份证号"
                                        v-model="searchData.idCard"
                                        enter-button="搜索"
                                        @search="searchFn"/>
                    </a-form-item>
                </a-form>
                <a-row type="flex" justify="space-between" align="middle" v-if="currentPatientInfo"
                       class="medical-information-list">
                    <span>性别：{{+currentPatientInfo.sex === 1 ?'男':'女'}}</span>
                    <span>年龄：{{currentPatientInfo.birth}}</span>
                    <span v-if=" +currentPatientInfo.patientStatus === 1">状态：住院</span>
                    <span v-else-if=" +currentPatientInfo.patientStatus === 2">状态：出院</span>
                    <span v-else>状态：永久注销</span>
                </a-row>
                <hr>
                <a-row type="flex" justify="space-between" align="middle"
                       v-if="currentPatientInfo"
                       class="medical-information-list">
                    <span>科室：{{currentPatientInfo.deptName}}</span>
                    <br>
                    <span>床号：{{currentPatientInfo.bedCode}}</span>
                </a-row>
                <hr>
                <a-row type="flex" justify="space-between" align="middle" v-if="currentPatientInfo"
                       class="medical-information-list">
                    <span>住院号：{{currentPatientInfo.hospitalCode}}</span>
                </a-row>
            </a-card>
            <a-card title="病人列表">
                <a-button slot="extra" type="primary" size="small" @click="addAdmittedHospitalFn">+新患者登记</a-button>
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
                        style="margin-right: 6px;"
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
//            //  全部科室的map
//            deptMap(){
//                const { deptMap } = this.$store.state.constants;
//                console.log(deptMap);
//                return deptMap;
//            },
            //  当前的病人
            currentPatientInfo(){
                if (!this.patientInfoMap) {
                    return null;
                }
                return this.patientInfoMap[this.patientId];
            }
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

                //  数据的map，key:id,value:item
                patientInfoMap: null,
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
        watch: {
            $route(value){
                console.log('🍎', value.name);
                if (value.name === 'userList') {
                    this.getFirstPatient();
                }
            }
        },
        methods: {
            //  主要请求
            searchFn(){
                return requestPatientPage(Object.assign({ param: this.searchData }, paginationEncode(this.pagination)))
                    .then(v => {
                        console.log('病人列表');
                        const { data } = v;
                        const patientInfoMap = {};
                        data.records.forEach((item, index) => {
                            item.key = index;
                            patientInfoMap[item.id] = item;
                        });
                        this.patientInfoMap = patientInfoMap;
                        //  data.records.length = 0;
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(data.records))[0]);
                        //  如果当前是在userList路由下，那么应该进入第一个病人列表的路由
                        if (this.$route.name === 'userList') {
                            this.getFirstPatient();
                        }
                        //  console.log(this.$route.name);
                    });
            },
            //  进入第一个病人的路由
            getFirstPatient(){
                const data = this.data;
                if (!data || !data.length) {
                    return;
                }
                //  如果没有病人
                if (!data.length) {
                    return;
                }
                //  第一个病人的id
                const { id } = data[0];
                this.$router.push({ name: 'patientInfo', params: { patientId: id.toString() } });
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
    
    
    /*页面左右分块*/
    .wrap {
        display: flex;
        justify-content: flex-start;
        min-width: 1200px;
    }
    
    /*左侧整体*/
    .left-info {
        width: 300px;
        min-width: 300px;
        max-width: 300px;
        /*background-color: lightyellow;*/
    }
    
    /*右侧整体*/
    .tab-info {
        flex: 1 auto;
        /*border-top: 2px solid #eaecf1;*/
        width: calc(100% - 300px - 200px);
    }
    
    /*右侧菜单切换*/
    .user-list-menu {
        /*padding-top: 1px;*/
        background-color: #eaecf1;
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
        /*height: 48px;*/
        /*line-height: 48px;*/
    }
    
    .ant-menu-horizontal > .ant-menu-item:hover,
    .ant-menu-horizontal > .ant-menu-submenu:hover {
    }
    
    
    /*视口*/
    .router-view {
        height: calc(100vh - 180px);
        overflow: auto;
    }
    
    
    /*左上角病人信息间距*/
    .form .ant-form-item {
        margin-bottom: 2px;
    }
    
    /*就诊信息的小内容间距*/
    .medical-information-list {
        line-height: 38px;
    }
</style>
