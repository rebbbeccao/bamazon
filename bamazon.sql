create database bamazon;

use bamazon;

create table products(
	item_id int not null auto_increment,
	product_name varchar(100) not null,
	department_name varchar(100) not null,
	price decimal(10,2) not null,
	stock_quantity int null,
	primary key (item_id)
);

select * from products;

insert into products (product_name, department_name, price, stock_quantity)
values ("iPad", "electronics", 200.00, 4);

insert into products (product_name, department_name, price, stock_quantity)
values ("Old Skool Vans Size 8", "Shoes", 40.00, 6);

insert into products (product_name, department_name, price, stock_quantity)
values ("Magic Bullet", "Kitchen", 100.00, 2);

insert into products (product_name, department_name, price, stock_quantity)
values ("MacBook Air 13inch", "Electronics", 650.00, 1);

insert into products (product_name, department_name, price, stock_quantity)
values ("It Cosmetics BB Cream", "Make-up", 38.00, 16);

insert into products (product_name, department_name, price, stock_quantity)
values ("Couch", "Furniture", 500.99, 2);

insert into products (product_name, department_name, price, stock_quantity)
values ("Glock 19", "Firearms", 1200.00, 9);

insert into products (product_name, department_name, price, stock_quantity)
values ("50lbs. Dumbells", "Fitness", 50.00, 1);

insert into products (product_name, department_name, price, stock_quantity)
values ("Diamond Earrings", "Jewelry", 300.00, 7);

insert into products (product_name, department_name, price, stock_quantity)
values ("Bookshelf", "Furniture", 75.00, 4);


select * from products;