export const toStringErrorCode = (code: any): string => {
  if(typeof code !== 'string') {
    return 'エラーが発生しました。';
  }

  switch (code) {
    case 'auth/email-already-in-use':
      return 'メールアドレスがすでに使用されています。';
    case 'auth/email-already-exists':
      return 'メールアドレスがすでに使用されています。';
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません。';
    default:
      return code;
  }
};
