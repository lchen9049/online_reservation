# online_reservation

To run application you need the following:
1. pgAdmin - database
2. node.js
3. vue.js - npm install -g @vue/cli
  
#Setting up the project
1. Clone the project
2. CD to /serve
3. Run npm install
4. Run npm run start
5. Open another terminal
6. CD to /client
7. Run npm install
8. Run npm run serve
9. Click and follow the link in the terminal

#Setting up database
1. Create an database name 'reservation'
2. Follow DDL.sql and create the tables - Note that varchar = varying character
3. Execute the sql commands from seed.sql to insert data
4. Create new Login/Group role.
5. Name it 'pevn_admin' and password = pevn1234
6. Give privileges to pevn_admin for first 6 box.
7. Change the owner of the reservation database to pevn_admin

#Admin info
1. username = admin
2. password = admin
3. Note to check the staff checkbox
