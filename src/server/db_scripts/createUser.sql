drop table if exists user;
create table `user` (
    `id` int not null auto_increment,
    `firstName` varchar(100),
    `lastName` varchar(100),
    `email` varchar(100) not null,
    `type` char default 'u',
    `password` varbinary(200) not null,
    primary key (`id`)
);