<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible="">
        <div class="logo"></div>
        <a-menu
                :default-selected-keys="[selectedKey]"
                :default-open-keys="['2']"
                mode="inline"
                theme="dark"
                :inline-collapsed="collapsed"
        >
            <a-menu-item key="/" @click="jumpTo('/')">
                <a-icon type="mail"/>
                首页
            </a-menu-item>
            <a-menu-item key="/about" @click="jumpTo('/about')">
                <a-icon type="calendar"/>
                关于我们
            </a-menu-item>
            <a-sub-menu key="sub1">
                <span slot="title">
                    <a-icon type="appstore"/>
                    <span>目录1</span>
                </span>
                <a-menu-item key="3">
                    Option 3
                </a-menu-item>
                <a-menu-item key="4">
                    Option 4
                </a-menu-item>
                <a-sub-menu key="sub1-2" title="Submenu">
                    <a-menu-item key="5">
                        Option 5
                    </a-menu-item>
                    <a-menu-item key="6">
                        Option 6
                    </a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                        <span slot="title">
                            <a-icon type="setting"/>
                            <span>目录2</span>
                        </span>
                <a-menu-item key="7">
                    Option 7
                </a-menu-item>
                <a-menu-item key="8">
                    Option 8
                </a-menu-item>
                <a-menu-item key="9">
                    Option 9
                </a-menu-item>
                <a-menu-item key="10">
                    Option 10
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script lang="ts">
	import {Vue, Component, Watch,} from 'vue-property-decorator';

	@Component({})
	export default class LayoutSlider extends Vue {
		//  折叠左侧菜单？
		get collapsed(): boolean {
			return this.$store.state.sidebar.collapsed;
		}

		get selectedKey(): string {
			//  console.log('执行次数');
			return this.$store.state.sidebar.selectRouteKey;
		}

		constructor() {
			super();
			console.log('执行constructor');
		}

		created(): void {

		}


		mounted(): void {

		}

		//	跳转
		jumpTo(href: string) {
			//  自己不跳转自己
			if (this.$route.path === href) {
				return
			}
			this.$router.push({path: href});
		}
	}
</script>