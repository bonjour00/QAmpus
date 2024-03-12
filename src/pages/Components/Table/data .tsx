export type QA = {
  qaId: number;
  qaQuestion: string;
  qaAnswer: string;
  qaCreateId: string;
  qaLastUpdaterId: string | null;
  qaAsktime: Date;
  qaUpdatetime: Date | null;
  qaDaletetime: Date | null;
  qaStatus: string;
};

export const initialQASelect: QA = {
  qaId: -1,
  qaQuestion: '發生錯誤',
  qaAnswer: '發生錯誤',
  qaCreateId: '-1',
  qaLastUpdaterId: '-1',
  qaAsktime: new Date(),
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
  rowsPerPage: 3,
  rowLength: 0,
};
export const orderInitial = { label: '最新', value: 'desc' };
export const orderOptions = [
  { label: '最新', value: 'desc' },
  { label: '最舊', value: 'asc' },
];
export const testInitialOffice = { label: '資管', value: 1 };

//權限的
export type AC = {
  acID: number;
  acMember: string;
  acEmail: string;
  acApply: Date;
  permission: string;
};
export const initialAC: AC = {
  acID: 999999999,
  acMember: '小明',
  acEmail: 'a1234567@gmail.com',
  acApply: new Date(),
  permission: '管理者',
};
