<template>
  <AuthContainer
    title="註冊您的帳戶"
    btnLabel="註冊"
    @clickBtn="register"
    :loadingShow="loadingShow"
  >
    <q-input
      v-model="userName"
      label="輸入您的使用者名稱"
      ref="nameRef"
      lazy-rules="ondemand"
      :rules="[notEmpty]"
    />
    <q-input
      v-model="userEmail"
      label="輸入您的Email"
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
      :rules="[notEmpty, pwTooEasy, pwTooShort]"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-input
      v-model="comfirmPassword"
      label="再次輸入您的密碼"
      :type="isConfirmPwd ? 'password' : 'text'"
      ref="confirmPwdRef"
      lazy-rules="ondemand"
      :rules="[notEmpty, (val) => val === userPassword || '密碼不一致']"
      ><template v-slot:append>
        <q-icon
          :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isConfirmPwd = !isConfirmPwd"
        />
      </template>
    </q-input>
    <template #link>
      <AuthLink toDescription="已經有帳號了？" to="/login" toLinkTitle="登入" />
    </template>
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import AuthLink from 'src/components/Auth/AuthLink.vue';
import { notEmpty, pwTooEasy, pwTooShort } from 'src/components/Input/rules';
import { api } from 'src/boot/axios';
import useNotify from 'src/composables/Notify/useNotify';

const { notifyFail } = useNotify();
const router = useRouter();

const loadingShow = ref(false);
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const comfirmPassword = ref('');

//pwd see or not
const isPwd = ref(true);
const isConfirmPwd = ref(true);

//rules
const nameRef: any = ref(null);
const emailRef: any = ref(null);
const pwdRef: any = ref(null);
const confirmPwdRef: any = ref(null);

const register = async () => {
  nameRef.value?.validate();
  emailRef.value?.validate();
  pwdRef.value?.validate();
  confirmPwdRef.value?.validate();
  if (
    nameRef.value.hasError ||
    emailRef.value.hasError ||
    pwdRef.value.hasError ||
    confirmPwdRef.value.hasError
  ) {
    return;
  } else {
    loadingShow.value = true;
    try {
      const result = await api.post('/User/normal', {
        userName: userName.value,
        userPassword: userPassword.value,
        userEmail: userEmail.value,
        userPermission: 'user',
      });
      successs('完成Email驗證後即註冊成功');
      router.push({ path: '/login' });
    } catch (error: any) {
      notifyFail(error.response?.data?.message, '註冊失敗');
    }
    loadingShow.value = false;
  }
};
</script>
