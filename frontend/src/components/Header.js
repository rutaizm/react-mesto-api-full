import React from 'react';
import logo from '../images/logo.svg';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

function Header({loggedIn, onLogin, onRegistration, userEmail, onLogout}) {

    const location = useLocation();

    const [openMenu, setOpenMenu] = React.useState(false);

    function handleOpenMenu() {
        setOpenMenu(!openMenu);
    }

    return (
        <>        
            {!loggedIn && (
                <header className="header">
                 <img className="logo" src={logo} alt="логотип в шапке" />               
                  <nav className='header__nav'>
                    {location.pathname==='/sign-up' && 
                        <NavLink to="/sign-in" className="header__link" onChange={onLogin}>Войти</NavLink>
                    }
                    {location.pathname==='/sign-in' && 
                        <NavLink to="/sign-up" className="header__link" onChange={onRegistration}>Регистрация</NavLink>
                    }
                </nav>
                </header> 

            )}
            {loggedIn && (
                <header className="header__open">
                 <div className="header__wrap">
                    <img className="logo" src={logo} alt="логотип в шапке" />
                    <button className={openMenu ? 'header__close-menu-button': 'header__menu-button'} onClick={handleOpenMenu} type="button"></button>
                 </div>
                <div className={openMenu ? 'header__nav header__nav_active' : 'header__nav '} >
                    <address className='header__email'>{userEmail && userEmail}</address>
                    <button className='header__exit-button' onClick={onLogout}>Выйти</button>
                </div>
                </header>
            )}
        </>
    )
}

export default Header;