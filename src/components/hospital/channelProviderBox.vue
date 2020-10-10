<template>
    <a-table
            :columns="columns"
            :data-source="data"
            :scroll="modalTableScroll"
            :pagination="false"
            :row-selection="{
                onChange: onSelectChange,
                selectedRowKeys: selectedRowKeys,
                type:'radio'
            }"
    >
    </a-table>
</template>
<script>
    import { modalTableScroll } from '../../utils/tableScroll';

    const columns = [
        {
            title: '医院名称',
            dataIndex: 'hospital',
            width: 100,
        },
        {
            title: '渠道商地区',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            scopedSlots: { customRender: 'a-switch' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            index: i,
            key: i,
            hospital: `xx医院`,
            city: '上海',
            status: String(i % 2),
            icon: '医院图标',
        });
    }
    export default {
        computed: {
            distributorsId(){
                return this.$store.state.hospital.distributorsId;
            },
        },
        data(){
            return {
                data,
                columns,
                //	弹框table的scroll
                modalTableScroll,
                //  默认被选中的值
                selectedRowKeys: [3]
            };
        },
        created(){
            console.log(this.distributorsId);
        },
        methods: {
            //  单选
            onSelectChange(e){
                this.selectedRowKeys = e;
            },
            //  提交
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.selectedRowKeys);
                    if (this.selectedRowKeys.length) {
                        resolve();
                    } else {
                        reject();
                    }
                }))
                    .then(v => {
                        return new Promise(((resolve, reject) => {
                            console.log('发请求吧');
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }));
                    });
            }
        }
    };
</script>