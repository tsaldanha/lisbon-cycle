import React, {Component} from "react";
import ReactDOM from "react-dom";
import Map from './Map'
import Header from './Header'
import Footer from './Footer'
import './app.scss'


ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Map />, document.getElementById('app'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
