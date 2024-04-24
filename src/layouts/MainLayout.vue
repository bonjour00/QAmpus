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
          v-for="menu in userStore.layoutMenu"
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
        <q-btn
          align="left"
          flat
          class="sidebar-button"
          :class="{
            expanded: isSidebarExpanded,
          }"
          @click="logout"
        >
          <div class="button-content">
            <q-icon
              name="logout"
              :class="{ expanded: isSidebarExpanded }"
              class="sidebar-icon"
            />

            <p
              v-show="isSidebarExpanded"
              :class="{ expanded: isSidebarExpanded }"
              class="sidebar-title"
            >
              登出
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
import expandedLogo from '../assets/expanded-logo.png';
import collapsedLogo from '../assets/collapsed-logo.png';
import { useUserStore } from 'src/stores/Auth/user';

const userStore = useUserStore();

const router = useRouter();
const isSidebarExpanded = ref(true);

const currentChange = (label: string) => {
  router.push({ name: label });
};
const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const isMenuActive = (label: string) => {
  const path = router.currentRoute.value.path;
  const pathArray = path.split('/');
  const index = pathArray.length - 2;
  const pathName = label.toLowerCase();
  return (
    pathArray[index] === `${pathName}` ||
    path === `/${pathName}` ||
    (path === '/' && `/${pathName}` === '/pending')
  );
};
const logoSource = computed(() => {
  return isSidebarExpanded.value ? expandedLogo : collapsedLogo;
});

const logout = async () => {
  userStore.logout();
};
</script>
<style scoped>
.custom-layout {
  display: flex;
  height: 100vh;
  overflow-x: hidden;
}

.sidebar {
  background-color: white;
  width: 100px;
  transition: width 0.3s;
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
  margin-top: 1rem;
  width: 70% !important;
  height: 3rem;
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
.expanded {
  width: 20rem;
}
.expanded .sidebar-icon {
  max-width: 2rem;
}

.expanded .sidebar-title {
  max-width: 6rem;
  margin-left: 1rem;
  display: flex;
  justify-content: flex-start;
  font-size: medium;
  align-items: center;
}

.expanded .button-content {
  display: flex;
}

.sidebar-title {
  margin: 0;
}

.content {
  flex: 1;
  /* padding: 20px; */
  transition: margin-left 0.3s;
}
.expand-button {
  left: 4.5rem;
  width: 1rem;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
.expand-button-container {
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
.expanded .chevron-icon:hover {
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
