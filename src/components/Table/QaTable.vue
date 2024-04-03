<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    :title="tableTitle"
    hide-pagination
    :rows-per-page-options="[tableStore.perPage]"
    :loading="tableStore.loading"
    style="border-radius: 25px; padding: 20px; height: 92vh"
  >
    <template v-slot:top-right>
      <SearchTable @update-search="updateSearch" />
      <OptionSelect
        v-model:currentOption="tableStore.order"
        :options="tableStore.options"
        :title="title"
      />
    </template>
    <template v-slot:header-cell-actions>
      <q-th>
        <slot name="action"></slot>
      </q-th>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <slot name="btnAction" :props="props"></slot>
      </q-td>
    </template>

    <template #bottom>
      <div style="right: 30px" class="absolute">
        <PaginationTable
          v-model:page="tableStore.page"
          :totalPage="tableStore.totalPage"
        />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import SearchTable from './Toolbar/SearchTable.vue';
import OptionSelect from './Toolbar/OptionSelect.vue';
import PaginationTable from './Pagination/PaginationTable.vue';
import { QA, Recource, Member } from './data ';
import { useTableStore } from 'src/stores/Table/table';

const props = defineProps<{
  rows: QA[] | Recource[] | Member[];
  columns: any;
  tableTitle: string;
}>();

const tableStore = useTableStore();

//toolBar
const title = '分類'; //optionTitle(prepend前綴)
//enter時才search
const updateSearch = (value: any) => {
  tableStore.query = value;
};
</script>
<style lang="sass">
.q-table__title
  font-weight: 600
  font-size: 30px
</style>
