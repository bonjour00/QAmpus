<template>
  <q-layout view="lhh LpR lff">
    <q-page-container>
      <q-page>
        <router-view />
        <q-page-sticky position="top-right" :offset="fabPos">
          <q-fab
            color="primary"
            icon="settings"
            direction="down"
            :disable="draggingFab"
            v-touch-pan.prevent="moveFab"
            v-touch-hold.prevent="moveFab"
          >
            <q-fab-action
              color="secondary"
              icon="logout"
              :disable="draggingFab"
              @click="logout"
            />
            <!-- <q-fab-action
              color="secondary"
              icon="manage_accounts"
              :disable="draggingFab"
            /> -->
          </q-fab>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useUserStore } from 'src/stores/Auth/user';
import { ref } from 'vue';

const userStore = useUserStore();

const fabPos = ref([18, 18]);
const draggingFab = ref(false);

const moveFab = (ev: any) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;

  fabPos.value = [fabPos.value[0] - ev.delta.x, fabPos.value[1] + ev.delta.y];
};

const logout = async () => {
  userStore.logout();
};
</script>
