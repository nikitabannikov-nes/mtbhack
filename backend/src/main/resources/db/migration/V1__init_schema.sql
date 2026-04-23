CREATE TABLE users (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE TABLE user_profiles (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id        BIGINT NOT NULL UNIQUE,
    username       VARCHAR(50) NOT NULL,
    energy         DECIMAL(5,1) NOT NULL DEFAULT 0.0,
    max_energy     INT NOT NULL DEFAULT 7,
    mt_balls       DECIMAL(10,1) NOT NULL DEFAULT 0.0,
    player_level   INT NOT NULL DEFAULT 1,
    monthly_spend  DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    referral_code           VARCHAR(20)  NOT NULL UNIQUE,
    updated_at              DATETIME(6) NULL,
    categories_changed_at   DATETIME(6)  NULL,
    category_pool_month     VARCHAR(7)   NULL,
    category_pool           VARCHAR(300) NULL,
    CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug        VARCHAR(50) NOT NULL UNIQUE,
    name        VARCHAR(100) NOT NULL,
    icon        VARCHAR(10),
    color       VARCHAR(30),
    description VARCHAR(255)
);

CREATE TABLE user_categories (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    selected_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    UNIQUE KEY uq_user_category (user_id, category_id),
    CONSTRAINT fk_uc_user     FOREIGN KEY (user_id)     REFERENCES users(id),
    CONSTRAINT fk_uc_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE bonus_templates (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id  BIGINT NOT NULL,
    rarity       VARCHAR(20) NOT NULL,
    bonus_type   VARCHAR(30) NOT NULL,
    value        DECIMAL(8,2) NOT NULL DEFAULT 0.00,
    unit         VARCHAR(20) NOT NULL DEFAULT 'NONE',
    timer_days   INT NOT NULL DEFAULT 7,
    description  VARCHAR(500),
    partner_name VARCHAR(100),
    icon_path    VARCHAR(200),
    item_name    VARCHAR(100),
    CONSTRAINT fk_bt_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE game_items (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id        BIGINT NOT NULL,
    category_id    BIGINT NOT NULL,
    rarity         VARCHAR(20) NOT NULL,
    name           VARCHAR(100),
    icon_path      VARCHAR(200),
    board_position INT NOT NULL,
    status         VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    bonus_type     VARCHAR(30) NOT NULL DEFAULT 'NONE',
    description    VARCHAR(500),
    bonus_value    DECIMAL(8,2),
    bonus_unit     VARCHAR(20) DEFAULT 'NONE',
    partner_name   VARCHAR(100),
    timer_days     INT,
    expires_at     DATETIME(6),
    created_at     DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    CONSTRAINT fk_gi_user     FOREIGN KEY (user_id)     REFERENCES users(id),
    CONSTRAINT fk_gi_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE tasks (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    type           VARCHAR(20) NOT NULL,
    event_type     VARCHAR(30) NOT NULL,
    title          VARCHAR(200) NOT NULL,
    icon           VARCHAR(50),
    energy_reward  DECIMAL(5,1) NOT NULL DEFAULT 1.0,
    target_count   INT NOT NULL DEFAULT 1,
    is_active      BOOLEAN NOT NULL DEFAULT TRUE,
    mandatory      BOOLEAN NOT NULL DEFAULT FALSE,
    next_task_id   BIGINT NULL,
    CONSTRAINT fk_task_next FOREIGN KEY (next_task_id) REFERENCES tasks(id)
);

CREATE TABLE user_task_progress (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL,
    task_id       BIGINT NOT NULL,
    period_key    VARCHAR(20) NOT NULL,
    current_count INT NOT NULL DEFAULT 0,
    completed     BOOLEAN NOT NULL DEFAULT FALSE,
    claimed       BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE KEY uq_progress (user_id, task_id, period_key),
    CONSTRAINT fk_utp_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_utp_task FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE TABLE user_daily_tasks (
    id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    task_id BIGINT NOT NULL,
    date    DATE NOT NULL,
    UNIQUE KEY uq_daily (user_id, task_id, date),
    CONSTRAINT fk_udt_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_udt_task FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE TABLE energy_transactions (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    delta      DECIMAL(5,1) NOT NULL,
    reason     VARCHAR(30) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    CONSTRAINT fk_et_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE mt_ball_transactions (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    delta      DECIMAL(10,1) NOT NULL,
    reason     VARCHAR(200),
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    CONSTRAINT fk_mbt_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE game_config (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    config_key   VARCHAR(100) NOT NULL UNIQUE,
    config_value VARCHAR(255) NOT NULL,
    description  VARCHAR(500)
);

CREATE TABLE mock_event_logs (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_date DATE NOT NULL,
    count      INT NOT NULL DEFAULT 0,
    UNIQUE KEY uq_mock_log (user_id, event_type, event_date),
    CONSTRAINT fk_mel_user FOREIGN KEY (user_id) REFERENCES users(id)
);
