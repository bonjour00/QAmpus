<template>
  <AuthContainer title="重設您的密碼" btnLabel="確認重設密碼" @clickBtn="reset">
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
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { notEmpty, pwTooEasy, pwTooShort } from 'src/components/Input/rules';
import { api } from 'src/boot/axios';

const router = useRouter();

const userPassword = ref('');
const comfirmPassword = ref('');

//pwd see or not
const isPwd = ref(true);
const isConfirmPwd = ref(true);

//rules
const pwdRef: any = ref(null);
const confirmPwdRef: any = ref(null);

const reset = async () => {
  pwdRef.value?.validate();
  confirmPwdRef.value?.validate();
  const token = router.currentRoute.value.query.token;
  if (pwdRef.value.hasError || confirmPwdRef.value.hasError) {
    return;
  } else {
    try {
      const result = await api.post('/User/reset-password', {
        token,
        newPassword: userPassword.value,
      });
      successs('修改成功');
      router.push({ path: '/login' });
    } catch (error: any) {
      console.log(
        '重設失敗',
        error.response.data.errors.Token[0] || '發生錯誤'
      );
    }
  }
};
</script>
