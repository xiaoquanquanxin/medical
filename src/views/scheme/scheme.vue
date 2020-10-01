<template>
    <div>
        <a-menu v-if="currentMeta"
                v-model="userSelectKey"
                mode="horizontal">
            <a-menu-item
                    v-for="item in userRouteList"
                    :key="item.name"
                    @click="jumpTo(item)"
            >
                <a-icon type="mail"/>
                {{item.meta.chName}}
            </a-menu-item>
        </a-menu>
        <router-view/>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { jumpTo } from '@/utils/routerMeta';

    export default {
        computed: {
            ...mapGetters([
                'routeList',
            ]),
            userRouteList(){
                const { userRouteList } = this.$store.state.routeList;
                //  console.table(TOJSON(userRouteList)[0]);
                return userRouteList;
            },
            currentMeta(){
                const { currentMeta } = this.$store.state.routeList;
                return currentMeta;
            }
        },
        data(){
            return {
                userSelectKey: []
            };
        },
        created(){
            this.userSelectKey = [this.currentMeta.userSelectKey];
        },
        methods: {
            jumpTo,
        }
    };
</script>
<style scoped lang="stylus">
</style>
