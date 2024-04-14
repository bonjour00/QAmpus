<template>
  <div class="custom-layout" :class="{ 'dark-background': isSidebarUnder885 }">
    <div
      v-if="!isSidebarToggled && screenWidth <= 885"
      class="expand-button-container"
    >
      <button class="toggle-button" @click="expandSidebar">
        <q-icon size="20px" name="arrow_forward_ios" class="chevron-icon" />
      </button>
    </div>
    <div class="sidebar" :class="{ toggled: isSidebarToggled }">
      <div class="sidebar-list">
        <div class="toggle-button-container">
          <button
            class="toggle-button"
            @click="toggleSidebar"
            align="right"
            :class="{ 'rotate-icon': isSidebarToggled }"
          >
            <q-icon size="20px" name="arrow_forward_ios" class="chevron-icon" />
          </button>
        </div>
        <div class="logo-container">
          <img
            class="logo"
            :src="logoSource"
            :class="{
              'expanded-logo': isSidebarToggled,
              'collapsed-logo': !isSidebarToggled,
            }"
          />
        </div>

        <q-btn
          align="left"
          flat
          class="sidebar-button"
          :class="{
            Toggled: isSidebarToggled,
            active: isMenuActive(menu.label),
          }"
          v-for="menu in menus"
          :key="menu.title"
          @click="currentChange(menu.label)"
        >
          <div class="button-content">
            <q-icon
              :name="menu.icon"
              :class="{ toggled: isSidebarToggled }"
              class="sidebar-icon"
            />

            <p
              v-show="isSidebarToggled"
              :class="{ toggled: isSidebarToggled }"
              class="sidebar-title"
            >
              {{ menu.title }}
            </p>
          </div>
        </q-btn>
        <q-btn
          align="left"
          flat
          class="sidebar-button"
          :class="{
            toggled: isSidebarToggled,
          }"
          @click="logout"
        >
          <div class="button-content">
            <q-icon
              name="logout"
              :class="{ toggled: isSidebarToggled }"
              class="sidebar-icon"
            />

            <p
              v-show="isSidebarToggled"
              :class="{ toggled: isSidebarToggled }"
              class="sidebar-title"
            >
              登出
            </p>
          </div>
        </q-btn>
      </div>
    </div>
    <div v-if="isSidebarUnder885" class="dark-overlay"></div>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import expandedLogo from './expanded-logo.png';
import collapsedLogo from './collapsed-logo.png';
import axios from 'axios';

const router = useRouter();
const isSidebarToggled = ref(true);
const screenWidth = ref(window.innerWidth);
const isManuallyExpanded = ref(false);
const isSidebarUnder885 = computed(
  () => screenWidth.value <= 885 && isSidebarToggled.value
);

const updateSidebarState = () => {
  if (screenWidth.value <= 885 && !isManuallyExpanded.value) {
    isSidebarToggled.value = false;
  } else {
    isSidebarToggled.value = true;
    if (screenWidth.value > 885) {
      isManuallyExpanded.value = false;
    }
  }
};

watch(screenWidth, updateSidebarState);

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

const currentChange = (label: string) => {
  if (screenWidth.value <= 885) {
    isSidebarToggled.value = false;
  }
  router.push({ path: label });
};

const toggleSidebar = () => {
  isSidebarToggled.value = !isSidebarToggled.value;
  isManuallyExpanded.value = isSidebarToggled.value;
};

const expandSidebar = () => {
  isSidebarToggled.value = true;
  isManuallyExpanded.value = true;
};

const isMenuActive = (label: string) => {
  return (
    router.currentRoute.value.path === `/${label.toLowerCase()}` ||
    (router.currentRoute.value.path === '/' &&
      `/${label.toLowerCase()}` === '/pending')
  );
};

const logoSource = computed(() => {
  return isSidebarToggled.value ? expandedLogo : collapsedLogo;
});

const menus = [
  {
    title: '待解決問題',
    icon: 'pending_actions',
    label: 'pending',
  },
  {
    title: '資源管理',
    icon: 'create_new_folder',
    label: 'resource',
  },
  {
    title: '近期刪除問題',
    icon: 'delete',
    label: 'trash-qa',
  },
  {
    title: '近期刪除資源',
    icon: 'delete',
    label: 'trash-resource',
  },
  {
    title: '權限管理',
    icon: 'groups',
    label: 'member',
  },
];

const logout = async () => {
  try {
    const result = await axios.post(
      'http://140.136.202.125/api/User/logout',
      {},
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );
    localStorage.removeItem('token');
    console.log(result, 'logout');
    router.push({ path: '/login' });
  } catch (e) {
    console.log('error', e);
  }
};
</script>

<style scoped>
.expand-button-container {
  display: none;
  justify-content: center;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
}

.expand-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
@media (max-width: 885px) {
  .expand-button-container {
    display: flex;
  }
  .sidebar {
    display: none;
    width: 20rem;
    height: 100%;
    box-shadow: none !important;
  }

  .sidebar.toggled {
    display: block;

    position: absolute;

    z-index: 999;
  }
}

.custom-layout {
  display: flex;
  height: 100vh;
  overflow-x: hidden;
}

.sidebar {
  background-color: white;
  width: 100px;
  transition: width 0.3s ease;
  box-shadow: 5px 0px 30px 0px rgba(226, 236, 249, 0.5);
}

.sidebar-list {
  display: flex;
  flex-direction: column;
}

.sidebar-icon {
  margin-left: 0.5rem;
}
.sidebar-button {
  margin-top: 2rem;
  width: 70% !important;
  height: 3.5rem;
  border: 0;
  left: 15%;
  border-radius: 8px;
  color: #9197b3;
}

.sidebar-button:hover {
  background-color: #79a0bd;
  transition: 0.2s;
  color: white;
}
.sidebar-button.active {
  background-color: #79a0bd;
  color: white;
}
.toggled {
  width: 20rem;
}
.toggled .sidebar-icon {
  max-width: 2rem;
}
.toggled .sidebar-icon {
  max-width: 2rem;
}

.toggled .sidebar-title {
  max-width: 6rem;
  margin-left: 1rem;
  display: flex;
  justify-content: flex-start;
  font-size: medium;
  font-weight: 900;
  align-items: center;
}

.toggled .button-content {
  display: flex;
}

.sidebar-title {
  margin: 0;
}

.content {
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s;
}
.toggle-button {
  left: 4.5rem;
  width: 1rem;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
.toggle-button-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-right: 1rem;
}
.chevron-icon {
  color: #9197b3;
  width: 40px;
  height: 40px;
  font-weight: 900;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
}
.chevron-icon:hover {
  background-color: #79a0bd;
  transition: 0.3s;
  color: white;
}
.rotate-icon .chevron-icon {
  transform: rotate(180deg);
  transition: transform 0.3s ease-in-out;
}
.toggled .chevron-icon:hover {
  transition: 0.3s;
  color: white;
}
.expanded-logo {
  width: 15rem;
}
.collapsed-logo {
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 0.8rem;
  transition: transform 0.3s ease-in-out;
}
.logo-container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
}
</style>
