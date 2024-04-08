import { defineStore } from 'pinia';
import {
  MEMBER_TABLE_API,
  Member,
  memberOptions,
  initialMember,
  adminEditOptions,
} from 'src/components/Table/data ';
import { Ref, computed, ref } from 'vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import { useTableStore } from '../Table/table';
import { useUserStore } from '../Auth/user';

export const useEditMemberDialogStore = defineStore('editMemberDialog', () => {
  const tableStore = useTableStore();
  const userStore = useUserStore();

  const open = ref(false);
  const row: Ref<Member | null> = ref(null);
  const role = ref(initialMember); //role
  const userName = ref('');

  const options = computed(() => {
    const options =
      userStore.userPermission == 'assigner' ? memberOptions : adminEditOptions;

    return options.filter((x) => x.value != role.value.value);
  });

  const openMemberDialog = (data: Member) => {
    open.value = true;
    row.value = data;
    userName.value = data.userName;
    const permision = data.userPermission.trim();
    role.value = { label: permision, value: permision };
  };
  const $reset = () => {
    open.value = false;
    role.value = initialMember;
    row.value = null;
    userName.value = '  ';
  };
  const closeEditMemberDialog = () => {
    $reset();
  };
  //edit member permision
  const editMember = async () => {
    try {
      const userPermission = role.value.value;
      console.log(userPermission, 'status');
      const result = await api.patch(`/User`, {
        userEmail: row.value!.userEmail,
        userPermission,
      });

      successs('修改成功');
      tableStore.fetchRows(MEMBER_TABLE_API);
    } catch (e: any) {
      console.log(e, 'error');
    }
    closeEditMemberDialog();
  };

  return {
    open,
    role,
    options,
    userName,
    openMemberDialog,
    closeEditMemberDialog,
    editMember,
  };
});
