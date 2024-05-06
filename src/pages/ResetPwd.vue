<template>
  <AuthContainer
    title="重設您的密碼"
    btnLabel="確認重設密碼"
    @clickBtn="reset"
    :loadingShow="loadingShow"
  >
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
import { useRouter } from 'vue-router';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { notEmpty, pwTooEasy, pwTooShort } from 'src/components/Input/rules';
import { api } from 'src/boot/axios';
import useNotify from 'src/composables/Notify/useNotify';

const { notifyFail } = useNotify();
const router = useRouter();

const loadingShow = ref(false);
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
    const route = router.currentRoute.value.name;
    let url;
    let name;
    if (route == 'reset-person-pwd') {
      url = '/User/reset-password-login';
      name = 'setting';
    } else {
      url = '/User/reset-password';
      name = 'login';
    }
    loadingShow.value = true;
    try {
      const result = await api.post(url, {
        token,
        newPassword: userPassword.value,
      });
      successs('修改成功');
      router.push({ name });
    } catch (error: any) {
      notifyFail(error, '重設失敗: ');
    }
    loadingShow.value = false;
  }
};
</script>
