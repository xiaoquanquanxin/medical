<template>
    <div class="table-in-box">
        <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
                bordered
        >
            <!--单位-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="exitFamilyGroup(sItem)">退出</a>
                </a-space>
            </div>
        </a-table>
        <br>
        <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
                bordered
        >
            <!--单位-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="exitFamilyGroup(sItem)">退出</a>
                </a-space>
            </div>
        </a-table>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '手机号',
            dataIndex: 'phoneNumber',
            width: 100,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
        },
        {
            title: '角色',
            dataIndex: 'role',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' }
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: '许晓飞',
            sex: 1,
            familyGroup: 'xxx',
        });
    }
    //  家庭组
    export default {
        computed: {
            ...mapGetters([
                'familyGroup',
            ]),
            viewFamilyGroupId(){
                return this.$store.state.familyGroup.viewFamilyGroupId;
            },
        },
        data(){
            return {
                data,
                columns,
            };
        },
        created(){
            console.log(this.viewFamilyGroupId);
        },
        mounted(){

        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
            //  退出家庭组
            exitFamilyGroup(sItem){
                this.$confirm({
                    title: `确定退出${sItem.disease}`,
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