import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import useOffice from 'src/composables/common/useOffice';
import useNotify from 'src/composables/Notify/useNotify';

export const useUserDislikeDialogStore = defineStore(
  'userDislikeDialog',
  () => {
    const { office, filterOption, setOfficeSelect, $officeReset, filterFn } =
      useOffice();
    const { notifyFail, notifyWarning } = useNotify();
    type officeType = {
      officeId: number;
      officeName: string | null;
    };
    const open = ref(false);
    const loading = ref(false);
    const needDirectAssign = ref(false);
    const question = ref('');
    const answer = ref('');
    const maybeOffice: Ref<officeType> = ref({
      officeName: null,
      officeId: 0,
    });

    const openDislikeDialog = () => {
      open.value = true;
      if (!maybeOffice.value.officeId) {
        needDirectAssign.value = true;
      }
      setOfficeSelect(maybeOffice.value);
    };
    const $reset = () => {
      open.value = false;
      loading.value = false;
      needDirectAssign.value = false;
      question.value = '';
      answer.value = '';
      maybeOffice.value = {
        officeName: null,
        officeId: 0,
      };
      $officeReset();
    };
    const closeDislikeDialog = () => {
      $reset();
    };

    const dislikeSubmit = async () => {
      if (!needDirectAssign.value && !(office.value && office.value.value)) {
        notifyWarning('請勾選不確定所屬單位 或 選擇所屬單位');
        return;
      }
      loading.value = true;
      const officeId =
        office.value && (office.value.value as number) > 0
          ? office.value.value
          : null;

      console.log({
        questionQuestion: question.value,
        questionAnswer: answer.value,
        ...(officeId && !needDirectAssign.value && { officeId }),
      });
      try {
        const result = await api.post(
          '/Question',
          {
            questionQuestion: question.value,
            questionAnswer: answer.value,
            ...(officeId && !needDirectAssign.value && { officeId }),
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        successs('已幫您轉送至相關單位');
      } catch (e: any) {
        notifyFail(e);
      }
      closeDislikeDialog();
    };

    return {
      open,
      office,
      filterOption,
      loading,
      needDirectAssign,
      question,
      answer,
      maybeOffice,
      closeDislikeDialog,
      openDislikeDialog,
      dislikeSubmit,
      filterFn,
    };
  }
);
