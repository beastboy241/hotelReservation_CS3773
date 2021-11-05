drop table if exists users;
create table `users` (
    `id` int not null auto_increment,
    `firstName` varchar(100),
    `lastName` varchar(100),
    `email` varchar(100),
    `type` char not null,
    primary key (`id`)
);