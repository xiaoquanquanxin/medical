<template>
    <div class="item-3">
        <a-descriptions
                :title="null"
                bordered
                :column="3"
                size="small"
        >
            <a-descriptions-item label="筛查人">
                {{screenBottomData&&screenBottomData.username}}
            </a-descriptions-item>
            <!--评分日期-->
            <a-descriptions-item label="评分日期">
                <div class="add-form-input">{{screenBottomData&&screenBottomData.ctime}}</div>
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
    };
</script>