import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  orderOptions,
  orderInitial,
  initialMember,
  assignOptions,
} from 'src/components/Table/data ';
import { api } from 'src/boot/axios';
import useOffice from 'src/composables/common/useOffice';
import { useUserStore } from '../Auth/user';
import useNotify from 'src/composables/Notify/useNotify';

export const useTableStore = defineStore('table', () => {
  const userStore = useUserStore();
  const { notifyFail } = useNotify();
  const {
    office,
    filterOption,
    officeList,
    setOfficeSelect,
    $officeReset,
    filterFn,
    customSetSelect,
  } = useOffice();
  const loading = ref(false);
  const page = ref(1);
  const query = ref('');
  const order = ref(orderInitial);
  const perPage = ref(10);
  const rows = ref([]);
  const selected = ref([]);
  const defaultSelect: any = ref(null);
  const role = ref(initialMember);
  const totalCount = ref(0);

  const roleOptions = computed(() => {
    return assignOptions.filter((x) => x.value != role.value.value);
  });
  const options = computed(() =>
    orderOptions.filter((x) => x.value !== order.value.value)
  );
  const startIndex = computed(() => (page.value - 1) * perPage.value);
  const totalPage = computed(() => Math.ceil(totalCount.value / perPage.value));
  const all = { label: '全部', value: '' };

  const setInitialRole = () => {
    role.value = {
      label: userStore.userPermission,
      value: userStore.userPermission,
    };
  };
  const setTool = async () => {
    defaultSelect.value = {
      label: userStore.officeName,
      value: userStore.officeId,
    };
    await setOfficeSelect({
      officeName: userStore.officeName,
      officeId: userStore.officeId,
    });
    const options = [all, ...officeList.value];
    customSetSelect(options);
  };
  const setAssignSelect = () => {
    office.value = all;
    defaultSelect.value = all;
  };
  const fetchRows = async (url: string, status = '') => {
    const officeId = office.value
      ? office.value.value
      : defaultSelect.value.value;

    loading.value = true;

    try {
      const result = await api.post(
        url,
        {
          query: query.value,
          startIndex: startIndex.value,
          perPage: perPage.value,
          order: order.value.value,
          ...(officeId && { officeId }),
          ...(status && { status }),
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      rows.value = result.data.data;
      totalCount.value = result.data.totalCount;
      console.log(result.data, 'fetching');
    } catch (e) {
      notifyFail(e);
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
    rows.value = [];
    selected.value = [];
    defaultSelect.value = null;
    role.value = initialMember;
    $officeReset();
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
    office,
    filterOption,
    role,
    roleOptions,
    fetchRows,
    $reset,
    filterFn,
    setTool,
    setAssignSelect,
    setInitialRole,
  };
});
