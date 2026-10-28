import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { t } from '../i18n';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.fetchUserName();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    // Refresh after login or a profile edit, not on every render.
    if (prevProps.location.pathname !== location.pathname) this.fetchUserName();
  }

  fetchUserName = async () => {
    const { name = '' } = await getUser();
    this.setState({ userName: name });
  }

  render() {
    const { userName } = this.state;
    const { location } = this.props;
    if (location.pathname === '/') return null;
    return (
      <header className="topbar" data-testid="header-component">
        <Link to="/search" className="brand">TrybeTunes</Link>
        <nav className="nav">
          <NavLink to="/search" data-testid="link-to-search">{ t('nav.search') }</NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites">{ t('nav.favorites') }</NavLink>
          <NavLink to="/profile" data-testid="link-to-profile">{ t('nav.profile') }</NavLink>
        </nav>
        <p className="user" data-testid="header-user-name">
          <span className="avatar" aria-hidden="true">{ userName.charAt(0) || '·' }</span>
          <span className="user-name">{ userName }</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default withRouter(Header);
