import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { adminMenu, assignerMenu } from 'src/components/Layout/data';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const userPermission: Ref<string> = ref('');
  const userName: Ref<string | null> = ref(null);
  const officeId: Ref<number | null> = ref(48); //165
  const officeName: Ref<string | null> = ref('資訊中心'); //'資管系'
  const userEmail: Ref<string | null> = ref(null);
  const layoutMenu = ref(adminMenu);

  // const $reset = () => {
  //   userPermission.value = '';
  //   userName.value = null;
  //   officeId.value = null;
  //   officeName.value = null;
  //   userEmail.value = null;
  // };

  const getUserInfo = async () => {
    try {
      const result = await api.get(`/User/${userEmail.value}`);
      console.log(result.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const tokenAnalyzation = async () => {
    const token = localStorage.getItem('token');
    const result = await api.post(
      '/User/analyzingPermission',
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    userPermission.value = result.data.permission;
  };
  const initialMenu = () => {
    layoutMenu.value =
      userPermission.value == 'assigner' ? assignerMenu : adminMenu;
  };

  const logout = async () => {
    try {
      const result = await api.post(
        '/User/logout',
        {},
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      localStorage.removeItem('token');
      router.push({ path: '/login' });
    } catch (e) {
      console.log('error', e);
    }
  };
  return {
    layoutMenu,
    userPermission,
    userName,
    officeId,
    officeName,
    userEmail,
    // $reset,
    getUserInfo,
    initialMenu,
    tokenAnalyzation,
    logout,
  };
});
