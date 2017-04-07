console.log("Start");

let itemSet = () => {
    let itemCount = 1;

    let items = [
        { id: itemCount++, item: "Sword of Truth" },
        { id: itemCount++, item: "Book of Wisdom" },
        { id: itemCount++, item: "Potion of Healing" },
    ];

    return {
        addItem: (item) => {
            return new Promise((fulfill, reject) => {
                if (!item) reject("You did not provide an item");

                fulfill(items.push({ id: itemCount++, item: item }));
            });
        },
        getItem: () => {
            return new Promise((fulfill, reject) => {
                setTimeout(() => {
                    if (items.length > 0) fulfill(items.shift());

                    reject("No items left!");
                }, 750);
            });
        }
    }
}

let firstItemSet = itemSet();

let firstChain = firstItemSet.getItem().then((firstItem) => {
    console.log("");
    console.log(firstItem);

    return firstItemSet.getItem().then((secondItem) => {
        console.log("");
        console.log(secondItem);

        return firstItemSet.getItem().then((thirdItem) => {
            console.log("");
            console.log(thirdItem);

            return firstItemSet.getItem().then((fourthItem) => {
                return [firstItem, secondItem, thirdItem, fourthItem];
            }).catch(() => {
                console.log("");
                return [firstItem, secondItem, thirdItem];
            }); // recovers from error
        });
    })
}).then((items) => {
    console.log("");
    console.log(items);
    return items;
}, (error) => {
    console.log("");
    console.log(error);

    return [];
});

let secondItemSet = itemSet();

let secondChain = firstChain.then(() => {
    console.log("\n\n\nStarting second chain");

    return secondItemSet.getItem().then((firstItem) => {
        return [firstItem];
    });
}).then((itemsSoFar) => {
    return secondItemSet.getItem().then((secondItem) => {
        return itemsSoFar.concat([secondItem]);
    });
}).then((itemsSoFar) => {
    return secondItemSet.getItem().then((thirdItem) => {
        return itemsSoFar.concat([thirdItem]);
    });
}).then((items) => {
    console.log("all the items in chain 2 were:");
    console.log(items);
    
    return items;
});
