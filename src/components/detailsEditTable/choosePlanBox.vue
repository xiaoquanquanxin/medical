<template>
    <div class="custom-flex">
        <div class="custom-flex-left">
            <a-select class="basic-select-width"
                      v-model="operationDataTitle.energyId"
                      placeholder="请选择能量"
                      @change="energyChange"
            >
                <a-select-option :value="item.id"
                                 v-for="item in energyList"
                >{{item.name}}
                </a-select-option>
            </a-select>
        </div>
        <a-table class="custom-flex-right"
                 :row-selection="rowSelection"
                 :columns="columns"
                 :data-source="data"
                 :pagination="false"
                 bordered
        >
        </a-table>
    </div>
</template>
<script>
    import { requestPrescriptionPrescriptionTpl } from '../../api/userList/intervention';
    import { energyList, templateTypeMap, usageMethodList, } from '../../utils/constants';
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '方案名',
            dataIndex: 'templateName',
        },
        {
            title: '方案名内容',
            dataIndex: 'planContent',
        },
    ];
    //  选择计划
    export default {
        computed: {
            //  处方类型-处方类型 (1.院内配置,2门诊领药)
            prescriptionType(){
                const { prescriptionType } = this.$store.state.intervention;
                return prescriptionType;
            },
        },
        props: ['dataTitle'],
        data(){
            return {
                //  能量下拉
                energyList,
                //  处方模板类型map
                templateTypeMap,
                //  操作数据
                operationDataTitle: {
                    //  能量id
                    energyId: undefined,
                    //  单选的id
                    planId: undefined
                },
                //  表格配置
                rowSelection: {
                    type: 'radio',
                    selectedRowKeys: [],
                    onChange: this.onSelectChange,
                },
                columns,
                data: [],
                //  被选中的模板
                selectTemplateData: null,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            ...mapActions('intervention', [
                //  口服肠内营养补充数据
                'setKqcnData',
                //  肠内营养支持数据
                'setCnyyzcData',
            ]),
            searchFn(){
                console.clear();
                console.log(JSON.parse(JSON.stringify(this.dataTitle)));
                const { energyId, planId } = this.dataTitle;
                if (!planId) {
                    return;
                }
                const operationDataTitle = this.operationDataTitle;
                operationDataTitle.energyId = energyId;
                operationDataTitle.planId = planId;
                this.rowSelection.selectedRowKeys = [this.dataTitle.planId];
                this.energyChange(energyId, true);
            },
            onSelectChange(selectedRowKeys, value){
                this.rowSelection.selectedRowKeys = selectedRowKeys;
                //  选择的计划
                this.operationDataTitle.planId = selectedRowKeys[0];
                //  暂时保存
                this.selectTemplateData = value[0];
            },
            //  切换能量           isFirstAndEdit：如果是第一次进入，并且是编辑
            energyChange(energy, isFirstAndEdit){
                if (isFirstAndEdit !== true) {
                    this.resetStatus();
                }
                const prescriptionType = this.prescriptionType;
                const { usageMethod, templateType } = this.dataTitle;
                //  请求参数
                const data = { energy, prescriptionType, templateType, usageMethod };
                console.log('请求参数', data);
                requestPrescriptionPrescriptionTpl(data)
                    .then(v => {
                        console.log('打开弹框时候默认选择的单选', this.rowSelection.selectedRowKeys);
                        const { data } = v;
                        //  console.log(JSON.parse(JSON.stringify(data)));
                        data.forEach((item) => {
                            item.key = item.id;
                            const prescriptionContentData = JSON.parse(item.prescriptionContent);
                            item.commodityTableData = prescriptionContentData.commodityTableData;
                            item.timeTableData = prescriptionContentData.timeTableData;
                            const _timeTableData = prescriptionContentData.timeTableData[0];
                            const list = _timeTableData.list;
                            let str = '';
                            list.forEach(_item => {
                                str += `${_item.goodsName}${_item.uname};`;
                            });
                            item.planContent = `${str}温水：${_timeTableData.warmWater}ml`;
                        });
                        this.data = data;
                        //  如果是第一次进入，并且是编辑
                        if (isFirstAndEdit === true) {
                            this.selectTemplateData = data[0];
                        }
                    });
            },

            resetStatus(){
                console.log('重置');
                //  被选中的状态重置
                this.operationDataTitle.planId = undefined;
                this.rowSelection.selectedRowKeys = [];
                this.selectTemplateData = null;
            },
            //  确认数据
            handleSubmit(){
                const { planId } = this.operationDataTitle;
                return new Promise(((resolve, reject) => {
                    //  如果没有选择
                    if (!planId || !this.selectTemplateData) {
                        this.$message.error('请选择方案');
                        reject('请选择方案');
                    } else {
                        //  console.log(this.dataTitle.templateType);
                        //  console.log(JSON.parse(JSON.stringify(this.selectTemplateData)));
                        const { templateType } = this.dataTitle;
                        //  根据模板储存不同的
                        switch (templateType) {
                            case 1:
                                //  口服肠内营养补充数据
                                this.setKqcnData(this.selectTemplateData);
                                break;
                            case 2:
                                //  肠内营养补充数据
                                this.setCnyyzcData(this.selectTemplateData);
                                break;
                            default :
                                throw new Error('错误');
                        }
                        resolve(this.operationDataTitle);
                    }
                }));
            },
        }
    };
</script>
<style scoped>
    @import "~@/css/custom-flex.css";
</style>