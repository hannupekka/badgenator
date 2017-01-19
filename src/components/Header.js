// @flow
import styles from 'styles/components/Header';
import React from 'react';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

const Header: Component<{}> = (): ElementType => {
  return (
    <header styleName="header">
      <h1 styleName="title">Badgenator</h1>
      <h3 styleName="title--small">Generate name badges from your data!</h3>
    </header>
  );
};

export default pure(CSSModules(Header, styles));
