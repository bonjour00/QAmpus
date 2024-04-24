<template>
  <AuthContainer
    title="個人設置"
    btnLabel="重設密碼"
    @clickBtn="resetPwdRoute"
    :loadingShow="false"
  >
    <q-list>
      <q-item class="q-px-none" v-for="(user, index) in userInfo" :key="index">
        <q-item-section>
          <q-item-label caption>
            <span class="text-weight-bold">{{ user.lable }}</span>
          </q-item-label>
          <q-item-label>
            <span class="text-weight-bold text-subtitle1">{{
              user.value
            }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </AuthContainer>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import { useUserStore } from 'src/stores/Auth/user';

const userStore = useUserStore();
const router = useRouter();

const userInfo = [
  {
    lable: '使用者名稱',
    value: userStore.userName,
  },
  {
    lable: '電子信箱',
    value: userStore.userEmail,
  },
  {
    lable: '所屬單位',
    value: userStore.officeName,
  },
];
const resetPwdRoute = () => {
  router.push({ name: 'vertify-pwd' });
};
</script>
