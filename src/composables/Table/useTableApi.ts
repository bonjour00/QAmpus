import { computed, watch } from 'vue';
import { useTableStore } from 'src/stores/Table/table';

export default function useTableApi(url: string, status = '') {
  const tableStore = useTableStore();

  //先重置
  tableStore.$reset();
  //初始化
  tableStore.setTool();

  const updatedFetch = computed(() => {
    return {
      page: tableStore.page,
      search: tableStore.query,
      order: tableStore.order,
      officeId: tableStore.office,
      roleStatus: tableStore.role,
    };
  });
  const fetchRows = () => {
    console.log(url, status || tableStore.role.value);
    tableStore.fetchRows(url, status || tableStore.role.value);
  };

  watch(updatedFetch, () => {
    fetchRows();
  });
  return {
    fetchRows,
  };
}
