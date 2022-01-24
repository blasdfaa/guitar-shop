import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../constants';

const socialItems = [
  { href: 'https://www.facebook.com/', name: 'facebook' },
  { href: 'https://www.instagram.com/', name: 'instagram' },
  { href: 'https://www.twitter.com/', name: 'twitter' },
];

const infoLinks = ['Где купить?', 'Блог', 'Вопрос - ответ', 'Возврат', 'Сервис-центры'];

function AppFooter() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Link className="footer__logo logo" to={AppRoute.Home} data-testid="footer-logo">
          <img
            alt="Логотип"
            className="logo__img"
            height="70"
            src="./img/svg/logo.svg"
            width="70"
          />
        </Link>
        <div className="socials footer__socials">
          <ul className="socials__list" data-testid="social-list">
            {socialItems.map(({ href, name }) => (
              <li className="socials-item" key={href}>
                <a aria-label={name} className="socials__link" href={href}>
                  <svg
                    aria-hidden="true"
                    className="socials__icon"
                    height="24"
                    width="24"
                    data-testid="social-icon"
                  >
                    <use href={`#icon-${name}`} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <section className="footer__nav-section footer__nav-section--info">
          <h2 className="footer__nav-title">О нас</h2>
          <p className="footer__nav-content footer__nav-content--font-secondary">
            Магазин гитар, музыкальных инструментов и гитарная мастерская
            <br />
            в Санкт-Петербурге.
            <br />
            <br />
            Все инструменты проверены, отстроены
            <br />и доведены до идеала!
          </p>
        </section>
        <section className="footer__nav-section footer__nav-section--links">
          <h2 className="footer__nav-title">Информация</h2>
          <ul className="footer__nav-list" data-testid="footer-nav-list">
            {infoLinks.map((name) => (
              <li className="footer__nav-list-item" key={name}>
                <a className="link" href="#top">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="footer__nav-section footer__nav-section--contacts">
          <h2 className="footer__nav-title">Контакты</h2>
          <p className="footer__nav-content">
            г. Санкт-Петербург,
            <br />
            м. Невский проспект,
            <br />
            ул. Казанская 6.
          </p>
          <div className="footer__nav-content">
            <svg
              aria-hidden="true"
              className="footer__icon"
              height="8"
              width="8"
              data-testid="phone-icon"
            >
              <use href="#icon-phone" />
            </svg>
            <a className="link" href="tel:88125005050">
              8-812-500-50-50
            </a>
          </div>
          <p className="footer__nav-content">
            Режим работы:
            <br />
            <span className="footer__span">
              <svg
                aria-hidden="true"
                className="footer__icon"
                height="13"
                width="13"
                data-testid="working-time-icon"
              >
                <use href="#icon-clock" />
              </svg>
              <span> с 11:00 до 20:00</span>
              <span>без выходных</span>
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
}

export default AppFooter;
