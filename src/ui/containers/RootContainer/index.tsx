import * as React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {history} from '../../redux/createStore'
import TopBar from '../../components/common/TopBar'
// Pages
import HomePage from '../HomeContainer'
import RPSPage from '../RPSContainer'

interface State {}
interface Props {
  store: any;
}

/**
 * RootContainer
 * Root component, core layout, route handling, web3 setup
 */
class RootContainer extends React.Component<Props, State> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div>
            <TopBar />
            <div className="container m-top-50">
              <div className="row">
                <div className="col-12">
                  <div>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/rps" component={RPSPage}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
export default connect()(RootContainer)