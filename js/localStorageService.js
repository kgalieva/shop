//----------------------------------------------------------------
// shopping cart
//
function localStorageService(cartName) {
    this.cartName = cartName;
    this.items = {};
    this.loadItems();
}

// load items from local storage
localStorageService.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var id in items) {
                if (items.hasOwnProperty(id)) {
                    var item = items[id];
                    //check data for correctness
                    if (item.id != null && item.name != null && item.price != null && item.amount != null && item.amount > 0) {
                        if (item.instock != null && item.amount > item.instock) {
                            item.amount = item.instock;
                        }
                        this.items[item.id] = new cartItem(item.id, item.name, item.price, item.amount, item.instock);
                    }
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}

// save items to local storage
localStorageService.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
}

// adds an item to the cart
localStorageService.prototype.addItem = function (newItem, amount) {
    amount = this.toNumber(amount);
    // update quantity for existing item
    var current;
    if (this.items.hasOwnProperty(newItem.id)) {
        current = this.items[newItem.id];
        current.amount = this.toNumber(current.amount + amount);
        if(current.amount < 0) {
            delete this.items[current.id];
        }

    } else {
        this.items[newItem.id] = new cartItem(newItem.id, newItem.name, newItem.price, amount, newItem.quantity);
    }
    // save changes
    this.saveItems();
}

// get the total price for all items currently in the cart
localStorageService.prototype.getTotalPrice = function () {
    var total = 0;
    for (var id in this.items) {
        if (this.items.hasOwnProperty(id)) {
            var item = this.items[id];
            total += this.toNumber(item.amount * item.price);
        }
    }
    return total;
}

// clear the cart
localStorageService.prototype.clearItems = function () {
    this.items = {};
    this.saveItems();
}
localStorageService.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 1 : value;
}
localStorageService.prototype.isEmpty = function (map) {
    for(var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

//----------------------------------------------------------------
// items in the cart
//
function cartItem(id, name, price, amount, instock) {
    this.id = id;
    this.name = name;
    this.price = price * 1;
    this.amount = amount * 1;
    this.instock = instock;
}