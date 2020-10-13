<template>
    <div style="min-width: 1000px;width:100%;">
        <a-row type="flex" justify="start" align="top">
            <a-col style="width:300px;" v-if="true">
                <a-card title="就诊信息">
                    <a-form class="form"
                            v-bind="{
                                 labelCol: { span: 7 },
                                 wrapperCol: { offset: 1, span: 16 },
                            }"
                            autocomplete="off"
                    >
                        <a-form-item label="姓名">
                            <a-input placeholder="请输入姓名"/>
                        </a-form-item>
                        <a-form-item label="身份证号">
                            <a-input placeholder="请输入身份证号"/>
                        </a-form-item>
                        <a-button type="primary">
                            搜索
                        </a-button>
                    </a-form>
                </a-card>
                <a-card title="病人列表">
                    <router-link :to="{name:'addAdmittedHospital'}">
                        <a-button type="primary">
                            新增用户
                        </a-button>
                    </router-link>
                    <a-table
                            :columns="columns"
                            :data-source="data"
                            :pagination="false"
                            :scroll="{x: 'auto', y: 'calc(100vh - 500px)'}"
                            :customRow="customRow"
                    >
                        <!--单位-->
                        <div slot="info" slot-scope="scope,sItem,sIndex,extra">
                            {{scope.age}}/{{scope.sex}}
                        </div>
                    </a-table>
                </a-card>
            </a-col>
            <a-col style="min-width:calc(100% - 300px);">
                <a-menu v-if="currentMeta"
                        v-model="transverseSubPaths"
                        mode="horizontal">
                    <a-menu-item
                            v-for="item in userRouteList"
                            :key="item.name"
                            @click="userListJumpTo(item)"
                    >
                        {{item.meta.chName}}
                    </a-menu-item>
                </a-menu>
                <div class="router-view">
                    <div>
                        <router-view/>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    import { jumpTo } from '@/utils/routerMeta';

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
            dataIndex: 'status',
            width: 90,
        },
    ];
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            key: i,
            age: i,
            sex: '男',
            status: '出院',
            name: 't-mac'
        });
    }

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
                this.transverseSubPaths = [currentMeta.transverseSubPaths || ''];
                return currentMeta;
            },
        },
        data(){
            return {
                //  横向二级路由
                transverseSubPaths: [],

                columns,
                data,
            };
        },
        methods: {
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
                console.log('选中的列表的id ', scope.key);
                //  todo    区分点击的是谁
                this.$router.push({ name: 'patientInfo', params: { patientInfoId: scope.key.toString() } });
            },

            //  横向路由列表，点击去哪儿
            userListJumpTo(item){
                //  原来的路由参数
                const { meta: prevMeta, params } = this.$route;
                //  console.log(prevMeta.routerParamsKey, params);
                //  参数值
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
        width: calc(100vw - 500px);
        overflow: auto;
    }
    
    .router-view > div {
        min-width: 800px;
    }
</style>
