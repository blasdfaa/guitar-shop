import PriceFilter from '../price-filter/price-filter';
import GuitarTypeFilter from '../guitar-type-filter/guitar-type-filter';
import StringCountFilter from '../string-count-filter/string-count-filter';

function CatalogFilter() {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <PriceFilter />
      <GuitarTypeFilter />
      <StringCountFilter />
    </form>
  );
}

export default CatalogFilter;
