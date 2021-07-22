<template>
  <el-menu
    :default-active="activeMenu"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  > 
    
    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children && menu.children.length" :index="menu.name">
        <template #title>
          <i :class="menu.meta.icon"></i>
          <span>{{ menu.meta.title }}</span>
        </template>
        <el-menu-item v-for="childMenu in menu.children" :index="childMenu.name" :key="childMenu.name" @click="selectMenu(childMenu.name, childMenu.meta.title)">
          <i :class="menu.meta.icon"></i>
          <template #title>{{ childMenu.meta.title }}</template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.name" :key="menu.name" @click="selectMenu(menu.name, menu.meta.title)">
        <i :class="menu.meta.icon"></i>
        <template #title>{{ menu.meta.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect, PropType } from "vue";
import { RouteRecordRaw } from 'vue-router'
export default defineComponent({
  props: {
    shrinkAcitve: {
      type: Boolean,
      default: true,
    },
    activeMenu: {
      type: String,
      default: '',
    },
    menuList: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: []
    }
  },
  setup(props, ctx) {
    //菜单数据
    const menuListRef = ref([] as RouteRecordRaw[]);
    watchEffect(() => {
      menuListRef.value = props.menuList;
    })

    //折叠菜单
    const isCollapseRef = ref(false);
    watchEffect(() => {
      isCollapseRef.value = !props.shrinkAcitve;
    })

    //高亮激活的菜单
    const activeMenuRef = ref('');
    watchEffect(() => {
      activeMenuRef.value = props.activeMenu;
    })

    //通知父级跳转路由
    const selectMenu = (name: string, title: string) => {
      ctx.emit('afterPushRoute', { name, title });
    }
    return {
      activeMenu: activeMenuRef,
      menuList: menuListRef,
      isCollapse: isCollapseRef,
      selectMenu
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu:deep{
  min-width: 64px;
  border: none;
  &:not(.el-menu--collapse){
    width: 160px;
  }
  .el-submenu__title{
    text-align: left;
  }
  .el-menu-item{
    text-align: left;
  }
}
</style>