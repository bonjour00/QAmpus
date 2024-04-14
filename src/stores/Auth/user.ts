import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { adminMenu, assignerMenu } from 'src/components/Layout/data';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const userPermission: Ref<string> = ref('');
  const userName: Ref<string | null> = ref(null);
  const userEmail: Ref<string | null> = ref(null);
  const officeId: Ref<number | null> = ref(null); //165
  const officeName: Ref<string | null> = ref(null); //'資管系'
  const layoutMenu = ref(adminMenu);

  const $reset = () => {
    userPermission.value = '';
    userName.value = null;
    officeId.value = null;
    officeName.value = null;
    userEmail.value = null;
  };

  const tokenAnalyzation = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await api.post(
        'User/analyzingall',
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      userPermission.value = result.data.userPermission.trim();
      userName.value = result.data.userName.trim();
      userEmail.value = result.data.userEmail.trim();
      officeId.value = result.data.officeId;
      officeName.value = result.data.officeName
        ? result.data.officeName.trim()
        : null;
    } catch (error: any) {
      console.log('errorAuth:', error);
      localStorage.removeItem('token');
      router.push({ path: '/login' });
    }
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
      $reset();
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
    userEmail,
    officeId,
    officeName,
    initialMenu,
    tokenAnalyzation,
    logout,
  };
});