<template>
    <a-textarea
            placeholder="请输入备注"
            v-model="value"
            @change="setRemark($event.target.value)"
            :style="style"
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
            },
            style(){
                return {
                    minHeight: `${this.$store.state.prescriptionTemplate.rowForRemark * 54 - 16 * 2}px`
                };
            },
        },
        data(){
            return {
                value: this.remark,
            };
        },
        $watch: {
            remark(value){
                this.value = value;
            }
        },
        created(){
            this.value = this.remark;
        },
        methods: {
            ...mapActions('prescriptionTemplate', [
                //  设置商品列表数据
                'setRemark',
            ]),
        }
    };
</script>