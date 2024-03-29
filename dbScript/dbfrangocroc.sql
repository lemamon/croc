-- MySQL Script generated by MySQL Workbench
-- 12/13/15 23:07:53
-- Model: New Model    Version: 1.0
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dbfrangocroc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbfrangocroc` DEFAULT CHARACTER SET utf8 ;
USE `dbfrangocroc` ;

-- -----------------------------------------------------
-- Table `dbfrangocroc`.`tb_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbfrangocroc`.`tb_user` ;

CREATE TABLE IF NOT EXISTS `dbfrangocroc`.`tb_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `cpf` VARCHAR(15) NULL DEFAULT NULL,
  `address` VARCHAR(200) NULL DEFAULT NULL,
  `phone` VARCHAR(25) NULL DEFAULT NULL,
  `mail` VARCHAR(100) NULL DEFAULT NULL,
  `senha` VARCHAR(255) NULL DEFAULT NULL,
  `admin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dbfrangocroc`.`tb_order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbfrangocroc`.`tb_order` ;

CREATE TABLE IF NOT EXISTS `dbfrangocroc`.`tb_order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` FLOAT NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC),
  CONSTRAINT `tb_order_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `dbfrangocroc`.`tb_user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dbfrangocroc`.`tb_menu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbfrangocroc`.`tb_menu` ;

CREATE TABLE IF NOT EXISTS `dbfrangocroc`.`tb_menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(80) NOT NULL,
  `price` FLOAT NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `photo_address` VARCHAR(100) NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dbfrangocroc`.`tb_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbfrangocroc`.`tb_items` ;

CREATE TABLE IF NOT EXISTS `dbfrangocroc`.`tb_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity` INT(11) NOT NULL DEFAULT '1',
  `order_id` INT(11) NOT NULL,
  `menu_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_items_tb_order1_idx` (`order_id` ASC),
  INDEX `fk_tb_items_menu1_idx` (`menu_id` ASC),
  CONSTRAINT `tb_items_ibfk_1`
    FOREIGN KEY (`order_id`)
    REFERENCES `dbfrangocroc`.`tb_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tb_items_ibfk_2`
    FOREIGN KEY (`menu_id`)
    REFERENCES `dbfrangocroc`.`tb_menu` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
