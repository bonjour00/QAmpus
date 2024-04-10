import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import { Member, QA, Resource } from 'src/components/Table/data ';
import useNotify from '../Notify/useNotify';

export default function useTableAction() {
  const { notifyFail } = useNotify();

  //QA
  const deleteQa = async (row: QA) => {
    try {
      const qaId = row.questionId;
      const result = await api.patch(`/Question/deleted/${qaId}`);
      console.log(result.data);
      successs('刪除成功');
    } catch (e: any) {
      notifyFail(e.message);
    }
  };

  const recoverQa = async (row: QA) => {
    try {
      const qaId = row.questionId;
      const result = await api.patch(`/Question/recover/${qaId}`);
      console.log(result.data);
      successs('已復原');
    } catch (e: any) {
      notifyFail(e.message);
    }
  };

  const permanentDelQa = async (row: QA) => {
    try {
      const qaId = row.questionId;
      const result = await api.patch(`/Question/permanentlydeleted/${qaId}`);
      console.log(result.data);
      successs('刪除成功');
    } catch (e: any) {
      notifyFail(e.message);
    }
  };
  //Blob
  const deleteFile = async (row: Resource) => {
    try {
      const fileName = row.dataFilename;
      const result = await api.patch(`/Blob/deleted/${fileName}`);
      console.log(result.data);
      successs('刪除成功');
    } catch (e: any) {
      notifyFail(e.message);
    }
  };
  const recoverFile = async (row: Resource) => {
    try {
      const fileName = row.dataFilename;
      const result = await api.patch(`/Blob/recover/${fileName}`);
      console.log(result.data);
      successs('已復原');
    } catch (e: any) {
      notifyFail(e.message);
    }
  };
  const permanentDelFile = async (row: Resource) => {
    try {
      const fileName = row.dataFilename;
      const result = await api.delete(`/Blob/fileName?filename=${fileName}`);
      console.log(result.data);
      successs('刪除成功');
    } catch (e: any) {
      notifyFail(e.message);
      console.log(e, 'error');
    }
  };
  const downloadResource = async (row: Resource) => {
    try {
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
      successs('下載成功');
    } catch (e: any) {
      notifyFail(e.message);
    }
  };
  //Member
  const deleteMember = async (row: Member) => {
    try {
      const result = await api.patch(`/User`, {
        userEmail: row.userEmail,
        userPermission: 'user',
      });
      successs('刪除成功');
    } catch (e: any) {
      notifyFail(e.message);
    }
  };
  return {
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
