export type QA = {
  questionId: number;
  questionQuestion: string;
  questionAnswer: string;
  questionCreaterId: string;
  questionAddtime: Date;
  questionStatus: string; //CONFIRMED、UNCONFIRMED 或 deleted
  officeId: number;
  officeName: string;
  time?: number; //轉移次數
  questionDeletedtime: Date;
  questoinFinalassign: boolean;
};

export type Resource = {
  dataId: number;
  dataUrl: string;
  dataUploadTime: Date;
  dataFilename: string;
  dataDescription: string;
  dataStatus: string; //notdeleted、deleted
  dataUploader: string;
  dataFiletype: string;
  officeId: number;
  officeName: string;
  dataDeletedTime: Date;
};

export type Member = {
  userPK: number;
  userId: string;
  userName: string;
  userEmail: string;
  userPermission: string; //admin
  userSignuptime: string;
  officeId: number;
  emailVerified: boolean;
  officeName: string;
};

export type Option = {
  label: string;
  value: string | number;
};

export const orderInitial: Option = { label: '最新', value: 'desc' };
export const orderOptions: Option[] = [
  { label: '最新', value: 'desc' },
  { label: '最舊', value: 'asc' },
];
export const initialOffice = { label: '', value: -1 };
export const assignOptions: Option[] = [
  { label: 'admin', value: 'admin' },
  { label: 'assigner', value: 'assigner' },
];
export const memberOptions: Option[] = [
  { label: 'user', value: 'user' },
  ...assignOptions,
];
export const adminEditOptions: Option[] = memberOptions.filter(
  (x) => x.value != 'assigner'
);

export const initialMember = { label: '', value: '' };

export const QA_TABLE_API = '/Question/paged';
export const PENDING_TABLE_STATUS = 'UNCONFIRMED';
export const TRASH_QA_TABLE_STATUS = 'deleted';
export const BLOB_TABLE_API = '/Blob/paged';
export const TRASH_BLOB_TABLE_STATUS = 'deleted';
export const MANAGE_BLOB_TABLE_STATUS = 'notdeleted';
export const QA_ASSIGN_TABLE_API = '/Question/paged/beingkicked';
export const ASSIGN_TABLE_STATUS = 'UNCONFIRMED';
export const MEMBER_TABLE_API = '/User/paged';
