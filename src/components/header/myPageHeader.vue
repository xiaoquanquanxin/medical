<template>
    <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="标题"
            sub-title="This is a subtitle"
            @back="() => $router.go(-1)"
    >
        <template slot="extra">
            <a-button key="3">
                Operation
            </a-button>
            <a-button key="2">
                Operation
            </a-button>
            <a-button key="1" type="primary">
                Primary
            </a-button>
        </template>
        <a-descriptions size="small" :column="3">
            <a-descriptions-item label="Created">
                Lili Qu
            </a-descriptions-item>
            <a-descriptions-item label="Association">
                <a>421421</a>
            </a-descriptions-item>
            <a-descriptions-item label="Creation Time">
                2017-01-10
            </a-descriptions-item>
            <a-descriptions-item label="Effective Time">
                2017-10-10
            </a-descriptions-item>
            <a-descriptions-item label="Remarks">
                Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
            </a-descriptions-item>
        </a-descriptions>
    </a-page-header>
</template>
<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class MyPageHeader extends Vue {
 
	}
</script>