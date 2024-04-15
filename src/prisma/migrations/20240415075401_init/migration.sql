-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `name` JSON NOT NULL,
    `description` JSON NOT NULL,
    `slug` JSON NOT NULL,
    `color` VARCHAR(191) NULL,
    `order` INTEGER NULL,
    `active` BOOLEAN NOT NULL,
    `is_deleted` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `guest` BOOLEAN NOT NULL DEFAULT true,
    `birth_date` DATETIME(3) NULL,
    `gender` VARCHAR(191) NULL,
    `referral` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `verified_date` DATETIME(3) NULL,
    `remember_token` VARCHAR(191) NULL,
    `last_login` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Clients_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `processed` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `product_pricings` INTEGER NOT NULL,
    `product_price_uni` DOUBLE NOT NULL,
    `product_price_total` DOUBLE NOT NULL,
    `discount_exist` BOOLEAN NOT NULL DEFAULT false,
    `promotion_exist` BOOLEAN NOT NULL DEFAULT false,
    `promotion_id` INTEGER NULL,
    `discount_value` DOUBLE NULL,
    `discount_price_uni` DOUBLE NULL,
    `discount_price_total` DOUBLE NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` JSON NOT NULL,
    `ref` VARCHAR(191) NOT NULL,
    `description` JSON NOT NULL,
    `specs` JSON NOT NULL,
    `details` JSON NOT NULL,
    `slug` JSON NOT NULL,
    `seo` JSON NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `draft` BOOLEAN NOT NULL DEFAULT false,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_variable` BOOLEAN NOT NULL DEFAULT false,
    `is_colored` BOOLEAN NOT NULL DEFAULT false,
    `is_collection` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts_products` ADD CONSTRAINT `carts_products_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts_products` ADD CONSTRAINT `carts_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
