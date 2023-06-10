import React, { useState } from 'react';
import './header.css';
import userAvatar from '../../img/userAvatar.jpg';
import arrowDown from '../../img/arrowDown.png';

const Header: React.FC = () => {
  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);

  const handleArrowDownClick = (menuItem: string) => {
    if (openMenuItem === menuItem) {
      setOpenMenuItem(null); 
    } else {
      setOpenMenuItem(menuItem); 
    }
  };

  const handleMenuItemClick = (menuItem: string) => {
    console.log(`Clicked on menu item: ${menuItem}`);
    setOpenMenuItem(null); 
  };

  return (
    <header className="header">
      <h1 className="site-name">Awesome Kanban Board</h1>
      <div
        className="avatar"
        onMouseLeave={() => setOpenMenuItem(null)} 
      >
        <img className="avatar-img" src={userAvatar} alt="avatar" />
        <img
          className={`arrowdown-img ${openMenuItem ? 'arrowdown-img-open' : ''}`}
          src={arrowDown}
          alt="arrowdown"
          onClick={() => handleArrowDownClick('menu')} 
        />
        {openMenuItem === 'menu' && (
          <ul className="menu">
            <li onClick={() => handleMenuItemClick('Profile')}>Profile</li>
            <li onClick={() => handleMenuItemClick('Log Out')}>Log Out</li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
