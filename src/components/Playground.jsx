import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
} from 'semantic-ui-react';

export default function Playground({ playground }) {
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
        Launch with:
        <Image
          spaced
          src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png"
          style={{
            maxWidth: 30,
            maxHeight: 30,
          }}
        />
        <Image
          src="http://doc.jsfiddle.net/_downloads/jsfiddle-logo.png"
          style={{
            maxWidth: 40,
            maxHeight: 40,
          }}
        />
        <Image
          src="https://static.jsbin.com/images/dave.min.svg"
          style={{
            maxWidth: 30,
            maxHeight: 30,
          }}
        />
      </Card.Content>
    </Card>
  );
}

Playground.propTypes = {
  playground: PropTypes.shape({
    name: PropTypes.string,
    playground: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
