<template>
    <a-transfer
            :data-source="mockData"
            :show-search="true"
            :showSelectAll="true"
            :list-style="{width: '250px',height: '300px',}"
            :operations="['右移动', '左移动']"
            :target-keys="targetKeys"
            :render="item => `${item.title}-${item.description}`"
            @change="handleChange"
            :titles="['啊啊啊', 'bbb']"
    >
        <span slot="notFoundContent">暂无数据</span>
        <a-button
                slot="footer"
                slot-scope="props"
                size="small"
                style="float:right;margin: 5px"
                @click="reset(props)"
        >
            重置
        </a-button>
    </a-transfer>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    //  关联科室
    export default {
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
                mockData: [],
                targetKeys: this.modalTargetKeys,
            };
        },
        mounted(){
            this.getMock();
        },
        methods: {
            //  设置莫泰框选择的值到store
            ...mapActions('shuttleBox', ['setModalTargetKey']),
            getMock(props){
                //  console.log(props);
                const targetKeys = [];
                const mockData = [];
                for (let i = 0; i < 20; i++) {
                    const data = {
                        key: i.toString(),
                        title: `content${i + 1}`,
                        description: `description of content${i + 1}`,
                        chosen: Math.random() * 2 > 1,
                    };
                    if (data.chosen) {
                        targetKeys.push(data.key);
                    }
                    mockData.push(data);
                }
                this.mockData = mockData;
                //  this.targetKeys = targetKeys;
            },
            handleChange(targetKeys, direction, moveKeys){
                //  console.log(targetKeys, direction, moveKeys);
                console.log(targetKeys);
                this.targetKeys = targetKeys;
                this.setModalTargetKey(targetKeys);
            },
            //  重置
            reset(props){
                console.log('重置');
                console.log(props);
                console.log(props.dataSource);
                this.targetKeys = [];
            },
        },
    };
</script>

