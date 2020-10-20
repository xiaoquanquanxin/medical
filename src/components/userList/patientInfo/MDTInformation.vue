<template>
    <div>
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <a-col>MDT信息</a-col>
            <a-col>
                <a-button type="primary" @click="groupChat">群聊</a-button>
            </a-col>
        </a-row>
        <div class="item-2">
            <a-descriptions
                    :title="null"
                    bordered
                    :column="3"
                    size="small"
            >
                <!--主管医生-->
                <a-descriptions-item label="主管医生">
                    <a-select style="width:100%;"
                              placeholder="请选择主管医生"
                              v-if="activeElementId === 0 ||!patientBasicInfo.name"
                              v-model="patientBasicInfo.doctor"
                              class="form-element"
                              @focus="descriptionFormFocusFn(0)"
                    >
                        <a-select-option value="全部">全部</a-select-option>
                        <a-select-option value="待发货">待发货</a-select-option>
                        <a-select-option value="待签收">待签收</a-select-option>
                        <a-select-option value="已签收">已签收</a-select-option>
                    </a-select>
                    <p v-else
                       @click="descriptionFormClickFn(0,$event)"
                       class="description-content"
                    >{{patientBasicInfo.doctor}}</p>
                </a-descriptions-item>
                <!--主管医生-->
                <a-descriptions-item label="营养师">
                    <a-select style="width:100%;"
                              placeholder="请选择营养师"
                              v-if="activeElementId === 1 ||!patientBasicInfo.dietitian"
                              v-model="patientBasicInfo.dietitian"
                              class="form-element"
                    >
                        <a-select-option value="全部">全部</a-select-option>
                        <a-select-option value="待发货">待发货</a-select-option>
                        <a-select-option value="待签收">待签收</a-select-option>
                        <a-select-option value="已签收">已签收</a-select-option>
                    </a-select>
                    <p v-else
                       @click="descriptionFormClickFn(1,$event)"
                       class="description-content"
                    >{{patientBasicInfo.dietitian}}</p>
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>
<script>
    import { descriptionsMethods } from '@/utils/patientInfo';
    //  MDT信息
    export default {
        computed: {
            //  群聊信息，请求来了就会出现数据
            patientBasicInfo(){
                return this.$store.state.userList.patientBasicInfo;
            },
        },
        data(){
            return {
                //  编辑的index
                activeElementId: null,
            };
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
            //	病人信息、直接编辑用的 描述框的方法
            ...descriptionsMethods,

            groupChat(e){
                console.log(e);
            }
        }
    };
</script>

