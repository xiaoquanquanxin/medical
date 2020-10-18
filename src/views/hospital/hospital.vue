<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.hospital" placeholder="请输入医院名称"/>
            <a-select class="basic-select-width" v-model="searchData.province" placeholder="请选择省份">
                <a-select-option value="Option1">
                    Option1
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" v-model="searchData.status" placeholder="请选择状态">
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
                <a-select-option value="323">
                    122112
                </a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addHospital'}">
                <a-button type="primary">
                    新增医院
                </a-button>
            </router-link>
        </div>
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
        <a-row type="flex" justify="end" class="a-pagination">
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
                 :confirm-loading="dialogDataRelatedDepartments.confirmLoading"
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
                 :confirm-loading="dialogDataDistributors.confirmLoading"
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
    import { towRowSearch } from '@/utils/tableScroll';
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
                //  搜索相关
                searchData: {},

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
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.RELATED_DEPARTMENTS, true);
                const promise = this.$refs[refShuttleBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.RELATED_DEPARTMENTS);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.RELATED_DEPARTMENTS, false);
                });
            },
            //  关联渠道商确定
            channelProviderBoxModalCheck(refChannelProviderBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER, true);
                const promise = this.$refs[refChannelProviderBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER);
                }).catch(error => {
                    console.log(error);
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER, false);
                });
            }
        },
    };
</script>