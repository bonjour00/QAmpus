import { Ref, ref } from 'vue';
import { initialOffice, Option } from 'src/components/Table/data ';
import { api } from 'src/boot/axios';

export default function useOffice() {
  const office: Ref<Option> = ref(initialOffice);
  const officeList: Ref<Option[]> = ref([]);
  const filterOption: Ref<Option[]> = ref([]);

  const fetchOffices = async () => {
    try {
      const result = await api.get('/Office');
      const offices = result.data.map((office: any) => ({
        label: office.officeName,
        value: office.officeId,
      }));
      officeList.value = offices;
    } catch (e) {
      console.log(e);
    }
  };

  const customSetSelect = (data: any) => {
    officeList.value = data;
  };
  //office q-select intial
  const setOfficeSelect = async (data: any) => {
    office.value = {
      label: data.officeName,
      value: data.officeId,
    };
    await fetchOffices();
  };
  const $officeReset = () => {
    office.value = initialOffice;
    officeList.value = [];
    filterOption.value = [];
  };

  const filterFn = (val: string, update: any) => {
    if (val === '') {
      update(() => {
        filterOption.value = officeList.value;
      });
      return;
    }
    update(() => {
      const needle = val.toLowerCase();
      filterOption.value = officeList.value.filter((office) =>
        office.label.toLowerCase().includes(needle)
      );
    });
  };

  return {
    office,
    filterOption,
    officeList,
    setOfficeSelect,
    $officeReset,
    filterFn,
    customSetSelect,
  };
}
