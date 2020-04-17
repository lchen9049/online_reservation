create table users
	(
		username		varchar(20),
		pword			varchar(20),
		isAdmin			boolean,
		primary key (username)
	);


create table staff
	(
		username		varchar(20), 
	 	firstname		varchar(50),
        lastname        varchar(50), 
		primary key (username),
		foreign key (username) references Users (username)
	);

create table customers
	(
		username			varchar(20), 
		firstname		    varchar(50),
        lastname		    varchar(50), 
        member              boolean, 
        carPlate            varchar(20),
		phone_number		varchar(20),
		primary key (username)
	);

create table credit_cards
    (
        username			varchar(20),
        billing_address		varchar(100),
 		card_number			varchar(20),
 		card_pin			varchar(3),
        primary key (username, card_number),
		foreign key (username) references Users (username)
    );

create table spots
    (
        spotID              varchar(3);
        price               numeric(5);
        spot_address        varchar(50);
    );

create table reservations
    (
        username            varchar(20);
        spotID              varchar(3);
        reserve_date        varchar(10);
        time_start          varchar(10);
        time_end            varchar(10);
        total               numeric(5);
        rev_type            varchar(20);        
    )

create table temp_car_plate
    (
        userName            varchar(20),
        plateNumber         varchar(20),
        primary key (username, plateNumber),
		foreign key (username) references Users (username)
    );

