import React, {Component,Fragment} from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from './Auth/RegisterModal';
import LoginModal from './Auth/LoginModal';
import Logout from './Auth/Logout';

class AppNavbar extends Component{
   state={
       isOpen:false
   }

   static propTypes={
       auth:PropTypes.object.isRequired
   }

   toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        });
   }
   render(){

        const {isAuthenticated,user}=this.props.auth;

        const authLinks =(
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user?`Welcome${user.name}`:''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout></Logout>
                </NavItem>
            </Fragment>
        )

        const guestLinks=(
            <Fragment>
                <NavItem>
                    <RegisterModal></RegisterModal>
                </NavItem>
                <NavItem>
                    <LoginModal></LoginModal>
                </NavItem>
            </Fragment>
        )

       return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated?authLinks:guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>   
                </Navbar>
            </div>
       )
   }
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(
    mapStateToProps,
    null
)(AppNavbar);