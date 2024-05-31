import { defineStore, storeToRefs } from 'pinia';
import { Ref, computed, ref } from 'vue';

import { useChatStore } from '../Chat/chat';
import useNotify from 'src/composables/Notify/useNotify';

export const useExamplesDialogStore = defineStore('examplesDialog', () => {
  const chatStore = useChatStore();
  const { loading } = storeToRefs(chatStore);
  const { notifyWarning } = useNotify();

  const tab = ref('師資');
  const open = ref(false);
  const tabList = ['師資', '課程', '面試', '未來出路', '專題', '實習'];
  const panelsList = [
    {
      panelName: '師資',
      examples: [
        '資管系師資',
        '資管系有哪些老師',
        '吳濟聰老師電話(或信箱、辦公室等)',
      ],
    },
    {
      panelName: '課程',
      examples: [
        '資管系課程規劃',
        '資管系輔系要修哪些課',
        '資管系雙主修要上哪些課',
      ],
    },
    {
      panelName: '面試',
      examples: ['資管系面試要用英文嗎？'],
    },
    {
      panelName: '未來出路',
      examples: ['資管系學生未來適合從事哪些工作'],
    },
    {
      panelName: '專題',
      examples: [
        '資管系專題重要時程',
        '資管系專題什麼時候要繳交文件',
        '資管系專題什麼時候要驗收系統',
        '資管系專題發表要用幾分鐘做英文總結',
        '資管系專題評分方式',
      ],
    },
    {
      panelName: '實習',
      examples: ['資管系實習預計辦理時程', '資管系實習工作內容'],
    },
  ];
  const $reset = () => {
    tab.value = '師資';
    open.value = false;
  };
  const openExamplesDialog = () => {
    open.value = true;
  };
  const closeExamplesDialog = () => {
    $reset();
  };
  const sendExample = (q: string) => {
    if (loading.value) {
      notifyWarning('請您等QAmpusAI回覆完後再繼續發送訊息');
    } else {
      chatStore.sendExample(q);
      closeExamplesDialog();
    }
  };
  return {
    tab,
    tabList,
    panelsList,
    open,
    loading,
    sendExample,
    closeExamplesDialog,
    openExamplesDialog,
  };
});
