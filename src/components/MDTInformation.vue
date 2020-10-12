<template>
    <div>
        <a-row type="flex" justify="start" align="middle" class="table-group-title">
            <a-col :span="4">
                膳食营养计划
            </a-col>
            <a-col :span="7">
                <a-button type="primary" @click="groupChat">
                    群聊
                </a-button>
            </a-col>
        </a-row>
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <!--主管医生-->
            <div slot="doctor" slot-scope="scope,sItem,sIndex,extra">
                <a-select
                        v-model="MDTData.doctor"
                        style="width:100%;"
                        placeholder="请选择主管医生"
                >
                    <a-select-option value="全部">全部</a-select-option>
                    <a-select-option value="待发货">待发货</a-select-option>
                    <a-select-option value="待签收">待签收</a-select-option>
                    <a-select-option value="已签收">已签收</a-select-option>
                </a-select>
            </div>
            <!--营养师-->
            <div slot="dietitian" slot-scope="scope,sItem,sIndex,extra">
                <a-select
                        v-model="MDTData.dietitian"
                        style="width:100%;"
                        placeholder="请选择营养师"
                >
                    <a-select-option value="全部">全部</a-select-option>
                    <a-select-option value="待发货">待发货</a-select-option>
                    <a-select-option value="待签收">待签收</a-select-option>
                    <a-select-option value="已签收">已签收</a-select-option>
                </a-select>
            </div>
        </a-table>
    </div>
</template>
<script>
    //  MDT信息
    export default {
        data(){
            return {
                //  群聊信息
                MDTData: {}
            };
        },
        methods: {
            groupChat(e){
                console.log(e);
            }
        }
    };
</script>