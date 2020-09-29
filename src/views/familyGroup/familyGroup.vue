<template>
    <div class="layout-content-inner-main">
        <p>家庭组</p>
        <a-table
                :columns="columns"
                :data-source="data"
                bordered
                size="middle"
                :pagination="false"
                :scroll="{ x: 1000,y: 240 }"
        >
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a @click="exitFamilyGroup(sItem,sIndex,extra)">退出</a>
            </div>
        </a-table>
        <br>
        <a-table
                :columns="columns"
                :data-source="data"
                bordered
                size="middle"
                :pagination="false"
                :scroll="{ x: 1000,y: 240 }"
        >
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a @click="exitFamilyGroup(sItem,sIndex,extra)">退出</a>
            </div>
        </a-table>
    </div>
</template>
<script>
    const columns = [
        {
            title: '家庭组',
            children: [
                {
                    title: '名字',
                    dataIndex: 'name',
                    //  width: 100,
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    //  width: 100,
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    //  width: 100,
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    //  width: 100,
                },
                {
                    title: '是否是患者',
                    dataIndex: 'isError',
                    //  width: 100,
                },
                {
                    title: '群主',
                    dataIndex: 'isGroupManager',
                    //  width: 100,
                },
                {
                    title: 'MDT',
                    dataIndex: 'MDT',
                    //  width: 100,
                },
                {
                    title: '操作',
                    dataIndex: 'tags',
                    key: 'tags',
                    scopedSlots: { customRender: 'tags' },
                },
            ],
        },
    ];

    const data = [];
    for (let i = 0; i < 3; i++) {
        data.push({
            key: i,
            name: 'John Brown',
            age: i + 1,
            street: 'Lake Park',
            building: 'C',
            number: 2035,
            companyAddress: 'Lake Street 42',
            companyName: 'SoftLake Co',
            gender: 'M',
        });
    }

    export default {
        data(){
            return {
                data,
                columns,
            };
        },
        methods: {
            exitFamilyGroup(sItem){
                console.log(sItem);
                this.$confirm({
                    title: `确定退出${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            }
        }
    };
</script>
<style scoped lang="stylus">
</style>
