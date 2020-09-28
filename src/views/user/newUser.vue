<template>
    <div v-if="id">编辑的id ：{{id}}</div>
    <div v-else>新增用户</div>
</template>
<script>
    export default {
        name: 'UserManagementDetail',
        data(){
            return {
                id: null
            };
        },
        created(){
            const { id } = this.$route.params;
            console.log(id);
            this.id = id;
        }
    };
</script>
<style lang="stylus">
</style>