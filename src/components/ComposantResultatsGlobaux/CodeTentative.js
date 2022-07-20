import React, { useEffect } from 'react';
import Prism from 'prismjs';
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
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-cshtml';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-ocaml';
/**
 * @props.code : code à afficher
 * @props.langage : langage du code
 * @returns Un composant qui stylise un bloc de code.
 */
const CodeTentative = ({ code, language }) => {
  language.toLowerCase();
  // sauter des lignes après les : dans le code
  let codeStyled = code.replace(/ *: /gim, ':\n \t');
  // sauter des lignes après les } dans le code
  codeStyled = codeStyled.replace(/ *} /gim, '}\n \t');
  // sauter des lignes après les { dans le code
  codeStyled = codeStyled.replace(/ *{ /gim, '{\n \t');
  // sauter des lignes après les ; dans le code
  codeStyled = codeStyled.replace(/ *; /gim, ';\n');
  // sauter des lignes après le mot apres les return dans le code
  codeStyled = codeStyled.replace(/ return /gim, '\nreturn ');

  // codeStyled = code.replace(/ *; /gim, ';\n');
  // codeStyled = code.replace(/ *{}, /gim, '{\n \t}');

  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre>
        <code className={`language-${language}`}>{codeStyled}</code>
      </pre>
    </div>
  );
};
CodeTentative.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};
export default CodeTentative;
