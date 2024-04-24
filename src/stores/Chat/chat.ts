import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { api } from 'src/boot/axios';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { useUserStore } from '../Auth/user';
import { useRouter } from 'vue-router';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();
  const router = useRouter();
  type MessageQA = {
    question: string;
    answer: string;
    loading: boolean;
    copyIcon: string;
  };
  const question = ref('');
  const qaList: Ref<MessageQA[]> = ref([]);
  const loading = ref(false); //input disable or not
  const open = ref(false);
  const thumbDownOpen = ref(false);
  const thumbDownIndex = ref(0);

  const $reset = () => {
    question.value = '';
    qaList.value = [];
    loading.value = false;
    open.value = false;
  };
  const sendMessage = async () => {
    if (question.value.trim() !== '') {
      const q = question.value;
      question.value = '';
      qaList.value.push({
        question: q,
        answer: '',
        loading: true,
        copyIcon: 'content_copy',
      });
      try {
        loading.value = true;
        const result = await api.post('/Question/ask', {
          question: q,
        });
        qaList.value[qaList.value.length - 1].answer = result.data.answer;
        qaList.value[qaList.value.length - 1].loading = false;
        loading.value = false;
      } catch (e) {
        console.log('error', e);
        qaList.value[qaList.value.length - 1].answer = '發生錯誤';
        qaList.value[qaList.value.length - 1].loading = false;
        loading.value = false;
      }
    }
  };
  const handleThumbDown = async (index: number) => {
    if (userStore.userEmail) {
      try {
        const result = await api.post(
          '/Question',
          {
            questionQuestion: qaList.value[index].question,
            questionAnswer: qaList.value[index].answer,
            officeId: 165,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        successs('已幫您轉送至相關單位');
      } catch (e) {
        console.log(e);
      }
    } else {
      open.value = true;
      thumbDownOpen.value = true;
      thumbDownIndex.value = index;
    }
  };
  const confirm = () => {
    router.push({ path: '/login' });
    open.value = false;
  };

  const copy = async (index: number) => {
    const QA = qaList.value[index];
    try {
      const text = QA.answer;
      await navigator.clipboard.writeText(text);
      QA.copyIcon = 'check';
      setTimeout(() => {
        QA.copyIcon = 'content_copy';
      }, 300);
    } catch (e) {
      QA.copyIcon = 'content_copy';
      console.log(e);
    }
  };
  return {
    question,
    qaList,
    loading,
    open,
    copy,
    sendMessage,
    handleThumbDown,
    confirm,
  };
});
