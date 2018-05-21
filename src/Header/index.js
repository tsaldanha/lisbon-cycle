import React, {Component} from "react";
import './header.scss';

export default class extends Component {
	constructor(props: Props) {
	    super(props);
  	}

	render() {
	    return (
	        <div id="header-bar">
	        	<nav>
	        		<ul>
	        			<li>Menu 1</li>
						<li>Menu 2</li>
						<li>Menu 3</li>
						<li>Menu 4</li>
	        		</ul>
	        	</nav>
	        </div>    
	    );
  	}

}