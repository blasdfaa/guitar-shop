import React from 'react';

import GuitarCard from '../guitar-card/guitar-card';

import type { Guitar } from '../../types/guitar';

type GuitarListProps = {
  items: Guitar[] | undefined;
};

function GuitarList({ items }: GuitarListProps) {
  return (
    <div className="cards catalog__cards">
      {items &&
        items.map((item) => (
          <React.Fragment key={item.id}>
            <GuitarCard {...item} />
          </React.Fragment>
        ))}
    </div>
  );
}

export default GuitarList;
