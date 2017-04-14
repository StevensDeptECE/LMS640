const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                db1 = db.collection(collection);
                if(collection == "upload") {
                    db1.createIndex({title: "text", date: "text", studentName: "text", description: "text"})
                }
                return db1;
                //return db.collection(collection);
            });
        }
        return _col;
    }
}

/* Now, you can list your collections here: */
module.exports = {
    users: getCollectionFn("users"),
    upload: getCollectionFn("upload"),
};
