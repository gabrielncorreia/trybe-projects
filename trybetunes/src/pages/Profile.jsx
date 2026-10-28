import React, { Component } from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import { t } from '../i18n';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      saving: false,
      saved: false,
      user: { name: '', email: '', image: '', description: '' },
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState(({ user: empty }) => ({ user: { ...empty, ...user }, loading: false }));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(({ user }) => ({ user: { ...user, [name]: value }, saved: false }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ saving: true });
    await updateUser(user);
    this.setState({ saving: false, saved: true });
  }

  render() {
    const { loading, saving, saved, user: { name, email, description } } = this.state;
    return (
      <div data-testid="page-profile" className="page narrow">
        <h1 className="page-title">{ t('profile.title') }</h1>
        { loading ? <Loading /> : (
          <form className="profile-form" onSubmit={ this.handleSubmit }>
            <span className="avatar avatar-large" aria-hidden="true">{ name.charAt(0) }</span>
            <label htmlFor="profile-name" className="field">
              { t('profile.name') }
              <input id="profile-name" name="name" value={ name } required onChange={ this.handleChange } />
            </label>
            <label htmlFor="profile-email" className="field">
              { t('profile.email') }
              <input id="profile-email" name="email" type="email" value={ email } placeholder={ t('profile.emailPlaceholder') } onChange={ this.handleChange } />
            </label>
            <label htmlFor="profile-description" className="field">
              { t('profile.about') }
              <textarea id="profile-description" name="description" rows="3" value={ description } placeholder={ t('profile.aboutPlaceholder') } onChange={ this.handleChange } />
            </label>
            <div className="form-actions">
              <button type="submit" className="button-primary" disabled={ saving }>
                { saving ? t('profile.saving') : t('profile.save') }
              </button>
              { saved && <p className="muted" role="status">{ t('profile.saved') }</p> }
            </div>
          </form>
        ) }
      </div>
    );
  }
}
