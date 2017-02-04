// @flow
import styles from 'styles/components/Badge';
import React from 'react';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  headerText: ?string,
  firstname: ?string,
  lastname: ?string,
  footerText: ?string,
  width?: string,
  height?: string,
  ui: Object,
}

const Badge: Component<Props> = (props: Props): ElementType => {
  const { ui } = props;
  const logoUrl = ui.get('logoUrl');

  const maybeRenderLogo = (): ?ElementType => {
    if (!logoUrl) {
      return null;
    }

    return (
      <div
        styleName="header__logo"
        style={{
          backgroundImage: `url(${ui.get('logoUrl')})`
        }}
      >
      </div>
    );
  };

  return (
    <div
      styleName="badge"
      style={{
        width: props.width ? `${props.width}cm` : '8.6cm',
        height: props.height ? `${props.height}cm` : '5.9cm'
      }}
    >
      <div
        styleName="header"
        style={{
          backgroundColor: ui.get('headerBackground')
        }}
      >
        {maybeRenderLogo()}
        <div
          styleName={logoUrl ? 'header__text' : 'header__text--no-logo'}
          style={{
            color: ui.get('headerText')
          }}
        >{props.headerText}</div>
      </div>
      <div
        styleName="name"
        style={{
          backgroundColor: ui.get('nameBackground'),
          color: ui.get('nameText')
        }}
      >
        <span styleName="name--first">{props.firstname}</span>
        <span styleName="name--last">{props.lastname}</span>
      </div>
      <div
        styleName={logoUrl ? 'footer' : 'footer--no-logo'}
        style={{
          backgroundColor: ui.get('footerBackground')
        }}
      >
        <span
          style={{
            color: ui.get('footerText')
          }}
        >{props.footerText}</span>
      </div>
    </div>
  );
};

const mapState = state => ({
  ui: state.ui
});

export default connect(
  mapState,
  null,
)(pure(CSSModules(Badge, styles)));
