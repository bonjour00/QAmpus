<template>
  <q-layout view="lhh LpR lff">
    <q-page-container>
      <q-page>
        <q-page-sticky position="top-right" :offset="fabPos"
          ><q-fab
            color="primary"
            icon="settings"
            direction="down"
            class="q-pt-sm"
          >
            <q-fab-action color="secondary" icon="logout" @click="logout" />
          </q-fab>
        </q-page-sticky>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useUserStore } from 'src/stores/Auth/user';
import { ref } from 'vue';

const userStore = useUserStore();

const fabPos = ref([10, 10]);

const logout = async () => {
  userStore.logout();
};
</script>
