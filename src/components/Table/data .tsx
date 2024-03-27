export type QA = {
  questionId: number;
  questionQuestion: string;
  questionAnswer: string;
  questionCreaterId: string;
  questionAddtime: Date;
  questionStatus: string; //CONFIRMED、UNCONFIRMED 或 deleted
  officeId: number;
  officeName: string;
};

export type Recource = {
  dataUrl: string;
  dataUploadTime: Date;
  dataFilename: string;
  dataDescription: string;
  dataStatus: string; //notdeleted、deleted
  dataUploader: string;
  dataFiletype: string;
};

export type Member = {
  userId: string;
  userName: string;
  userPassword: string;
  userEmail: string;
  userPermission: string; //admin
  userSignuptime: string;
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

export const paginationInitial: Pagination = {
  page: 1,
  rowsPerPage: 10,
  rowLength: 0,
};

export const orderInitial: Option = { label: '最新', value: 'desc' };
export const orderOptions: Option[] = [
  { label: '最新', value: 'desc' },
  { label: '最舊', value: 'asc' },
];
export const initialOffice = { label: '', value: -1 };
