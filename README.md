# FValidation

<p>
  <a href="https://www.npmjs.com/package/field-validation">
    <img src="https://img.shields.io/npm/v/field-validation?color=brightgreen&label=npm%20package" alt="Current npm package version." />
  </a>
</p>

## Introduction

<p>
  FValidation is a simple library for validating form fields.<br>
  <strong>Pure javascript and no dependencies</strong>
</p>

## Installation
```bash
npm i field-validation
```

## Examples
```bash
import { fv } from 'field-validation';
const v = new fv({ EMAIL_DOMAINS: ['@mail.ru'], MAX_LENGTH: 30, MIN_LENGTH: 20 });

v.pipe(v.notEmpty, v.email)({ value: ' ' });
// {value: ' ', message: 'Поле не заполнено', status: false}
v.pipe(v.notEmpty, v.email)({ value: 'vadimkamail.ru' });
// {value: 'vadimkamail.ru', message: 'Email должен содержать символы @ и ".". Допускается ввод только латиницы', status: false}
v.pipe(v.notEmpty, v.email)({ value: 'vadimk a@mail.ru' });
// {value: 'vadimk a@mail.ru', message: 'Пробелов быть не должно', status: false}
v.pipe(v.notEmpty, v.email)({ value: ' vadimka@mail.ru ' });
// {value: ' vadimka@mail.ru ', message: 'Поле заполнено не правильно', status: false}
v.pipe(v.notEmpty, v.email)({ value: 'vadimka@mail.ru' });
// 'vadimka@mail.ru', message: '', status: true}
v.pipe(v.notEmpty, v.email, v.withMaxLength)({ value: 'vadimsdfsdfsrgsrgdsesgrgsrka@mail.ru' });
// {value: 'vadimsdfsdfsrgsrgdsesgrgsrka@mail.ru', message: 'Максимальное количество символов 30', status: false}
v.pipe(v.notEmpty, v.email, v.withMaxLength, v.withMinLength)({ value: 'sdf@mail.ru' });
// {value: 'sdf@mail.ru', message: 'Минимальное количество символов 20', status: false}
v.pipe(v.notEmpty, v.email, v.withMaxLength)({ value: 'vadimka@mail.ru' });
// {value: 'vadimka@mail.ru', message: '', status: true}
```

## Documentation
| Method          | Description                             |
|-----------------|-----------------------------------------|
| pipe()          | combine functions                       |
| setMaxLength()  | setter for **MAX_LENGTH** prop          |
| setMinLength()  | setter for **MIN_LENGTH** prop          |
| notEmpty()      | checking value for empty                |
| onlyRus()       | checking value for only russian letters |
| onlyEng()       | checking value for only english letters |
| withMaxLength() | checking value for max length           |
| withMinLength() | checking value for min length           |
| email()         | checking value for email                |