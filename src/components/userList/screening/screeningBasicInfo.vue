<template>
    <a-table
            :columns="columns"
            :data-source="screeningBasicInfo"
            :pagination="false"
            :showHeader="false"
            bordered
    >
    </a-table>
</template>
<script>
    //  基础信息
    const columns = [
        {
            dataIndex: 'a',
        },
        {
            dataIndex: 'b',
        },
        {
            dataIndex: 'c',
        },
        {
            dataIndex: 'd',
        },
        {
            dataIndex: 'e',
        },
        {
            dataIndex: 'f',
        },
    ];
    //  基础信息
    export default {
        computed: {
            screeningBasicInfo(){
                return this.$store.state.userList.screeningInfo.screeningBasicInfo;
            }
        },
        data(){
            return {
                columns,

            };
        }
    };
</script>