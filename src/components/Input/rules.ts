export const notEmpty = (val: any) => {
  return (val && val.length > 0) || '此為必填項目';
};
export const pwTooEasy = (val: any) => {
  return (
    /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(val) || '密碼強度不夠，須包含英文及數字'
  );
};

export const pwTooShort = (val: any) => {
  return val.length >= 8 || '密碼強度不夠，密碼長度需至少8個字元';
};
export const notEmptyResource = (val: any) => {
  return val || '此為必填項目';
};
export const blobUploadVaild = (val: any) => {
  const cantContain = [
    '\\',
    '/',
    '[',
    ']',
    ':',
    '¦',
    '<',
    '>',
    '+',
    '=',
    ';',
    ',',
    '*',
    '?',
    '"',
  ];
  return (
    !cantContain.some((symbol) => val.name.includes(symbol)) ||
    '不可包含 \\ / [ ] : ¦ < > + = ; , * ? "'
  );
};
export const blobUploadLength = (val: any) => {
  return (
    (val.name.length >= 7 && val.name.length <= 67) ||
    '長度必須為 3 到 63 個字元'
  );
};
