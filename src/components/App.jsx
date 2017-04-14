import React, { PureComponent } from 'react';
import {
  Container,
  Header,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Playgrounds from './Playgrounds';
import SearchBar from './SearchBar';

const playgrounds = [
  {
    name: 'lodash',
    playground: 'lodash',
    description: 'A playground showcasing lodash',
  },
];

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
      .then(data => this.setState({
        playgrounds: data,
      }));
  }

  isLoading() {
    return !this.state.playgrounds;
  }

  handleFilterTextInput(filterText) {
    this.setState({ filterText });
  }

  render() {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Header as="h1" textAlign="center">
          JSPlayground
        </Header>
        {
          this.isLoading() ?
            <Dimmer active inverted>
              <Loader size="medium">Loading</Loader>
            </Dimmer>
          :
            <div>
              <SearchBar
                onFilterTextInput={this.handleFilterTextInput}
                filterText={this.state.filterText}
              />
              <Playgrounds
                playgrounds={playgrounds}
                filterText={this.state.filterText}
              />
            </div>
        }
      </Container>
    );
  }
}
