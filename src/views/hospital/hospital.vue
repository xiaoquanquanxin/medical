<template>
    <div class="layout-content-inner-main">
        <p>医院管理</p>
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input default-value=""/>
                </a-col>
                <a-col :span="5">
                    <a-select default-value="Option1" style="width:100%;">
                        <a-select-option value="Option1">
                            Option1
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select default-value="Option1" style="width:100%;">
                        <a-select-option value="Option1">
                            Option1
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-col :span="5">
                <a-button type="primary" @click="addHospital()">
                    新增医院
                </a-button>
            </a-col>
        </a-input-group>
        <!--表格-->
        <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div
                    slot="a-switch"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a-switch checked-children="开" un-checked-children="关"
                          :default-checked="!!sIndex"
                          @change="aSwitchChange(sItem,sIndex, $event)"
                />
            </div>
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editHospital(scope,sItem,sIndex,extra)">编辑</a>
                    <a @click="relatedDepartments(scope,sItem,sIndex,extra)">关联科室</a>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-input-group">
            <a-pagination
                    v-model="pagination.current"
                    :page-size-options="pagination.pageSizeOptions"
                    :total="pagination.total"
                    show-size-changer
                    :page-size="pagination.pageSize"
                    @showSizeChange="onShowSizeChange"
                    @change="pageChange"
            >
                <template slot="buildOptionText" slot-scope="props">
                    <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                    <span v-if="props.value === '50'">全部</span>
                </template>
            </a-pagination>
        </a-row>
        <!--莫泰框-->
        <a-modal v-model="dialogVisible"
                 :maskClosable="false"
                 centered
                 width="800"
                 title="关联科室"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck()">
            <ShuttleBox v-if="dialogVisible"/>
        </a-modal>
    </div>
</template>
<script>
    //  关联科室 穿梭框
    import ShuttleBox from '@/components/shuttleBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { dialogMethods } from '../../utils/methods';

    const columns = [
        {
            title: '医院名称',
            dataIndex: 'hospital',
            width: 100,
        },
        {
            title: '城市',
            dataIndex: 'city',
            width: 100,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            scopedSlots: { customRender: 'a-switch' },
        },
        {
            title: '医院图标',
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            scopedSlots: { customRender: 'tags' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            hospital: `xx医院`,
            city: '上海',
            status: String(i % 2),
            icon: '医院图标',
            tags: ['编辑', '关联科室'],
        });
    }
    export default {
        components: {
            ShuttleBox,
        },
        computed: {
            ...mapGetters([
                'shuttleBox',
            ]),
            modalTargetKeys(){
                return this.$store.state.shuttleBox.modalTargetKeys;
            }
        },
        data(){
            return {
                data,
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                loading: false,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: { x: 820, y: 'calc(100vh - 398px)' },

                //  分页信息
                pagination: {
                    pageSizeOptions: ['10', '20', '30', '40', '50'],
                    current: 1,
                    pageSize: 10,
                    total: 50,
                },
                //  展示莫泰框
                dialogVisible: false,
            };
        },

        methods: {
            ...dialogMethods,
            //  选中表格数据
            onSelectChange(selectedRowKeys){
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            },
            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
                this.pagination.pageSize = pageSize;
            },
            //  切换分页页码
            pageChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
            },
            //  新增医院
            addHospital(){
                this.$router.push({ path: '/hospital/addHospital' });
            },

            //  切换状态
            aSwitchChange(sItem, sIndex, checked){
                console.log(sItem, sIndex, checked);
            },

            //  编辑医院
            editHospital(scope, sItem, sIndex, extra){
//                console.log(scope);
//                console.log(sItem);
//                console.log(sIndex);
//                console.log(extra);
//                console.log(sIndex)
                //
                this.$router.push({ name: 'editHospital', params: { hospitalId: sIndex } });
            },
            //  关联科室
            relatedDepartments(scope, sItem, sIndex, extra){
                this.showModal();
            },
            //  检查莫泰框的值
            modalCheck(){
                console.log(this.modalTargetKeys);
                console.log('发请求吧');
                return;
                this.hideModal();
            },
        },
    };
</script>
<style scoped lang="stylus">
</style>


