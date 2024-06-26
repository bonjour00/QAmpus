<template>
  <q-table
    :rows="rows"
    :columns="columns"
    :row-key="rowKey"
    :title="tableTitle"
    hide-pagination
    :rows-per-page-options="[tableStore.perPage]"
    :loading="tableStore.loading"
    style="border-radius: 25px; height: 82vh; margin-top: 7vh"
    class="q-pa-md"
    :selection="selection || 'none'"
    v-model:selected="tableStore.selected"
  >
    <template v-slot:top-right>
      <div class="q-gutter-sm flex">
        <FilterSelect
          v-if="userStore.userPermission == 'assigner'"
          :title="filterTitle || '所屬單位: '"
          v-model:currentOption="tableStore.office"
          :filterFn="filterFn"
          :filterOption="tableStore.filterOption"
        />
        <slot name="role"></slot>
        <SearchTable @update-search="updateSearch" />
        <OptionSelect
          v-model:currentOption="tableStore.order"
          :options="tableStore.options"
          :title="title"
        />
      </div>
    </template>
    <template v-slot:header-selection="scope">
      <q-checkbox v-model="scope.selected" />
    </template>
    <template v-slot:body-selection="scope">
      <q-checkbox
        :model-value="scope.selected"
        @update:model-value="
          (val, evt) => {
            Object.getOwnPropertyDescriptor(scope, 'selected').set(val, evt);
          }
        "
      />
    </template>
    <template v-slot:header-cell-actions>
      <q-th>
        <slot name="action"></slot>
      </q-th>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div class="q-gutter-sm">
          <slot name="btnAction" :props="props"></slot>
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-emailVerified="props">
      <q-td :props="props">
        <QuasarChip
          :color="vertifyColor(props.value)"
          textColor="white"
          :text="props.value ? '已驗證' : '未驗證'"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-dataFilename="props">
      <q-td :props="props">
        <span
          :class="`text-primary text-weight-bold ${fileCustom}`"
          @click="$emit('download', props.row)"
          >{{ props.value.replace(/^\d+-/, '') }}</span
        >
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
import FilterSelect from '../Select/FilterSelect.vue';
import { QA, Resource, Member } from './data ';
import QuasarChip from '../Chip/QuasarChip.vue';
import { useTableStore } from 'src/stores/Table/table';
import { useUserStore } from 'src/stores/Auth/user';

const props = defineProps<{
  rows: QA[] | Resource[] | Member[];
  columns: any;
  tableTitle: string;
  selection?: 'multiple';
  rowKey: string;
  fileCustom?: string;
  filterTitle?: string;
}>();

const tableStore = useTableStore();
const userStore = useUserStore();

defineEmits(['download']);

const vertifyColor = (data: any) => {
  if (data) {
    return 'green';
  }
  return 'secondary';
};
//toolBar
const title = '分類'; //optionTitle(prepend前綴)
//enter時才search
const updateSearch = (value: any) => {
  tableStore.query = value;
};
const filterFn = (val: string, update: any) => {
  tableStore.filterFn(val, update);
};
</script>
<style lang="sass">
.q-table__title
  font-weight: 600
  font-size: 30px
</style>
