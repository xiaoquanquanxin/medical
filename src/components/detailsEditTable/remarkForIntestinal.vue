<template>
    <a-textarea
            placeholder="请输入备注"
            v-model="value"
            @change="setIntestinalRemark($event.target.value)"
            :style="style"
    />
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    //  处方模板管理
    //  增加口服肠内补充方案 - 备注
    export default {
        computed: {
            intestinalRemark(){
                debugger
                return this.$store.state.intervention.intestinalRemark;
            },
            style(){
                return {
                    //  minHeight: `${this.$store.state.intervention.rowForRemark * 54 - 16 * 2}px`
                };
            },
        },
        data(){
            return {
                value: this.intestinalRemark,
            };
        },
        $watch: {
            intestinalRemark(value){
                this.value = value;
            }
        },
        created(){
            this.value = this.intestinalRemark;
        },
        methods: {
            ...mapActions('intervention', [
                //  设置商品列表数据
                'setIntestinalRemark',
            ]),
        }
    };
</script>