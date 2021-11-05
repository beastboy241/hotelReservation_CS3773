drop table if exists passwords;
create table `passwords` (
    `usr_id` int not null,
    `password` varchar(200) not null,
    primary key (`usr_id`)
);