import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
  Image,
} from 'semantic-ui-react';
import Fuse from 'fuse.js';
import throttle from 'lodash.throttle';

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
  filterText: PropTypes.string.isRequired,
};
