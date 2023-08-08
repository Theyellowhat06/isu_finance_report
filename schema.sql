drop database if exists isu_finance_report;
create database isu_finance_report;
use isu_finance_report;

DROP USER if exists 'isu'@'localhost';
CREATE USER 'isu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'lXQK0@b1^68Z';
GRANT ALL PRIVILEGES ON isu_finance_report.* TO 'isu'@'localhost';

create table permission(
	id int auto_increment,
    name varchar(55),
    primary key (id)
);

create table users(
	id int auto_increment,
    fname varchar(55),
    lname varchar(55),
	username varchar(55),
    password varchar(255),
    permission_id int default 2,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp default null,
    primary key (id),
    foreign key (permission_id) references permission(id)
);

create table employees(
	id int auto_increment,
    taxes_number varchar(255),
    register_number varchar(10),
    firstname varchar(55),
    lastname varchar(55),
    created_at timestamp default current_timestamp,
    deleted_at timestamp default null,
    primary key(id)
);

create table nd_report(
	id int auto_increment,
    register_number varchar(10),
    nd_value decimal(13,2),
    nd_fee decimal(13,2),
    nd_tax decimal(13, 2),
    nd_tax_discount decimal(13, 2),
    nd_month int,
    nd_year int,
    nd_date timestamp default null,
    deleted_at timestamp default null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

insert into permission(name) values ('admin'),('user');

insert into users(username, password, permission_id) values('admin', md5('123'), 1);

-- select * from nd_report; 

INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111080670646', 'ДИВАНГАР', 'АМАРБАЯР', 'УЕ72021415');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111085210099', 'ХАДААС', 'АРИУНЖАРГАЛ', 'ИЮ73033107');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112264190539', 'ДАШНЯМ', 'АРИУНЦЭЦЭГ', 'НИ77021306');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112539351505', 'САНГАД', 'БАЙГАЛМАА', 'ЧК71071703');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('651967081979', 'Авгаанданзан', 'БАТБОЛД', 'АН69040917');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111979810771', 'ДАМДИНДОРЖ', 'БАТГЭРЭЛ', 'ГМ80070408');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111947221554', 'ЧИНБАТ', 'БАТИДЭР', 'ФМ74020918');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111082201251', 'ЖАМСРАН', 'БАТМӨНХ', 'ЦБ70012571');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111687441182', 'ЖҮГЛЭГ', 'БАТТУЛГА', 'ЧО64103023');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112249291122', 'ДАМДИНДОРЖ', 'БАТЦЭЦЭГ', 'ГМ75022508');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('110758001989', 'Оюун', 'БАЯРСАЙХАН', 'ХИ67053071');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111073681758', 'Хаян', 'БАЯРСАЙХАН', 'ЧЗ70010171');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111016581435', 'ЯДАМСҮРЭН', 'БОЛДБААТАР', 'АН75060914');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112202271979', 'Цэнд', 'ГАНТӨМӨР', 'ШБ73101719');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111097521658', 'ГАЛЧУЛУУН', 'ГАНТУЯА', 'ХЛ86021202');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111039131228', 'Оргил', 'ГЭРЭЛ', 'УУ89042226');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111056850294', 'Батсүх', 'ДЭНЗЭНДОЛГОР', 'ХА73012868');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111075860342', 'ДАШДОРЖ', 'ЖАВЗМАА', 'ЦГ66082201');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('110760891449', 'СМОЙЛЬ', 'ЖАНАР', 'ЧК80082065');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111076480808', 'ЗУЛ', 'ИЧИНХОРЛОО', 'ОП72090100');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111631430682', 'ДОРЖГОТОВ', 'МӨНХГЭРЭЛ', 'ЕЭ79062867');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111335041948', 'МЯГМАРСҮРЭН', 'МӨНХОРГИЛ', 'ШУ88100551');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111083680178', 'ЛХАМСҮРЭН', 'МӨНХЦЭЦЭГ', 'ХД69121165');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112579470449', 'МӨНХСАЙХАН', 'ОДОНСАЙХАН', 'УМ88102203');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111919601339', 'Рэнцэнхорлоо', 'ОНОН', 'УХ73070403');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('103101411399', 'ДАМДИНСҮРЭН', 'ОТГОНЗАЯА', 'КЛ86081602');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('110744980046', 'БАТСУУРЬ', 'ОТГОНТУЯА', 'УК92040781');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111067220949', 'ДАШДАМБА', 'ОЮУНБАТ', 'УК67092736');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112560800874', 'УЛАМБАЯР', 'ОЮУНГЭРЭЛ', 'ХП72020368');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111692920924', 'ЧОЙЖИЛЖАВ', 'ОЮУНГЭРЭЛ', 'ДЮ65020600');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111089781022', 'БЯМБАСҮРЭН', 'ОЮУНЖАРГАЛ', 'ВП79100504');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111028601558', 'ДАШЦЭРЭН', 'ОЮУНЧИМЭГ', 'ХП74030281');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112222380058', 'ДАШДАВАА', 'САРАНТУНГАА', 'ШЗ71062887');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('110701731032', 'ДОРЖДЭРЭМ', 'СОЁЛМАА', 'ЧЛ79042668');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111066361079', 'НАМСРАЙ', 'СОСОРБАРАМ', 'НИ82101607');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111046840679', 'СҮХБААТАР', 'СУВДАНЧИМЭГ', 'ЦД79041763');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111601920236', 'ДАШХҮҮ', 'СУМЪЯА', 'ДЙ68072108');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112217380247', 'БАЯНЖАРГАЛ', 'СҮХХУЯГ', 'УЗ94042415');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('110725561318', 'ТОВУУЧ', 'ТҮВШИНТӨГС', 'ХЕ67010271');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111012251539', 'ЧОЙЖАМЦ', 'ТҮМЭНБААТАР', 'ЦД67011470');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111957790866', 'ӨЛЗИЙБАДРАХ', 'ТУУЛ', 'ТЯ63112501');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('null', 'Арилдий ', 'ТУУЛ', 'ХА60111466');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111948491383', 'ТӨМӨРТОГОО', 'ТЭНГИС', 'УХ75060870');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111072991308', 'Сэнгээлэн', 'УУГАНБАЯР', 'СП80050117');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112257750994', 'ЖАМСРАН', 'ХАЛИУНАА', 'ХП80082167');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('110708051737', 'ГАЛБИШ', 'ХОНГОРЗУЛ', 'ХБ75052183');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111686791301', 'МИХЛАЙ', 'ЦАЦРАЛ', 'ЧП75082301');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111011692488', 'РАВДАН', 'ЦОГЗОЛМАА', 'ШГ73032703');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('480713510109', 'СОСОРБУРАМ', 'ЧОЙДОРЖ', 'ЗБ90120118');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111082051818', 'САНЖААСҮРЭН', 'ЭНХЖАРГАЛ', 'ЦГ70012407');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('100151381246', 'Батхүү', 'ЭНХМАА', 'ЧС80011921');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('111685280899', 'Жамсран', 'ЭНХТӨР', 'ВА69042417');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112214660397', 'ГОТОВ', 'ЭНХЦЭЦЭГ', 'ЛЮ68011603');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('110739400818', 'АНАНСҮРЭН', 'ЭНХЦЭЦЭГ', 'ЧН72022108');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112243770746', 'БАЯНДОРЖ', 'ЭРДЭНЭЦЭЦЭГ', 'ЧЛ73020168');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112223801286', 'Баасанжав', 'ЭРДЭНЭЧИМЭГ', 'УХ69020200');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('112501850219', 'ЧАДРАА', 'НАСАНБАЯР', 'ХЕ78011910');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('855203020169', 'НАНСАЛЖАВ', 'МАГСАРЖАВ', 'ОР92052011');
INSERT INTO employees (taxes_number, lastname, firstname, register_number) VALUES ('null', 'БАДАРЧ', 'ЗОЛЗАЯА', 'ВИ76080303');