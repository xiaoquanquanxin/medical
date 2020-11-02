<template>
    <a-table
            :columns="columns"
            :data-source="distributorsList"
            :scroll="modalTableScroll"
            :pagination="false"
            :row-selection="{
                onChange: onSelectChange,
                selectedRowKeys: selectedRowKeys,
                type:'radio'
            }"
    >
        <!--渠道商地区-->
        <div slot="area" slot-scope="scope,sItem,sIndex,extra">
            {{scope.province}}-{{scope.city}}
        </div>
        <!--状态-->
        <div slot="status" slot-scope="scope,sItem,sIndex,extra">
            <span v-if="scope.status">开</span>
            <span v-else>关</span>
        </div>
    </a-table>
</template>
<script>
    import { modalTableScroll } from '@/utils/tableScroll';

    const columns = [
        {
            title: '渠道商名称',
            dataIndex: 'channelBusinessName',
            width: 100,
        },
        {
            title: '渠道商地区',
            scopedSlots: { customRender: 'area' },
            width: 100,
        },
        {
            title: '状态',
            width: 100,
            scopedSlots: { customRender: 'status' },
        },
    ];
    export default {
        computed: {
            distributorsList(){
                return this.$store.state.hospital.distributorsList;
            },
        },
        props: ['selectedRowKey'],
        data(){
            return {
                columns,
                //	弹框table的scroll
                modalTableScroll,
                //  默认被选中的值
                selectedRowKeys: [this.selectedRowKey]
            };
        },
        created(){
            console.log(this.selectedRowKey);
            console.log(this.selectedRowKeys);
        },
        methods: {
            //  单选
            onSelectChange(e){
                this.selectedRowKeys = e;
            },
            //  提交
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    if (this.selectedRowKeys.length) {
                        resolve(this.selectedRowKeys);
                    } else {
                        this.$message.error('请选择渠道商');
                        reject();
                    }
                });
            }
        }
    };
</script>