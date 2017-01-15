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
  return (
    <div styleName="badge">
      <div
        styleName="badge__header"
        style={{
          backgroundColor: props.ui.get('headerBackground')
        }}
      >
        <span
          style={{
            color: props.ui.get('headerText')
          }}
        >{props.headerText}</span>
      </div>
      <div
        styleName="badge__name"
        style={{
          backgroundColor: props.ui.get('nameBackground'),
          color: props.ui.get('nameText')
        }}
      >
        <span styleName="badge__name--first">{props.firstname}</span>
        <span styleName="badge__name--last">{props.lastname}</span>
      </div>
      <div
        styleName="badge__footer"
        style={{
          backgroundColor: props.ui.get('footerBackground')
        }}
      >
        <span
          style={{
            color: props.ui.get('footerText')
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
