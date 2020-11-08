<template>
    <div class="history-list" v-show="!hiddenHistory" id="layoutHistory" v-if="currentMeta">
        <a-menu style="padding-right: 5px;"
                :selectedKeys="[currentMeta.selectRouteKey||'']"
                mode="horizontal"
        >
            <a-menu-item
                    :key="item.name"
                    v-for="(item , index) in historyRouteList"
            >
                <div class="history-item">
                    <span class="router-link-item">
                        <router-link :to="{name:item.name}">
                            <span class="router-link-span">{{item.chName}}</span>
                        </router-link>
                    </span>
                    <b @click="deleteHistory($event,item,index)"
                       class="close-svg"
                       v-if="historyRouteList.length>=2"
                    >
                        <svg viewBox="64 64 896 896" data-icon="close" width="0.8em" height="0.8em" fill="currentColor"
                             aria-hidden="true" focusable="false" class="">
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                        </svg>
                    </b>
                </div>
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
            //  删除历史记录
            deleteHistory(e, item, index){
                e.stopPropagation();
                //  至少保留1个
                if (this.historyRouteList.length < 2) {
                    return;
                }
                const deleteItem = this.historyRouteList.splice(index, 1);
                const { name } = deleteItem[0];
                //  console.log(this.historyRouteMap, name);
                delete this.historyRouteMap[name];

                try {
                    let { meta } = this.$route;
                    let { infoForHistory } = meta;
                    if (name === this.$route.name || name === (infoForHistory && infoForHistory[1])) {
                        console.log('关闭了当前的');
                        const activeIndex = Math.min(this.historyRouteList.length - 1, index);
                        this.$router.push({ name: this.historyRouteList[activeIndex].name });
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };
</script>
<style scoped>
    /*历史记录*/
    .history-list {
        height: 40px;
        line-height: 40px;
        /*background-color: #eaecf1;*/
        /*border-top: none;*/
        /*不能去掉border-bottom*/
        border-bottom: 1px solid #e8e8e8;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        white-space: nowrap;
    }
    
    
    .history-item {
        /*border: 1px solid #e8e8e8;*/
        /*border-bottom: none;*/
        border-radius: 4px 4px 0 0;
        margin: 0 -20px;
        padding: 0 15px;
        box-sizing: content-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .router-link-item {
        flex: auto;
    }
    
    /*文字*/
    .router-link-span {
        color: grey;
        display: inline-block;
        /*background-color: pink;*/
    }
    
    
    /*关闭*/
    .close-svg {
        color: grey !important;
        vertical-align: middle;
        margin: 0 -4px 0 4px;
        flex: 1;
    }
</style>
