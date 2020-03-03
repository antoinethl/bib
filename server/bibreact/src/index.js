import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class First extends React.Component {
	constructor (props){
		super(props);
	}

	render() {
		const data = require("./restaurant_both.json")
		console.log(data)
		const listItems = data.map((d) =>
			<div className="restaurant">
				<div>
					<h2>{d.name}</h2>
					<hr/>
					<br/>
					<div className="adresse"><b>Adresse:</b> {d.location}</div>
					<br/>
					<div className="numero"><b>Numéro:</b> {d.num}</div>
					<br/>
					<div className="confort">{d.comfort}</div>
					<br/>
					<hr/>
					<div className="specialities">{d.specialities}</div>
					<hr/>
				</div>
			</div> 
			);

		return (
			<div>
			{listItems}
			</div>
			);
	}
} 

ReactDOM.render(
  <First />,
  document.getElementById('root')
);

	//<li key={d.name}>{d.name}</li>
