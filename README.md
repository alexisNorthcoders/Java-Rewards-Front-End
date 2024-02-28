# Java Rewards ☕️

## Welcome!
Java Rewards is a loyalty rewards app designed for independent coffee shops.
Businesses can sign up to the app and create a profile. Customers can sign up and claim a free coffee after they have purchased 7 coffees at any businesses that are signed up to Java Rewards. The aim is to help promote independent coffee shops and allow them to build a loyal customer base.

## Tech Stack

We built the app with React Native, Typescript, Expo Go and Firebase.
It uses an API that we built with Node, Express, Typescript and MongoDB.

Repo for API: https://github.com/Liam-Tomlinson/Java-Rewards-BackEnd

## Functionality
### Business
- Create an account
- Receive orders through the app
- Ability to scan a customer's QR code to update the number of coffees they have purchased
- A profile page where the shop description, menu and offers can be updated. Also a business can view statistics based on data about their customers such as the number of orders by month.

### Customer
- Create an account
- A map showing the nearest coffee shops that use Java Rewards
- A list of the nearest coffee shops
- View a coffee shop profile
- Order from a coffee shop with the option to pay through the app or in store
- View current offers
- A unique QR code to be scanned by the business upon purchase of a coffee
- A profile page that shows a progress bar for the number of coffees left to buy before getting a free coffee. Customers can also view their previous orders they have made through the app.



## Minimum version requirements
Node is required to run this app.

Minimum version of Node: **v20.8.0**

To check your current version run `node -v` in your terminal

## Setup
Follow these steps to run the app locally

In your terminal run the following commands:

1. Clone this repo in your desired directory
```
git clone https://github.com/Liam-Tomlinson/Java-Rewards-Front-End
```

2. Change directory into the repo
```
cd Java-Rewards-Front-End
```

3. Install the required dependencies using `npm install`

4. To run the app use `npx expo start`

A QR code will be generated that can be scanned using the Expo Go app on Android or iOS. Once scanned the app will be rendered on your phone. 

If you have an iOS simulator installed you can press `i` in the terminal to run the app in the simulator.

If you have an Android simulator installed you can press `a` in the terminal to run the app in the simulator.