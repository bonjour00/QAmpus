import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useUserStore } from 'src/stores/Auth/user';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
declare module 'vue-router' {
  interface RouteMeta {
    role?: Array<string>;
  }
}
export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from) => {
    const userStore = useUserStore();
    if (!to.meta.requiresAuth) {
      if (to.meta.needIdentify) {
        const token = localStorage.getItem('token');
        if (token) {
          await userStore.tokenAnalyzation();
        }
      }
      return true;
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        return { path: '/chat' };
      }
      try {
        await userStore.tokenAnalyzation();
        const userRole = userStore.userPermission;
        //去符合自己權限
        if (to.meta.role?.includes(userRole)) {
          if (to.path == '/') {
            switch (userRole) {
              case 'assigner':
                return { path: '/assign' };
              case 'admin':
                return { path: '/pending' };
              default:
                return { path: '/chat' };
            }
          }
          return true;
        } //去不符合自己權限
        switch (userRole) {
          case 'assigner':
            return { path: '/assign' };
          case 'admin':
            return { path: '/pending' };
          default:
            return { path: '/chat' };
        }
      } catch (e) {
        console.log('error:', e);
        return { path: '/chat' };
      }
    }
  });

  return Router;
});
