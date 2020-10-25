<template>
    <div style="min-width: 1000px;width:100%;">
        <a-row type="flex" justify="start" align="top">
            <a-col style="width:300px;" v-if="true">
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
                        <router-link :to="{name:'addAdmittedHospital'}">
                            <a-button type="primary">新增用户</a-button>
                        </router-link>
                    </div>
                    <a-table
                            :columns="columns"
                            :data-source="data"
                            :pagination="false"
                            :scroll="{x: 'auto', y: 'calc(100vh - 500px)'}"
                            :customRow="customRow"
                    >
                        <!--年龄/性别-->
                        <div slot="info" slot-scope="scope,sItem,sIndex,extra">
                            {{scope.age}}/{{scope.sex===1?'男':'女'}}
                        </div>
                        <!--状态-->
                        <div slot="patientStatus" slot-scope="scope,sItem,sIndex,extra">
                            <span v-if="scope.patientStatus==='1'">入院</span>
                            <span v-if="scope.patientStatus==='2'">出院</span>
                            <span v-if="scope.patientStatus==='3'">永久注销</span>
                        </div>
                    </a-table>
                </a-card>
            </a-col>
            <a-col style="width:calc(100vw - 500px);min-width: 700px;">
                <a-menu v-if="currentMeta"
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
                    <div class="layout-content-inner">
                        <router-view/>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    import { jumpTo } from '@/utils/routerMeta';
    import { requestPatientPage } from '@/api/userList/userList';
    import { calcAgeByBirth, getDateObject } from '@/utils/common';
    import { noPaginationData } from '@/utils/pagination';

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
        },
        data(){
            return {
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
                const data = Object.assign({ param: this.searchData }, noPaginationData);
                requestPatientPage(data)
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.age = calcAgeByBirth(item.birth);
                        });
                        console.log(JSON.parse(JSON.stringify(data.records)));
                        this.data = data.records;
                    });
            },
            jumpTo,
            //  自定义表格事件
            customRow(scope){
                return {
                    on: {
                        click: () => {this.tableClickFn(scope);}
                    }
                };
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
            }
        }
    };
</script>
<style scoped>
    .router-view {
        height: calc(100vh - 180px);
        overflow: auto;
    }
</style>
