<template>
  <MainLayout v-if="userStore.userName && userStore.userPermission != 'user'" />
  <q-layout view="lhh LpR lff" v-else>
    <q-header class="q-pa-sm" style="background-color: rgb(245, 247, 252)">
      <q-toolbar class="text-primary">
        <q-space />
        <!-- <DialogButton
          class="login"
          v-if="!userStore.userName"
          btnName="登入"
          @clicked="router.push({ path: '/login' })"
        /> -->
        <button
          class="login"
          v-if="!userStore.userName"
          btnName="登入"
          @click="router.push({ path: '/login' })"
        >
          登入
        </button>
        <img class="user-layout-logo" src="../assets/expanded-logo.png" />

        <div class="flex" v-if="userStore.userName">
          <q-toolbar-title class="flex flex-center text-subtitle1">
            您好{{ userStore.userName }}
          </q-toolbar-title>
          <q-fab color="primary" icon="settings" direction="down">
            <q-fab-action color="secondary" icon="logout" @click="logout" />
          </q-fab>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useUserStore } from 'src/stores/Auth/user';
import MainLayout from './MainLayout.vue';
import DialogButton from 'src/components/Button/Dialog/DialogButton.vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  userStore.logout();
};
</script>
<style>
.login {
  cursor: pointer;
  background-color: transparent;
  border: 1.5px solid #1769a0;
  padding: 0.4rem 1rem 0.4rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  color: #1769a0;
}
.login:hover {
  border: 1.5px solid #1769a0;
  background-color: #1769a0;
  color: white;
  transition: 0.3s ease;
}
.user-layout-logo {
  position: fixed;
  width: 10rem;
  top: 1rem;
  left: 1rem;
}
</style>
