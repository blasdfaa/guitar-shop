type RatingStarsProps = {
  rating: number;
};

const starsItems = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
];

function RatingStars({ rating }: RatingStarsProps) {
  return (
    <>
      {starsItems.map(({ id, value }) => (
        <svg aria-hidden="true" height="11" width="12" key={id}>
          <use xlinkHref={`${rating >= value ? '#icon-full-star' : '#icon-star'}`} />
        </svg>
      ))}
    </>
  );
}

export default RatingStars;
