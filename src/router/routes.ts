import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/assign', component: () => import('pages/AssignQa.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PendingQa.vue') },
      {
        path: 'pending',
        name: 'pending',
        component: () => import('pages/PendingQa.vue'),
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('pages/ResourceManage.vue'),
      },
      {
        path: 'trash-qa',
        name: 'trash-qa',
        component: () => import('pages/TrashQa.vue'),
      },
      {
        path: 'trash-resource',
        name: 'trash-resource',
        component: () => import('pages/ResourceTrash.vue'),
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('pages/AdminMember.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import('pages/ChatRoom.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/registeradmin',
    name: 'registeradmin',
    component: () => import('pages/RegisterAdmin.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
