import { defineStore } from 'pinia';
import { ref } from 'vue';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import useOffice from 'src/composables/common/useOffice';
import useNotify from 'src/composables/Notify/useNotify';

export const useUserDislikeDialogStore = defineStore(
  'userDislikeDialog',
  () => {
    const { office, filterOption, setOfficeSelect, $officeReset, filterFn } =
      useOffice();
    const { notifyFail } = useNotify();
    const open = ref(false);
    const loading = ref(false);
    const needDirectAssign = ref(false);
    const question = ref('');
    const answer = ref('');
    const maybeOffice = ref({
      officeName: '',
      officeId: -1,
    });

    const openDislikeDialog = () => {
      open.value = true;
      //   question.value = data.question;
      //   answer.value = data.answer;
      setOfficeSelect(maybeOffice.value);
    };
    const $reset = () => {
      open.value = false;
      loading.value = false;
      needDirectAssign.value = false;
      question.value = '';
      answer.value = '';
      maybeOffice.value = {
        officeName: '',
        officeId: -1,
      };
      $officeReset();
    };
    const closeDislikeDialog = () => {
      $reset();
    };

    const dislikeSubmit = async () => {
      loading.value = true;
      try {
        if (needDirectAssign.value) {
          await directAssign();
        } else {
          await assignOffice();
        }
        successs('已幫您轉送至相關單位');
      } catch (e: any) {
        notifyFail(e.response?.data);
      }
      closeDislikeDialog();
    };
    const assignOffice = async () => {
      console.log({
        questionQuestion: question.value,
        questionAnswer: answer.value,
        officeId: office.value.value,
      });
      const result = await api.post(
        '/Question',
        {
          questionQuestion: question.value,
          questionAnswer: answer.value,
          officeId: office.value.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
    };

    const directAssign = async () => {
      console.log('directAssign');
      //   const result = await api.patch(
      //     `/Question/assigned/${row.value?.questionId}`
      //   );
      //   console.log(result);
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
