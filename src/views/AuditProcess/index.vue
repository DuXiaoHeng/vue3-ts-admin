<template>
  <div>投诉审核</div>
</template>

<script lang="ts">
import { ref, defineComponent, onActivated, onMounted } from "vue";
export default defineComponent({
  name: 'auditProcess',
  components: {
    
  },
  setup(props, ctx) {

    //组件缓存测试
    onMounted(() => {
      console.log('渲染了界面');
      onActivated(() => {
        console.log('激活了界面');
      })
    })
  },
});
</script>

<style lang="scss" scoped>

</style>