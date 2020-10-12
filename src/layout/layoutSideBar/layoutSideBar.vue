<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible="" class="slider">
        <div class="logo"></div>
        <div class="menu-wrapper">
            <a-menu v-if="(currentMeta)"
                    :default-open-keys="[currentMeta.openRouteKey||'']"
                    :selectedKeys="[selectRouteKey]"
                    mode="inline"
                    theme="dark"
                    :inline-collapsed="collapsed"
                    class="menu-list"
            >
                <template
                        v-for="item in routes"
                        v-if="!item.hidden"
                >
                    <a-menu-item
                            v-if="item.meta.isMenuItem || !item.children"
                            :key=item.name
                            @click="jumpTo(item)"
                    >
                        <a-icon type="calendar"/>
                        <span>{{item.meta.chName}}</span>
                    </a-menu-item>
                    <a-sub-menu v-else
                                :key="item.name"
                    >
                    <span slot="title">
                        <a-icon type="appstore"/>
                        <span>{{item.meta.chName}}</span>
                    </span>
                        <template v-for="_item in item.children"
                                  v-if="!_item.hidden"
                        >
                            <a-menu-item :key="_item.name"
                                         v-if="!_item.children"
                                         @click="jumpTo(_item)">
                                <span>{{_item.meta.chName}}</span>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                </template>
            </a-menu>
        </div>
    </a-layout-sider>
</template>
<!--:default-selected-keys="[currentMeta.selectRouteKey||'']"-->
<script>
    import { mapGetters } from 'vuex';
    import { jumpTo } from '@/utils/routerMeta';

    export default {
        name: 'layoutSideBar',
        computed: {
            ...mapGetters([
                'routeList',
                'sidebar'
            ]),
            collapsed(){
                return this.$store.state.sidebar.collapsed;
            },
            routes(){
                const { routes } = this.$store.state.routeList;
                return routes;
            },
            //  当前激活路由的元信息
            currentMeta(){
                const { currentMeta } = this.$store.state.routeList;
                return currentMeta;
            }
        },
        watch: {
            $route(value){
                //  console.table(JSON.parse(JSON.stringify(value.meta)));
                //  因为有404所以需要 '' 兜底
                this.selectRouteKey = value.meta.selectRouteKey || '';
            }
        },
        data(){
            return {
                //  蓝色、激活、被选中的菜单
                selectRouteKey: '',
            };
        },
        methods: {
            jumpTo,
        }

    };
</script>
<style scoped>
    .slider {
        overflow: hidden;
    }
    
    .menu-wrapper {
        position: relative;
        padding-bottom: 20px;
        height: calc(100vh - 52px);
        width: calc(100% + 20px);
        overflow: scroll;
    }
    
    .menu-list {
        width: calc(100% - 20px);
        position: relative;
        box-sizing: border-box;
    }
</style>
