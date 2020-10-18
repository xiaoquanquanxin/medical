<template>
    <a-button class="basic-button-width" type="primary" @click="back">返回</a-button>
</template>
<script>
    //  返回按钮
    export default {
        methods: {
            back(){
                this.$router.back();
            }
        }
    };
</script>