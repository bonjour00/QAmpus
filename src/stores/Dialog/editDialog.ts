import { defineStore } from 'pinia';
import { QA } from 'src/components/Table/data ';
import { Ref, computed, ref } from 'vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import { useTableStore } from '../Table/table';
import useOffice from 'src/composables/common/useOffice';
import useNotify from 'src/composables/Notify/useNotify';

export const useEditDialogStore = defineStore('editDialog', () => {
  const tableStore = useTableStore();
  const { office, filterOption, setOfficeSelect, $officeReset, filterFn } =
    useOffice();
  const { notifyFail, notifyWarning } = useNotify();
  const open = ref(false);
  const row: Ref<QA | null> = ref(null);
  const officeRecord: Ref = ref([]);
  const loading = ref(false);
  const needDirectAssign = ref(false);
  const url = ref('');
  const status = ref('');
  const text = '您已被分配者指派回覆';
  // const needAssigntext = '將請分配者負責指派單位';

  // const text = computed(() => {
  //   return needDirectAssign.value ? needAssigntext : alreadyAssigntext;
  // });

  const getOfficeRecord = async (data: QA) => {
    try {
      const result = await api.get(`/AssignedOffice/${data.questionId}/office`);
      const records = result.data.officeTransferHistoryList.map(
        (office: any) => {
          return {
            title: office.officeName,
          };
        }
      );
      officeRecord.value = records;
      console.log(records);
    } catch (e) {
      console.log('err', e);
    }
  };

  const openEditDialog = (data: QA, tableUrl: string, tableStatus = '') => {
    open.value = true;
    row.value = data;
    url.value = tableUrl;
    status.value = tableStatus;
    getOfficeRecord(data);
    setOfficeSelect(data);
  };
  const $reset = () => {
    open.value = false;
    row.value = null;
    officeRecord.value = [];
    loading.value = false;
    needDirectAssign.value = false;
    url.value = '';
    status.value = '';
    $officeReset();
  };
  const closeEditDialog = () => {
    $reset();
  };
  //轉單位
  const editSubmit = async () => {
    if (!needDirectAssign.value && !(office.value && office.value.value)) {
      notifyWarning('尚未選取指派單位');
      return;
    }
    loading.value = true;
    try {
      if (needDirectAssign.value) {
        await directAssign();
      } else {
        await assignOffice();
      }

      successs('修改成功');
      tableStore.fetchRows(url.value, status.value);
    } catch (e: any) {
      notifyFail(e);
    }

    closeEditDialog();
  };
  const assignOffice = async () => {
    const result = await api.post(
      '/AssignedOffice',
      {
        qaId: row.value?.questionId,
        officeId: office.value.value,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  };

  const directAssign = async () => {
    //直接請分配者指派(不用浪費三次轉移)
    const result = await api.patch(
      `/Question/assigned/${row.value?.questionId}`
    );
    console.log(result);
  };

  return {
    open,
    row,
    office,
    filterOption,
    officeRecord,
    loading,
    needDirectAssign,
    text,
    getOfficeRecord,
    openEditDialog,
    closeEditDialog,
    editSubmit,
    filterFn,
  };
});
