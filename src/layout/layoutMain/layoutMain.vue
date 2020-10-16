<template>
    <a-layout>
        <LayoutHeader/>
        <LayoutBreadcrumb/>
        <a-layout-content class="layout-content">
            <div class="layout-content-inner">
                <router-view/>
            </div>
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