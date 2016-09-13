# React PropTypes Lab

## Objectives
1. Practice using PropTypes declarations
2. Describe when to use each declaration

## A new job
![Michael Scott](https://media.giphy.com/media/NXOF5rlaSXdAc/giphy.gif)

Welcome to your first day at... Dunder Mifflin! Your job is to make sure the company's products are catalogued on the
website. Since we like to be modern, we'll use React to display the product information. Since our database is pretty
old, we'll be sure to add PropTypes to our component so that we know we're passing in the right props.

1. In the `components/Product.js` file, create a `Product` React component
2. This component has the following props:
    1. `name`: a string — required
    2. `producer`: a string — optional
    3. `hasWatermark`: a boolean — optional, defaults to false
    4. `color`: a string — required, can only be `'white'`, `'eggshell-white'` or `'salmon'`
    5. `weight`: a number — required, ranges between 80 and 300
3. Note: for the `weight` prop, we'll need custom logic. Remember that it's possible to write your own prop validator
function!

## Resources
- [React: Prop Validation](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)
