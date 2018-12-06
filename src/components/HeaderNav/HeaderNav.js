import React from 'react';
import classNames from 'classnames';
import { 
  MdHome as HomeIcon,
  MdNotifications as NotificationIcon,
  MdMail as MailIcon
} from "react-icons/md";
import './HeaderNav.scss';

const HeaderNavItem = ({ children, selected, tab, icon, onSelect }) => {
  //const icon = iconType ? React.createElement(iconType) : null;
  return (
    <div className={classNames('HeaderNavItem', {
        active: selected === tab,
      })}
      onClick={() => onSelect(tab)}
    >
      <div className="icon">{icon}</div>
      <div className="text">{children}</div>
    </div>
  );
};

const HeaderNav = ({ tab, onSelect }) => {
  return (
    <div className="HeaderNav">
      <HeaderNavItem icon={<HomeIcon/>} tab="home" selected={tab} onSelect={onSelect}>
        홈
      </HeaderNavItem>
      <HeaderNavItem icon={<NotificationIcon/>} tab="notification" selected={tab} onSelect={onSelect}>
        알림
      </HeaderNavItem>
      <HeaderNavItem icon={<MailIcon/>} tab="message" selected={tab} onSelect={onSelect}>
        쪽지
      </HeaderNavItem>
    </div>
  );
};

export default HeaderNav;