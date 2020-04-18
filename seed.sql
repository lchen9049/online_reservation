--Insert spot info to db
insert into spots (spot_id, price) values ('A1', 10);
insert into spots (spot_id, price) values ('A2', 12);
insert into spots (spot_id, price) values ('A3', 10);
insert into spots (spot_id, price) values ('A4', 12);
insert into spots (spot_id, price) values ('B1', 14);
insert into spots (spot_id, price) values ('B2', 16);
insert into spots (spot_id, price) values ('B3', 21);
insert into spots (spot_id, price) values ('B4', 18);
insert into spots (spot_id, price) values ('C1', 8);
insert into spots (spot_id, price) values ('C2', 9);
insert into spots (spot_id, price) values ('C3', 8);
insert into spots (spot_id, price) values ('C4', 7);
insert into spots (spot_id, price) values ('D1', 10);
insert into spots (spot_id, price) values ('D2', 10);
insert into spots (spot_id, price) values ('D3', 10);
insert into spots (spot_id, price) values ('D4', 10);
insert into spots (spot_id, price) values ('Z1', 80);
insert into spots (spot_id, price) values ('Z2', 60);

--Insert an admin info
insert into users (username, password, isadmin) values ('admin', 'admin', true);
insert into staff (username, firstname, lastname) values ('admin', 'firstname', 'lastname');

--Insert sample member
insert into users (username, password, isadmin) values ('member1', '1', false);
insert into customers (username, first_name, last_name, phone_number, member, car_plate, start_time, end_time, spot_id, monthly_fee)
    values ('member1', 'Richard', 'Salgado', '3122502333', true, 'A12345678', -8, 3, 'B4', 2520);
insert into credit_card (username, billing_address, card_number, card_pin, city, state, zip_code)
	values ('member1', '111 w 41st', '123321321', '123', 'Chicago', 'IL', '60608');

--Insert sample nonmember
insert into users (username, password, isadmin) values ('nonmember1', '1', false);
insert into customers (username, first_name, last_name, phone_number, member, car_plate, start_time, end_time, spot_id, monthly_fee)
    values ('nonmember1', 'Henry', 'Cheng', '9178861314', false, 'J66666666', null, null, null, null);	
insert into credit_card (username, billing_address, card_number, card_pin, city, state, zip_code)
	values ('nonmember1', '2055 Beaver Ruin Rd #F3', '123321321', '123', 'Chicago', 'IL', '60608');

--Insert some sample reservation
insert into reservations (username, spot_id, reserve_date, time_start, time_end, total, member, car_plate, firstname, lastname, phone)
    values ('nonmember1', 'A1', '2020-04-17', -8, 2, 60, 'nonmember', 'J66666666', null, null, null);
insert into reservations (username, spot_id, reserve_date, time_start, time_end, total, member, car_plate, firstname, lastname, phone)
    values ('admin', 'A2', '2020-04-17', -10, 3, 60, 'walkin', 'Q88888888', 'walkin', 'customer', '7732501314');

