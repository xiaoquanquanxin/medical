<template>
    <div style="min-width: 1000px;">
        <a-row type="flex" justify="start" align="top">
            <a-col style="width:300px;">
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
                    <a-table
                            :columns="columns"
                            :data-source="data"
                            :pagination="false"
                            :scroll="{x: 'auto', y: 'calc(100vh - 500px)'}"
                    >
                        <!--单位-->
                        <div slot="info" slot-scope="scope,sItem,sIndex,extra">
                            {{scope.age}}/{{scope.sex}}
                        </div>
                    </a-table>
                </a-card>
            </a-col>
            <a-col style="width:calc(100% - 300px);">
                <a-menu v-if="currentMeta"
                        v-model="transverseSubPaths"
                        mode="horizontal">
                    <a-menu-item
                            v-for="item in userRouteList"
                            :key="item.name"
                            @click="jumpTo(item)"
                    >
                        {{item.meta.chName}}
                    </a-menu-item>
                </a-menu>
                <router-view/>
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
                return currentMeta;
            }
        },
        data(){
            return {
                //  横向二级路由
                transverseSubPaths: [],

                columns,
                data,
            };
        },
        created(){
            //	是scheme路由的某一项子路由
            this.transverseSubPaths = [this.currentMeta.transverseSubPaths];
        },
        methods: {
            jumpTo,
        }
    };
</script>
<style scoped>
    .ant-card-head-title {
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
