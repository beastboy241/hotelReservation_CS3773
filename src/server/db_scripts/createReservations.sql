--create reservations table
drop table if exists reservations;
create table `reservations` (
    `id` int not null auto_increment,
    `hotel_id` int not null,
    `usr_id` int not null,
    `room` int not null,
    `type` char not null,
    `start_dt` date not null,
    `end_dt` date not null,
    primary key (`id`)
);