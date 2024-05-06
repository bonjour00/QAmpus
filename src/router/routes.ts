import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      role: ['admin', 'assigner'],
    },
    children: [
      { path: '', component: () => import('pages/PendingQa.vue') },
      {
        path: 'pending',
        name: 'pending',

        component: () => import('pages/PendingQa.vue'),
      },
      {
        path: 'assign',
        meta: {
          role: ['assigner'],
        },
        name: 'assign',
        component: () => import('pages/AssignQa.vue'),
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
    path: '/setting',
    meta: {
      requiresAuth: true,
      role: ['admin', 'assigner', 'user'],
    },
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'setting',
        component: () => import('pages/PersonSetting.vue'),
      },
      {
        path: 'vertify-pwd',
        name: 'vertify-pwd',
        component: () => import('pages/VertifyPwd.vue'),
      },
      {
        path: 'reset-person-pwd',
        name: 'reset-person-pwd',
        component: () => import('pages/ResetPwd.vue'),
      },
    ],
  },
  {
    path: '/chat',
    meta: {
      needIdentify: true,
    },
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'chat',
        component: () => import('pages/ChatRoom.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/forget-pwd',
    name: 'forget-pwd',
    component: () => import('pages/ForgetPwd.vue'),
  },
  {
    path: '/reset-pwd',
    name: 'reset-pwd',
    component: () => import('pages/ResetPwd.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
