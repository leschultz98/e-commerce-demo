## Getting started

Install the dependencies:

```
yarn
```

## Scripts

- `yarn dev` - start a development server with hot reload.
- `yarn build` - build for production. The generated files will be on the `dist` folder.

## Accounts

| Username | Password |
|----------|----------|
| buyer    | buyer    |
| owner    | owner    |

## Intro

Create a seller profile page for an e-commerce website that displays basic
info about the seller and a list of what they sell.

## Requirement:

- Create a simple react web app with one single page: a seller profile page with basic
  aesthetic styling
- Implement a way to authenticate user to know whether the current user is a visitor (not
  logged-in user), a buyer (logged-in user but does not own the profile), and the owner (a
  seller who owns this profile page)
- For visitor, show a list of products without any button
- For buyer, show a list of products with button to add/remove the product to their cart (you
  don’t need to implement the cart, just need to store the product in an array and print out
  in the console that the product has been added/removed from the cart)
- For owner, has a way for them to edit their profile page and add/remove their products
- Seller profile info has name, phone number, description
- Each product has name, description, and price

## Bonus point:

Implement a way for the owner to edit the order of their products displayed on the page.

For example if the current profile page show:

Product_1

Product_2

Product_3

And the owner wants to change the order to:

Product_2

Product_3

Product_1
