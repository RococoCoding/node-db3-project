-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT Category.CategoryName, Product.ProductName
FROM Product AS Product
JOIN Category AS Category
  ON Product.CategoryId = Category.Id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT o.Id, s.CompanyName
FROM 'Order' AS o
JOIN 'Shipper' AS s
  ON o.ShipVia = s.Id
WHERE o.OrderDate < '2012-08-09' 

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT o.Quantity, p.ProductName
FROM 'OrderDetail' as o
JOIN 'Product' as p
  ON o.ProductId = p.Id
WHERE o.OrderId = 10251
ORDER BY p.ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT o.Id as "Order Id", c.CompanyName as "Company Name", e.LastName as "Employee Last Name"
FROM `Order` as o
JOIN Employee as e
  on o.EmployeeId = e.Id
JOIN Customer as c
  on o.CustomerId = c.Id