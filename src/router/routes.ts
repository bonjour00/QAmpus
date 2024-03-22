import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/assign', component: () => import('pages/AssignQa.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PendingQa.vue') },
      { path: 'pending', component: () => import('pages/PendingQa.vue') },
      { path: 'resource', component: () => import('pages/ResourceManage.vue') },
      { path: 'trash-qa', component: () => import('pages/TrashQa.vue') },
      {
        path: 'trash-resource',
        component: () => import('pages/ResourceTrash.vue'),
      },
      { path: '/member', component: () => import('pages/AdminMember.vue') },
    ],
  },
  { path: '/login', component: () => import('pages/LoginPage.vue') },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import('pages/ChatRoom.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/registeradmin',
    name: 'RegisterAdmin',
    component: () => import('pages/RegisterAdmin.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
