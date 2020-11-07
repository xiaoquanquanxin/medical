<template>
    <a-textarea
            placeholder="请输入备注"
            v-model="value"
            @change="setOralRemark($event.target.value)"
            :style="style"
    />
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    //  处方模板管理
    //  增加口服肠内补充方案 - 备注
    export default {
        computed: {
            oralRemark(){
                return this.$store.state.intervention.oralRemark;
            },
            style(){
                return {
                    //  minHeight: `${this.$store.state.intervention.rowForRemark * 54 - 16 * 2}px`
                };
            },
        },
        data(){
            return {
                value: this.oralRemark,
            };
        },
        $watch: {
            oralRemark(value){
                console.log(value);
                this.value = value;
            }
        },
        created(){
            console.log(this.oralRemark);
            this.value = this.oralRemark;
        },
        methods: {
            ...mapActions('intervention', [
                //  设置商品列表数据
                'setOralRemark',
            ]),
        }
    };
</script>