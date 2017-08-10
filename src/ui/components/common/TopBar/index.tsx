import * as React from 'react'
import {Component} from 'react'
import * as PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'
import styles from './styles.css'

interface State {
  isOpen: boolean;
}
interface Props {}

export default class TopBar extends Component<Props, State> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={() => this.toggle()}/>
          <NavbarBrand
            href="/"
            className={styles['navbar-brand']}
          >
            <img src="assets/images/logo.svg" alt="logo" />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className={styles['navbar-nav']} navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/test">Test</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}