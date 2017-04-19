/* eslint-disable react/no-did-mount-set-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { playgroundShape } from '../utils/propShapes';
import codePlaygrounds from '../utils/codePlaygrounds';
import { REGISTRY_ENDPOINT } from '../utils/constants';

export default class LaunchForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    Promise.all(['html', 'css', 'js'].map((contentType) => {
      const { path } = this.props.playground;
      const url = `${REGISTRY_ENDPOINT}/${path}/playground.${contentType}`;
      return fetch(url)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.text();
          }
          return '';
        })
        .catch(() => '');
    })).then(([html, css, js]) => {
      this.setState({
        html,
        css,
        js,
        isLoading: false,
      }, () => {
        this.form.submit();
        this.props.onDidLaunch();
      });
    });
  }

  render() {
    const { playground, type } = this.props;
    const {
      isLoading,
      html,
      js,
      css,
    } = this.state;
    const {
      formComponent: CodePlaygroundForm,
      endpoint,
    } = codePlaygrounds.find(cp => cp.type === type);

    if (isLoading) {
      return null;
    }

    return (
      <form
        ref={(form) => { this.form = form; }}
        style={{ visibility: 'hidden' }}
        target="_blank"
        method="post"
        action={endpoint}
      >
        <CodePlaygroundForm
          playground={playground}
          html={html}
          js={js}
          css={css}
        />
      </form>
    );
  }
}

LaunchForm.propTypes = {
  playground: playgroundShape.isRequired,
  type: PropTypes.string.isRequired,
  onDidLaunch: PropTypes.func.isRequired,
};
