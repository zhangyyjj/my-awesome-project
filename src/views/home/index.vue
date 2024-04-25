<template>
  <h1>
    测试 vueUse 的鼠标坐标 <el-icon class="icon"><Promotion /></el-icon>
  </h1>
  <h3>Mouse: {{ x }} x {{ y }}</h3>
</template>

<script setup name="home">
  import { useMouse } from '@vueuse/core'

  const { x, y } = useMouse()
</script>

<style lang="scss" scoped>
  .icon {
    color: aqua;
  }
</style>
