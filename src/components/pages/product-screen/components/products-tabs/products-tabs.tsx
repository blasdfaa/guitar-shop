import React from 'react';

function ProductsTabs() {
  return (
    <div className="tabs">
      <a className="button button--medium tabs__button" href="#characteristics">
        Характеристики
      </a>
      <a className="button button--black-border button--medium tabs__button" href="#description">
        Описание
      </a>
      <div className="tabs__content" id="characteristics">
        <table className="tabs__table">
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">SO754565</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">Электрогитара</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">6 струнная</td>
            </tr>
          </tbody>
        </table>
        <p className="tabs__product-description hidden">
          Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых
          условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество
          и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.
        </p>
      </div>
    </div>
  );
}

export default ProductsTabs;
