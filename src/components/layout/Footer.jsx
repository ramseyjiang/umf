import React from "react";
import {year} from "../utils/Date.js"
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
      <div className="font-small bg-dark" >
        <div className="text-center text-white py-1">
        © {year()} Copyright:<label htmlFor="footer">Ramsey Jiang</label> {' '}
        <a href="https://github.com/ramseyjiang/"rel="noopener noreferrer" target="_blank" className="link-icon-color"><FaGithub /></a> {' '}
        <a href="https://www.linkedin.com/in/ramsey-jiang-360950101" target="_blank" rel="noopener noreferrer" className="link-icon-color"><FaLinkedin /></a>
        </div>
      </div>
    );
};

export default Footer;