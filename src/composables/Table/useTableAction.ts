import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import { Member, QA, Resource } from 'src/components/Table/data ';
import useNotify from '../Notify/useNotify';
import { ref } from 'vue';

export default function useTableAction() {
  const { notifyFail } = useNotify();
  const loading = ref(false);

  //QA
  const deleteQa = async (row: QA) => {
    loading.value = true;
    try {
      const qaId = row.questionId;
      const result = await api.patch(`/Question/deleted/${qaId}`);
      console.log(result.data);
      loading.value = false;
      successs('刪除成功');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };

  const recoverQa = async (row: QA) => {
    try {
      loading.value = true;
      const qaId = row.questionId;
      const result = await api.patch(`/Question/recover/${qaId}`);
      console.log(result.data);
      loading.value = false;
      successs('已復原');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };

  const permanentDelQa = async (row: QA) => {
    try {
      loading.value = true;
      const qaId = row.questionId;
      const result = await api.patch(`/Question/permanentlydeleted/${qaId}`);
      console.log(result.data);
      loading.value = false;
      successs('刪除成功');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };
  //Blob
  const deleteFile = async (row: Resource) => {
    try {
      loading.value = true;
      const fileName = row.dataFilename;
      const result = await api.patch(`/Blob/deleted/${fileName}`);
      console.log(result.data);
      loading.value = false;
      successs('刪除成功');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };
  const recoverFile = async (row: Resource) => {
    try {
      loading.value = true;
      const fileName = row.dataFilename;
      const result = await api.patch(`/Blob/recover/${fileName}`);
      loading.value = false;
      successs('已復原');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };
  const permanentDelFile = async (row: Resource) => {
    try {
      loading.value = true;
      const fileName = row.dataFilename;
      const result = await api.delete(`/Blob/fileName?filename=${fileName}`);
      console.log(result.data);
      loading.value = false;
      successs('刪除成功');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };
  const downloadResource = async (row: Resource) => {
    try {
      loading.value = true;
      const fileName = row.dataFilename;
      const realFileName = fileName.replace(/^\d+-/, '');
      const result = await api.get(`/Blob/fileName?filename=${fileName}1`, {
        responseType: 'blob',
      });
      const fileURL = URL.createObjectURL(new Blob([result.data]));
      const fileLink = document.createElement('a');

      fileLink.href = fileURL;
      fileLink.setAttribute('download', realFileName);
      document.body.appendChild(fileLink);

      fileLink.click();
      fileLink.remove();
      URL.revokeObjectURL(fileURL);
      loading.value = false;
      successs('下載成功');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };
  //Member
  const deleteMember = async (row: Member) => {
    try {
      loading.value = true;
      const result = await api.patch(`/User`, {
        userEmail: row.userEmail,
        userPermission: 'user',
      });
      loading.value = false;
      successs('刪除成功');
    } catch (e: any) {
      loading.value = false;
      notifyFail(e.message);
    }
  };
  return {
    loading,
    deleteQa,
    recoverQa,
    permanentDelQa,
    deleteFile,
    recoverFile,
    permanentDelFile,
    downloadResource,
    deleteMember,
  };
}
