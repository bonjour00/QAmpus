import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PendingQa.vue') },
      { path: 'pending', component: () => import('pages/PendingQa.vue') },
      { path: 'QA', component: () => import('pages/CheckedQa.vue') },
      { path: 'trash', component: () => import('pages/TrashQa.vue') },
      { path: 'manage', component: () => import('pages/QaManager.vue') },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import('pages/ChatRoom.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
