import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

export default function SearchBar({
  onFilterTextInput,
  filterText,
}) {
  return (
    <Input
      fluid
      icon="search"
      placeholder="Find a playground..."
      value={filterText}
      onChange={(event, data) => onFilterTextInput(data.value)}
    />
  );
}

SearchBar.propTypes = {
  onFilterTextInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
};
