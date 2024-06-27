INSERT INTO komornik.users (id, avatar, mail, username, password, is_verified, created_date)
VALUES (1, null, 'a@a.pl', 'Janis', '$2a$10$rgTJrdROc5a0MJiTmSU8qewdi6Ro2elGZf6Rmuc5/rl6nam3P3z.S', true, now()),
       (2, null, 'aa@aa.pl', 'Misiek', '$2a$10$rgTJrdROc5a0MJiTmSU8qewdi6Ro2elGZf6Rmuc5/rl6nam3P3z.S', true, now()),
       (3, null, 'aaa@a.pl', 'Seba', '$2a$10$rgTJrdROc5a0MJiTmSU8qewdi6Ro2elGZf6Rmuc5/rl6nam3P3z.S', true, now());
INSERT INTO komornik.categories (id, category_name, created_date)
VALUES (1, 'general', now());
INSERT INTO komornik.groups (id, default_currency, description, group_name, created_date)
VALUES (1, 'PLN', 'dolomity', 'dolomity', now()),
       (2, 'PLN', null, 'testowa', now());
INSERT INTO komornik.user_x_group (group_id, user_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 3);
