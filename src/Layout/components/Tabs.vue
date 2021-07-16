<template>
  <div class="tabs">
    <el-tabs
      v-model="activeTab"
      type="card"
      @tab-remove="removeTab"
      @tab-click="clickTab"
    > 
      <el-tab-pane label="首页" name="home" @click.right="fnClick"/>
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
          <el-dropdown-item @click="removeTab(activeTab)">关闭当前</el-dropdown-item>
          <el-dropdown-item @click="removeOtherTab(activeTab)">关闭其他</el-dropdown-item>
          <el-dropdown-item @click="removeAllTab">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect, defineComponent, PropType } from "vue";
import { Tab } from "../interface"
export default defineComponent({
  props: {
    activeTab: {
      type: String,
      default: 'home',
    },
    tabList: {
      type: Array as PropType<Tab[]>,
      default: [],
    },
  },
  setup(props, ctx) {
    //高亮激活tab
    const activeTabRef = ref("");
    watchEffect(() =>{
      activeTabRef.value = props.activeTab || 'home';
    })

    //动态渲染tab页签
    const tabListRef = ref([] as Tab[]);
    watchEffect(() =>{
      tabListRef.value = props.tabList;
    })

    const removeTab = (name: string) => {
      ctx.emit('removeTab', name);
    };

    const removeOtherTab = (name: string) => {
      ctx.emit('removeOtherTab', name);
    }

    const removeAllTab = () => {
      ctx.emit('removeAllTab');
    }

    const clickTab = (tab: {paneName: string}) => {
      debugger
      ctx.emit('clickTab', tab.paneName);
    }

    const fnClick = () =>{
      console.log(111)
    }
    return {
      tabList: tabListRef,
      activeTab: activeTabRef,
      removeTab,
      removeOtherTab,
      removeAllTab,
      clickTab,
      fnClick,
    };
  },
});
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
  .el-dropdown{
    flex: none;
    width: 100px;
    text-align: center;
  }
}
</style>