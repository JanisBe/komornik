CREATE TABLE test.categories
(
    id   INT AUTO_INCREMENT NOT NULL,
    name LONGTEXT           NOT NULL,
    CONSTRAINT pk_categories PRIMARY KEY (id)
);

CREATE TABLE test.expenses
(
    id            INT AUTO_INCREMENT NOT NULL,
    category_id   INT                NULL,
    currency      LONGTEXT           NOT NULL,
    amount        DECIMAL            NOT NULL,
    `description` LONGTEXT           NOT NULL,
    user_id       INT                NULL,
    group_id      INT                NULL,
    date          datetime           NOT NULL,
    CONSTRAINT pk_expenses PRIMARY KEY (id)
);

CREATE TABLE test.`groups`
(
    id         INT AUTO_INCREMENT NOT NULL,
    group_name LONGTEXT           NOT NULL,
    group_desc LONGTEXT           NULL,
    CONSTRAINT pk_groups PRIMARY KEY (id)
);

CREATE TABLE test.users
(
    id   INT AUTO_INCREMENT NOT NULL,
    name LONGTEXT           NULL,
    mail LONGTEXT           NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE test.expenses
    ADD CONSTRAINT FK_EXPENSES_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES test.categories (id);

ALTER TABLE test.expenses
    ADD CONSTRAINT FK_EXPENSES_ON_GROUP FOREIGN KEY (group_id) REFERENCES test.`groups` (id);

ALTER TABLE test.expenses
    ADD CONSTRAINT FK_EXPENSES_ON_USER FOREIGN KEY (user_id) REFERENCES test.users (id);