import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {IconContext} from "react-icons";
import {FaGithub} from "react-icons/fa";

const Footer = () => (
  <div className= "footer fixed-bottom mx-0 py-3 text-center">
      <FaGithub />&nbsp;&nbsp;
      <a href="https://github.com/Rajshekar2641/fullstack-app/tree/test">Source Code on Github</a>
  </div>

)
export default Footer;