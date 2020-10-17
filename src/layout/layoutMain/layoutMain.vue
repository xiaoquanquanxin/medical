<template>
    <a-layout>
        <LayoutHeader/>
        <LayoutHistoryList/>
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
	import LayoutHistoryList from '@/layout/layoutHistoryList/layoutHistoryList.vue';

	@Component({
		components: {
			LayoutHeader,
			LayoutHistoryList,
		}
	})
	export default class LayoutMain extends Vue {

	}
</script>