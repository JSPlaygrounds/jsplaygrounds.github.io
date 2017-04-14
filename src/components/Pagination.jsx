import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Menu,
} from 'semantic-ui-react';

export default function Pagination({
  onPageChange,
  currentPage,
  totalPages,
}) {
  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(
      <Menu.Item
        key={i}
        name={String(i)}
        active={currentPage === i}
        onClick={() => onPageChange(i)}
      />,
    );
  }
  return (
    <Container textAlign="center" style={{ paddingTop: 50 }}>
      <Menu pagination>
        {pages}
      </Menu>
    </Container>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
