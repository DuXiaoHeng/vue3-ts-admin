<template>
  <div class="tabs" ref="tabsRef">
    <el-tabs
      v-model="activeTab"
      type="card"
      @tab-remove="removeTab"
      @tab-click="clickTab"
      @click.right="rightClick"
    >
      <el-tab-pane label="首页" name="home" />
      <el-tab-pane
        v-for="item in tabList"
        closable
        :key="item.name"
        :label="item.title"
        :name="item.name"
      />
    </el-tabs>
    <el-dropdown trigger="click">
      <el-button type="primary">
        更多<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="removeTab(activeTab)"
            >关闭当前</el-dropdown-item
          >
          <el-dropdown-item @click="removeOtherTab(activeTab)"
            >关闭其他</el-dropdown-item
          >
          <el-dropdown-item @click="removeAllTab">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <teleport to="body">
      <ul
        class="tab-right-menu"
        v-if="rightMenuOpton.show"
        :style="{
          top: rightMenuOpton.offsetTop + 'px',
          left: rightMenuOpton.offsetLeft + 'px',
        }"
      >
        <li class="tab-right-menu-item" @click="removeOtherTab(rightMenuOpton.activeTab)">关闭其他</li>
        <li class="tab-right-menu-item" @click="removeAllTab">关闭全部</li>
      </ul>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  watchEffect,
  defineComponent,
  PropType,
  getCurrentInstance,
  ComponentInternalInstance,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { Tab, RightMenuOpton } from "../interface";
export default defineComponent({
  props: {
    activeTab: {
      type: String,
      default: "home",
    },
    tabList: {
      type: Array as PropType<Tab[]>,
      default: [],
    },
  },
  setup(props, ctx) {
    //高亮激活tab
    const activeTabRef = ref("");
    watchEffect(() => {
      activeTabRef.value = props.activeTab || "home";
    });

    //动态渲染tab页签
    const tabListRef = ref([] as Tab[]);
    watchEffect(() => {
      tabListRef.value = props.tabList;
    });

    //右键菜单
    const rootEl = getCurrentInstance() as ComponentInternalInstance;
    const {rightMenuOpton, rightClick} = tabRightMenuMake(rootEl);

    const removeTab = (name: string) => {
      ctx.emit("removeTab", name);
    };

    const removeOtherTab = (name: string) => {
      rightMenuOpton.show = false;
      ctx.emit("removeOtherTab", name);
    };

    const removeAllTab = () => {
      rightMenuOpton.show = false;
      ctx.emit("removeAllTab");
    };

    const clickTab = (tab: { paneName: string }) => {
      ctx.emit("clickTab", tab.paneName);
    };

    return {
      tabList: tabListRef,
      activeTab: activeTabRef,
      rightMenuOpton,
      removeTab,
      removeOtherTab,
      removeAllTab,
      clickTab,
      rightClick,
    };
  },
});

function tabRightMenuMake(rootEl: ComponentInternalInstance) {
  const rightMenuOpton: RightMenuOpton = reactive({
    show: false,
    offsetTop: 0,
    offsetLeft: 0,
    activeTab: '',
  });
  const rightClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.className.includes("el-tabs__item")) {
      return;
    }
    e.preventDefault();
    const tabsEl = rootEl.refs.tabsRef as HTMLElement;
    rightMenuOpton.offsetTop = tabsEl.offsetTop + target.offsetHeight + 8;
    rightMenuOpton.offsetLeft =
      tabsEl.offsetLeft + target.offsetLeft + target.offsetWidth / 2 - 43;
    rightMenuOpton.activeTab = target.id.slice(4);
    rightMenuOpton.show = true;
  };

  mousedownHideMenu(rightMenuOpton);

  return {
    rightMenuOpton,
    rightClick
  }
}

function mousedownHideMenu (rightMenuOpton: RightMenuOpton) {
  const hideMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if(target.className !== 'tab-right-menu-item') {
      rightMenuOpton.show = false;
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', hideMenu);
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', hideMenu);
  })
}

</script>

<style lang="scss" scoped>
.tabs:deep {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-tabs {
    flex: auto;
    .el-tabs__header {
      margin: 0;
    }
  }
  .el-dropdown {
    flex: none;
    width: 100px;
    text-align: center;
  }
}
</style>

<style lang="scss">
.tab-right-menu {
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 10px 0px;
  z-index: 2000;
  text-align: center;
  color: #606266;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .tab-right-menu-item {
    line-height: 24px;
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #66b1ff;
    }
  }
  &::after {
    content: "";
    display: block;
    border: 5px solid transparent;
    border-bottom-color: #fff;
    position: absolute;
    top: -10px;
    left: calc(50% - 5px);
  }
}
</style>