export const toJSTString = (date: string | Date) => {
  if(!date) {
    return '';
  }

  date = new Date(date);
  const JST = date.setHours(date.getHours() + 9);
  const JSTString = new Date(JST).toISOString();

  return JSTString.split('T')[0];
};

export const toJSTDateTimeISOString = (date: number | Date) => {
  if(!date) {
    return '';
  }

  date = new Date(date);
  date.setHours(date.getHours() + 9);
  const nowString = (new Date(date)).toISOString();

  return nowString.split('.')[0] + '+0900';
};
