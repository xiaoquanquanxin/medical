<template>
    <div class="history-list" v-show="!hiddenHistory">
        <template v-for="item in historyRouteList">
            <a-divider type="vertical"/>
            <router-link :to="{name:item.name}"
                         :class="item.highlight?'highlight':'nonactivated'"
            >{{item.chName}}
            </router-link>
        </template>
    </div>
</template>
<script>
    export default {
        watch: {
            $route(){
                this.routeChange();
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
            //  主要请求
            searchFn(){

            },
            //  当路由改变
            routeChange(){
                let { name, meta } = this.$route;
                let { chName, hiddenHistory, historyRouteName } = meta;
                name = historyRouteName || name;
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
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        overflow-x: auto;
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
