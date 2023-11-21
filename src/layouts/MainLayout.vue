<template>
  <q-layout view="hHh Lpr lff">
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
    >
      <q-list padding>
        <q-item v-ripple>
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>

          <q-item-section> QAmpus </q-item-section>
        </q-item>
        <q-item
          v-for="menu in menus"
          :key="menu.title"
          :active="menu.title == current"
          active-class="bg-light-blue-13 text-grey-1"
          v-ripple
          clickable
          @click="currentChange(menu.title)"
          :to="menu.label"
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>

          <q-item-section> {{ menu.title }} </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const drawer = ref(false);
const miniState = ref(true);
const current = ref('待確認問題');
const currentChange = (title: string) => {
  current.value = title;
};

const menus = [
  {
    title: '待確認問題',
    icon: 'chat',
    label: 'pending',
  },
  {
    title: '問答集',
    icon: 'chat',
    label: 'QA',
  },
  {
    title: '垃圾桶',
    icon: 'chat',
    label: 'trash',
  },
];
</script>
