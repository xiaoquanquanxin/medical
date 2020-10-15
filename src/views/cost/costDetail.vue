<template>
    <div>收计费详情</div>
</template>
<script>
    export default {
        data(){
            return {
                returnPremiumDetailId: this.$route.params.returnPremiumDetailId,
                paymentRecordsDetailId: this.$route.params.paymentRecordsDetailId,
            };
        },
        created(){
            console.log('是退费', this.returnPremiumDetailId);
            console.log('是缴费', this.paymentRecordsDetailId);
        }
    };
</script>