<template>
    <div class="table-in-box">
        <a-form class="form"
                autocomplete="off"
                v-bind="formItemLayout"
        >
            <a-form-item label="发货数量">323223</a-form-item>
            <a-form-item label="选择物流公司">323223</a-form-item>
            <a-form-item label="生成快递单号">323223</a-form-item>
            <a-form-item label="备注">323223</a-form-item>
            <a-form-item label="报损">323223</a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestPurchaseOrderGet } from '../../api/warehouse/purchaseOrder';

    export default {
        computed: {
            //  发货id
            procurementId(){
                return this.$store.state.warehouse.procurementId;
            }
        },
        data(){
            return {
                formItemLayout,
            };
        },
        created(){
            console.log(this.procurementId);
            this.searchFn();
        },
        methods: {
            searchFn(){
                requestPurchaseOrderGet(this.procurementId)
                    .then(v => {
                        console.log(v);
                    });
            }
        }
    };
</script>
