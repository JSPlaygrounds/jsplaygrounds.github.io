import React from 'react';
import PropTypes from 'prop-types';
import { playgroundShape } from '../../utils/propShapes';

export default function JSFiddle({ html, js, css, playground }) {
  const {
    title,
    description,
    externalJS,
    externalCSS,
  } = playground;
  const resources = externalJS.concat(externalCSS);
  return (
    <div>
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="html" value={html} />
      <input type="hidden" name="js" value={js} />
      <input type="hidden" name="css" value={css} />
      <input type="hidden" name="resources" value={resources.join(',')} />
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
