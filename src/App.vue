<template>
    <div id="app">
        <MyLayout/>
    </div>
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator';
	import MyLayout from '@/layout/layout.vue';

	@Component({
		components: {
			MyLayout
		}
	})
	export default class App extends Vue {

	}
</script>
<style lang="css">
    #app {
        height: 100vh;
    }
</style>
