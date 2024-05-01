<template>
  <MainLayout v-if="userStore.userName && userStore.userPermission != 'user'" />
  <q-layout view="lhh LpR lff" v-else>
    <q-header class="q-pa-sm" style="background-color: rgb(245, 247, 252)">
      <q-toolbar class="text-primary">
        <q-space />
        <LoginButton
          v-if="!userStore.userName"
          @clicked="router.push({ path: '/login' })"
        />
        <img class="user-layout-logo" src="../assets/expanded-logo.png" />

        <div class="flex" v-if="userStore.userName">
          <q-toolbar-title class="flex flex-center text-subtitle1">
            您好{{ userStore.userName }}
          </q-toolbar-title>
          <q-fab color="primary" icon="settings" direction="down">
            <q-fab-action color="secondary" icon="logout" @click="logout" />
            <!-- <q-fab-action
              color="secondary"
              icon="manage_accounts"
              @click="router.push({ path: '/setting' })"
            /> -->
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
import LoginButton from 'src/components/Button/Auth/LoginButton.vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const logout = async () => {
  userStore.logout();
};
</script>
<style>
.user-layout-logo {
  position: fixed;
  width: 10rem;
  top: 1rem;
  left: 1rem;
}
</style>
