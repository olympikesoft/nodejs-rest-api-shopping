-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 02-Jul-2017 às 22:45
-- Versão do servidor: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Consolas'),
(2, 'Playstation 3'),
(3, 'Computadores'),
(4, 'Tablets'),
(5, 'Capas Telemóveis'),
(6, 'Telemóveis'),
(7, 'Exclusive'),
(8, 'Relógios');

-- --------------------------------------------------------

--
-- Estrutura da tabela `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `color`
--

INSERT INTO `color` (`id`, `name`) VALUES
(1, 'Preto'),
(2, 'Branco');

-- --------------------------------------------------------

--
-- Estrutura da tabela `image`
--

CREATE TABLE `image` (
  `img_id` int(10) UNSIGNED NOT NULL,
  `file_name` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `image`
--

INSERT INTO `image` (`img_id`, `file_name`, `product_id`) VALUES
(1, 'imagesfile-1498410315679.jpg', 68);

-- --------------------------------------------------------

--
-- Estrutura da tabela `invoice`
--

CREATE TABLE `invoice` (
  `id` int(11) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `Payment_id` int(11) NOT NULL,
  `Shipment_id` int(11) NOT NULL,
  `Orders_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `date_time` datetime(6) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `orders`
--

INSERT INTO `orders` (`id`, `User_id`, `date_time`, `quantity`) VALUES
(1, 1, '2017-07-01 10:23:25.459000', 0),
(2, 1, '2017-07-01 10:23:25.459000', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `orders_item`
--

CREATE TABLE `orders_item` (
  `Orders_id` int(11) NOT NULL,
  `Product_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `datetime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Extraindo dados da tabela `orders_item`
--

INSERT INTO `orders_item` (`Orders_id`, `Product_id`, `id`, `quantity`, `datetime`) VALUES
(1, 5, 1, 1, '0000-00-00 00:00:00.000000'),
(1, 67, 7, 1, '2017-07-02 16:23:51.046743'),
(1, 19, 8, 1, '2017-07-02 17:00:04.170430'),
(1, 5, 9, 1, '2017-07-02 17:13:08.377808');

-- --------------------------------------------------------

--
-- Estrutura da tabela `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `amount` int(11) NOT NULL,
  `Orders_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `state` int(1) NOT NULL,
  `date_inserted` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loves` int(11) NOT NULL,
  `Category_id` int(11) NOT NULL,
  `Color_id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `quantity`, `state`, `date_inserted`, `loves`, `Category_id`, `Color_id`, `description`) VALUES
(5, 'Mac Book Air Core i5 C/ disco SSD 120 GB', 500, 1000, 0, '0000-00-00 00:00:00', 0, 3, 2, 'Vendo Mac Book Air 11 " em perfeito estado de aparência e funcionamento , com capa de protecção '),
(19, 'Portátil HP Pavilion x360 13-u104np', 850, 1000, 0, '0000-00-00 00:00:00', 0, 3, 1, 'Portátil HP Pavilion x360 13-u104np'),
(67, 'Relógio estilo TOUS em Bronze', 20, 100, 1, '2017-07-01 12:38:55', 0, 8, 1, 'Relógio para Senhora / Mulher Feminino estilo TOUS em Bronze\r\n'),
(68, 'Toshiba Qosmio F60-124 ', 600, 100, 0, '0000-00-00 00:00:00', 0, 3, 1, 'Processador:	Processador Intel Core i7-740QM (1.73GHz)\r\nCache:	6MB\r\nMemória:	8GB de memória DDR3 (4GB 4GB)\r\nDisco Rigido:	640GB\r\nPlaca Gráfica:	NVIDIA ® GeForce GT 330M\r\nMemória da Placa Gráfica:	1GB\r\nMonitor:	15,6 polegadas (1366 x 768)\r\nSistema de Áudio:	Formato de áudio suportado: Estéreo de 24 bits \r\nColunas: Estéreo Harman Kardon ® \r\nFabricante: Sistema Som Toshiba Bass Enhanced\r\nInterfaces:	1 x Entrada DC \r\n1 x monitor Externo \r\n1 x RJ-45 \r\n1 x Microfone Externo \r\n1 x auriculares (Estéreo) \r\n1 x HDMI-CEC (REGZA-Link) com Suporte 1080p Formato de Sinal \r\n1 x Câmara Web Integrada HD (1280 x 800) com Suporte Integrado AutoMacro microfone e \r\n3 (1 Lado Esquerdo, 2 Lado Direito) x USB 2.0 \r\n1 (Esquerda) x eSATA / USB Suporte com 2,0 USB Sleep-and-Charge \r\n1 x Leitor Multi-Card (suporta cartões SDT comeu 16 GB, Memory Stick ® comeu 256 MB, Memory Stick ProT comeu 2 GB, MultiMedia CardT comeu 2 GB e xD-Picture CardT comeu 2 GB)\r\nComunicações:	Compatibilidade: Wi-Fi ® \r\nSuporte de Rede: 802.11b/g/n \r\nFiOS SEM Tecnologia: Wireless LAN \r\nFiOS SEM Tecnologia: Bluetooth ®\r\nSistema Operativo:	Windows ® Home Premium Genuíno 7 de 64 bits\r\nExpansibilidade:	2 x 2 slots de Memória\r\nSoftware:	Toshiba BluetoothT Stack \r\nToshiba BluetoothT Monitor \r\nToshiba Disc Creator \r\nManual de Utilizador Toshiba \r\nToshiba Assist \r\nAssistente Câmera Chicony Software \r\nToshiba DVD Player \r\nRECONHECIMENTO facial da Toshiba \r\nControlo de Gestão HDMI \r\nMicrosoft ® Works, Microsoft ® Office Home e Student 2007 (versão Demonstração gratuita de 60 Dias) \r\nToshiba Value Added Package (Toshiba Power Saver, Toshiba Zoom Utility, ferramenta de diagnóstico do PC Toshiba, a Toshiba Flash Cards, Toshiba Driver componentes comuns Acessibilidade Toshiba, Suporte Botões Toshiba) \r\nMcAfee ® Internet Security (Incluí actualização de Internet Gratis Por 30 Dias) \r\nConsola Jogos WildTangent \r\nToshiba Serviço de Imagem \r\nRecuperação Toshiba Media Creator \r\nWinDVD ® BD parágrafo Toshiba \r\nCorel ® DVD MovieFactory ® parágrafo Toshiba \r\nConnectivity Doctor \r\nConfigFreeT \r\ne Utilitarios drivers Toshiba \r\nGoogle Toolbar\r\nDimensões:	388 x 267 x 29 mm\r\nPeso:	2,8 kg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `shipment`
--

CREATE TABLE `shipment` (
  `id` int(11) NOT NULL,
  `shipment_date` date NOT NULL,
  `Orders_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `name` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `size`
--

INSERT INTO `size` (`id`, `name`) VALUES
(1, 'S'),
(2, 'XS'),
(3, 'M'),
(4, 'L');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(90) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(90) NOT NULL,
  `telefone` int(11) NOT NULL,
  `state` int(1) DEFAULT '1',
  `morada` varchar(90) NOT NULL,
  `last_login` datetime(6) DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `telefone`, `state`, `morada`, `last_login`, `sobrename`) VALUES
(1, 'admin', 'tester@gmail.com', 'antonio10', 962796473, 1, 'Travessa dos Ferreiras n~30 Santo Antonio10', '2017-07-01 09:20:20.334334', 'Rodrigues');

-- --------------------------------------------------------

--
-- Estrutura da tabela `whislist`
--

CREATE TABLE `whislist` (
  `id` int(11) NOT NULL,
  `datetime` datetime(6) NOT NULL,
  `User_id` int(11) NOT NULL,
  `Product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`img_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Invoice_Payment1_idx` (`Payment_id`),
  ADD KEY `fk_Invoice_Shipment1_idx` (`Shipment_id`),
  ADD KEY `fk_Invoice_Orders1_idx` (`Orders_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Orders_Product_User1_idx` (`User_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Payment_Orders1_idx` (`Orders_id`),
  ADD KEY `fk_Payment_User1_idx` (`User_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Product_Category1_idx` (`Category_id`),
  ADD KEY `fk_Product_Color1_idx` (`Color_id`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Shipment_Orders1_idx` (`Orders_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whislist`
--
ALTER TABLE `whislist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Whislist_User1_idx` (`User_id`),
  ADD KEY `fk_Whislist_Product1_idx` (`Product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `img_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `orders_item`
--
ALTER TABLE `orders_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `shipment`
--
ALTER TABLE `shipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `whislist`
--
ALTER TABLE `whislist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_shop_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `fk_Invoice_Orders1` FOREIGN KEY (`Orders_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Invoice_Payment1` FOREIGN KEY (`Payment_id`) REFERENCES `payment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Invoice_Shipment1` FOREIGN KEY (`Shipment_id`) REFERENCES `shipment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_Orders_Product_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_Payment_Orders1` FOREIGN KEY (`Orders_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Payment_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_Product_Category1` FOREIGN KEY (`Category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Product_Color1` FOREIGN KEY (`Color_id`) REFERENCES `color` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `fk_Shipment_Orders1` FOREIGN KEY (`Orders_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `whislist`
--
ALTER TABLE `whislist`
  ADD CONSTRAINT `fk_Whislist_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Whislist_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
