export type GuitarReview = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

export type ReviewPost = Omit<GuitarReview, 'createAt' | 'id'>;

export type ReviewFormInputs = Omit<GuitarReview, 'createAt' | 'id' | 'guitarId'>;
