<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    :title="tableTitle"
    hide-pagination
    :rows-per-page-options="[pagination.rowsPerPage]"
    :loading="loading"
    style="border-radius: 25px; padding: 20px; height: 92vh"
  >
    <template v-slot:top-right>
      <SearchTable @update-search="searchReturn" />
      <OptionSelect
        :currentOption="orderNow"
        @update:current-option="orderReturn"
        :options="options"
        :title="title"
      />
      <slot name="add"></slot>
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
          :pagination="pagination"
          @update:pagination="pageReturn"
        />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SearchTable from './Toolbar/SearchTable.vue';
import OptionSelect from './Toolbar/OptionSelect.vue';
import PaginationTable from './Pagination/PaginationTable.vue';
import {
  QA,
  Pagination,
  Option,
  orderOptions,
  Recource,
  Member,
} from './data ';

const props = defineProps<{
  rows: QA[] | Recource[] | Member[];
  columns: any;
  tableTitle: string;
  loading: boolean;
  pageNow: Pagination;
  searchNow: string;
  orderNow: Option;
  totalCount: number;
}>();

//toolBar
const options = orderOptions;
const title = '分類'; //optionTitle(prepend前綴)

//pagination
const pagination = computed(() => {
  return { ...props.pageNow, rowLength: props.totalCount };
});

const emit = defineEmits([
  'update:pageNow',
  'update:searchNow',
  'update:orderNow',
]);

// 回傳第幾頁、幾筆
const pageReturn = (value: any) => {
  emit('update:pageNow', value);
};
const searchReturn = (value: any) => {
  emit('update:searchNow', value);
};
const orderReturn = (value: any) => {
  emit('update:orderNow', value);
};
</script>
<style lang="sass">
.q-table__title
  font-weight: 600
  font-size: 30px
</style>
