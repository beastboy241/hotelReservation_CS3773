# Purpose of Project

View as presentation: [Presentation](https://raw.githack.com/beastboy241/hotelReservation_CS3773/main/docs/presentation/presentation.html) \
Skip this and get to coding: [GettingStarted](#getting-started-with-create-react-app)

Develop a software product that manages hotel reservations across a group of
hotels of varying characteristics.

### Objectives
Develop a software product with the following features:

* Create/Modify Users Information
* Create/Modify Hotel Properties (Admin)
* Create/Modify Reservation information (modify or cancel reservation/Users & Admin)
* Ability to search based on criteria (price/date range, amenities, room availability)
* Have an intuitive UI/UX design

### Major Milestones
* Design:
    - Complete all UI/UX development tasks.

* Structural:
    - Complete all structural development tasks.

* Testing:
    - Complete all tests.

* Approval:
    - Client accepts product meets design specifications.

### Deliverables

* a web application that meets all requirements in key objectives.

### Scope exclusions

* Program does not read/write data from/to an external database.

### Methodologies and Technologies Used

The following sections will discuss the technologies used (version control,
programming languages, frameworks/libraries, and additional tools).

### Programming languages

The project was made using the following programming languages. Percentages
were taken from [github-link](https://github.com/beastboy241/hotelReservation_CS3773.git)

| **Language** | **Use %** |
| ------------ | --------- |
| JavaScript   | 89.1%     |
| CSS          |  9.0%     |
| HTML         | 1.8%      |
| TypeScript   | 0.1%      |

## Frameworks/libraries

### React

React is an open-source, front end, JavaScript library for building user
interfaces or UI components. React was used to create UI elements such as
navigation bar, search bar, and other components within the UI.

![Navigation Bar](./docs/report/images/react_navbar.png)

![Search Bar](./docs/report/images/react_searchbar.png)

### Nodejs

Node.js is an open-source, cross-platform, back-end JavaScript runtime environment
that runs on the V8 engine and executes JavaScript code outside a web browser.
Node.js lets developers use JavaScript to write command line tools and for
server-side scripting—running scripts server-side to produce dynamic web page
content before the page is sent to the user’s web browser.

What follows are the significant node modules utilized in the project and a short description.

| Node Modules       | Description                                                                     |
|:-----------------: | :------------------------------------------------------------------------------ |
| `cors`             | CORS is a node.js package for providing a Connect/Express middleware            |
|                    | Connect is an extensible HTTP server framework for node used to handle requests |
|                    |                                                                                 |
| `react-router-dom` | React Router is a lightweight, fully-featured routing library for the React     |
|                    | JavaScript library. React Router runs everywhere that React runs; on the web,   |
|                    | on the server (using node.js), and on React Native.                             |
|                    |                                                                                 |
| `react-day-picker` | Flexible date picker component for React                                        |
|                    |                                                                                 |
| `bcrypt`           | A bcrypt library for Nodejs which helps hash passwords                          |
|                    |                                                                                 |
| `express`          | A minimal and flexible Node.js web application framework that provides a robust |
|                    | set of features for web and mobile applications.                                | 


## Database

MariaDB is a community-developed, commercially supported fork of the MySQL
relational database management system, intended to remain free and open-source
software under the GNU General Public License. MariaDB was chosen for the
project due to the aforementioned reasons.

### Schema

| **Key Type**     | **Identifier**    |
| ---------------: | :---------------- |
|   Primary Keys:  |  Bold/Underline   |
| Secondary Keys:  |  Bold             |

![Database Relationships](./docs/report/images/database_diagram.png)


* For a _`reservation`_ to exist there must be at exactly one _`hotel`_ and
  _`user`_.

* _`reservation`_ is optional for _`hotel`_ to exist. There can be zero to many
  of them for a particular _`reservation`_.

* _`reservation`_ is optional for _`user`_ to exist. There can be zero to many
  of them for a particular _`reservation`_.

### Other Technology

* Version control: `git` and github
* Database GUI:     MySQL workbench
* IDE/Text editors: Webstorm, Visual Studio Code, VIM

## Create/Modify Users Information 

### Create

![](./docs/report/images/create_user.png)

### Modify

![](./docs/report/images/update_user.png)

## Create/Modify Hotel Properties

For both the Modify hotel and Create hotel features, a React `useState` hook was
used to allow us to track the state for each function component. The `useState`
hooks allowed us to track the specific properties for the hotel such as name,
rooms available, pricing and amenities available. When creating a new Hotel the
properties where set to initially have an empty values. We created react forms
to take in the new corresponding properties for the hotels. We configured the
input types to match the hotel’s specific properties.

Furthermore, both Modify and Create hotel functionalities were configured to
only available to admin user accounts, using a credential validation function. 

### Create

![](./docs/report/images/create_hotel.png)

### Modify

![](./docs/report/images/update_hotel.png)

## Create/Modify Reservation information

### Create

![](./docs/report/images/create_reservation.png)

### Modify

![](./docs/report/images/update_reservation.png)

## Ability to search based on criteria

![](./docs/report/images/search_criteria.gif)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up

### Step1: Install MariaDB and create root password when setup

go to CMD and type the following command:

```bash
mysql -u root -p
```

Enter root password

```mysql
create database hoteldb;

CREATE USER 'admin'@'localhost' identified by 'password';

GRANT ALL ON hoteldb.* TO 'admin'@'localhost';

flush privileges;
```

### Step2: Running the website/server

In the project directory, you can run:

```bash
cd hotelReservation_CS3773/;
npm install express --save;
npm install cors;
npm install react-router-dom --save;
npm install react-day-picker --save;
npm start;
```

In the server directory, you can run:

```bash
cd hotelReservation_CS3773/src/server;
npm install bcrypt;
npm install express --save;
npm install cors;
npm run start;
```

or to run in development mode

```bash
npm run devStart
```

### Step3: Setting up the database

To create schema and populate hotels head to:\
[http://localhost:3001/build](http://localhost:3001/build)


To populate user and reservations tables with test data head to:\
[http://localhost:3001/build/test](http://localhost:3001/build/test)

## View and Debug

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
