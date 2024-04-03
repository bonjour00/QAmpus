<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="pendingColumns"
      :tableTitle="tableTitle"
    >
      <template v-slot:action>
        <q-btn
          label="測試"
          unelevated
          style="background: #eff0f5"
          @click="testing = true"
        ></q-btn>
      </template>
      <template v-slot:btnAction="slotProps">
        <EditBtn
          :selectRow="slotProps"
          @dialogOpen="(value) => (open = value)"
          @setSelectRow="(val) => handleEditPop(val)"
        />
        <ActionBtn
          :selectRow="slotProps"
          @updated="(row) => needConfirm(row)"
          icon="delete"
        />
      </template>
    </Table>
    <EditDialog
      v-model:open="open"
      :selectRow="selectRow"
      :title="title"
      :options="options"
      @updated="updated++"
      :readonly="true"
      :isAssigner="true"
      :officeRecord="officeRecord"
    />
    <TestingDialog
      v-model:testing="testing"
      :rows="rows"
      @updating="updated++"
    />
    <ConfirmDialog
      btnName="刪除"
      v-model:openConfirm="openConfirm"
      title="確定刪除此問答嗎?"
      description="刪除後30天內 您可以在 '近期刪除問題' 中找到 並恢復"
      @clean="data = null"
      @confirm="handleAction(data, 'deleted', '已刪除')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import EditDialog from '../components/Table/Dialog/EditDialog.vue';
import Table from '../components/Table/QaTable.vue';
import EditBtn from '../components/Table/ActionBtn/EditBtn.vue';
import { QA } from '../components/Table/data ';
import { pendingColumns } from '../components/Table/Columns';
import TestingDialog from '../components/Table/Dialog/TestingDialog.vue';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import ActionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import ConfirmDialog from '../components/Table/Dialog/ConfirmDialog.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/useTableApi';

const tableStore = useTableStore();
const { fetchRows } = useTableApi('/Question/paged/beingkicked', 'UNCONFIRMED');
fetchRows();

//editPop
const open = ref(false);
const selectRow: any = ref(null);
const officeRecord: any = ref([]);

const handleEditPop = async (value: any) => {
  selectRow.value = value;
  try {
    const result = await axios.get(
      `${process.env.API_URL}/AssignedOffice/${value.questionId}/office`
    );
    const records = Object.values(result.data).map((office: any) => ({
      officeId: office,
    }));

    officeRecord.value = records;
    console.log(result.data, records, 'recordOffice');
  } catch (e) {
    console.log('err', e);
  }
};

//optionSelect
const title = '指派單位';

// fetch offices
const options = ref([]);
const fetchOffices = async () => {
  const result = await axios.get(`${process.env.API_URL}/Office`);
  const offices = result.data.map((office: any) => ({
    label: office.officeName,
    value: office.officeId,
  }));
  options.value = offices;
};
fetchOffices();

//table
//toolValue
const tableTitle = '待指派問題';
const updated = ref(0);

//rows
const rows: Ref<QA[]> = ref([]);

//testingPop
const testing = ref(false);

//handleAction(delete)
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
      console.log(row, action);
      data.value = null;
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
src/stores/Table/table
