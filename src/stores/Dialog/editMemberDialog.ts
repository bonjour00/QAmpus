import { defineStore, storeToRefs } from 'pinia';
import {
  MEMBER_TABLE_API,
  Member,
  initialMember,
  assignOptions,
} from 'src/components/Table/data ';
import { Ref, computed, ref } from 'vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import { useTableStore } from '../Table/table';
import { useUserStore } from '../Auth/user';
import useOffice from 'src/composables/common/useOffice';

export const useEditMemberDialogStore = defineStore('editMemberDialog', () => {
  const tableStore = useTableStore();
  const userStore = useUserStore();
  const { officeName, officeId } = storeToRefs(userStore);

  const { office, filterOption, setOfficeSelect, $officeReset, filterFn } =
    useOffice();

  const open = ref(false);
  const row: Ref<Member | null> = ref(null);
  const role = ref(initialMember); //role
  const userName = ref('');
  const loading = ref(false);

  const options = computed(() => {
    return assignOptions.filter((x) => x.value != role.value.value);
  });

  const openMemberDialog = (data: Member) => {
    open.value = true;
    row.value = data;
    userName.value = data.userName;
    const permision = data.userPermission.trim();
    role.value = { label: permision, value: permision };
    setOfficeSelect(data);
  };
  const $reset = () => {
    open.value = false;
    role.value = initialMember;
    row.value = null;
    userName.value = '  ';
    loading.value = false;
    $officeReset();
  };
  const closeEditMemberDialog = () => {
    $reset();
  };
  //edit member permision
  const editMember = async () => {
    try {
      loading.value = true;
      const userPermission = role.value.value;
      const editOffice =
        userPermission == 'assigner' ? officeId.value : office.value.value;
      const result = await api.patch(`/User`, {
        userEmail: row.value!.userEmail,
        userPermission,
        officeId: editOffice,
      });
      loading.value = false;
      successs('修改成功');
      tableStore.fetchRows(MEMBER_TABLE_API, tableStore.role.value);
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
    office,
    filterOption,
    officeName,
    row,
    loading,
    openMemberDialog,
    closeEditMemberDialog,
    editMember,
    filterFn,
  };
});
