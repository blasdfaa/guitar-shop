import React from 'react';

const MIN_PAGE_SCROLL_OFFSET = 320;

function UpButton() {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScrollUpButton);

    return () => {
      window.removeEventListener('scroll', handleScrollUpButton);
    };
  }, []);

  const handleScrollUpButton = () => {
    const position = window.pageYOffset;

    setScrollPosition(position);
  };

  return (
    <div>
      {scrollPosition >= MIN_PAGE_SCROLL_OFFSET && (
        <a className="button button--up button--red-border button--big reviews__up-button" href="#header">
          Наверх
        </a>
      )}
    </div>
  );
}

export default UpButton;
