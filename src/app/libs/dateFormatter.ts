export const toJSTString = (date: string | number | Date) => {
  if (!date) {
    return '';
  }

  const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return jstFormatter.format(new Date(date));
};

export const toJSTDateTimeISOString = (date: number | Date) => {
  if (!date) {
    return '';
  }

  const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return jstFormatter.format(new Date(date)) + '+0900';
};

export const toJSTTimeString = (date: number | Date) => {
  if (!date) {
    return '';
  }

  const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return jstFormatter.format(new Date(date));
};

export const toJSTDateString = (date: number | Date) => {
  if(!date) {
    return '';
  }

  const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  return jstFormatter.format(new Date(date));
};
