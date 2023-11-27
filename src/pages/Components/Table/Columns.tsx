export const columns = [
  {
    name: 'qaQuestion',
    label: '問題',
    align: 'left',
    field: 'qaQuestion',
    sortable: true,
  },
  {
    name: 'userId',
    align: 'left',
    label: '發問者學號',
    field: 'userId',
    sortable: true,
  },
  {
    name: 'qaAsktime',
    align: 'left',
    label: '發問時間',
    field: 'qaAsktime',
    format: (val: Date) => `${val.toLocaleString()}`,
    sortable: true,
  },
  { name: 'actions', align: 'right', label: '', field: '' },
];
