// @flow
import styles from 'styles/components/Badge';
import React from 'react';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  headerText: string,
  firstname: string,
  lastname: string,
  footerText: string,
  ui: Object,
}

const Badge: Component<Props> = (props: Props): ElementType => {
  const { ui } = props;

  return (
    <div styleName="badge">
      <div
        styleName="header"
        style={{
          backgroundColor: ui.get('headerBackground')
        }}
      >
        <div styleName="header__logo">
          <img src={ui.get('logoUrl')} alt="Logo" />
        </div>
        <div
          styleName="header__text"
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
        styleName="footer"
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
