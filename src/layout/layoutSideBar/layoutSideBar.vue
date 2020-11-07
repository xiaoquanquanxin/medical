<template>
    <a-layout-sider v-model="collapsed" :trigger="null" class="slider">
        <div class="logo">
            <img :src="menuLogo" alt="">
        </div>
        <div class="menu-wrapper">
            <a-menu v-if="(currentMeta)"
                    :default-open-keys="[currentMeta.openRouteKey||'']"
                    :selectedKeys="[currentMeta.selectRouteKey||'']"
                    mode="inline"
                    theme="dark"
                    :inline-collapsed="collapsed"
                    :class="platform.mac?'menu-list':''"
            >
                <template
                        v-for="(item , index) in routes"
                        v-if="!item.meta.hidden"
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
                                  v-if="!_item.meta.hidden"
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
<script>
    import menuLogo from '@/assets/menu-logo.png';
    import { mapGetters } from 'vuex';
    import { jumpTo } from '@/utils/routerMeta';
    import { platform } from '@/utils/common';

    export default {
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
        data(){
            return {
                menuLogo,
                platform,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
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
    }
    
    /*菜单logo*/
    .logo {
        text-align: center;
        color: white;
        vertical-align: middle;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
        padding: 4px 0;
    }
</style>