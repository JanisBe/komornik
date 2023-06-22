INSERT IGNORE INTO test.users (id, avatar, mail, name, password)
VALUES (1, null, 'a@a.pl', 'a', '$2a$10$I2w7tVDntXFd0cs78mjiHeod/ZP/37wh7WottubB3xiRYlLFDsLjC');
INSERT IGNORE INTO test.users (id, avatar, mail, name, password)
VALUES (2, null, 'aa@aa.pl', 'aa', '$2a$10$8KFTiKOqmC8BSlJ9WmQ.MuYQTa4baYoUzh3sZfDgclOSdsIWLepqO');
INSERT IGNORE INTO test.users (id, avatar, mail, name, password)
VALUES (3, null, 'aaa@a.pl', 'aaa', '$2a$10$a0NuShjEUALnKcKMOsGTR.hSCDgWo7waN0wLpzENhZjl/GjR/LOry');
INSERT IGNORE INTO test.groups (id, default_currency, description, name)
VALUES (1, 'PLN', 'test grupa', 'grupa');
INSERT IGNORE INTO test.user_x_group (group_id, user_id)
VALUES (1, 1),
       (1, 2),
       (1, 3);