import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
} from 'semantic-ui-react';
import Fuse from 'fuse.js';
import throttle from 'lodash.throttle';
import Playground from './Playground';

export default class Playgrounds extends PureComponent {
  constructor(props) {
    super(props);

    this.filterPlaygrounds = throttle(this.filterPlaygrounds, 100);

    this.state = {
      filteredPlaygrounds: props.playgrounds,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.filterPlaygrounds(nextProps);
  }

  filterPlaygrounds(props) {
    const { playgrounds, filterText } = props;
    const keys = ['name', 'description'];
    const fuse = new Fuse(playgrounds, { keys });
    const filteredPlaygrounds = filterText ? fuse.search(filterText) : playgrounds;
    this.setState({
      filteredPlaygrounds,
    });
  }

  render() {
    const { filteredPlaygrounds } = this.state;
    if (!filteredPlaygrounds.length) {
      return (
        <Container textAlign="center" style={{ paddingTop: 50 }}>
          No playgrounds found :(
        </Container>
      );
    }

    return (
      <Card.Group style={{ paddingTop: 50 }}>
        { filteredPlaygrounds.map(playground => (
          <Playground playground={playground} />
        ))}
      </Card.Group>
    );
  }
}

Playgrounds.propTypes = {
  playgrounds: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    playground: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  filterText: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};
