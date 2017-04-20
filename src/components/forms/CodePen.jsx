import React from 'react';
import PropTypes from 'prop-types';
import { playgroundShape } from '../../utils/propShapes';

function getData(props) {
  const { playground, ...content } = props;
  const {
    name,
    description,
    externalCSS,
    externalJS,
  } = playground;
  return JSON.stringify({
    title: name,
    description,
    css_external: externalCSS.join(';'),
    js_external: externalJS.join(';'),
    ...content,
  });
}

export default function CodePen(props) {
  return (
    <div>
      <input type="hidden" name="data" value={getData(props)} />
    </div>
  );
}

CodePen.propTypes = {
  playground: playgroundShape.isRequired,
  html: PropTypes.string,
  js: PropTypes.string,
  css: PropTypes.string,
};

CodePen.defaultProps = {
  html: '',
  js: '',
  css: '',
};
