<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <div class="hamburger-container" @click="changeShrink">
        <i :class="shrinkAcitve ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
      </div>
    </div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        杜恒w18982<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect } from "vue";
export default defineComponent({
  setup(props, ctx) {
    //菜单收缩按钮
    const shrinkAcitveRef = ref(true);
    const changeShrink = () => {
      shrinkAcitveRef.value = !shrinkAcitveRef.value;
      ctx.emit('changeShrink', shrinkAcitveRef.value);
    };
    
    return {
      shrinkAcitve: shrinkAcitveRef,
      changeShrink,
    };
  },
});
</script>

<style lang="scss" scoped>
$height: 50px;
.nav-bar {
  display: flex;
  flex: 1;
  box-sizing: border-box;
  justify-content: space-between;
  height: $height;
  line-height: $height;
  font-size: 14px;
  .nav-bar-left {
    display: flex;
    flex: 1;
    box-sizing: border-box;
    .hamburger-container {
      font-size: 22px;
      cursor: pointer;
    }
    .el-breadcrumb {
      margin-left: 30px;
      height: $height;
      line-height: $height;
    }
  }
}
</style>
<style lang="scss">
.nav-bar {
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-dropdown {
    line-height: 50px;
  }
}
</style>