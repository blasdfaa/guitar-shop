import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatReviewDate = (date: string): string => dayjs(date).format('DD MMMM');
