<template>
  <div class="column items-center">
    <img class="logo" :src="collapsedLogo" />
    <p class="title text-weight-medium q-my-md">{{ title }}</p>
  </div>
</template>
<script setup lang="ts">
import collapsedLogo from '../../assets/collapsed-logo.png';

const props = defineProps<{
  title: string;
}>();
</script>
<style scoped>
.logo {
  width: 120px;
}
.title {
  font-size: 25px;
  color: #484848;
}

@media (max-width: 1024px) {
  .logo {
    width: 100px;
  }
}

@media (max-width: 768px) {
  .logo {
    width: 85px;
  }
}
</style>
