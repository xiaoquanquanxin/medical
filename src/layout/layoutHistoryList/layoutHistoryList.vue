<template>
    <div class="history-list" v-show="!hiddenHistory" id="layoutHistory" v-if="currentMeta">
        <!--<template v-for="(item , index) in historyRouteList">
            <a-divider type="vertical"/>
            <router-link :to="{name:item.name}"
                         :class="item.highlight?'highlight':'nonactivated'"
            >{{item.chName}}
            </router-link>
        </template>-->
        <!--        <a-divider type="vertical"/>-->
        <a-menu
                :selectedKeys="[currentMeta.selectRouteKey||'']"
                mode="horizontal"
        >
            <a-menu-item
                    :key="item.name"
                    v-for="(item , index) in historyRouteList"
            >
                <router-link :to="{name:item.name}">
                    <span>{{item.chName}}</span>
                    <span @click="deleteHistory($event,item)">x</span>
                </router-link>
            </a-menu-item>
        </a-menu>
    </div>
</template>
<script>
    export default {
        watch: {
            $route(value){
                //  console.log(this.currentMeta);
                this.routeChange();
            }
        },
        computed: {
            //  当前激活路由的元信息
            currentMeta(){
                const { currentMeta } = this.$store.state.routeList;
                return currentMeta;
            }
        },
        data(){
            return {
                //  路由表的对象
                historyRouteMap: {},
                //  路由表的list，用于渲染
                historyRouteList: [],
                //  隐藏历史记录
                hiddenHistory: false,
            };
        },
        methods: {
            //  当路由改变
            routeChange(){
                let { name, meta } = this.$route;
                let { chName, hiddenHistory, infoForHistory } = meta;
                if (infoForHistory) {
                    chName = infoForHistory[0];
                    name = infoForHistory[1];
                }
                //  console.log(name, chName, hiddenHistory);
                this.hiddenHistory = hiddenHistory;
                //  如果隐藏历史记录，就不应该被记录
                if (hiddenHistory) {
                    return;
                }
                //  取消全部高亮
                this.historyRouteList.forEach((item, index) => {
                    item.highlight = false;
                });
                //  如果已经存在
                if (this.historyRouteMap[name]) {
                    //  设置高亮
                    this.historyRouteMap[name].highlight = true;
                    return;
                }
                //  如果不存在，新建
                const routeItem = { name, chName, highlight: true };
                //  新增key
                this.historyRouteMap[name] = routeItem;
                //  新增list的item
                this.historyRouteList.push(routeItem);
            },
            //
            deleteHistory($event, item){
                debugger
                console.log($event, item);
            }
        }
    };
</script>
<style scoped>
    /*历史记录*/
    .history-list {
        height: 50px;
        line-height: 50px;
        background-color: white;
        /*border-top: none;*/
        /*border-bottom: 1px solid #e8e8e8;*/
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        white-space: nowrap;
    }
    
    /*高亮*/
    .highlight {
        color: #1890ff;
    }
    
    /*未激活*/
    .nonactivated {
        color: grey;
    }
</style>
