# Sofa Customizer

> If you want to see the end product, checkout [`master`](https://github.com/bryceosterhaus/clay-devcon-2019/tree/master) branch.

## Goal

Build a sofa customizer.

### Requirements:

-   Select from a preset of colors for sofa.
-   Presets will be fetched asyncronously.
-   Customize and change color for each part of sofa (Base, Cushions, Legs, Pillows).
-   Ability to reset to initial preset color.

### Extras

-   Deploy module to Liferay DXP.
-   Ability to "Add to cart" for a custom color.
-   Cart button which shows list of saved sofas.

## Workshop Steps

1. Fetch Data
2. Navigation
3. Selecting Parts
4. ColorPicker
5. ColorPicker sliders

### Extras

6. Liferay
7. Shopping cart
8. Modal

## Project Structure

-   Initialized from [create-react-app](https://github.com/facebook/create-react-app)
    -   Removed unneccessary boilerplate
-   Added pre-defined `Sofa` component and color manipulation utilities in `utils.js`
-   Added expected list of `@clayui/*` packages needed in package.json
-   Added `presets.json` and `icons.svg` which are served statically.

## Codesandbox

-   [Start](https://codesandbox.io/s/2019-devcon-clay-start-smjs6)
-   [Final](https://codesandbox.io/s/2019-devcon-clay-final-opqqb)

## Additional Resources

-   Workshop Slides: [/slides.pdf](./slides.pdf)
-   Lexicon Homepage: https://liferay.design/lexicon/
-   Docs & Clay Homepage: https://clayui.com/
-   Clay Repo: https://github.com/liferay/clay
-   Demos: https://storybook.clayui.com/
