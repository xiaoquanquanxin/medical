<template>
    <div class="layout-content-inner-main">
        <!--表单头-->
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
            <a-button class="basic-button-width" type="primary" v-print="printObj">打印</a-button>
        </div>
        <div id="printContent">
            <p class="a-input-group">
                <b>状态：已领药</b>
            </p>
            <!--基础表格-->
            <BasicInfoTable
                    :data-source="basicInfoData"
            />
            <br>
            <!--口服肠内营养补充-->
            <OralLikeBasicTable
                    :data-title="oralDataTitle"
                    :data-source="oralData"
            />
            <br>
            <!--肠内营养支持-->
            <OralLikeBasicTable
                    :data-title="intestinalDataTitle" :data-source="intestinalData"
            />
            <br>
            <!--能量表-->
            <EnergyTable
                    :data-source="energyData"
            />
        </div>
    </div>
</template>
<script>
    //  基础数据
    import BasicInfoTable from '@/components/detailsTable/basicInfoTable.vue';
    //  类似于口服的基础数据table
    import OralLikeBasicTable from '@/components/detailsTable/oralLikeBasicTable.vue';
    //  能量
    import EnergyTable from '@/components/detailsTable/energyTable.vue';
    import GoBackButton from '@/components/goBackButton.vue';

    export default {
        components: {
            GoBackButton,
            BasicInfoTable,
            OralLikeBasicTable,
            EnergyTable,
        },
        data(){
            return {
                orderDetailId: this.$route.params.orderDetailId,
                //  表单数据
                formData: {
                    //  订单状态
                    status: 2,
                    //  食用方法
                    eatingWay1: 1,
                    //  食用方法
                    eatingWay2: 1,
                },

                //  基础数据
                basicInfoData: [{
                    key: 1,
                    planName: '许晓飞123',
                    cycle: '年',
                    prescriptionType: '吃',
                    cost: '¥20',
                }],

                //  口服数据
                oralDataTitle: {
                    name: '口服肠内营养补充',
                    method: '方法1',
                },
                oralData: [
                    {
                        key: 1,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 43,
                    }, {
                        key: 2,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 433,
                    }
                ],

                //  肠内数据
                intestinalDataTitle: {
                    name: '肠内营养补充',
                    method: '方法3',
                },
                intestinalData: [
                    {
                        key: 1,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 433,
                    }, {
                        key: 2,
                        commodityName: '许晓飞123',
                        buyer: '年',
                        unitPrice: '吃',
                        quantity: '¥20',
                        subtotal: 433,
                    }
                ],

                //  能量数据
                energyData: [{
                    key: 1,
                    energy: 123,
                    protein: 234,
                    fat: 345,
                    carbohydrates: 456,
                }],

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '订单详情',
                }
            };
        },
        created(){
            console.log(this.orderDetailId);
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
        }
    };
</script>
