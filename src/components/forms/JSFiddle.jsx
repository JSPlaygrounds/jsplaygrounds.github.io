import React from 'react';
import PropTypes from 'prop-types';
import { playgroundShape } from '../../utils/propShapes';

export default function JSFiddle({ html, js, css }) {
  return (
    <div>
      <textarea name="html">{html}</textarea>
      <textarea name="js">{js}</textarea>
      <textarea name="css">{css}</textarea>
    </div>
  );
}

JSFiddle.propTypes = {
  playground: playgroundShape.isRequired,
  html: PropTypes.string,
  js: PropTypes.string,
  css: PropTypes.string,
};

JSFiddle.defaultProps = {
  html: '',
  js: '',
  css: '',
};
