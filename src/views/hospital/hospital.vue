<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.hospitalName" placeholder="请输入医院名称"/>
            <a-select class="basic-select-width" v-model="searchData.province" placeholder="请选择省份">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option :value="item.id"
                                 :key="item.id"
                                 v-for="item in areaList.provinceList"
                >{{item.name}}
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" v-model="searchData.status" placeholder="请选择状态">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option value="0">开启</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
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
            <!--状态选择-->
            <div slot="a-switch"
                 slot-scope="scope,sItem,sIndex,extra"
            >
                <a-switch checked-children="开" un-checked-children="关"
                          v-model="sItem.statusBooleanFormat"
                          @change="aSwitchChange(sItem,$event)"
                />
            </div>
            <!--图片-->
            <div slot="hospitalPic" slot-scope="scope,sItem,sIndex,extra">
                <img :src="scope.hospitalPic" alt="">
            </div>
            <!--操作-->
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
                    v-if="pagination.total"
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
            <ShuttleBox ref="refShuttleBox"
                        :origin-list="shuttleOriginList"
                        :origin-target-key="shuttleOriginTargetKey"
            />
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
            <ChannelProviderBox ref="refChannelProviderBox"
                                :selectedRowKey="channelProviderSelectedRowKey"
            />
        </a-modal>
    </div>
