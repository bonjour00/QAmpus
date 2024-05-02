<template>
  <div class="column window-height" >
    <div class="col-10 flex items-center justify-center" style="z-index: 5">
      <div class="container column">
        <LogoTitle :title="title" />
        <div class="column">
          <slot></slot>
        </div>
        <q-btn
          color="primary"
          :label="btnLabel"
          @click="clickBtn"
          class="text-weight-medium q-my-md auth-button"
        />
        <div class="column items-center">
          <slot name="link"></slot>
        </div>
      </div>
      <HourglassLoading :showing="loadingShow" />
    </div>
    <AuthWave />
  </div>
</template>
<script setup lang="ts">
import AuthWave from './AuthWave.vue';
import LogoTitle from './LogoTitle.vue';
import HourglassLoading from '../Loading/HourglassLoading.vue';

const props = defineProps<{
  title: string;
  btnLabel: string;
  loadingShow: boolean;
}>();
const emit = defineEmits(['clickBtn']);

const clickBtn = () => {
  emit('clickBtn');
};
</script>
<style scoped>
.container {
  width: 20vw;
}
.auth-button {
  height: 3rem;
  width: 100%;
  border-radius: 10px;
  font-size: 1rem;
}

@media (max-width: 1024px) {
  .container {
    width: 40vw;
  }
}

@media (max-width: 768px) {
  .container {
    width: 75vw;
  }
}
</style>
