<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="pendingColumns"
      :tableTitle="tableTitle"
    >
      <template v-slot:btnAction="slotProps"
        ><ActionBtn
          :selectRow="slotProps"
          @updated="(row) => handleAction(row, 'recover', '已復原')"
          icon="history"
        />
        <ActionBtn
          :selectRow="slotProps"
          @updated="(row) => needConfirm(row)"
          icon="delete"
        />
      </template>
    </Table>
    <ConfirmDialog
      btnName="刪除"
      v-model:openConfirm="openConfirm"
      title="確定刪除此問答嗎?"
      description="這將永久刪除這則問答!"
      @clean="data = null"
      @confirm="handleDeleteAction(data, 'deleted', '已永久刪除')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import Table from '../components/Table/QaTable.vue';
import { QA } from '../components/Table/data ';
import { pendingColumns } from '../components/Table/Columns';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import ActionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import ConfirmDialog from '../components/Table/Dialog/ConfirmDialog.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/useTableApi';

const tableStore = useTableStore();
const { fetchRows } = useTableApi('/Question/paged', 'deleted');
fetchRows();

//table
//toolValue
const tableTitle = '近期刪除問題';
const updated = ref(0);

//rows
const rows: Ref<QA[]> = ref([]);

//handleAction(recover/delete)
const handleAction = async (
  row: QA | null,
  action: string,
  success: string
) => {
  try {
    if (row !== null) {
      const result = await axios.patch(
        `http://140.136.202.125/api/Question/${action}/${row.questionId}`
      );
      successs(success);
      console.log(result.data);
    }
  } catch (e: any) {
    console.log(e, 'error');
  }
  updated.value++;
};
const handleDeleteAction = async (
  row: QA | null,
  action: string,
  success: string
) => {
  try {
    if (row !== null) {
      const result = await axios.delete(
        `http://140.136.202.125/api/Question/${row.questionId}`
      );
      successs(success);
      console.log(result.data);
    }
  } catch (e: any) {
    console.log(e, 'error');
  }
  updated.value++;
};

//confirmPop
const openConfirm = ref(false);

//delete need confirm
const data = ref(null);
const needConfirm = (row: any) => {
  openConfirm.value = true;
  data.value = row;
};
</script>
