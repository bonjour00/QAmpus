import { Ref, ref } from 'vue';
import { Member, QA, Resource } from 'src/components/Table/data ';

export default function useWarningDialog() {
  const open = ref(false);
  const row: Ref<QA | Resource | Member | null> = ref(null);

  const openDialog = () => {
    open.value = true;
  };
  const openWithData = (data: QA | Resource | Member) => {
    openDialog();
    row.value = data;
  };
  const $reset = () => {
    open.value = false;
    row.value = null;
  };
  const closeDialog = () => {
    $reset();
  };
  return {
    open,
    row,
    openDialog,
    openWithData,
    closeDialog,
  };
}
