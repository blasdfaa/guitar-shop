import { screen, within } from '@testing-library/react';

import AppFooter from './app-footer';
import { renderWithContext } from '../../utils/test-utils';

describe('Component: AppFooter', () => {
  test('should render correctly', () => {
    renderWithContext(<AppFooter />);

    expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
    expect(screen.getByAltText('Логотип')).toBeInTheDocument();

    expect(screen.getByText(/Магазин гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/г\. Санкт-Петербург/i)).toBeInTheDocument();
    expect(screen.getByText('8-812-500-50-50')).toBeInTheDocument();
    expect(screen.getByText('Режим работы:')).toBeInTheDocument();
    expect(screen.getByText('с 11:00 до 20:00')).toBeInTheDocument();
    expect(screen.getByText('без выходных')).toBeInTheDocument();

    const headers = screen.getAllByRole('heading', { level: 2 });

    expect(headers.length).toBe(3);
  });
  test('should be render link lists correctly', () => {
    renderWithContext(<AppFooter />);

    const social = screen.getByTestId('social-list');
    const footerNav = screen.getByTestId('footer-nav-list');

    const socialList = within(social);
    const socialListItems = socialList.getAllByRole('listitem');
    const socialListLinks = socialList.getAllByRole('link');

    const footerNavList = within(footerNav);
    const footerNavListItems = footerNavList.getAllByRole('listitem');
    const footerNavListLinks = footerNavList.getAllByRole('link');

    expect(socialListItems.length).toBe(3);
    expect(socialListLinks.length).toBe(3);

    expect(footerNavListItems.length).toBe(5);
    expect(footerNavListLinks.length).toBe(5);
  });
  test('should be render svg icons correctly', () => {
    renderWithContext(<AppFooter />);

    const social = screen.getByTestId('social-list');
    const socialList = within(social);
    const socialSVGIcons = socialList.getAllByTestId('social-icon');

    expect(socialSVGIcons.length).toBe(3);
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('working-time-icon')).toBeInTheDocument();
  });
});
