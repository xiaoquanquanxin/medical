<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input default-value="" placeholder="请输入医院名称"/>
                </a-col>
                <a-col :span="5">
                    <a-select default-value="''" style="width:100%;">
                        <a-select-option value="''">
                            省市
                        </a-select-option>
                        <a-select-option value="Option1">
                            Option1
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select default-value="1" style="width:100%;">
                        <a-select-option value="1">
                            正常
                        </a-select-option>
                        <a-select-option value="0">
                            关闭
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
                <router-link :to="{name:'addHospital'}">
                    <a-button type="primary">
                        新增医院
                    </a-button>
                </router-link>
            </a-col>
        </a-input-group>
        <!--表格-->
        <a-table
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
                          @change="aSwitchChange(sItem,$event)"
                />
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editHospital(sItem)">编辑</a>
                    <a @click="relatedDepartments(sItem)">关联科室</a>
                    <a @click="associatedChannelProvider(sItem)">关联渠道商</a>
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
                    <span>{{ props.value }}条/页</span>
                </template>
            </a-pagination>
        </a-row>
        <!--关联科室-->
        <a-modal v-model="dialogDataRelatedDepartments.visible"
                 v-if="dialogDataRelatedDepartments.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="关联科室"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="relatedDepartmentsModalCheck('refShuttleBox')">
            <ShuttleBox ref="refShuttleBox"/>
        </a-modal>
        <!--关联渠道商-->
        <a-modal v-model="dialogDataDistributors.visible"
                 v-if="dialogDataDistributors.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="关联渠道商"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="channelProviderBoxModalCheck('refChannelProviderBox')">
            <ChannelProviderBox ref="refChannelProviderBox"/>
        </a-modal>
    </div>
</template>
<script>
    import ShuttleBox from '@/components/shuttleBox.vue';
    import ChannelProviderBox from '@/components/hospital/channelProviderBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import { pagination } from '@/utils/pagination.ts';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { towRowSearch } from '../../utils/tableScroll';
    import { SHUTTLE_BOX } from '../../store/modules/shuttleBox';

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
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
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
            operation: ['编辑', '关联科室'],
        });
    }
    //  医院管理
    export default {
        components: {
            ShuttleBox,
            ChannelProviderBox,
        },
        computed: {
            modalTargetKeys(){
                return this.$store.state.shuttleBox.modalTargetKeys;
            }
        },
        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,
                //  分页信息
                pagination,
                //  关联科室莫泰框
                dialogDataRelatedDepartments: this.initModal(DIALOG_TYPE.RELATED_DEPARTMENTS),
                //  关联渠道商
                dialogDataDistributors: this.initModal(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER),
            };
        },

        methods: {
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('shuttleBox', [
                //  设置穿梭框类型
                'setShuttleBoxType',
            ]),
            ...mapActions('hospital', [
                //  关联渠道商
                'setDistributorsId',
            ]),

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

            //  切换状态
            aSwitchChange(sItem, $event){
                console.log(sItem, $event);
            },

            //  编辑医院
            editHospital(sItem){
                this.$router.push({ name: 'editHospital', params: { hospitalId: '123232' } });
            },
            //  关联科室操作
            relatedDepartments(){
                this.showModal(DIALOG_TYPE.RELATED_DEPARTMENTS);
                this.setShuttleBoxType(SHUTTLE_BOX.RELATED_DEPARTMENTS);
            },
            //  关联渠道商
            associatedChannelProvider(){
                this.showModal(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER);
                this.setDistributorsId(12334);
            },
            //  关联科室确定
            relatedDepartmentsModalCheck(refShuttleBox){
                const promise = this.$refs[refShuttleBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.RELATED_DEPARTMENTS);
                }).catch(error => {
                    console.log('有错');
                });
            },
            //  关联渠道商确定
            channelProviderBoxModalCheck(refChannelProviderBox){
                const promise = this.$refs[refChannelProviderBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER);
                }).catch(error => {
                    console.log(error);
                    console.log('有错');
                });
            }
        },
    };
</script>
<style scoped lang="stylus">
</style>


