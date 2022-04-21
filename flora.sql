-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 13 2022 г., 12:17
-- Версия сервера: 8.0.19
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `flora`
--

-- --------------------------------------------------------

--
-- Структура таблицы `adfoxes`
--

CREATE TABLE `adfoxes` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `creative` varchar(8000) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `targeting_profile_id` int DEFAULT NULL,
  `bundle_id` int DEFAULT NULL,
  `cpm` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `ads`
--

CREATE TABLE `ads` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `campaign_id` bigint DEFAULT NULL,
  `teaser_id` int DEFAULT NULL,
  `template_id` int DEFAULT NULL,
  `site_id` int DEFAULT NULL,
  `place_id` int DEFAULT NULL,
  `target_id` int DEFAULT NULL,
  `cpm` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `adverts`
--

CREATE TABLE `adverts` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `adverts`
--

INSERT INTO `adverts` (`id`, `name`, `email`, `pass`, `token`, `created_at`) VALUES
(2, '123', 'emailvcxd@mail.ru', '123', 'aaaaa', '2022-04-11 04:28:01');

-- --------------------------------------------------------

--
-- Структура таблицы `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `src_webp` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `images`
--

INSERT INTO `images` (`id`, `name`, `image`, `src_webp`, `created_at`) VALUES
(2, 'galaxy-space-kosmos-zvezdy-6663.jpg', '/storage/files/library/galaxy-space-kosmos-zvezdy-6663.jpg', NULL, '2022-04-09 07:46:57'),
(3, 'eye.jpg', '/storage/files/library/eye.jpg', 'test/testtt', '2022-04-09 08:50:43'),
(4, 'getwall_ru_.jpg', '/storage/files/library/getwall_ru_.jpg', NULL, '2022-04-11 06:55:57'),
(5, 'devushka.jpg', '/storage/files/library/devushka.jpg', NULL, '2022-04-11 06:56:50'),
(8, 'fog_forest.jpg', '/storage/files/library/fog_forest.jpg', NULL, '2022-04-11 07:47:43'),
(10, 'clock.jpg', '/storage/files/library/clock.jpg', NULL, '2022-04-12 06:02:13'),
(12, 'list_rastenie_reznoj.jpg', '/storage/files/library/list_rastenie_reznoj.jpg', NULL, '2022-04-12 06:54:53'),
(25, 'getwall.jpg', '/storage/files/library/getwall.jpg', NULL, '2022-04-12 13:35:31'),
(26, 'photo_2019-10-21_21-56-22.jpg', '/storage/files/library/photo_2019-10-21_21-56-22.jpg', NULL, '2022-04-12 14:09:05'),
(27, 'synthpop.jpg', '/storage/files/library/synthpop.jpg', NULL, '2022-04-13 04:01:00');

-- --------------------------------------------------------

--
-- Структура таблицы `places`
--

CREATE TABLE `places` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `site_id` int DEFAULT NULL,
  `bundle_id` int DEFAULT NULL,
  `ctr_d` decimal(18,2) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `places`
--

INSERT INTO `places` (`id`, `name`, `site_id`, `bundle_id`, `ctr_d`, `created_at`) VALUES
(5, 'Глас', NULL, NULL, NULL, '2022-04-11 09:17:43'),
(6, 'NVL', NULL, NULL, NULL, '2022-04-11 09:18:13'),
(7, 'Yakutsk', NULL, NULL, NULL, '2022-04-11 09:18:36');

-- --------------------------------------------------------

--
-- Структура таблицы `sites`
--

CREATE TABLE `sites` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `sites`
--

INSERT INTO `sites` (`id`, `name`, `description`, `created_at`) VALUES
(12, 'test', NULL, '2022-04-11 09:26:46'),
(13, 'test1', NULL, '2022-04-11 09:26:52'),
(14, 'test11', NULL, '2022-04-11 09:26:58');

-- --------------------------------------------------------

--
-- Структура таблицы `targets`
--

CREATE TABLE `targets` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `targeting_profile_id` bigint DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `targets`
--

INSERT INTO `targets` (`id`, `name`, `targeting_profile_id`, `created_at`) VALUES
(2, 'Все', NULL, '2022-04-11 07:53:42'),
(3, 'Старше 45', NULL, '2022-04-11 07:53:55'),
(4, 'Женщины', NULL, '2022-04-11 07:54:34'),
(5, 'Мужчины', NULL, '2022-04-11 07:55:30');

-- --------------------------------------------------------

--
-- Структура таблицы `teasers`
--

CREATE TABLE `teasers` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `preview` varchar(255) DEFAULT NULL,
  `advert_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `api_id` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `cost_d` decimal(18,2) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `teasers`
