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
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (8, 'PLN', '2023-06-27 01:43:20', '4', null, 1, 1),
       (9, 'PLN', '2023-06-27 01:43:20', '3', null, 1, 1),
       (10, 'PLN', '2023-06-27 01:43:20', '1', null, 1, 1),
       (11, 'PLN', '2023-06-27 01:43:20', '1', null, 1, 1),
       (13, 'PLN', '2023-06-27 01:43:20', '5', null, 1, 1),
       (15, 'PLN', '2023-06-27 01:45:24', '1', null, 2, 2),
       (16, 'PLN', '2023-06-27 01:45:24', '2', null, 2, 2),
       (17, 'PLN', '2023-06-27 01:45:24', '3', null, 2, 2),
       (18, 'PLN', '2023-06-27 01:45:24', '4', null, 2, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (14, 200.00, 8, 3, 1),
       (15, 200.00, 8, 3, 2),
       (16, -400.00, 8, 3, 3),
       (18, 50.00, 9, 2, 1),
       (19, 50.00, 9, 2, 3),
       (20, -100.00, 9, 2, 2),
       (21, 50.00, 10, 1, 2),
       (22, 50.00, 10, 1, 3),
       (23, -100.00, 10, 1, 1),
       (24, 100.00, 11, 1, 2),
       (25, 100.00, 11, 1, 3),
       (26, -200.00, 11, 1, 1),
       (31, 150.00, 13, 4, 3),
       (32, 150.00, 13, 4, 2),
       (33, 150.00, 13, 4, 1),
       (34, -450.00, 13, 4, 4),
       (35, 200.00, 15, 3, 1),
       (36, 200.00, 15, 3, 2),
       (37, -400.00, 15, 3, 3),
       (38, 50.00, 16, 2, 1),
       (39, 50.00, 16, 2, 3),
       (40, -100.00, 16, 2, 2),
       (41, 50.00, 17, 1, 2),
       (42, 50.00, 17, 1, 3),
       (43, -100.00, 17, 1, 1),
       (44, 100.00, 18, 1, 2),
       (45, 100.00, 18, 1, 3),
       (46, -200.00, 18, 1, 1);
