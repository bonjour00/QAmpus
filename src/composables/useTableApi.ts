import { computed, watch } from 'vue';
import { useTableStore } from 'src/stores/Table/table';
import { storeToRefs } from 'pinia';

export default function useTableApi(url: string, status: string) {
  const tableStore = useTableStore();
  //先重置
  tableStore.$reset();
  const updatedFetch = computed(() => {
    return {
      page: tableStore.page,
      search: tableStore.query,
      order: tableStore.order,
    };
  });
  const fetchRows = () => {
    console.log(url, status);
    tableStore.fetchRows(url, status);
  };
  watch(updatedFetch, () => {
    fetchRows();
  });
  return {
    fetchRows,
  };
}
