INSERT INTO komornik.users (id, avatar, mail, name, password)
VALUES (1, null, 'a@a.pl', 'a', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW'),
       (2, null, 'aa@aa.pl', 'aa', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW'),
       (3, null, 'aaa@a.pl', 'aaa', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW'),
       (4, null, 'aaaa@a.pl', 'aaaa', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW');
INSERT INTO komornik.categories (id, name)
VALUES (1, 'kategoria'),
       (2, 'drugaKategoriaaa');
INSERT INTO komornik.groups (id, default_currency, description, name)
VALUES (1, 'PLN', 'komornik grupa', 'grupa'),
       (2, 'PLN', null, 'drugaKategoriaaa');
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (2, 1),
       (2, 2),
       (2, 3);
