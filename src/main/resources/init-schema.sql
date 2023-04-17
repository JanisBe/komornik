create table categories
(
    id   int auto_increment
        primary key,
    name text not null,
    constraint categories_pk
        unique (id)
);

create table `groups`
(
    id         int auto_increment
        primary key,
    group_name text not null,
    group_desc text null,
    constraint groups_pk
        unique (id)
);

create table users
(
    id       int auto_increment
        primary key,
    name     text null,
    mail     text null,
    password text not null,
    avatar   text null,
    constraint id
        unique (id)
);

create table expenses
(
    id          int auto_increment
        primary key,
    user_id     int            not null,
    category_id int            not null,
    group_id    int            not null,
    currency    text           not null,
    note        text           null,
    amount      decimal(15, 2) not null,
    description text           not null,
    date        datetime       not null,
    constraint expenses_pk
        unique (id),
    constraint category_fk
        foreign key (category_id) references categories (id),
    constraint group_fk
        foreign key (group_id) references `groups` (id),
    constraint users_fk
        foreign key (user_id) references users (id)
);

