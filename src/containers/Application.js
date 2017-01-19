// @flow
import styles from 'styles/containers/Application';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Header from 'components/Header';

type Props = {
  children: ElementType | Array<ElementType>
}

// eslint-disable-next-line react/prefer-stateless-function
class Application extends Component {
  props: Props;
  render(): ElementType {
    const { children } = this.props;

    return (
      <div>
        <Header />
        <section styleName="content">
          {children}
        </section>
        <section styleName="footer">
          <a
            styleName="project"
            href="https://github.com/hannupekka/badgenator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check out this project in GitHub
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </section>
      </div>
    );
  }
}

export default CSSModules(Application, styles);
