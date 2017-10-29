export namespace isbn {
  export function toIsbn13(isbn: string): string {
    isbn = isbn.replace(/[- ]/gi, '');
    if (isValidIsbn13(isbn)) {
      return isbn;
    }
    if (!isValidIsbn10(isbn)) {
      throw new TypeError('Invalid ISBN');
    }
    let chars = isbn.split('');
    chars.unshift('9', '7', '8');
    chars.pop();
    let sum = 0;
    for (let i = 0; i < 12; i += 1) {
          sum += parseInt(chars[i]) * ((i % 2) ? 3 : 1);
    }
    chars.push(((10 - (sum % 10)) % 10).toString());
    return chars.join('');
  }

  export function toIsbn10(isbn: string): string {
    isbn = isbn.replace(/[- ]/gi, '');
    if (isValidIsbn10(isbn)) {
      return isbn;
    }
    if (!isValidIsbn13(isbn)) {
      throw new TypeError('Invalid ISBN');
    }
    isbn = isbn.substr(3, 9);
    let j = 0;
    let check = 0;
    for (let i = 10; i > 1; i--) {
      check += parseInt(isbn[j++]) * i;
    }
    check = 11 - (check % 11);
    isbn = isbn.concat(check === 10 ? 'X' : check.toString());
    return isbn;
  }

  export function isValidIsbn10(isbn: string): boolean {
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

  export function isValidIsbn13(isbn: string): boolean {
    if (!/^[\d]{13}$/i.test(isbn)) {
      return false;
    }
    var chars = isbn.split('');
    var sum = 0;
    for (var i = 0; i < chars.length; i++) {
      if (i % 2 === 0) {
        sum += parseInt(chars[i]);
      } else {
        sum += parseInt(chars[i]) * 3;
      }
    }
    return (sum % 10 === 0);
  }

  export function isValidIsbn(isbn: string): boolean {
    isbn = isbn.replace(/[- ]/gi, '');
    if (isbn.length === 10) {
      return isValidIsbn10(isbn);
    } else if (isbn.length === 13) {
      return isValidIsbn13(isbn);
    }
    return false;
  }
}
