const headerStyle = 'font-size: medium;';
const addHours = (date: Date, hours: number) => {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
};

const pendingColumn = [
  {
    name: 'questionQuestion',
    label: '問題',
    align: 'left',
    field: 'questionQuestion',
    format: (val: string) =>
      `${val.length > 20 ? val.substring(0, 20) + '...' : val}`,
    sortable: true,
    headerStyle,
  },
  {
    name: 'questionAnswer',
    label: '答案',
    align: 'left',
    field: 'questionAnswer',
    format: (val: string) =>
      `${val.length > 20 ? val.substring(0, 20) + '...' : val}`,
    sortable: true,
    headerStyle,
  },
  {
    name: 'questionAddtime',
    align: 'left',
    label: '發問時間',
    field: 'questionAddtime',
    format: (val: Date) =>
      `${addHours(new Date(val), 8).toLocaleString('zh-TW')}`,
    sortable: true,
    headerStyle,
  },
  {
    name: 'officeName',
    align: 'left',
    label: '指派單位',
    field: 'officeName',
    sortable: true,
    headerStyle,
  },
];

const resourceColumn = [
  {
    name: 'dataFilename',
    label: '來源',
    align: 'left',
    field: 'dataFilename',
    format: (val: string) =>
      `${val.length > 20 ? val.substring(0, 20) + '...' : val}`,
    sortable: true,
    headerStyle,
  },
  {
    name: 'dataDescription',
    align: 'left',
    label: '資源名稱',
    format: (val: string) =>
      `${val.length > 20 ? val.substring(0, 20) + '...' : val}`,
    field: 'dataDescription',
    sortable: true,
    headerStyle,
  },
  {
    name: 'dataFiletype',
    align: 'left',
    label: '資源種類',
    field: 'dataFiletype',
    sortable: true,
    headerStyle,
  },

  {
    name: 'dataUploadTime',
    align: 'left',
    label: '上傳時間',
    field: 'dataUploadTime',
    format: (val: Date) =>
      `${addHours(new Date(val), 8).toLocaleString('zh-TW')}`,
    sortable: true,
    headerStyle,
  },
  {
    name: 'officeName',
    align: 'left',
    label: '單位',
    field: 'officeName',
    sortable: true,
    headerStyle,
  },
];

const memberColumn = [
  {
    name: 'userId',
    label: '教職員編號',
    align: 'left',
    field: 'userId',
    sortable: true,
    headerStyle,
  },
  {
    name: 'userName',
    align: 'left',
    label: '名稱',
    field: 'userName',
    sortable: true,
    headerStyle,
  },
  {
    name: 'userEmail',
    align: 'left',
    label: 'EMAIL',
    field: 'userEmail',
    sortable: true,
    headerStyle,
  },
  {
    name: 'userSignuptime',
    align: 'left',
    label: '申請時間',
    field: 'userSignuptime',
    format: (val: Date) =>
      `${addHours(new Date(val), 8).toLocaleString('zh-TW')}`,
    sortable: true,
    headerStyle,
  },
  {
    name: 'officeName',
    align: 'left',
    label: '單位',
    field: 'officeName',
    sortable: true,
    headerStyle,
  },
  {
    name: 'userPermission',
    align: 'left',
    label: '權限',
    field: 'userPermission',
    sortable: true,
    headerStyle,
  },
  {
    name: 'emailVerified',
    align: 'left',
    label: '狀態',
    field: 'emailVerified',
    sortable: true,
    headerStyle,
  },
];
const action = { name: 'actions', align: 'right', label: '', field: '' };
export const pendingColumns = [...pendingColumn, action];
export const resourceColumns = [...resourceColumn, action];
export const memberColumns = [...memberColumn, action];
export const assignColumn = [
  ...pendingColumn,
  {
    name: 'time',
    align: 'left',
    label: '轉移次數',
    field: 'time',
    sortable: true,
    headerStyle,
  },
  action,
];
export const trashQAColumns = [
  ...pendingColumn,
  {
    name: 'questionDeletedtime',
    align: 'left',
    label: '刪除時間',
    field: 'questionDeletedtime',
    format: (val: Date) =>
      `${addHours(new Date(val), 8).toLocaleString('zh-TW')}`,
    sortable: true,
    headerStyle,
  },
  action,
];
export const trashResouceColumns = [
  ...resourceColumn,
  {
    name: 'dataDeletedTime',
    align: 'left',
    label: '刪除時間',
    field: 'dataDeletedTime',
    format: (val: Date) =>
      `${addHours(new Date(val), 8).toLocaleString('zh-TW')}`,
    sortable: true,
    headerStyle,
  },
  action,
];