--

INSERT INTO `teasers` (`id`, `name`, `preview`, `advert_id`, `image_id`, `api_id`, `url`, `cost_d`, `created_at`) VALUES
(6, 'Заголовок заголовок: заголовок', NULL, 0, 26, NULL, 'asdf/aaaaa', '10.00', '2022-04-12 07:57:30'),
(7, 'Тест тест', NULL, 0, 8, NULL, 'asdf/aaaaa123', '10.00', '2022-04-12 07:57:53'),
(8, 'Кто убил Михаила Евдокимова: страшная правда', NULL, 0, 2, NULL, 'asdf/aaaaa77777777777', '10.00', '2022-04-12 08:33:40');

-- --------------------------------------------------------

--
-- Структура таблицы `templates`
--

CREATE TABLE `templates` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `template` varchar(8000) DEFAULT NULL,
  `style` varchar(8000) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `templates`
--

INSERT INTO `templates` (`id`, `name`, `template`, `style`, `created_at`) VALUES
(2, 'template2', '<div class=\"up1_style\">\n                                            <a href=\"%request.reference_mrc%@%banner.event3%\" target=\"%banner.target%\" href=\"<?php echo $url;?>\" class=\"item-news targ-p-d small-news style1\" data-content=\"recom_views\">\n                                                <div class=\"img-box\">\n                                                    <picture>\n                                                        <source srcset=\"<?php echo $img;?>\" type=\"image/webp\">\n                                                        <img class=\"ad_template_image\" src=\"<?php echo $img;?>\" alt=\"<?php echo $h1;?>\" title=\"<?php echo $h1;?>\">\n                                                    </picture>\n                                                </div>\n                                                <div class=\"ad_template_background\"></div>\n                                                <div class=\"ad_template_title_wrapper\">\n                                                    <div class=\"ad_template_title\"><?php echo $h1;?></div>\n                                                </div>\n                                            </a>\n                                        </div>', '.up1_style {\n                                                width: 300px;\n                                                margin: 0 auto;\n                                            }\n                                            .ad_template_image {\n                                                width: 300px;\n                                            }\n                                            .ad_template_background {\n                                                width: 100%;\n                                                height: 80px;\n                                                background-color: #0a0a0a;\n                                                opacity: 0.3;\n                                                margin-top: -80px;\n                                            }\n                                            .ad_template_title_wrapper {\n                                                height: 80px;\n                                                margin: 0 auto;\n                                                margin-top: -80px;\n                                                vertical-align: center;\n                                                display: table;\n                                            }\n                                            .ad_template_title {\n                                                position: relative;\n                                                color: #ffffff;\n                                                text-align: center;\n                                                display: table-cell;\n                                                vertical-align: middle;\n                                                font-size: 24px;\n                                            }', '2022-04-09 11:49:28'),
(3, 'template sss', '<div class=\"up1_style\">\n                                            <a href=\"%request.reference_mrc%@%banner.event2%\" target=\"%banner.target%\" href=\"<?php echo $url;?>\" class=\"item-news targ-p-d small-news style1\" data-content=\"recom_views\">\n                                                <div class=\"img-box\">\n                                                    <picture>\n                                                        <source srcset=\"<?php echo $img;?>\" type=\"image/webp\">\n                                                        <img class=\"ad_template_image\" src=\"<?php echo $img;?>\" alt=\"<?php echo $h1;?>\" title=\"<?php echo $h1;?>\">\n                                                    </picture>\n                                                </div>\n                                                <div class=\"ad_template_background\"></div>\n                                                <div class=\"ad_template_title_wrapper\">\n                                                    <div class=\"ad_template_title\"><?php echo $h1;?></div>\n                                                </div>\n                                            </a>\n                                        </div>', '.ad_template_image {\n                                                width: 455px;\n                                            }\n                                            .ad_template_background {\n                                                width: 100%;\n                                                height: 80px;\n                                                background-color: #0a0a0a;\n                                                opacity: 0.3;\n                                                margin-top: -80px;\n                                            }\n                                            .ad_template_title_wrapper {\n                                                height: 80px;\n                                                margin: 0 auto;\n                                                margin-top: -80px;\n                                                vertical-align: center;\n                                                display: table;\n                                            }\n                                            .ad_template_title {\n                                                position: relative;\n                                                color: #ffffff;\n                                                text-align: center;\n                                                display: table-cell;\n                                                vertical-align: middle;\n                                                font-size: 24px;\n                                            }', '2022-04-11 09:28:59'),
(5, 'template', '<div class=\"up1_style\">\r\n                                            <a href=\"%request.reference_mrc%@%banner.event1%\" target=\"%banner.target%\" href=\"<?php echo $url;?>\" class=\"item-news targ-p-d small-news style1\" data-content=\"recom_views\">\r\n                                                <div class=\"img-box\">\r\n                                                    <picture>\r\n                                                        <source srcset=\"<?php echo $img;?>\" type=\"image/webp\">\r\n                                                        <img class=\"ad_template_image\" src=\"<?php echo $img;?>\" alt=\"<?php echo $h1;?>\" title=\"<?php echo $h1;?>\">\r\n                                                    </picture>\r\n                                                </div>\r\n                                                <div class=\"ad_template_background\"></div>\r\n                                                <div class=\"ad_template_title_wrapper\">\r\n                                                    <div class=\"ad_template_title\"><?php echo $h1;?></div>\r\n                                                </div>\r\n                                            </a>\r\n                                        </div>', '.up1_style {\r\n                                                width: 200px;\r\n                                                margin: 0 auto;\r\n                                            }\r\n                                            .ad_template_image {\r\n                                                width: 200px;\r\n                                            }\r\n                                            .ad_template_background {\r\n                                                width: 100%;\r\n                                                height: 110px;\r\n                                                background-color: #0a0a0a;\r\n                                                opacity: 0.3;\r\n                                                margin-top: -110px;\r\n                                            }\r\n                                            .ad_template_title_wrapper {\r\n                                                height: 110px;\r\n                                                margin: 0 auto;\r\n                                                margin-top: -110px;\r\n                                                vertical-align: center;\r\n                                                display: table;\r\n                                            }\r\n                                            .ad_template_title {\r\n                                                position: relative;\r\n                                                color: #ffffff;\r\n                                                text-align: center;\r\n                                                display: table-cell;\r\n                                                vertical-align: middle;\r\n                                                font-size: 24px;\r\n                                            }', '2022-04-12 13:36:56');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `adfoxes`
--
ALTER TABLE `adfoxes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `adverts`
--
ALTER TABLE `adverts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `targets`
--
ALTER TABLE `targets`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `teasers`
--
ALTER TABLE `teasers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `adfoxes`
--
ALTER TABLE `adfoxes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `adverts`
--
ALTER TABLE `adverts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `places`
--
ALTER TABLE `places`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `targets`
--
ALTER TABLE `targets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `teasers`
--
ALTER TABLE `teasers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
