const uploadRoutes = require("./upload");


const path = require('path');

const constructorMethod = (app) => {

    app.use("/", uploadRoutes);
};

module.exports = constructorMethod;