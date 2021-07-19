<template>
  <el-container>
    <el-aside width="auto">
      <el-scrollbar height="100%">
        <NavMenu
          :shrinkAcitve="shrinkAcitve"
          :activeMenu="activeRoute"
          :menuList="menuList"
          @afterPushRoute="afterPushRoute"
        />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header height="auto">
        <NavBar @changeShrink="changeShrink" />
      </el-header>
      <el-header height="auto" class="title-tabs">
        <Tabs
          :tabList="cacheRoutes"
          :activeTab="activeRoute"
          @removeTab="removeTab"
          @removeOtherTab="removeOtherTab"
          @removeAllTab="removeAllTab"
          @clickTab="clickTab"
        />
      </el-header>
      <el-main>
        <el-scrollbar height="100%">
          <router-view v-slot="{ Component }">
            <transition>
              <keep-alive :include="cacheRoutes.map(item => item.name)">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { ref, Ref, watchEffect, defineComponent } from "vue";
import router from "@/router";
import NavMenu from "./components/NavMenu.vue";
import NavBar from "./components/NavBar.vue";
import Tabs from "./components/Tabs.vue";
import { Tab } from "./interface";
import { menuList } from "@/router/routes";

export default defineComponent({
  components: {
    NavMenu,
    NavBar,
    Tabs,
  },
  setup(props, ctx) {
    //高亮激活菜单和tab
    const activeRouteRef = ref("");
    watchEffect(() => {
      activeRouteRef.value = router.currentRoute.value.name as string;
    });

    //缓存的路由
    const cacheRoutesRef = ref([] as Tab[]);
    watchEffect(() => {
      console.log(cacheRoutesRef.value)
    });
    const { shrinkAcitveRef, changeShrink } =  navBarMark();

    const { menuList, afterPushRoute } = navMenuMake(cacheRoutesRef);

    const { removeTab, removeOtherTab, removeAllTab, clickTab } = tabsMake(cacheRoutesRef);

    return {
      menuList,
      activeRoute: activeRouteRef,
      shrinkAcitve: shrinkAcitveRef,
      cacheRoutes: cacheRoutesRef,
      changeShrink,
      afterPushRoute,
      removeTab,
      removeOtherTab,
      removeAllTab,
      clickTab,
    };
  },
});

function navBarMark() {
  //折叠菜单
  const shrinkAcitveRef = ref(true);
  const changeShrink = (flag: boolean) => {
    shrinkAcitveRef.value = flag;
  };

  return {
    shrinkAcitveRef,
    changeShrink
  }
}

function navMenuMake(cacheRoutesRef: Ref<Tab[]>) {
  const afterPushRoute = (tab: Tab) => {
    router.push({ name: tab.name });
    if (cacheRoutesRef.value.every((t) => t.name !== tab.name)) {
      cacheRoutesRef.value.push(tab);
    }
  };

  return {
    menuList: menuList,
    afterPushRoute,
  };
}

function tabsMake(cacheRoutesRef: Ref<Tab[]>) {
  //初始化tab
  if ((router.currentRoute.value.name as string) !== "home") {
    const tab: Tab = {
      name: router.currentRoute.value.name as string,
      title: router.currentRoute.value.meta.title as string,
    };
    cacheRoutesRef.value.push(tab);
  }

  const removeTab = (name: string) => {
    if (name === (router.currentRoute.value.name as string)) {
      const index = cacheRoutesRef.value.findIndex((t) => t.name === name);
      router.push({
        name: !index ? "home" : cacheRoutesRef.value[index - 1].name,
      });
    }
    cacheRoutesRef.value = cacheRoutesRef.value.filter((t) => t.name !== name);
  };

  const removeOtherTab = (name: string) => {
    const activeTab = cacheRoutesRef.value.find(t => t.name === name);
    cacheRoutesRef.value.length = 0;
    if(activeTab){
      cacheRoutesRef.value.push(activeTab);
      router.push({ name: activeTab.name });
    }
  }

  const removeAllTab = () => {
    cacheRoutesRef.value.length = 0;
    router.push({ name: 'home'});
  }

  const clickTab = (name: string) => {
    router.push({ name });
  };

  return {
    removeTab,
    removeOtherTab,
    removeAllTab,
    clickTab,
  };
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #304156;
  }
  .el-header {
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    &.title-tabs {
      padding: 0;
      box-shadow: none;
    }
  }
  .el-main {
    background-color: #f9f9f9;
  }
}
</style>