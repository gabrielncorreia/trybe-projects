import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

// Shared shell: the theme class sets the accent color (meal, cocktail or generic).
function Page({ title, apiType, search, children, footer }) {
  return (
    <div className={ `page theme-${apiType}` }>
      { title && <Header name={ title } search={ search } apiType={ apiType } /> }
      <main className="page-content">{ children }</main>
      { footer && <Footer apiType={ apiType } /> }
    </div>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  apiType: PropTypes.string,
  search: PropTypes.bool,
  footer: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Page.defaultProps = {
  title: '',
  apiType: 'generic',
  search: false,
  footer: true,
};

export default Page;
