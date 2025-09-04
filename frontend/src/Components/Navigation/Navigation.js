import React from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { menuItems } from "../../utils/menuItems";
import { NavLink } from "react-router-dom";

function Navigation({ userName, email }) {
  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div className="text">
          <h2>{userName || "Your Name"}</h2>
          <h3>{email || "Your Email"}</h3>
        </div>
      </div>

      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.link}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    .text {
      display: flex;
      flex-direction: column;
      h2 {
        color: rgba(34, 34, 96, 1);
      }
      h3 {
        color: rgba(34, 34, 96, 0.6);
        font-weight: 400;
        margin-top: 4px;
      }
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      margin: 0.6rem 0;
      a {
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        color: rgba(34, 34, 96, 0.6);
        padding-left: 1rem;
        position: relative;
        text-decoration: none;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
