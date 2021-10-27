--create hotel table
drop table if exists hotel;
create table `hotel` (
    `id` int not null auto_increment,
    `name` varchar(200) not null,
    `rooms` int not null,
    `amenities` int unsigned,
    `standard_price` float,
    `queen_price` float,
    `king_price` float,
    `weekend_differential` float,
    primary key (`id`)
);