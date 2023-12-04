export type QA = {
  qaId: number;
  qaQuestion: string;
  qaAnswer: string;
  userId: string;
  qaAsktime: Date;
  qaChecktime: Date | null;
  qaCheck: boolean;
};

export const initialQASelect: QA = {
  qaId: -1,
  qaQuestion: '發生錯誤',
  qaAnswer: '發生錯誤',
  userId: '-1',
  qaAsktime: new Date(),
  qaChecktime: null,
  qaCheck: false,
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
  rowsPerPage: 3,
  rowLength: 0,
};
export const orderInitial = { label: '最新', value: 'desc' };
export const orderOptions = [
  { label: '最新', value: 'desc' },
  { label: '最舊', value: 'asc' },
];
export const testInitialOffice = { label: '資管', value: 1 };
