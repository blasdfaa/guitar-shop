const guitarTypesItems = [
  { id: 1, type: 'acoustic', label: 'Акустические гитары' },
  { id: 2, type: 'electric', label: 'Электрогитары' },
  { id: 3, type: 'ukulele', label: 'Укулеле' },
];

function GuitarTypeFilter() {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {guitarTypesItems.map((item) => (
        <div className="form-checkbox catalog-filter__block-item" key={item.id}>
          <input className="visually-hidden" id={item.type} name={item.type} type="checkbox" />
          <label htmlFor={item.type}>{item.label}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default GuitarTypeFilter;
