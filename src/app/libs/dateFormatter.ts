export const toJSTString = (date: string | Date) => {
  if(!date) {
    return '';
  }

  date = new Date(date);
  const JST = date.setHours(date.getHours() + 9);
  const JSTString = new Date(JST).toISOString();

  return JSTString.split('T')[0];
};