</template>
<script>
    import ShuttleBox from '@/components/shuttleBox.vue';
    import ChannelProviderBox from '@/components/hospital/channelProviderBox.vue';
    import { mapGetters, mapActions } from 'vuex';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { SHUTTLE_BOX } from '../../store/modules/shuttleBox';
    import {
        requestHospitalChangeStatus,
        requestDeptListDeptHospitalId,
        requestHospitalPage,
        requestHospitalRelatedDepartments,
        requestHospitalListChannelBusiness,
        requestHospitalHospitalRelationChannelBusiness
    } from '../../api/hospital';
    import { getProvinceList, provinceChange, cityChange, areaList } from '@/utils/areaList';
    import { requestDeptList } from '../../api/department';
    import { requestChannelBusinessList } from '../../api/distributors';

    const columns = [
        {
            title: '医院名称',
            dataIndex: 'hospitalName',
            width: 150,
        },
        {
            title: '医院编码',
            dataIndex: 'hospitalCode',
            width: 150,
        },
        {
            title: '城市',
            dataIndex: 'cityName',
            width: 100,
        },
        {
            title: '状态',
            width: 100,
            scopedSlots: { customRender: 'a-switch' },
        },
        {
            title: '医院图标',
            scopedSlots: { customRender: 'hospitalPic' },
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 250,
        },
    ];
    //  医院管理
    export default {
        components: {
            ShuttleBox,
            ChannelProviderBox,
        },
        data(){
            return {
                //	地址对象
                areaList,
                //  搜索相关
                searchData: {},

                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  关联科室莫泰框
                dialogDataRelatedDepartments: this.initModal(DIALOG_TYPE.RELATED_DEPARTMENTS),
                //  关联渠道商
                dialogDataDistributors: this.initModal(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER),

                //  穿梭框数据
                shuttleOriginList: [],
                //  穿梭框默认值
                shuttleOriginTargetKey: [],
                //  穿梭框操作的sItem
                shuttleBoxData: {},
                //  全部科室列表
                deptList: [],
                //  渠道商关联key
                channelProviderSelectedRowKey: null,
            };
        },
        created(){
            this.getProvinceList(this);
            //  全部科室
            requestDeptList()
                .then(deptList => {
                    this.deptList = deptList;
                });
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestHospitalPage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            //  状态需要布尔值
                            item.statusBooleanFormat = item.status === 0;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(data.records [0])));
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },

            //  切换状态
            aSwitchChange(sItem, checked){
                requestHospitalChangeStatus(sItem.id)
                    .then(v => {
                        this.$message.success('操作成功');
                        this.searchFn();
                    })
                    .catch(err => {
                        sItem.statusBooleanFormat = !checked;
                        this.$message.error('操作失败');
                    });
            },
            //  编辑医院
            editHospital(sItem){
                this.$router.push({ name: 'editHospital', params: { hospitalId: sItem.id } });
            },
            //  关联科室操作
            relatedDepartments(sItem){
                this.shuttleBoxData = sItem;
                requestDeptListDeptHospitalId(sItem.id)
                    .then(v => {
                        const list2 = v.data || [];
                        const shuttleOriginList = [];
                        const shuttleOriginTargetKey = list2.map(String);
                        this.deptList.forEach(item => {
                            const data = {};
                            data.key = item.id.toString();
                            data.title = item.deptName;
                            data.description = item.deptName;
                            shuttleOriginList.push(data);
                        });
                        this.shuttleOriginList = shuttleOriginList;
                        this.shuttleOriginTargetKey = shuttleOriginTargetKey;
                        this.showModal(DIALOG_TYPE.RELATED_DEPARTMENTS);
                        this.setShuttleBoxType(SHUTTLE_BOX.RELATED_DEPARTMENTS);
                    })
                    .catch(err => {
                        console.log(err);
                        //  alert('接口报错');
                    });
            },
            //  关联科室确定
            relatedDepartmentsModalCheck(refShuttleBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.RELATED_DEPARTMENTS, true);
                const promise = this.$refs[refShuttleBox].handleSubmit();
                promise.then(targetKeys => {
                    console.log(targetKeys);
                    console.log(this.shuttleBoxData.id);
                    return requestHospitalRelatedDepartments({
                        hospitalId: this.shuttleBoxData.id,
                        deptIds: targetKeys
                    })
                        .then(v => {
                            this.$message.success('操作成功');
                            this.hideModal(DIALOG_TYPE.RELATED_DEPARTMENTS);
                            this.searchFn();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.RELATED_DEPARTMENTS, false);
                });
            },

            //  关联渠道商
            associatedChannelProvider(sItem){
                this.shuttleBoxData = sItem;
                Promise.all([
                    requestHospitalListChannelBusiness(sItem.id),
                    requestChannelBusinessList(),
                ])
                    .then(v => {
                        this.channelProviderSelectedRowKey = v[0];
                        const list = v[1];
                        list.forEach(item => {
                            item.key = item.id;
                        });
                        console.log(list[0]);
                        this.setDistributorsList(list);
                        this.showModal(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER);
                    });
            },
            //  关联渠道商确定
            channelProviderBoxModalCheck(refChannelProviderBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER, true);
                const promise = this.$refs[refChannelProviderBox].handleSubmit();
                promise.then(targetKeys => {
                    //  console.log(targetKeys);
                    //  console.log(this.shuttleBoxData.id);
                    const channelBusinessId = targetKeys[0];
                    requestHospitalHospitalRelationChannelBusiness({
                        hospitalId: this.shuttleBoxData.id,
                        channelBusinessId,
                    })
                        .then(v => {
                            this.$message.success('操作成功');
                            this.hideModal(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER);
                            this.searchFn();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                }).catch(error => {
                    console.log(error);
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ASSOCIATED_CHANNEL_PROVIDER, false);
                });
            },
            //  获取省份
            getProvinceList,

            //  省份变化
            provinceChange,
            _provinceChange(value){
                this.provinceChange(this, value);
            },
            //  市区变化
            cityChange,
            _cityChange(value){
                this.cityChange(this, value);
            },

            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('shuttleBox', [
                //  设置穿梭框类型
                'setShuttleBoxType',
            ]),
            ...mapActions('hospital', [
                //  关联渠道商
                'setDistributorsList',
            ]),
            //  展示的每一页数据变换
            onShowSizeChange,
            //  切换分页页码
            pageChange,
        },
    };
</script>