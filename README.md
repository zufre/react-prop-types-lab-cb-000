# React PropTypes Lab

## Overview

In this lab, you'll use PropTypes declaration in a variety of scenarios. 

## A new job
![Michael Scott](https://media.giphy.com/media/jOpLbiGmHR9S0/giphy.gif)

Welcome to your first day at... Dunder Mifflin! Your job is to make sure the company's products are catalogued on the website. Since we like to be modern, we'll use React to display the product information. Since our database is pretty old, we'll be sure to add PropTypes to our component so that we know we're passing in the right props.

1. In the `components/Product.js` file, create a `Product` React component.
2. This component has the following props:
    -  `name`: a string — required
    -  `producer`: a string — optional
    -  `hasWatermark`: a boolean — optional, defaults to false
    -  `color`: a string — required, can only be `'white'`, `'eggshell-white'` or `'salmon'`
    -  `weight`: a number — required, ranges between 80 and 300
3. Note: for the `weight` prop, we'll need custom logic. Remember that it's possible to write your own prop validator
function!

## Resources
- [React: Prop Validation](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)
