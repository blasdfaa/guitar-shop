import { FilterGuitarType } from '../constants';

export const formatGuitarType = (type?: string): string => {
  const types = {
    [FilterGuitarType.Acoustic]: 'Акустическая гитара',
    [FilterGuitarType.Electric]: 'Электрогитара',
    [FilterGuitarType.Ukulele]: 'Укулеле',
  };

  return (type && types[type as FilterGuitarType]) || 'Неизвестно';
};
