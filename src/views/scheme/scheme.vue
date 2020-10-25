<template>
    <div>
        <a-menu v-if="currentMeta"
                v-model="transverseSubPaths1"
                mode="horizontal">
            <a-menu-item
                    v-for="(item , index) in templateRouteList"
                    :key="item.name"
                    @click="jumpTo(item)"
            >
                {{item.meta.chName}}
            </a-menu-item>
        </a-menu>
        <router-view/>
    </div>
</template>
<script>
    import { jumpTo } from '@/utils/routerMeta';

    //  处方模板管理
    export default {
        computed: {
            templateRouteList(){
                const { templateRouteList } = this.$store.state.routeList;
                //  console.table(TOJSON(templateRouteList)[0]);
                return templateRouteList;
            },
            //  当前激活路由的元信息
            currentMeta(){
                const { currentMeta } = this.$store.state.routeList;
                this.transverseSubPaths1 = [currentMeta.transverseSubPaths1 || ''];
                return currentMeta;
            }
        },
        data(){
            return {
                //  横向二级路由
                transverseSubPaths1: [],
            };
        },
        methods: {
            jumpTo,
        }
    };
</script>