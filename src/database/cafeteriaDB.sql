/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.32-MariaDB : Database - cafeteriadb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cafeteriadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `cafeteriadb`;

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `Id_Cat` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Cat` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Cat`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categorias` */

insert  into `categorias`(`Id_Cat`,`Nom_Cat`,`createdAt`,`updatedAt`) values (1,'Circuitos',NULL,'2024-03-21 01:50:02'),(2,'programacion','2024-03-21 01:48:47','2024-03-21 01:48:47');

/*Table structure for table `compras` */

DROP TABLE IF EXISTS `compras`;

CREATE TABLE `compras` (
  `COM_ID` varchar(100) NOT NULL,
  `ID_PROD_COM_FK` varchar(100) NOT NULL,
  `COM_CANT` int(11) NOT NULL,
  `PROV_ID_FK` varchar(100) NOT NULL,
  `USU_ID_COM_FK` varchar(100) NOT NULL,
  `COM_PREC_COST` int(11) NOT NULL,
  `COMP_FECH` date NOT NULL,
  PRIMARY KEY (`COM_ID`),
  KEY `id_Prod_CompFK` (`ID_PROD_COM_FK`),
  KEY `proveedorFK` (`PROV_ID_FK`),
  KEY `id_Usu_EmpFK` (`USU_ID_COM_FK`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`ID_PROD_COM_FK`) REFERENCES `productos` (`PROD_ID`),
  CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`USU_ID_COM_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `compras` */

/*Table structure for table `factura` */

DROP TABLE IF EXISTS `factura`;

CREATE TABLE `factura` (
  `FACT_ID` varchar(100) NOT NULL,
  `VEN_ID_FK` varchar(100) NOT NULL,
  `USU_ID_VENT_FK` varchar(100) NOT NULL,
  `VENT_TOT` int(11) NOT NULL,
  `VEN_FECH` date NOT NULL,
  PRIMARY KEY (`FACT_ID`),
  KEY `id_VentaFK` (`VEN_ID_FK`),
  KEY `id_Usu_VenFK` (`USU_ID_VENT_FK`),
  CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`VEN_ID_FK`) REFERENCES `ventas` (`VENT_ID`),
  CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`USU_ID_VENT_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `factura` */

/*Table structure for table `inventario` */

DROP TABLE IF EXISTS `inventario`;

CREATE TABLE `inventario` (
  `INV_ID` varchar(100) NOT NULL,
  `PROD_ID_FK` varchar(100) DEFAULT NULL,
  `PROD_CANT` int(11) DEFAULT NULL,
  `INV_EST` char(1) DEFAULT NULL COMMENT '1:STOK, 2:AGOTADO, 3:RESERVADO',
  PRIMARY KEY (`INV_ID`),
  KEY `producto_idFK` (`PROD_ID_FK`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`PROD_ID_FK`) REFERENCES `productos` (`PROD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `inventario` */

/*Table structure for table `localizacions` */

DROP TABLE IF EXISTS `localizacions`;

CREATE TABLE `localizacions` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizacions_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizacions` */

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `PROD_ID` varchar(100) NOT NULL,
  `PROD_COD` varchar(100) DEFAULT NULL,
  `PROD_NOM` varchar(100) DEFAULT NULL,
  `PROD_DESC` text DEFAULT NULL,
  `PROD_PREC` decimal(10,2) DEFAULT NULL,
  `CAT_ID_FK` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`PROD_ID`),
  KEY `categoria_idFK` (`CAT_ID_FK`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`CAT_ID_FK`) REFERENCES `categorias` (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `productos` */

insert  into `productos`(`PROD_ID`,`PROD_COD`,`PROD_NOM`,`PROD_DESC`,`PROD_PREC`,`CAT_ID_FK`,`createdAt`,`updatedAt`) values ('4343','4324','NEVERA','1134380338',12322222.00,1,'2024-03-20 22:01:13','2024-03-21 03:23:35'),('ahyvadclu0nwpaz','0022','tv','full hd 4k',1502300.00,1,'2024-03-21 03:17:53','2024-03-21 03:17:53');

/*Table structure for table `proveedor` */

DROP TABLE IF EXISTS `proveedor`;

CREATE TABLE `proveedor` (
  `PROV_ID` varchar(100) NOT NULL,
  `PROV_NOM` varchar(30) DEFAULT NULL,
  `PROV_CONTACTO` date DEFAULT NULL,
  `PROV_EST` char(1) DEFAULT NULL COMMENT '1:ACTIVO, 2 INACTIVO, 3:SUSPENDIDO',
  PRIMARY KEY (`PROV_ID`),
  CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`PROV_ID`) REFERENCES `compras` (`PROV_ID_FK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `proveedor` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`,`createdAt`,`updatedAt`) values (1,'Admin',NULL,NULL),(2,'Empleado',NULL,NULL),(3,'Cliente',NULL,'2024-03-21 00:34:44');

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `Id_Token` int(255) NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) DEFAULT NULL,
  `Fec_Caducidad` varchar(100) DEFAULT NULL,
  `User_Id_FK` varchar(100) DEFAULT NULL,
  `Tipo_token` char(1) DEFAULT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `Id_User` varchar(100) NOT NULL,
  `Nom_User` varchar(255) DEFAULT NULL,
  `Ape_User` varchar(255) DEFAULT NULL,
  `Tel_User` varchar(20) DEFAULT NULL,
  `Ema_User` varchar(255) DEFAULT NULL,
  `Pass_User` varchar(255) DEFAULT NULL,
  `Id_Rol_FK` int(11) DEFAULT NULL,
  `Fot_User` varchar(255) DEFAULT NULL,
  `Est_Email_User` int(1) DEFAULT 0 COMMENT '0: No verificado, 1: verificado',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User`),
  KEY `Id_Rol_FK` (`Id_Rol_FK`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_Rol_FK`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuarios` */

/*Table structure for table `ventas` */

DROP TABLE IF EXISTS `ventas`;

CREATE TABLE `ventas` (
  `VENT_ID` varchar(100) NOT NULL,
  `USU_ID_FK` varchar(100) DEFAULT NULL,
  `PROD_ID_FK` varchar(100) DEFAULT NULL,
  `VENT_CANT` int(11) DEFAULT NULL,
  `VENT_FECH` date DEFAULT NULL,
  `VENT_PREC` int(11) DEFAULT NULL,
  PRIMARY KEY (`VENT_ID`),
  KEY `usuario_idFK` (`USU_ID_FK`),
  KEY `producto_idFK` (`PROD_ID_FK`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`USU_ID_FK`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`PROD_ID_FK`) REFERENCES `productos` (`PROD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `ventas` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
