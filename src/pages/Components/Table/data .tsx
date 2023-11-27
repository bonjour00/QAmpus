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
  qaId: 1,
  qaQuestion: 'Frozen Yogurt',
  qaAnswer: 'answer',
  userId: '121',
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
export const testInitialOffice = { label: '資管', value: 1 };
// export type QA = {
//   qa_id: number;
//   qa_question: string;
//   qa_answer: string;
//   office_id: number;
//   office_name: string; //不確定
//   user_id: string;
//   qa_asktime: Date;
//   qa_checktime: Date | null;
//   qa_check: boolean;
// };
