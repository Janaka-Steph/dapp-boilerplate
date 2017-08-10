import * as React from 'react'
import {connect} from 'react-redux'

/**
 * TestContainer
 */
class TestContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div id="test-page">
        <div className="row">
          <div className="col">
            <h2>Test page</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(TestContainer)