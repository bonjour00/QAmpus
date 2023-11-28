<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      v-model:pageNow="pageNow"
      v-model:searchNow="searchNow"
      v-model:orderNow="orderNow"
    >
      <template v-slot:btnAction="slotProps"
        ><EditBtn
          :selectRow="slotProps"
          @dialogOpen="(value) => (open = value)"
          @setSelectRow="(value) => (selectRow = value)"
        />
        <DeleteBtn :selectRow="slotProps" />
      </template>
    </Table>
    <EditDialog
      v-model:open="open"
      v-model:selectRow="selectRow"
      v-model:currentOffice="currentOffice"
      :title="title"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import EditDialog from './Components/Table/Dialog/EditDialog.vue';
import Table from './Components/Table/QaTable.vue';
import EditBtn from './Components/Table/ActionBtn/EditBtn.vue';
import DeleteBtn from './Components/Table/ActionBtn/DeleteBtn.vue';
import {
  QA,
  initialQASelect,
  testInitialOffice,
  Option,
  paginationInitial,
} from './Components/Table/data ';

//editPop
const open = ref(false);
const selectRow: Ref<QA> = ref(initialQASelect);

//optionSelect
const currentOffice = ref(testInitialOffice);
const title = '指派單位';
//fetch
const options = [
  { label: '資管', value: 1 },
  { label: '統資', value: 2 },
  { label: '圖資', value: 3 },
];

const pageNow = ref(paginationInitial);
const searchNow = ref('');
const orderNow = ref({ label: '最新', value: 'desc' });
//fetch data
const test = (type: boolean) => {
  console.log({
    query: searchNow.value,
    startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
    perPage: pageNow.value.rowsPerPage,
    officeId: testInitialOffice.value,
    order: orderNow.value.value,
    type,
  });
};
watch(pageNow, () => {
  console.log(1);
  test(true);
});
watch(searchNow, () => {
  console.log(2);
  test(true);
});
watch(orderNow, () => {
  console.log(3);
  test(true);
});
const rows = [
  {
    qaId: 1,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    userId: '121',
    qaAsktime: new Date(),
    qaChecktime: null,
    qaCheck: false,
  },
  {
    qaId: 2,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    userId: '121',
    qaAsktime: new Date(),
    qaChecktime: null,
    qaCheck: false,
  },
  {
    qaId: 3,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    userId: '121',
    qaAsktime: new Date(),
    qaChecktime: null,
    qaCheck: false,
  },
  {
    qaId: 4,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    userId: '121',
    qaAsktime: new Date(),
    qaChecktime: null,
    qaCheck: false,
  },
];
</script>
