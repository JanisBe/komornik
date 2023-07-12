INSERT INTO komornik.users (id, avatar, mail, name, password)
VALUES (1, null, 'a@a.pl', 'a', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW');
INSERT INTO komornik.users (id, avatar, mail, name, password)
VALUES (2, null, 'aa@aa.pl', 'aa', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW');
INSERT INTO komornik.users (id, avatar, mail, name, password)
VALUES (3, null, 'aaa@a.pl', 'aaa', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW');
INSERT INTO komornik.users (id, avatar, mail, name, password)
VALUES (4, null, 'aaaa@a.pl', 'aaaa', '$2a$10$l5bC8ZnoYyRK3Cgp9wdMLu3amHTLvaTlBYeHbB8ID.OtBMEAuvkAW');
INSERT INTO komornik.categories (id, name)
VALUES (1, 'kategoria');
INSERT INTO komornik.categories (id, name)
VALUES (2, 'drugaKategoriaaa');
INSERT INTO komornik.groups (id, default_currency, description, name)
VALUES (1, 'PLN', 'komornik grupa', 'grupa');
INSERT INTO komornik.groups (id, default_currency, description, name)
VALUES (2, 'PLN', null, 'drugaKategoriaaa');
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (1, 1);
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (1, 2);
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (1, 3);
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (1, 4);
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (2, 1);
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (2, 2);
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (2, 3);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (8, 'PLN', '2023-06-27 01:43:20', '4', null, 1, 1);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (9, 'PLN', '2023-06-27 01:43:20', '3', null, 1, 1);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (10, 'PLN', '2023-06-27 01:43:20', '1', null, 1, 1);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (11, 'PLN', '2023-06-27 01:43:20', '1', null, 1, 1);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (13, 'PLN', '2023-06-27 01:43:20', '5', null, 1, 1);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (15, 'PLN', '2023-06-27 01:45:24', '1', null, 2, 2);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (16, 'PLN', '2023-06-27 01:45:24', '2', null, 2, 2);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (17, 'PLN', '2023-06-27 01:45:24', '3', null, 2, 2);
INSERT INTO komornik.expenses (id, currency, date, description, note, category_id, group_id)
VALUES (18, 'PLN', '2023-06-27 01:45:24', '4', null, 2, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (14, 200.00, 8, 3, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (15, 200.00, 8, 3, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (16, -400.00, 8, 3, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (18, 50.00, 9, 2, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (19, 50.00, 9, 2, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (20, -100.00, 9, 2, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (21, 50.00, 10, 1, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (22, 50.00, 10, 1, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (23, -100.00, 10, 1, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (24, 100.00, 11, 1, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (25, 100.00, 11, 1, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (26, -200.00, 11, 1, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (31, 150.00, 13, 4, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (32, 150.00, 13, 4, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (33, 150.00, 13, 4, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (34, -450.00, 13, 4, 4);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (35, 200.00, 15, 3, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (36, 200.00, 15, 3, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (37, -400.00, 15, 3, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (38, 50.00, 16, 2, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (39, 50.00, 16, 2, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (40, -100.00, 16, 2, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (41, 50.00, 17, 1, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (42, 50.00, 17, 1, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (43, -100.00, 17, 1, 1);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (44, 100.00, 18, 1, 2);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (45, 100.00, 18, 1, 3);
INSERT INTO komornik.debts (id, amount, expense_id, from_user_id, to_user_id)
VALUES (46, -200.00, 18, 1, 1);
