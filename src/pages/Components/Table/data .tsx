export type QA = {
  questionId: number;
  questionQuestion: string;
  qaAnswer: string;
  questionCreaterId: string;
  qaLastUpdaterId: string | null;
  questionAddtime: Date;
  qaUpdatetime: Date | null;
  qaDaletetime: Date | null;
  qaStatus: string;
};

export const initialQASelect: QA = {
  questionId: -1,
  questionQuestion: '發生錯誤',
  qaAnswer: '發生錯誤',
  questionCreaterId: '-1',
  qaLastUpdaterId: '-1',
  questionAddtime: new Date(),
  qaUpdatetime: null,
  qaDaletetime: null,
  qaStatus: 'pending',
};

export type Option = {
  label: string;
  value: string | number;
};

export type Pagination = {
  page: number;
  rowsPerPage: number;
  rowLength: number;
};
export const paginationInitial = {
  page: 1,
  rowsPerPage: 13,
  rowLength: 0,
};
export const orderInitial = { label: '最新', value: 'desc' };
export const orderOptions = [
  { label: '最新', value: 'desc' },
  { label: '最舊', value: 'asc' },
];
export const testInitialOffice = { label: '資管系系辦', value: 1 };
