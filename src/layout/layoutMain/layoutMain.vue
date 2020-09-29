<template>
    <a-layout>
        <LayoutHeader/>
        <LayoutBreadcrumb/>
        <a-layout-content class="layout-content">
            <router-view/>
        </a-layout-content>
    </a-layout>
</template>
<script lang='ts'>
	import {Vue, Component} from 'vue-property-decorator';
	import LayoutHeader from '@/layout/layoutHeader/layoutHeader.vue';
	import LayoutBreadcrumb from '@/layout/layoutBreadcrumb/layoutBreadcrumb.vue';

	@Component({
		components: {
			LayoutHeader,
			LayoutBreadcrumb,
		}
	})
	export default class LayoutMain extends Vue {

	}
</script>
<style lang="stylus">
    .layout-content
        padding 24px;
        background white;
        //  layout的高度
        max-height calc(100vh - 50px - 64px);
        overflow hidden;
</style>