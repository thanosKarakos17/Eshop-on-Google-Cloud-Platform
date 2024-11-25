# Eshop-on-Google-Cloud-Platform

## Mern App
- Frontend: React js ./tucshop
- Backend: Node js with Express ./tucshop-product & ./tucshop-order
- Databases: MongoDB for both product and order databases
## Execution
docker compose up --build \
*go to your browser and open localhost:3000* \
docker compose down *to stop execution*
## Explore the Eshop
When the app starts running, it shows the main page which contanins the products that are available. The user can search for a product, add it to the cart and browse through the site. 
- **Show Orders** , shows all the orders
- **Seller Tools** , it is the *my products* page the user can create a new product and update the data of an existing product
- **Cart** , the products that are added to the cart are also saved in the sessionStorage, inside this page the user can modify the amount of the cart prodcuts before purhasing. After the *Purchase* button is pressed, the order receipt is generated in a pdf file. 
