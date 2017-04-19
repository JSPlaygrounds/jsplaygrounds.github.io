import React from 'react';
import PropTypes from 'prop-types';
import { playgroundShape } from '../../utils/propShapes';

function getData(props) {
  const { playground: { name }, ...content } = props;
  console.log({
    title: name,
    ...content,
  });
  return JSON.stringify({
    title: name,
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
