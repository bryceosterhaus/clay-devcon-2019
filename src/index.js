// Load all clay-css styles
import '@clayui/css/lib/css/atlas.css';

// Utils for color manipulation
import {getRGB, rgbToHex} from './utils';
import ClayButton from '@clayui/button';
import ClayNavigationBar from '@clayui/navigation-bar';
import React from 'react';
import ReactDOM from 'react-dom';

// Sofa component
import Sofa, {PARTS} from './Sofa';

// Location of clay-css icons
const spritemap = '/icons.svg';

function App() {
	const defaultPalettesRef = React.useRef({});
	const defaultPaletteNamesRef = React.useRef([]);

	const [activePalette, setActivePalette] = React.useState(false);
	const [palette, setPalette] = React.useState({});

	React.useEffect(() => {
		fetch(`/data/presets.json`)
			.then(response => response.json())
			.then(data => {
				defaultPalettesRef.current = data;
				defaultPaletteNamesRef.current = Object.keys(data);

				const paletteName = defaultPaletteNamesRef.current[0];

				setActivePalette(paletteName);
				setPalette(defaultPalettesRef.current[paletteName]);
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

			<ClayNavigationBar triggerLabel="Palette">
				{defaultPaletteNamesRef.current.map(item => (
					<ClayNavigationBar.Item
						key={item}
						active={activePalette === item}
					>
						<ClayButton
							block
							className="nav-link"
							displayType="unstyled"
							small
							onClick={() => {
								setActivePalette(item);
								setPalette(defaultPalettesRef.current[item]);
							}}
						>
							{item}
						</ClayButton>
					</ClayNavigationBar.Item>
				))}
			</ClayNavigationBar>

			<div className="container">
				<div className="row align-items-center justify-content-center">
					<Sofa {...palette} />
				</div>
			</div>
		</>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
