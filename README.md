# Introduction 
It is a small **Inventory Management Plus Accounting System** for small retail companies. It includes Product Inventory Module, Sales Module, Purchase Order Module, Customer Module and Accounting Module.

### Speciality
This is inventory management system for small companies. So, for multiple companies the requiements will be same. But still there will be diferences like some data fields in different modules. May be Extra data feild wiil be need.
1. Beside some basic fields and sections, it tried to make **all the fields and data sections dynamic** so that user can have new fields and new sections.
2. Also, it is tried to make the **data grids editable**. User can add or delete columns on his own.

# Getting Started
This project is combination **tow projects client side and rest api**. Client side is developed with [React](https://reactjs.org/) and Rest Api is developed with [Express](https://expressjs.com/). (Not familier with this acrchitecture. Learn more about Restful servies. This might help [REST API concepts and examples](https://www.youtube.com/watch?v=7YcW25PHnAA)). Two project in two diferent repositories.
1. [rims-api](https://github.com/mdmuidulalam/rims-api) for rest api
2. [rims-clientside](https://github.com/mdmuidulalam/rims-clientside) for client side

**Let's set up client side here**

#### Step I: Clone the rims-clientside repository
1. Clone repo on local machine
2. Checkout development branch. (Development is the latest updated branch, development is done here. Master is the release breanch)

#### Step II: Install NodeJs and NPM
1. [NodeJs](https://nodejs.org/en/)
2. [NPM](https://www.npmjs.com/get-npm)

# Build and Test
To see the output we need to run both project as client side represent UI and api side serves the requests.

**Let's config rest api url in client-side**
1. Go to ```client-side``` of repo. Then open ```webpack.config.js```.
2. In ```webpack.config.js```, section devserver->proxy->/api give the url where the rest api is running (e.g. http://localhost:4000)

**Let's run clientside here**
1. Open terminal and run ```npm install``` command.
2. Then run ```npm start``` command.

Client-side should be up and running on ```http://localhost:3000/```

# Contribute
Coming soon...
