import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { orderOptions, orderInitial } from 'src/components/Table/data ';
import { api } from 'src/boot/axios';
import useOffice from 'src/composables/common/useOffice';

export const useTableStore = defineStore('table', () => {
  const { office, filterOption, setOfficeSelect, $officeReset, filterFn } =
    useOffice();
  const loading = ref(false);
  const page = ref(1);
  const query = ref('');
  const order = ref(orderInitial);
  const perPage = ref(10);
  const rows = ref([]);
  const selected = ref([]);

  const options = computed(() =>
    orderOptions.filter((x) => x.value !== order.value.value)
  );
  const startIndex = computed(() => (page.value - 1) * perPage.value);
  const totalPage = computed(() =>
    Math.ceil(rows.value.length / perPage.value)
  );

  const fetchRows = async (url: string, status = '') => {
    console.log(
      {
        query: query.value,
        startIndex: startIndex.value,
        perPage: perPage.value,
        order: order.value.value,
        ...(status && { status }),
      },
      url
    );
    loading.value = true;

    try {
      const result = await api.post(
        url,
        {
          query: query.value,
          startIndex: startIndex.value,
          perPage: perPage.value,
          order: order.value.value,
          ...(status && { status }),
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      rows.value = result.data.data;
      console.log(result.data, 'fetching');
    } catch (e) {
      console.log('error', e);
    }
    loading.value = false;
  };

  const $reset = () => {
    loading.value = false;
    page.value = 1;
    query.value = '';
    order.value = orderInitial;
    perPage.value = 10;
    rows.value = [];
    selected.value = [];
  };

  return {
    loading,
    page,
    query,
    order,
    perPage,
    rows,
    options,
    totalPage,
    selected,
    fetchRows,
    $reset,
  };
});
