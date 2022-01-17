import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { GuitarReview } from '../types/review';

dayjs.locale('ru');

export const formatReviewDate = (date: string): string => dayjs(date).format('DD MMMM');

export const sortReviewsByDateFromNewToOld = <T extends GuitarReview>(reviewA: T, reviewB: T): number =>
  Number(dayjs(reviewB.createAt)) - Number(dayjs(reviewA.createAt));
