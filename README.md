# book_list_es6_oop

Простое приложение для тренировки работы с классами в JS.

## Функционал

Данное приложение имитирует работу программы для добавления книг в базу данных. Данные хранятся в Local Storage.

## Суть

В файлах проекта есть
 ```sh
app.js
```
а также 
 ```sh
appes6.js
```
функционал в них реализован *одинаковый*,  но по *разному*.

## Отличия
В первом файле используется стандарт ES5, а во втором исользуется стандарт ES6.

Наглядно:

Конструктор в ES5 (app.js)

```sh
// Book constructor
function Book(title, author, isdn) {
  this.title = title;
  this.author = author;
  this.isdn = isdn;
}
```

Конструктор в ES6 (appes6.js)

```sh
class Book {
  constructor(title, author, isdn) {
    this.title = title;
    this.author = author;
    this.isdn = isdn;
  }
}
```

## Демонстрация работы приложения
[book_list_es6_oop](https://vitjaz.github.io/book_list_es6_oop/) - Деплой на GitHub Pages
