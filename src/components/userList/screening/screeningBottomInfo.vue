<template>
    <div class="item-3">
        <a-descriptions
                :title="null"
                bordered
                :column="3"
                size="small"
        >
            <a-descriptions-item label="筛查人">
                {{screenBottomData&&screenBottomData[0].a}}
            </a-descriptions-item>
            <!--评分日期-->
            <a-descriptions-item label="评分日期">
                {{screenBottomData&&screenBottomData[0].c}}
            </a-descriptions-item>
            <a-descriptions-item label="评分时间">
                {{screenBottomData&&screenBottomData[0].e}}
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>
<script>
    //  底部信息
    export default {
        computed: {
            //  筛查人底部信息
            screenBottomData(){
                //  console.log(this.$store.state.userList.screeningInfo);
                return this.$store.state.userList.screeningInfo.screenBottomData;
            },
        },
        data(){
            return {
                //  评分日期的值
                selectDateValue: null,
                //  评分时间的值
                selectTimeValue: null,
            };
        },
        methods: {}
    };
</script>