import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Fuse from 'fuse.js';
import throttle from 'lodash.throttle';
import Playground from './Playground';
import Pagination from './Pagination';
import LaunchForm from './LaunchForm';
import { playgroundShape } from '../utils/propShapes';

const PAGE_SIZE = 20;

export default class Playgrounds extends PureComponent {
  constructor(props) {
    super(props);

    this.filterPlaygrounds = throttle(this.filterPlaygrounds, 100);
    this.onPageChange = this.onPageChange.bind(this);
    this.onLaunch = this.onLaunch.bind(this);
    this.onDidLaunch = this.onDidLaunch.bind(this);

    this.state = {
      filteredPlaygrounds: props.playgrounds,
      currentPage: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.filterPlaygrounds(nextProps);
  }

  onLaunch(playgroundToLaunch, launchType) {
    this.setState({
      isLaunching: true,
      playgroundToLaunch,
      launchType,
    });
  }

  onDidLaunch() {
    this.setState({
      isLaunching: false,
      playgroundToLaunch: null,
      launchType: null,
    });
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
      isLaunching,
      playgroundToLaunch,
      launchType,
    } = this.state;
    const totalPages = Math.ceil(filteredPlaygrounds.length / PAGE_SIZE);

    if (filteredPlaygrounds.length === 0) {
      return (
        <Container textAlign="center" style={{ paddingTop: 50 }}>
          No playgrounds found :(
        </Container>
      );
    }
    return (
      <div>
        { isLaunching &&
          <div>
            <LaunchForm
              onDidLaunch={this.onDidLaunch}
              playground={playgroundToLaunch}
              type={launchType}
            />
            <Dimmer active inverted>
              <Loader size="medium">Launching...</Loader>
            </Dimmer>
          </div>
        }
        <Card.Group style={{ paddingTop: 50 }}>
          { filteredPlaygrounds.map((playground, index) => {
            if (index + 1 >= currentPage && index + 1 < currentPage + PAGE_SIZE) {
              return (
                <Playground
                  key={playground.name}
                  playground={playground}
                  onLaunch={this.onLaunch}
                />
              );
            }
            return null;
          })}
        </Card.Group>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

Playgrounds.propTypes = {
  playgrounds: PropTypes.arrayOf(playgroundShape).isRequired,
  filterText: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};
