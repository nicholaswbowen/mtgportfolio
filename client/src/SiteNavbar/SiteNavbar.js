import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Row, Navbar,Nav,NavItem} from 'react-bootstrap'
import {withRouter} from 'react-router'
class SiteNavbar extends Component{
    constructor(){
      super()
      this.handleNavLink = this.handleNavLink.bind(this)
    }
    handleNavLink(event){
      event.preventDefault();
      if(event.currentTarget.getAttribute('href') === "/"){
        this.props.logout()
      }
      this.props.history.push(event.currentTarget.getAttribute('href'))
    }
  render(){
    return(
    <Row>
      <Navbar collapseOnSelect>
       <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">MtgTrader</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <LoginPanels isLoggedIn={this.props.isLoggedIn} handleNavLink={this.handleNavLink} 
                       logout={this.props.logout} isAdmin={this.props.isAdmin}/>
        </Navbar.Collapse>
      </Navbar>
    </Row>
    )
    }
}
  class LoginPanels extends Component{
    render(){
       if (this.props.isLoggedIn){
        return( 
          <Nav pullRight>
            {this.props.isAdmin ? <AdminPanel />: null}
            <NavItem eventKey={1} onClick={this.props.handleNavLink} href="/trader">Trade</NavItem>
            <NavItem eventKey={2} onClick={this.props.handleNavLink} href="/profile">Profile</NavItem>
            <NavItem eventKey={3} onClick={this.props.handleNavLink} href="/">Logout</NavItem>
          </Nav>
        )
        }else{
          return (
            <Nav pullRight>
              <NavItem eventKey={1} onClick={this.props.handleNavLink} href="/signup">Sign Up</NavItem>
              <NavItem eventKey={2} onClick={this.props.handleNavLink} href="/login">Login</NavItem>
            </Nav>
          )
        }
    }
  }
  class AdminPanel extends Component{
    render() {
      return  <NavItem eventKey={1} onClick={this.props.handleNavLink} href="/admindashboard">Dashboard</NavItem>
    }
  }
export default withRouter(SiteNavbar)