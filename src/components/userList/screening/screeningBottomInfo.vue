<template>
    <a-table
            :columns="screenBottomColumns"
            :data-source="screenBottomData"
            :pagination="false"
            :showHeader="false"
            bordered
    >
        <div slot="screeningPeople" slot-scope="scope,sItem,sIndex,extra">
            <a-input placeholder="请输入筛查人"/>
        </div>
        <div slot="date" slot-scope="scope,sItem,sIndex,extra">
            <a-date-picker
                    addon-before="选择日期："
                    placeholder="请选择日期"
                    @change="onDateChange"
            />
        </div>
        <div slot="time" slot-scope="scope,sItem,sIndex,extra">
            <a-time-picker addon-before="选择时间："
                           v-model="selectTimeMoment"
                           @change="selectTimeChange"
                           format="HH:mm"/>
        </div>
    </a-table>
</template>
<script>
    //  底部信息
    const screenBottomColumns = [
        {
            dataIndex: 'a',
        },
        {
            dataIndex: 'b',
            scopedSlots: { customRender: 'screeningPeople' },
        },
        {
            dataIndex: 'c',
        },
        {
            dataIndex: 'd',
            scopedSlots: { customRender: 'date' }
        },
        {
            dataIndex: 'e',
        },
        {
            dataIndex: 'f',
            scopedSlots: { customRender: 'time' }
        },
    ];

    //  底部信息
    export default {
        computed: {
            screenBottomData(){
                return this.$store.state.userList.screeningInfo.screenBottomData;
            }
        },
        data(){
            return {
                //  选择时间的值的对象
                selectTimeMoment: null,
                //  选择时间的值
                selectTimeValue: null,
                //  底部信息
                screenBottomColumns,
            };
        },
        created(){
            console.table(JSON.parse(JSON.stringify(this.screenBottomData[0])));
        },
        methods: {
            //  选择过期日期
            onDateChange(value, selectDateValue){
                console.log(selectDateValue);
            },
            //  选择时间的变换
            selectTimeChange(value, selectTimeValue){
                this.selectTimeValue = selectTimeValue;
            },
        }
    };
</script>