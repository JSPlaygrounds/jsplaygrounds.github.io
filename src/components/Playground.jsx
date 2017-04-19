import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
} from 'semantic-ui-react';
import { playgroundShape } from '../utils/propShapes';
import codePlaygrounds from '../utils/codePlaygrounds';

export default function Playground({ playground, onLaunch }) {
  return (
    <Card fluid key={playground.name}>
      <Card.Content>
        <Card.Header>
          { playground.name }
        </Card.Header>
        <Card.Description>
          { playground.description }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        Launch with: &nbsp;
        { codePlaygrounds.map(({ type, icon }) => (
          <Image
            key={type}
            className="clickable"
            {...icon}
            onClick={() => onLaunch(playground, type)}
          />
        ))}
      </Card.Content>
    </Card>
  );
}

Playground.propTypes = {
  playground: playgroundShape.isRequired,
  onLaunch: PropTypes.func.isRequired,
};
