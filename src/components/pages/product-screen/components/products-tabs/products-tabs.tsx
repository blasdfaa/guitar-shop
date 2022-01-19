import React from 'react';

import { formatGuitarType } from '../../../../../utils/product';

import type { ProductInfoTab } from '../../../../../types/guitar';

const enum TabName {
  Characteristics = 'characteristics',
  Description = 'description',
}

const tabItems = [
  { label: 'Характеристики', id: TabName.Characteristics },
  { label: 'Описание', id: TabName.Description },
];

const DEFAULT_SELECTED_TAB = TabName.Characteristics;

function ProductsTabs({ vendorCode, type, stringCount, description }: ProductInfoTab) {
  const [activeTab, setActiveTab] = React.useState<string>(DEFAULT_SELECTED_TAB);

  const handleChangeTab = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    const { tabName } = e.currentTarget.dataset;

    if (tabName) {
      setActiveTab(tabName);
    }
  };

  return (
    <div className="tabs" data-testid="product-tabs">
      {tabItems.map(({ id, label }) => (
        <a
          className={`button button--medium tabs__button ${activeTab !== id ? 'button--black-border' : ''}`}
          href={`#${id}`}
          key={id}
          data-tab-name={id}
          onClick={handleChangeTab}
        >
          {label}
        </a>
      ))}
      <div className="tabs__content" id={activeTab}>
        {activeTab === TabName.Characteristics && (
          <table className="tabs__table">
            <tbody>
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{formatGuitarType(type)}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{stringCount} струнная</td>
              </tr>
            </tbody>
          </table>
        )}
        {activeTab === TabName.Description && <p className="tabs__product-description">{description}</p>}
      </div>
    </div>
  );
}

export default ProductsTabs;
