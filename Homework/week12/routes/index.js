
const data = require("../data");
const path = require('path');
const productsData = data.products;
// const productRoutes = require("./product");
// const sellRoutes = require("./sell");
const users = require("./users");
const usersData = data.users;


const constructorMethod = (app) => {
    app.use("/", users);

   

    app.use("*", (req, res) => {
        // let route = path.resolve(`static/errorPage.html`);
        // res.status(404).sendFile(route);
        res.render("errorPage",{user: req.user,partial:"mainscreen-scripts"});
    })
};

module.exports = constructorMethod;
