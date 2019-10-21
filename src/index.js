// Load all clay-css styles
import '@clayui/css/lib/css/atlas.css';

// Utils for color manipulation
import {getRGB, rgbToHex} from './utils';
import React from 'react';
import ReactDOM from 'react-dom';

// Sofa component
import Sofa, {PARTS} from './Sofa';

// Location of clay-css icons
const spritemap = '/icons.svg';

function App() {
	const [palette, setPalette] = React.useState({});

	React.useEffect(() => {
		fetch(`/data/presets.json`)
			.then(response => response.json())
			.then(data => {
				const paletteName = Object.keys(data)[0];

				setPalette(data[paletteName]);
			});
	}, []);

	return (
		<>
			<nav className="application-bar application-bar-dark navbar">
				<div className="container-fluid container-fluid-max-xl">
					<div className="navbar-title navbar-text-truncate">
						Hip Sofa Store
					</div>
				</div>
			</nav>

			{/** Navigation */}

			<div className="container">
				<div className="row align-items-center justify-content-center">
					<Sofa {...palette} />
				</div>
			</div>
		</>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
