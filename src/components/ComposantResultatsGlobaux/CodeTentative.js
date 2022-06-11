import React, { useEffect } from 'react';
import Prism from 'prismjs';
// import './style.css';
import PropTypes from 'prop-types';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-csv';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-mongodb';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-regex';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
/**
 * @props.code : code à afficher
 * @props.langage : langage du code
 * @returns Un composant qui stylise un bloc de code.
 */
const CodeTentative = ({ code, language }) => {
  language.toLowerCase();
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
CodeTentative.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};
export default CodeTentative;
