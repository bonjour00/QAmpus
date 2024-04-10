import { defineStore, storeToRefs } from 'pinia';
import {
  MEMBER_TABLE_API,
  initialMember,
  assignOptions,
} from 'src/components/Table/data ';
import { computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { useTableStore } from '../Table/table';
import { useUserStore } from '../Auth/user';
import useOffice from 'src/composables/common/useOffice';

export const useRegisterDialogStore = defineStore('registerDialog', () => {
  const tableStore = useTableStore();
  const userStore = useUserStore();
  const { userPermission } = storeToRefs(userStore);
  const { office, filterOption, setOfficeSelect, $officeReset, filterFn } =
    useOffice();

  const open = ref(false);
  const userId = ref('');
  const userName = ref('');
  const userEmail = ref('');
  const nameRef: any = ref(null);
  const emailRef: any = ref(null);
  const idRef: any = ref(null);
  const officeRef: any = ref(null);
  const role = ref(initialMember);

  const options = computed(() => {
    return assignOptions.filter((x) => x.value != role.value.value);
  });

  const openRegisterDialog = () => {
    open.value = true;
    if (userPermission.value == 'assigner') {
      role.value = {
        label: userPermission.value,
        value: userPermission.value,
      };
      setOfficeSelect({
        officeName: userStore.officeName,
        officeId: userStore.officeId,
      });
    }
  };

  const $reset = () => {
    open.value = false;
    userId.value = '';
    userName.value = '';
    userEmail.value = '';
    nameRef.value = null;
    emailRef.value = null;
    idRef.value = null;
    officeRef.value = null;
    role.value = initialMember;
    $officeReset();
  };

  const closeRegisterDialog = () => {
    $reset();
  };

  const signupAdmin = async () => {
    const result = await api.post(
      '/User/admin',
      {
        userId: userId.value,
        userName: userName.value,
        userEmail: userEmail.value,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    console.log(result.data);
    successs('已發送註冊信');
  };
  const assignerToSignup = async () => {
    const userPermission = role.value.value;
    //assigner只能分配給目前所屬單位(e.g資中)
    const officeId =
      userPermission == 'assigner' ? userStore.officeId : office.value.value;
    const result = await api.post(
      '/User/assigner',
      {
        userId: userId.value,
        userName: userName.value,
        userEmail: userEmail.value,
        userPermission,
        officeId,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    console.log(result.data);
    successs('已發送註冊信');
  };

  const signupMember = async () => {
    idRef.value?.validate();
    nameRef.value?.validate();
    emailRef.value?.validate();
    if (
      nameRef.value.hasError ||
      emailRef.value.hasError ||
      idRef.value.hasError
    ) {
      return;
    } else {
      try {
        if (userPermission.value == 'assigner') {
          await assignerToSignup();
        } else {
          await signupAdmin();
        }
        tableStore.fetchRows(MEMBER_TABLE_API, tableStore.role.value);
        closeRegisterDialog();
      } catch (error: any) {
        console.log('error:', error);
      }
    }
  };

  return {
    open,
    userId,
    userName,
    userEmail,
    nameRef,
    emailRef,
    idRef,
    role,
    options,
    office,
    filterOption,
    userPermission,
    openRegisterDialog,
    closeRegisterDialog,
    signupMember,
    filterFn,
  };
});
