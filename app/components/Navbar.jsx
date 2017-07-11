import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return(
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="#" className="navbar-left">
            <img className="navbar-logo" src="/images/logo.png"/></a>
          <span className="collapse navbar-collapse navbar-title">Margaret Hamilton Interplanetary Academy of JavaScript</span>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav navbar-right">
          <li>About</li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">About
            <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Created by Stacy Hirschberg</a></li>
            </ul>
          </li>
          <li><Link to="/"><span> Home</span></Link></li>
        </ul>
        </div>
      </div>
    </nav>
  )
}
