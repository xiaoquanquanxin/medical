<template>
    <div id="app">
        <a-config-provider :locale="zh_CN">
            <MyLayout/>
        </a-config-provider>
    </div>
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator';
	import MyLayout from '@/layout/layout.vue';
	//  @ts-ignore
	import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

	@Component({
		components: {
			MyLayout
		}
	})
	export default class App extends Vue {
		zh_CN: any;

		constructor() {
			super();
			this.zh_CN = zh_CN;
		}
	}
</script>
<style lang="css">
    #app {
        height: 100vh;
    }
</style>
