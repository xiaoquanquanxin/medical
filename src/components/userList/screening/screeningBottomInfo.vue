<template>
    <div class="item-3">
        <a-descriptions
                :title="null"
                bordered
                :column="3"
                size="small"
        >
            <a-descriptions-item label="筛查人">
                <a-input placeholder="请输入筛查人"
                         class="basic-input-width"
                />
            </a-descriptions-item>
            <!--选择日期-->
            <a-descriptions-item label="选择日期">
                <a-date-picker
                        placeholder="请选择日期"
                        v-model="selectDateMoment"
                        @change="onDateChange"
                        class="basic-select-width"
                />
            </a-descriptions-item>
            <a-descriptions-item label="选择时间">
                <a-time-picker
                        placeholder="请选择时间"
                        v-model="selectTimeMoment"
                        @change="selectTimeChange"
                        class="basic-select-width"
                        format="HH:mm"
                />
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>
<script>
    //  底部信息
    export default {
        computed: {
            screenBottomData(){
                //  console.log(this.$store.state.userList.screeningInfo);
                return this.$store.state.userList.screeningInfo.screenBottomData;
            }
        },
        data(){
            return {
                //  选择日期的值的对象
                selectDateMoment: null,
                //  选择日期的值
                selectDateValue: null,
                //  选择时间的值的对象
                selectTimeMoment: null,
                //  选择时间的值
                selectTimeValue: null,
            };
        },

        watch: {
            screenBottomData(value){
                //  console.log(value)
            }
        },
        created(){
//            setTimeout(() => {
//                console.table(JSON.parse(JSON.stringify(this.screenBottomData)));
//            }, 332);
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            //  选择过期日期
            onDateChange(value, selectDateValue){
                console.log(selectDateValue);

            },
            //  选择时间的变换
            selectTimeChange(value, selectTimeValue){
                console.log(selectTimeValue);
                this.selectTimeValue = selectTimeValue;
            },
        }
    };
</script>