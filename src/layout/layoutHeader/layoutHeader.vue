<template>
    <a-layout-header class="a-layout-header">
        <a-row type="flex" justify="space-around" align="middle">
            <a-col :sm="4" :md="2">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"
                />
            </a-col>
            <a-col :sm="20" :md="22">
                <a-row type="flex" justify="end">
                    <a-space>
                        <a-avatar :size="36" icon="user"/>
                        <a-dropdown>
                            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                {{ loginInfo&&loginInfo.username }}
                                <a-icon type="down"/>
                            </a>
                            <a-menu slot="overlay" @click="logoutFn1">
                                <a-menu-item key="1">退出登录</a-menu-item>
                            </a-menu>
                        </a-dropdown>
                        <!--                        <a-button>-->
                        <!--                            <a-badge count="3">-->
                        <!--                                消息-->
                        <!--                            </a-badge>-->
                        <!--                        </a-button>-->
                        <span></span>
                        <span></span>
                    </a-space>
                </a-row>
            </a-col>
        </a-row>
    </a-layout-header>
</template>
<script lang="ts">
	import {Vue, Component} from 'vue-property-decorator';
	import {clearStorage} from '@/utils/common';
	import {authLogout} from '@/api/login';
	import request from '@/utils/request';


	@Component({})
	export default class LayoutHeader extends Vue {
		//  折叠左侧菜单？
		get collapsed(): boolean {
			return this.$store.state.sidebar.collapsed;
		}

		set collapsed(collapsed) {
			this.$store.dispatch('sidebar/setCollapsed', collapsed);
		}

		get loginInfo() {
			//  console.log(this.$store.state.login.loginInfo);
			return this.$store.state.login.loginInfo;
		}

		//  登出
		logoutFn1(e: Event) {
			authLogout();
		}
	}
</script>
<style scoped>
    .a-layout-header {
        background: #fff;
        padding: 0;
        border-bottom: 1px solid #e8e8e8;
    }
</style>