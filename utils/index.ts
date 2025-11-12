export const formatNumber = (num: number, offset = 0, length = 2): string => {
  const numberString = (num + offset).toString();
  if (numberString.length > length) {
    return '---';
  }
  return numberString.padStart(length, '0');
};
