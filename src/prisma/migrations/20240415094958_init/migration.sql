/*
  Warnings:

  - A unique constraint covering the columns `[client_id]` on the table `Carts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `carts_products` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `clients` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `products` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Carts_client_id_key` ON `Carts`(`client_id`);
