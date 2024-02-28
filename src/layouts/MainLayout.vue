<template>
  <div class="custom-layout">
    <div class="sidebar" :class="{ expanded: isSidebarExpanded }">
      <div class="sidebar-list">
        <div class="expand-button-container">
          <button
            class="expand-button"
            @click="toggleSidebar"
            align="right"
            :class="{ 'rotate-icon': isSidebarExpanded }"
          >
            <q-icon size="20px" name="arrow_forward_ios" class="chevron-icon" />
          </button>
        </div>
        <div class="logo-container">
          <img
            class="logo"
            :src="logoSource"
            :class="{
              'expanded-logo': isSidebarExpanded,
              'collapsed-logo': !isSidebarExpanded,
            }"
          />
        </div>

        <q-btn
          align="left"
          flat
          class="sidebar-button"
          :class="{
            expanded: isSidebarExpanded,
            active: isMenuActive(menu.label),
          }"
          v-for="menu in menus"
          :key="menu.title"
          @click="currentChange(menu.label)"
        >
          <div class="button-content">
            <q-icon
              :name="menu.icon"
              :class="{ expanded: isSidebarExpanded }"
              class="sidebar-icon"
            />

            <p
              v-show="isSidebarExpanded"
              :class="{ expanded: isSidebarExpanded }"
              class="sidebar-title"
            >
              {{ menu.title }}
            </p>
          </div>
        </q-btn>
      </div>
    </div>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { computed } from 'vue';
import expandedLogo from './expanded-logo.png';
import collapsedLogo from './collapsed-logo.png';
import './layout.css';

const router = useRouter();
const isSidebarExpanded = ref(true);

const currentChange = (label: string) => {
  router.push({ path: label.toLowerCase() });
};

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const isMenuActive = (label: string) => {
  return router.currentRoute.value.path === `/${label.toLowerCase()}`;
};
const logoSource = computed(() => {
  return isSidebarExpanded.value ? expandedLogo : collapsedLogo;
});

const menus = [
  {
    title: '待解決問題',
    icon: 'pending_actions',
    label: 'pending',
  },
  {
    title: '問答集',
    icon: 'question_answer',
    label: 'QA',
  },
  {
    title: '近期刪除',
    icon: 'delete',
    label: 'trash',
  },
  {
    title: '待分配問題',
    icon: 'delete',
    label: 'manage',
  },
];
</script>
