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
    console.log("Connected as id: " + connection.threadId);
    displayItems();
});

function displayItems() {
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
            // buyItem();
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
        connection.query("")
    })
