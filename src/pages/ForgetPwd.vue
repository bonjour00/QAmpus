<template>
  <AuthContainer
    title="忘記密碼"
    btnLabel="寄送重設密碼驗證信"
    @clickBtn="forget"
    :loadingShow="loadingShow"
  >
    <q-input
      v-model="userEmail"
      label="輸入您的EMAIL"
      ref="emailRef"
      lazy-rules="ondemand"
      :rules="[notEmpty]"
    />
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import { notEmpty } from 'src/components/Input/rules';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import useNotify from 'src/composables/Notify/useNotify';

const { notifyFail } = useNotify();
const loadingShow = ref(false);
const userEmail = ref('');
//rules
const emailRef: any = ref(null);

const forget = async () => {
  emailRef.value?.validate();
  if (emailRef.value.hasError) {
    return;
  } else {
    loadingShow.value = true;
    try {
      const result = await api.post('/User/forgot-password', {
        email: userEmail.value,
      });
      successs('已發送重設密碼Email驗證信');
    } catch (error: any) {
      notifyFail(error, '發送驗證信失敗:');
    }
    loadingShow.value = false;
  }
};
</script>
