<template>
  <MainLayout v-if="userStore.userName && userStore.userPermission != 'user'" />
  <q-layout view="lhh LpR lff" v-else>
    <q-header class="q-pa-sm" style="background-color: rgb(245, 247, 252)">
      <q-toolbar class="text-primary">
        <q-space />
        <q-btn
          round
          color="primary"
          icon="question_mark"
          class="q-mr-xs"
          v-if="!userStore.userName"
          @click="openExamplesDialog"
        >
          <q-tooltip class="bg-grey-3 text-grey-8 text-subtitle2"
            >範例問題
          </q-tooltip>
        </q-btn>
        <LoginButton
          v-if="!userStore.userName"
          @clicked="router.push({ path: '/login' })"
        />
        <img class="user-layout-logo" src="../assets/expanded-logo.png" />

        <div class="flex fixed-top-right q-pa-sm" v-if="userStore.userName">
          <q-toolbar-title class="flex flex-center text-subtitle1">
            您好{{ userStore.userName }}
          </q-toolbar-title>
          <q-fab color="primary" icon="menu" direction="down">
            <q-fab-action
              v-for="(fab, index) in fabs"
              label-class="bg-grey-3 text-grey-8 text-subtitle2"
              external-label
              label-position="left"
              :label="fab.label"
              :key="index"
              color="secondary"
              :icon="fab.icon"
              @click="linkTo(fab.path)"
            />
            <q-fab-action
              color="secondary"
              icon="question_mark"
              @click="openExamplesDialog"
              label-class="bg-grey-3 text-grey-8 text-subtitle2"
              external-label
              label-position="left"
              label="範例問題"
            />
            <q-fab-action
              color="secondary"
              icon="logout"
              @click="logout"
              label-class="bg-grey-3 text-grey-8 text-subtitle2"
              external-label
              label-position="left"
              label="登出"
            />
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
import { useExamplesDialogStore } from 'src/stores/Dialog/examplesDialog';

const userStore = useUserStore();
const examplesDialog = useExamplesDialogStore();

const router = useRouter();
const logout = async () => {
  userStore.logout();
};
const linkTo = (path: string) => {
  router.push({ path });
};
const openExamplesDialog = () => {
  examplesDialog.openExamplesDialog();
};
const fabs = [
  {
    icon: 'chat',
    path: '/chat',
    label: '聊天室',
  },
  {
    icon: 'manage_accounts',
    path: '/setting',
    label: '個人設置',
  },
];
</script>
<style>
.user-layout-logo {
  position: fixed;
  width: 10rem;
  top: 1rem;
  left: 1rem;
}
</style>
