"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isbn;
(function (isbn_1) {
    function toIsbn13(isbn) {
        isbn = isbn.replace(/[- ]/gi, '');
        if (isValidIsbn13(isbn)) {
            return isbn;
        }
        if (!isValidIsbn10(isbn)) {
            throw new TypeError('Invalid ISBN');
        }
        isbn = '978' + isbn.substring(0, isbn.length - 1);
        return isbn + calculateIsbn13Code(isbn);
    }
    isbn_1.toIsbn13 = toIsbn13;
    function toIsbn10(isbn) {
        isbn = isbn.replace(/[- ]/gi, '');
        if (isValidIsbn10(isbn)) {
            return isbn;
        }
        if (!isValidIsbn13(isbn)) {
            throw new TypeError('Invalid ISBN');
        }
        isbn = isbn.substr(3, 9);
        isbn = isbn.concat(calculateIsbn10Code(isbn));
        return isbn;
    }
    isbn_1.toIsbn10 = toIsbn10;
    function calculateIsbn13Code(partial) {
        if (!/^\d{12}$/.test(partial)) {
            throw new TypeError('Invalid partial ISBN 13');
        }
        let chars = partial.split('');
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(chars[i]) * ((i % 2) ? 3 : 1);
        }
        return ((10 - (sum % 10)) % 10).toString();
    }
    isbn_1.calculateIsbn13Code = calculateIsbn13Code;
    function calculateIsbn10Code(partial) {
        if (!/^\d{9}$/.test(partial)) {
            throw new TypeError('Invalid partial ISBN 10');
        }
        let j = 0;
        let check = 0;
        for (let i = 10; i > 1; i--) {
            check += parseInt(partial[j++]) * i;
        }
        check = 11 - (check % 11);
        return check === 10 ? 'X' : check.toString();
    }
    isbn_1.calculateIsbn10Code = calculateIsbn10Code;
    function isValidIsbn10(isbn) {
        if (!/^[\d]{9}[\dX]$/i.test(isbn)) {
            return false;
        }
        let chars = isbn.split('');
        if (chars[9].toUpperCase() === 'X') {
            chars[9] = '10';
        }
        let sum = 0;
        for (let i = 0; i < chars.length; i++) {
            sum += ((10 - i) * parseInt(chars[i]));
        }
        return (sum % 11 === 0);
    }
    isbn_1.isValidIsbn10 = isValidIsbn10;
    function isValidIsbn13(isbn) {
        if (!/^[\d]{13}$/i.test(isbn)) {
            return false;
        }
        var chars = isbn.split('');
        var sum = 0;
        for (var i = 0; i < chars.length; i++) {
            if (i % 2 === 0) {
                sum += parseInt(chars[i]);
            }
            else {
                sum += parseInt(chars[i]) * 3;
            }
        }
        return (sum % 10 === 0);
    }
    isbn_1.isValidIsbn13 = isValidIsbn13;
    function isValidIsbn(isbn) {
        isbn = isbn.replace(/[- ]/gi, '');
        if (isbn.length === 10) {
            return isValidIsbn10(isbn);
        }
        else if (isbn.length === 13) {
            return isValidIsbn13(isbn);
        }
        return false;
    }
    isbn_1.isValidIsbn = isValidIsbn;
})(isbn = exports.isbn || (exports.isbn = {}));
//# sourceMappingURL=index.js.map