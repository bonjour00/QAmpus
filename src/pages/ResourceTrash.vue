<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="resourceColumns"
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
          @updated="(row) => handleActionDelete(row, 'deleted', '刪除成功')"
          icon="delete"
        />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import Table from '../components/Table/QaTable.vue';
import { Recource } from '../components/Table/data ';
import { resourceColumns } from '../components/Table/Columns';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import ActionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/useTableApi';

const tableStore = useTableStore();
const { fetchRows } = useTableApi('/Blob/paged', 'deleted');
fetchRows();

//table
//toolValue
const tableTitle = '近期刪除資源';
const updated = ref(0);

//rows
const rows: Ref<Recource[]> = ref([]);

//handleAction(recover/delete)
const handleAction = async (row: Recource, action: string, success: string) => {
  try {
    const result = await axios.patch(
      `http://140.136.202.125/api/Blob/${action}/${row.dataFilename}`
    );
    successs(success);
    console.log(result.data);
  } catch (e: any) {
    console.log(e, 'error');
  }
  updated.value++;
};
const handleActionDelete = async (
  row: Recource,
  action: string,
  success: string
) => {
  try {
    const result = await axios.delete(
      `http://140.136.202.125/api/Blob/fileName?filename=${row.dataFilename}`
    );
    successs(success);
    console.log(result.data);
  } catch (e: any) {
    console.log(e, 'error');
  }
  updated.value++;
};
</script>
