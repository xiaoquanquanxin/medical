<template>
    <a-layout id="layout">
        <LayoutSlider/>
        <LayoutMain/>
    </a-layout>
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator';
	import LayoutSlider from '@/layout/layoutSider/layoutSlider.vue';
	import LayoutMain from '@/layout/layoutMain/layoutMain.vue';


	@Component({
		components: {
			LayoutSlider,
			LayoutMain,
		}
	})
	export default class MyLayout extends Vue {
	}
</script>
<style lang="stylus">
    #layout
        height: 100vh;
    
    #layout .trigger
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    
    
    #layout .trigger:hover
        color: #1890ff;
    
    #layout .logo
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
</style>
