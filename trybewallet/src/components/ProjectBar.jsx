// Canonical copy in shared/; each app keeps an identical copy in src/components/.
import React from 'react';
import { LANGUAGES, setLanguage, t, useLanguage } from '../i18n';
import './ProjectBar.css';

const NAMES = { en: 'English', pt: 'Português' };

export default function ProjectBar() {
  const language = useLanguage();

  return (
    <nav className="project-bar" aria-label={ t('projectBar.label') }>
      <a className="project-bar-home" href="../">{ t('projectBar.all') }</a>
      <div className="project-bar-langs" role="group" aria-label={ t('projectBar.language') }>
        { LANGUAGES.map((code) => (
          <button
            key={ code }
            type="button"
            lang={ code }
            title={ NAMES[code] }
            aria-pressed={ code === language }
            onClick={ () => setLanguage(code) }
          >
            { code.toUpperCase() }
          </button>
        )) }
      </div>
    </nav>
  );
}
