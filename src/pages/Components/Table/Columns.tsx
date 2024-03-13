const headerStyle = 'font-size: medium;font-weight: 900';
const addHours = (date: Date, hours: number) => {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
};

export const pendingColumns = [
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
    name: 'questionCreaterId',
    align: 'left',
    label: '發問者學號',
    field: 'questionCreaterId',
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
  { name: 'actions', align: 'right', label: '', field: '' },
];

export const resourceColumns = [
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
  { name: 'actions', align: 'right', label: '', field: '' },
];

export const assignColumn = [
  {
    name: 'qaQuestion',
    label: '問題',
    align: 'left',
    field: 'qaQuestion',
    sortable: true,
    headerStyle: 'font-size: medium;font-weight: 900',
  },
  {
    name: 'qaCreateId',
    align: 'left',
    label: '發問者學號',
    field: 'qaCreateId',
    sortable: true,
    headerStyle: 'font-size: medium;font-weight: 900',
  },
  {
    name: 'qaAsktime',
    align: 'left',
    label: '發問時間',
    field: 'qaAsktime',
    format: (val: Date) => `${val.toLocaleString()}`,
    sortable: true,
    headerStyle: 'font-size: medium;font-weight: 900',
  },
  {
    name: 'trans',
    align: 'left',
    label: '轉移次數',
    field: 'trans',
    sortable: true,
    headerStyle: 'font-size: medium;font-weight: 900',
  },
  { name: 'actions', align: 'right', label: '', field: '' },
];
