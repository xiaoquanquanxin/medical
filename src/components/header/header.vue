<template>
    <myPageHeader/>
</template>
<script lang="ts">
	// import HelloWorld from './components/HelloWorld.vue';
	import {Component, Vue} from 'vue-property-decorator';
	import myPageHeader from '@/components/header/myPageHeader.vue';


	@Component({
		components: {
			myPageHeader,
		},
	})
	export default class Header extends Vue {
		mounted(): void {
			console.log('我是header');
		}
	}
</script>