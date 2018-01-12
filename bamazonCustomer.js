var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon",
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("Connected as id: " + connection.threadId);
    displayItems();
});

function displayItems() {
    console.log("\n**** Welcome to BAMAZON **** \n Your Node.js Superstore!")
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\n")
            console.log(
                        "| Item Number: " +
                        res[i].item_id +
                        " | Product Name: " +
                        res[i].product_name +
                        " | Department: " +
                        res[i].department_name +
                        " | Price: " +
                        res[i].price +
                        " | Left in stock: " +
                        res[i].stock_quantity);
            console.log("\n -----------------------------------------------------------------------------");
        }
        initialize();
    });
}

function initialize() {
    inquirer.prompt([{
        name: "buyItem",
        type: "rawlist",
        message: "Would you like to purchase an item?",
        choices: ["YES", "NO"]        
    }
    ]).then(function(answer) {
        if (answer.buyItem.toUpperCase() === "YES") {
            buyItem();
        } else {
            console.log("That's ok, we'll be here when you're ready! See ya!");
            connection.end();
        }
    });
}

function buyItem() {
    inquirer.prompt([{
            name: "selectedItem",
            type: "input",
            message: "Please enter the Item Number of the product you would like to purchase."
        },{
            name: "itemAmount",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;
                }
        }
    ]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE ?", {item_id: answer.selectedItem}, function(err, res) {
            if (err) throw err;
            console.log("res.stock_quantity: " + res[0].stock_quantity);
            
            if (answer.itemAmount <= parseInt(res[0].stock_quantity)) {
                console.log("Buying " + answer.itemAmount + " Item Number " + answer.selectedItem + "!");
                
                connection.query("UPDATE products SET ? WHERE ?", 
                    [{
                        stock_quantity: (res[0].stock_quantity - answer.itemAmount)
                    },
        
                    {
                        item_id:  answer.selectedItem
                    }], function(err) {
                        if (err) throw err;
                        console.log("Your order has been placed! The amount charged was $" + res[0].price + "\n");
                        console.log("------------------------------------------");
                        resetOption();
                        })
            } else {
                console.log("Uh oh! Unfortunatly there are only " + res[0].stock_quantity + " left in stock. \nPlease try again.");
                console.log("---------------------------------------------");
                buyItem();
            }
        })
    })
 }

 function resetOption() {
    inquirer.prompt({
        name: "done",
        type: "rawlist",
        message: "Have you gotten all you need?",
        choices: ["YES", "NO"]
    }). then(function(answer){
        if (answer.done.toUpperCase() === "YES") {
            console.log("---------------------------------------------\nThanks for shopping, See ya next time!")
            console.log("---------------------------------------------");
            connection.end();
        } else {
            console.log("\nReturning to BAMAZON Home...\n");
            displayItems();
        }
    })
 }