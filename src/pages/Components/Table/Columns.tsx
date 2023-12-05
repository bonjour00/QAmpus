export const columns = [
  {
    name: 'qaQuestion',
    label: '問題',
    align: 'left',
    field: 'qaQuestion',
    sortable: true,
  },
  {
    name: 'qaCreateId',
    align: 'left',
    label: '發問者學號',
    field: 'qaCreateId',
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

export const rowsData = [
  {
    qaId: 1,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    qaCreateId: '121',
    qaLastUpdaterId: null,
    qaAsktime: new Date(),
    qaUpdatetime:null,
    qaDaletetime: null,
    qaStatus:'pending'
  },
  {
    qaId: 2,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    qaCreateId: '121',
    qaLastUpdaterId: null,
    qaAsktime: new Date(),
    qaUpdatetime:null,
    qaDaletetime: null,
    qaStatus:'pending'
  },
  {
    qaId: 3,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    qaCreateId: '121',
    qaLastUpdaterId: null,
    qaAsktime: new Date(),
    qaUpdatetime:null,
    qaDaletetime: null,
    qaStatus:'pending'
  },
  {
    qaId: 4,
    qaQuestion: 'Frozen Yogurt',
    qaAnswer: 'answer',
    qaCreateId: '121',
    qaLastUpdaterId: null,
    qaAsktime: new Date(),
    qaUpdatetime:null,
    qaDaletetime: null,
    qaStatus:'pending'
  },
];
