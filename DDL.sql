create table users
	(
		username		varchar(20),
		pword			varchar(20),
		isAdmin			boolean,
		primary key (username)
	);


create table staff
	(
		username		varchar(50), 
	 	firstname		varchar(50),
        lastname        varchar(50), 
		primary key (username),
		foreign key (username) references users (username)
	);

create table customers
	(
        username            varchar(50), 
        first_name          varchar(50),
        last_name           varchar(50), 
        member              boolean, 
        car_plate           varchar(20),
        phone_number        varchar(20),
        start_time          numeric(2),
        end_time            numeric(2),
        spot_id             varchar(3),
        monthly_fee         numeric(5),
        primary key (username)
	);

create table credit_cards
    (
        username            varchar(50),
        billing_address	    varchar(100),
        card_number         varchar(20),
        card_pin            varchar(3),
        city                varchar(10),
        state               varchar(10),
        zip_code            varchar(10),
        primary key (username, card_number),
        foreign key (username) references users (username)
    );

create table spots
    (
        spot_id              varchar(3),
        price                numeric(5),
        primary key (spot_id),
    );

create table reservations
    (
        username            varchar(50),
        spot_id             varchar(3),
        reserve_date        varchar(10),
        time_start          varchar(10),
        time_end            varchar(10),
        total               numeric(5),
        member              varchar(20), 
        car_plate           varchar(20),
        firstname           varchar(20),
        lastname            varchar(20),  
        phone               varchar(20), 
        primary key (username, spot_id),
		foreign key (username) references users (username),
        foreign key (spot_id) references spots (spot_id) 

    );

create table temp_plate
    (
        username            varchar(50),
        plate_number        varchar(20),
        primary key (username),
		foreign key (username) references users (username)
    );

