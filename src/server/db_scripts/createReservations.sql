--create reservations table
drop table if exists reservations;
create table `reservations` (
    `id` int not null auto_increment,
    `hotelid` int not null,
    `usrid` int not null,
    `room` int not null,
    `startdt` date not null,
    `enddt` date not null,
    primary key (`id`)
);