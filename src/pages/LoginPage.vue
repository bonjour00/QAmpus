<template>
  <AuthContainer
    title="登入"
    btnLabel="登入"
    @clickBtn="login"
    :loadingShow="loadingShow"
  >
    <q-input
      v-model="userEmail"
      label="EMAIL"
      ref="emailRef"
      lazy-rules="ondemand"
      :rules="[notEmpty]"
    />
    <q-input
      v-model="userPassword"
      label="輸入您的密碼"
      :type="isPwd ? 'password' : 'text'"
      ref="pwdRef"
      lazy-rules="ondemand"
      :rules="[notEmpty]"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <template #link>
      <AuthLink toDescription="沒有帳號？" to="/register" toLinkTitle="註冊" />
      <AuthLink
        toDescription="忘記密碼?"
        to="/forget-pwd"
        toLinkTitle="重設密碼"
      />
    </template>
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import AuthLink from 'src/components/Auth/AuthLink.vue';
import { notEmpty } from 'src/components/Input/rules';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/Auth/user';
import useNotify from 'src/composables/Notify/useNotify';

// const userStore = useUserStore();
const { notifyFail } = useNotify();

const loadingShow = ref(false);

const userEmail = ref('');
const userPassword = ref('');
const router = useRouter();

//pwd see or not
const isPwd = ref(true);

//rules
const emailRef: any = ref(null);
const pwdRef: any = ref(null);

const login = async () => {
  emailRef.value?.validate();
  pwdRef.value?.validate();
  if (emailRef.value.hasError || pwdRef.value.hasError) {
    return;
  } else {
    try {
      loadingShow.value = true;
      const result = await api.post('/User/signin', {
        userEmail: userEmail.value,
        userPassword: userPassword.value,
      });
      router.push({ path: '/' });
      localStorage.setItem('token', result.data.token);
    } catch (error: any) {
      notifyFail(error.response?.data, '登錄失敗:');
    }
    loadingShow.value = false;
  }
};
</script>
