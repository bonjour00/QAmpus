<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      :columns="pendingColumns"
      v-model:page-now="pageNow"
      v-model:search-now="searchNow"
      v-model:order-now="orderNow"
      :loading="loading"
      :tableTitle="tableTitle"
      :totalCount="totalCount"
    >
      <template v-slot:btnAction="slotProps"
        ><AuctionBtn
          :selectRow="slotProps"
          @updated="(row) => handleAction(row, 'recover', '已復原')"
          icon="history"
        />
        <AuctionBtn
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
import { ref, Ref, watch, computed } from 'vue';
import Table from '../components/Table/QaTable.vue';
import { QA, paginationInitial, orderInitial } from '../components/Table/data ';
import { pendingColumns } from '../components/Table/Columns';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import AuctionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import ConfirmDialog from '../components/Table/Dialog/ConfirmDialog.vue';

//table
//toolValue
const tableTitle = '近期刪除問題';
const pageNow = ref(paginationInitial);
const searchNow = ref('');
const orderNow = ref(orderInitial);
const updated = ref(0);
const updatedFetch = computed(() => {
  return {
    page: pageNow.value,
    search: searchNow.value,
    order: orderNow.value,
    updated: updated.value,
  };
});

//rows
const rows: Ref<QA[]> = ref([]);
const totalCount = ref(0);
const loading = ref(false);
//fetch data
const fetchRows = async (status: string) => {
  // console.log({
  //   query: searchNow.value,
  //   startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
  //   perPage: pageNow.value.rowsPerPage,
  //   officeId: testInitialOffice.value,
  //   order: orderNow.value.value,
  //   qaStatus,
  // });
  loading.value = true;
  const result = await axios.post(
    'http://140.136.202.125/api/Question/paged',
    {
      query: searchNow.value,
      startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
      perPage: pageNow.value.rowsPerPage,
      order: orderNow.value.value,
      status,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }
  );
  rows.value = result.data.data;
  totalCount.value = result.data.totalCount;
  loading.value = false;
  console.log(result, 'fetching');
};
fetchRows('deleted');

watch(updatedFetch, () => {
  fetchRows('deleted');
});

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
