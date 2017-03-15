import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";


class __Proper__Layout extends Base {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <DefaultLayout>
        {this.props.children}
      </DefaultLayout>
    )
  }
}

export default __Proper__Layout;
