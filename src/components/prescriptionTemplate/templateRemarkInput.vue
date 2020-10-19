<template>
    <a-textarea
            placeholder="请输入备注"
            v-model="value"
            @change="setRemark($event.target.value)"
            style="min-height: 60px"
            :auto-size="{ minRows: 5, maxRows: 5 }"
    />
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    //  处方模板管理
    //  增加口服肠内补充方案 - 备注
    export default {
        computed: {
            remark(){
                return this.$store.state.prescriptionTemplate.remark;
            }
        },
        data(){
            return {
                value: this.remark,
            };
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            ...mapActions('prescriptionTemplate', [
                //  设置商品列表数据
                'setRemark',
            ]),
        }
    };
</script>