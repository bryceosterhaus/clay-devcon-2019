// Load all clay-css styles
import '@clayui/css/lib/css/atlas.css';

// Utils for color manipulation
import {getRGB, rgbToHex} from './utils';
import {ClaySelect} from '@clayui/form';
import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClaySticker from '@clayui/sticker';
import ClayColorPicker from '@clayui/color-picker';
import ClayLoadingIndicator from '@clayui/loading-indicator';
import ClayNavigationBar from '@clayui/navigation-bar';
import ClaySlider from '@clayui/slider';
import React from 'react';
import ReactDOM from 'react-dom';

// Sofa component
import Sofa, {PARTS} from './Sofa';

// Location of clay-css icons
const spritemap = '/icons.svg';

function Slider({label, onValueChange, value}) {
	return (
		<div className="form-group">
			<label>{`${label}: ${value}`}</label>

			<ClaySlider
				max={255}
				name={label}
				onValueChange={onValueChange}
				value={value}
			/>
		</div>
	);
}

function ColorCustomizer({onChangeColor, color, defaultColor}) {
	const {r, g, b} = getRGB(color);

	const setColor = (red, green, blue) =>
		onChangeColor(rgbToHex(red, green, blue));

	return (
		<div>
			<ClayColorPicker
				onValueChange={onChangeColor}
				spritemap={spritemap}
				value={color}
			/>

			<br />

			<Slider
				label="Red"
				onValueChange={val => setColor(val, g, b)}
				value={r}
			/>

			<Slider
				label="Green"
				onValueChange={val => setColor(r, val, b)}
				value={g}
			/>

			<Slider
				label="Blue"
				onValueChange={val => setColor(r, g, val)}
				value={b}
			/>

			<ClayButton
				displayType="secondary"
				onClick={() => onChangeColor(defaultColor)}
			>
				{'Reset'}
			</ClayButton>
		</div>
	);
}

function App() {
	const defaultPalettesRef = React.useRef({});
	const defaultPaletteNamesRef = React.useRef([]);

	const [activePalette, setActivePalette] = React.useState(false);
	const [activePart, setActivePart] = React.useState(PARTS[0].part);
	const [palette, setPalette] = React.useState({});
	const [loading, setLoading] = React.useState(true);
	const [cart, setCart] = React.useState([]);

	const addToCart = item => {
		setCart([...cart, item]);
	};

	React.useEffect(() => {
		fetch(`/data/presets.json`)
			.then(response => response.json())
			.then(data => {
				defaultPalettesRef.current = data;
				defaultPaletteNamesRef.current = Object.keys(data);

				const paletteName = defaultPaletteNamesRef.current[0];

				setActivePalette(paletteName);
				setPalette(defaultPalettesRef.current[paletteName]);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<nav className="application-bar application-bar-dark navbar">
				<div className="container-fluid container-fluid-max-xl">
					<div className="navbar-title navbar-text-truncate">
						Hip Sofa Store
					</div>

					<ul className="navbar-nav">
						<li className="nav-item">
							<ClayButton
								className="nav-link"
								displayType="unstyled"
								style={{position: 'relative'}}
							>
								<ClayIcon
									spritemap={spritemap}
									symbol="shopping-cart"
								/>

								{!!cart.length && (
									<ClaySticker
										displayType="warning"
										shape="circle"
										size="sm"
										outside
										position="top-right"
									>
										{cart.length}
									</ClaySticker>
								)}
							</ClayButton>
						</li>
					</ul>
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
					<div className="col-sm-7">
						<Sofa {...palette} />
					</div>
					<div className="col-sm-4 sheet">
						<h2 className="sheet-title">
							Customize Sofa ({activePalette})
						</h2>

						<div className="sheet-section">
							<label>
								Sofa Part ({palette[`${activePart}Color`]})
							</label>
							<ClaySelect
								onChange={e => setActivePart(e.target.value)}
							>
								{PARTS.map(item => (
									<ClaySelect.Option
										key={item.part}
										label={item.label}
										value={item.part}
									/>
								))}
							</ClaySelect>

							<br />

							<label>Color</label>
							{loading && <ClayLoadingIndicator />}
							{!loading && (
								<ColorCustomizer
									onChangeColor={color => {
										setPalette({
											...palette,
											...{
												[`${activePart}Color`]: color
											}
										});
									}}
									color={palette[`${activePart}Color`]}
									defaultColor={
										defaultPalettesRef.current[
											activePalette
										][`${activePart}Color`]
									}
								/>
							)}
						</div>

						<div className="sheet-footer">
							<ClayButton
								onClick={() => addToCart(activePalette)}
							>
								Add to Cart
							</ClayButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
