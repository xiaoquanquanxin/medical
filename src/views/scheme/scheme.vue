<template>
    <div>
        <a-menu v-if="currentMeta"
                v-model="transverseSubPaths"
                mode="horizontal">
            <a-menu-item
                    v-for="(item , index) in userRouteList"
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
            userRouteList(){
                const { userRouteList } = this.$store.state.routeList;
                //  console.table(TOJSON(userRouteList)[0]);
                return userRouteList;
            },
            //  当前激活路由的元信息
            currentMeta(){
                const { currentMeta } = this.$store.state.routeList;
                this.transverseSubPaths = [currentMeta.transverseSubPaths || ''];
                return currentMeta;
            }
        },
        data(){
            return {
                //  横向二级路由
                transverseSubPaths: [],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            jumpTo,
        }
    };
</script>