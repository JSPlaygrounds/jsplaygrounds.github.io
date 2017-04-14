import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
} from 'semantic-ui-react';
import Fuse from 'fuse.js';
import throttle from 'lodash.throttle';
import Playground from './Playground';
import Pagination from './Pagination';

const PAGE_SIZE = 20;

export default class Playgrounds extends PureComponent {
  constructor(props) {
    super(props);

    this.filterPlaygrounds = throttle(this.filterPlaygrounds, 100);
    this.onPageChange = this.onPageChange.bind(this);

    this.state = {
      filteredPlaygrounds: props.playgrounds,
      currentPage: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.filterPlaygrounds(nextProps);
  }

  onPageChange(newPage) {
    this.setState({
      currentPage: newPage,
    });
  }

  filterPlaygrounds(props) {
    const { playgrounds, filterText } = props;
    const keys = ['name', 'description'];
    const fuse = new Fuse(playgrounds, { keys });
    const filteredPlaygrounds = filterText ? fuse.search(filterText) : playgrounds;
    this.setState({
      filteredPlaygrounds,
      currentPage: 1,
    });
  }

  render() {
    const {
      filteredPlaygrounds,
      currentPage,
    } = this.state;

    if (!filteredPlaygrounds.length) {
      return (
        <Container textAlign="center" style={{ paddingTop: 50 }}>
          No playgrounds found :(
        </Container>
      );
    }

    const totalPages = filteredPlaygrounds.length / PAGE_SIZE;
    return (
      <div>
        <Card.Group style={{ paddingTop: 50 }}>
          { filteredPlaygrounds.map((playground, index) => {
            if (index + 1 >= currentPage && index + 1 < currentPage + PAGE_SIZE) {
              return <Playground key={playground.name} playground={playground} />;
            }
            return null;
          })}
        </Card.Group>
        { totalPages > 1 &&
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={this.onPageChange}
          />
        }
      </div>
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
