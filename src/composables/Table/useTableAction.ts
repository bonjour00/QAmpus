import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import { Member, QA, Resource } from 'src/components/Table/data ';

export default function useTableAction() {
  //QA
  const deleteQa = async (row: QA) => {
    try {
      const qaId = row.questionId;
      const result = await api.patch(`/Question/deleted/${qaId}`);
      console.log(result.data);
      successs('刪除成功');
    } catch (e: any) {
      console.log(e, 'error');
    }
  };

  const recoverQa = async (row: QA) => {
    try {
      const qaId = row.questionId;
      const result = await api.patch(`/Question/recover/${qaId}`);
      console.log(result.data);
      successs('已復原');
    } catch (e: any) {
      console.log(e, 'error');
    }
  };

  const permanentDelQa = async (row: QA) => {
    try {
      const qaId = row.questionId;
      const result = await api.patch(`/Question/permanentlydeleted/${qaId}`);
      console.log(result.data);
      successs('刪除成功');
    } catch (e: any) {
      console.log(e, 'error');
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
      console.log(e, 'error');
    }
  };
  const recoverFile = async (row: Resource) => {
    try {
      const fileName = row.dataFilename;
      const result = await api.patch(`/Blob/recover/${fileName}`);
      console.log(result.data);
      successs('已復原');
    } catch (e: any) {
      console.log(e, 'error');
    }
  };
  const permanentDelFile = async (row: Resource) => {
    try {
      const fileName = row.dataFilename;
      const result = await api.delete(`/Blob/fileName?filename=${fileName}`);
      console.log(result.data);
      successs('刪除成功');
    } catch (e: any) {
      console.log(e, 'error');
    }
  };
  const downloadResource = async (row: Resource) => {
    try {
      const fileName = row.dataFilename;
      const realFileName = fileName.replace(/^\d+-/, '');
      const result = await api.get(`/Blob/fileName?filename=${fileName}`, {
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
      console.log(e, 'error');
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
      console.log(e, 'error');
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
