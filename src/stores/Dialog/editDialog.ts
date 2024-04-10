import { defineStore } from 'pinia';
import {
  PENDING_TABLE_STATUS,
  QA,
  QA_TABLE_API,
} from 'src/components/Table/data ';
import { Ref, ref } from 'vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import { useTableStore } from '../Table/table';
import useOffice from 'src/composables/common/useOffice';
import useNotify from 'src/composables/Notify/useNotify';

export const useEditDialogStore = defineStore('editDialog', () => {
  const tableStore = useTableStore();
  const { office, filterOption, setOfficeSelect, $officeReset, filterFn } =
    useOffice();
  const { notifyFail } = useNotify();
  const open = ref(false);
  const row: Ref<QA | null> = ref(null);
  const officeRecord: Ref<Array<any> | null> = ref(null);

  const getOfficeRecord = async (data: QA) => {
    try {
      const result = await api.get(`/AssignedOffice/${data.questionId}/office`);
      const records = Object.values(result.data)
        .map((office: any) => {
          if (office) {
            return {
              title: office,
            };
          }
        })
        .filter((record) => record !== undefined);
      officeRecord.value = records;
    } catch (e) {
      console.log('err', e);
    }
  };

  const openEditDialog = (data: QA) => {
    open.value = true;
    row.value = data;
    setOfficeSelect(data);
  };
  const $reset = () => {
    open.value = false;
    row.value = null;
    officeRecord.value = null;
    $officeReset();
  };
  const closeEditDialog = () => {
    $reset();
  };
  //轉單位
  const editSubmit = async () => {
    try {
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
      console.log(result.data);
      successs('修改成功');
      tableStore.fetchRows(QA_TABLE_API, PENDING_TABLE_STATUS);
    } catch (e: any) {
      notifyFail(e.response?.data);
    }
    closeEditDialog();
  };

  return {
    open,
    row,
    office,
    filterOption,
    officeRecord,
    getOfficeRecord,
    openEditDialog,
    closeEditDialog,
    editSubmit,
    filterFn,
  };
});
