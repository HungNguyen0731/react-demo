import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        name: 'Trang chủ',
        to: '/',
        ico:"fa fa-home",
        exact: true
    },
    {
        name: 'Login',
        to: '/Login',
        ico:"fas fa-shopping-cart",
        exact: false
    },
    {
        name: 'Quản lý sản phẩm',
        to: '/ManageProduct',
        ico:"fas fa-box",
        exact: false
    }
];

const MenuLink = ({ label, to,ico, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                return (
                    <li>
                  
                        <Link className="collapsible-header waves-effect" to={to}>
                        <i className={ico}> 
                        </i> <span className="text-uppercase ">{label}</span>
                        </Link> 
                   </li>
               
                );
            }}
        />
    );
};

class Menu extends Component {
    render() {
        return (
            <ul className="collapsible collapsible-accordion">
                      
            
                    {this.showMenus(menus)}
                
            </ul>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink 
                        key={index}
                        label={menu.name}
                        ico={menu.ico}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return result;
    }

}

export default Menu;
