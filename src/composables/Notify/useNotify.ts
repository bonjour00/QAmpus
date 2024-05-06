import axios from 'axios';
import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();
  const position = 'top';
  const progress = true;
  const timeout = 1500;

  const notifyFail = (error: any, title = '') => {
    let message;
    if (axios.isAxiosError(error)) {
      message = title + error.response?.data || '發生錯誤!';
    } else {
      message = error.message || '發生錯誤!';
    }
    $q.notify({
      type: 'negative',
      progress,
      position,
      timeout,
      message,
    });
  };

  const notifyWarning = (message: string) => {
    $q.notify({
      type: 'warning',
      progress,
      position,
      timeout,
      message,
    });
  };
  return { notifyFail, notifyWarning };
}
