import React from 'react';
import {
  Container,
  Input,
  Header,
} from 'semantic-ui-react';
import Playgrounds from './Playgrounds';

const playgrounds = [
  {
    name: 'lodash',
    playground: 'lodash',
    description: 'A playground showcasing lodash',
  },
];

export default function App() {
  return (
    <Container style={{ paddingTop: 50 }}>
      <Header as="h1" textAlign="center">
        JSPlayground
      </Header>
      <Input
        fluid
        icon="search"
        placeholder="Find a playground..."
      />
      <Playgrounds playgrounds={playgrounds} />
    </Container>
  );
}
