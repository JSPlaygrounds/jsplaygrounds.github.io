import React, { PureComponent } from 'react';
import {
  Container,
  Header,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Playgrounds from './Playgrounds';
import SearchBar from './SearchBar';

export default class App extends PureComponent {

  constructor(props) {
    super(props);
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.state = {
      filterText: '',
    };
  }

  componentDidMount() {
    const path = process.env.NODE_ENV === 'production' ? 'dist' : 'data';
    fetch(`/${path}/playgrounds.json`)
      .then(res => res.json())
      .then(playgrounds => this.setState({ playgrounds }));
  }

  isLoading() {
    return !this.state.playgrounds;
  }

  handleFilterTextInput(filterText) {
    this.setState({ filterText });
  }

  render() {
    const {
      filterText,
      playgrounds,
    } = this.state;

    return (
      <Container style={{ paddingTop: 50 }}>
        <Header as="h1" textAlign="center">
          JSPlaygrounds
        </Header>
        {
          this.isLoading() ?
            <Dimmer active inverted>
              <Loader size="medium">Loading...</Loader>
            </Dimmer>
          :
            <div style={{ paddingTop: 50 }}>
              <SearchBar
                onFilterTextInput={this.handleFilterTextInput}
                filterText={filterText}
              />
              <Playgrounds
                playgrounds={playgrounds}
                filterText={filterText}
              />
            </div>
        }
      </Container>
    );
  }
}
