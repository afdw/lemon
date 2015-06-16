Создание сайта с помощью Lemon
===
В этой статье описывается создание сайта о солнечной системе.
Установка
---
Для начала вам надо установить NodeJS, Git и PostgreSQL.
### Windows и Mac
Ссылки на скачивание утановщиков: [NodeJS](https://nodejs.org/download/), [Git](https://git-scm.com/download/), [PostgreSQL](http://www.postgresql.org/download/).
### Ubuntu
```plain
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install build-essential nodejs git postgresql
```
Далее вам надо скачать фрейворк:
```bash
git clone https://github.com/afdw/lemon.git
```




Настройка базы данных
---
Для начала включим прослушивание входящий соединений: для этого отредактируем файл `/etc/postgresql/[весия PostgreSQL]/main/postgresql.conf`. В нём находим строчку
```ini
#listen_addresses = 'localhost'
```
и заменим её на
```ini
listen_addresses = 'localhost'
```
Далее нам надо перезапустить сервер Posthres'а:
```bash
sudo service postgresql restart
```
Зайдём в RELP Postgres'а:
```bash
sudo -u postgres psql template1
```
Утановим пароль для пользователя базы данных `postgres`:
```sql
ALTER USER postgres with encrypted password '[ваш пароль]';
```
Создадим базу данных:
```sql
CREATE DATABASE solarsystem
```
Выходим:
```plain
\quit
```





Инитиализация и первоначальная настройка проекта
---
Эта команда создать новый проект в папке `solarsystem`:
```bash
node lemon/node_modules/lemon_cli/cli.js new solarsystem
```
Далее заходим в эту папку:
```bash
cd solarsystem
```
Нам необходимо настроить конфигурационные фалы. Мне в файле `configs/http.js` надо сменить порт (по умолчанию стоит `80`), так как `80` порт у меня уже занят. Имейте ввиду, что если вы оставите `80`, то вам придётся запускать сервер с правами администратора.

Далее нам надо настроить базу данных. В файле `configs/db.js` поставим следующие настройки:
```js
module.exports = {
	"engine": "pg",
	"host": "localhost",
	"port": 5433, // для версии 9.3 - 5432, для 9.4 - 5433
	"user": "postgres",
	"password": "[ваш пароль]",
	"database": "solarsystem"
};
```




Натройка статических ресуросов
---
Добавим иконку для нашего сайта. Мне понравилась эта: ![иконка](resources/favicon.ico). Копируем её в папку `static`.

Далее создадим файл `static/main.css` со сбросом стилей:
```css
* {
	margin: 0;
	padding: 0;
}
```



Создание шаблонов
---
Создаём файл `views/planets.html` и пишен там шаблон всех страниц, при этом контент страницы берём из параметра:
```html
<!DOCTYPE html>
<html>
	<head lang="ru">
		<meta charset="UTF-8">
		<title>Солнечная система</title>
		<link rel="stylesheet" href="static/style.css">
		<link rel="icon" type="image/png" href="static/favicon.ico">
	</head>
	<body>
		<div class="main">
			<div class="content">
				{echo params.content}
			</div>
		</div>
	</body>
</html>
```
Далее создаём шаблон страницы с выводом списка страниц с помощью `foreach`:
```html
{variable content}
	<h1>Планеты</h1>
	{foreach params.planets as planet}
		<div class="planet">
			<h3>{echo planet.planet_name}</h3>
			<img class="photo" src="{echo planet.planet_photo}">
			<table>
				<tr>
					<td>Название</td>
					<td>{echo planet.planet_name}</td>
				</tr>
				<tr>
					<td>Место от Солнца</td>
					<td>{echo planet.planet_index}</td>
				</tr>
				<tr>
					<td>Обозначение</td>
					<td><img src="{echo planet.planet_symbol}"></td>
				</tr>
			</table>
		</div>
	{/foreach}
{/variable}
{require page.html {content: content}}
```




Создание контроллера
---
Создадим контроллер для планет. Для этого создаём файл `controllers/planets.js` и записав туда метод, показывающий список планет:
```js
var lemonTemplater = require("lemon_templater");

var PlanetsController = function()
{
};
PlanetsController.prototype.listPlanets = function(response, connection)
{
	connection.exec("SELECT * FROM planets", [], function(error, result)
	{
		if(error)
		{
			throw error;
		}
		connection.close();
		(new lemonTemplater("views/planets.html", {planets: result})).renderToResponse(response);
	});
};
module.exports = PlanetsController;
```






автшкиуаршоуцошл
---
В файле `routes.js` указуваем 