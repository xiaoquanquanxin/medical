<template>
    <div>
        <a-row type="flex" justify="start" align="middle" class="table-group-title no-border-bottom">
            基本信息
        </a-row>
        <div class="item-4">
            <a-descriptions
                    :title="null"
                    bordered
                    :column="4"
                    size="small"
            >
                <a-descriptions-item label="姓名">
                    {{dataSource.name}}
                </a-descriptions-item>
                <a-descriptions-item label="性别">
                    {{dataSource.sex}}
                </a-descriptions-item>
                <a-descriptions-item label="科室">
                    {{dataSource.deptName}}
                </a-descriptions-item>
                <a-descriptions-item label="病床/床号">
                    {{dataSource.idCard}}
                </a-descriptions-item>
                <a-descriptions-item label="处方医生">
                    {{dataSource.name}}
                </a-descriptions-item>
                <a-descriptions-item label="处方日期">
                    {{dataSource.deptName}}
                </a-descriptions-item>
                <a-descriptions-item label="缴费状态">
                    {{dataSource.idCard}}
                </a-descriptions-item>
                <a-descriptions-item></a-descriptions-item>
            </a-descriptions>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['dataSource'],
//        data(){
//            return {
//            };
//        },
        created(){
            console.log(JSON.parse(JSON.stringify(this.dataSource)));
        }
    };
</script>