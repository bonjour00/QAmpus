<template>
  <body class="window-height row justify-center">
    <div class="column container column" :style="customStyle">
      <div class="column items-center">
        <img class="logo" :src="collapsedLogo" />
        <p class="title text-weight-medium q-my-lg">{{ title }}</p>
      </div>
      <div class="column">
        <slot></slot>
      </div>
      <q-btn
        color="primary"
        :label="btnLabel"
        @click="clickBtn"
        class="text-weight-medium auth-button q-my-lg"
      />
      <div class="flex justify-center">
        <div class="column">
          <div class="row">
            <p>{{ toDescription }}</p>
            <RouterLink :to="to" style="text-decoration: none; color: inherit">
              <span class="text-primary text-weight-medium">{{
                toLinkTitle
              }}</span>
            </RouterLink>
          </div>

          <RouterLink
            to="/forget-pwd"
            style="text-decoration: none; color: inherit"
            v-if="forget"
          >
            <span class="text-primary text-weight-medium">忘記密碼?</span>
          </RouterLink>
        </div>
      </div>
    </div>
    <AuthWave />
  </body>
</template>
<script setup lang="ts">
import collapsedLogo from '../../assets/collapsed-logo.png';
import AuthWave from './AuthWave.vue';

const props = defineProps<{
  title: string;
  customStyle: string;
  btnLabel: string;
  toDescription: string;
  to: string;
  toLinkTitle: string;
  forget?: boolean;
}>();
const emit = defineEmits(['clickBtn']);

const clickBtn = () => {
  emit('clickBtn');
};
</script>
<style scoped>
body {
  background-color: white;
}
.container {
  width: 20vw;
}
.logo {
  width: 120px;
}
.title {
  font-size: 25px;
  color: #484848;
}
.auth-button {
  height: 3rem;
  border-radius: 10px;
  font-size: 1rem;
}

@media (max-width: 1024px) {
  .container {
    width: 40vw;
  }
  .logo {
    width: 100px;
  }
}

@media (max-width: 768px) {
  .container {
    width: 75vw;
  }
  .logo {
    width: 90px;
  }
}
</style>
