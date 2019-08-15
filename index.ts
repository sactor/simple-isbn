export namespace isbn {
  export function toIsbn13(isbn: string): string {
    if (typeof isbn !== "string") {
      throw new TypeError("Invalid ISBN");
    }
    isbn = isbn.replace(/[- ]/gi, "");
    if (isValidIsbn13(isbn)) {
      return isbn;
    }
    if (!isValidIsbn10(isbn)) {
      throw new TypeError("Invalid ISBN");
    }
    isbn = "978" + isbn.substring(0, isbn.length - 1);
    return isbn + calculateIsbn13Code(isbn);
  }

  export function toIsbn10(isbn: string): string {
    if (typeof isbn !== "string") {
      throw new TypeError("Invalid ISBN");
    }
    isbn = isbn.replace(/[- ]/gi, "");
    if (isValidIsbn10(isbn)) {
      return isbn;
    }
    if (!isValidIsbn13(isbn)) {
      throw new TypeError("Invalid ISBN");
    }
    isbn = isbn.substr(3, 9);
    isbn = isbn.concat(calculateIsbn10Code(isbn));
    return isbn;
  }

  export function calculateIsbn13Code(partial: string): string {
    if (!/^\d{12}$/.test(partial)) {
      throw new TypeError("Invalid partial ISBN 13");
    }
    let chars = partial.split("");
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(chars[i]) * (i % 2 ? 3 : 1);
    }
    return ((10 - (sum % 10)) % 10).toString();
  }

  export function calculateIsbn10Code(partial: string): string {
    if (!/^\d{9}$/.test(partial)) {
      throw new TypeError("Invalid partial ISBN 10");
    }
    let j = 0;
    let check = 0;
    for (let i = 10; i > 1; i--) {
      check += parseInt(partial[j++]) * i;
    }
    check = 11 - (check % 11);
    switch (check) {
      case 10:
        return "X";
      case 11:
        return "0";
    }
    return check.toString();
  }

  export function isValidIsbn10(isbn: string): boolean {
    if (!/^[\d]{9}[\dX]$/i.test(isbn)) {
      return false;
    }
    let chars = isbn.split("");
    if (chars[9].toUpperCase() === "X") {
      chars[9] = "10";
    }
    let sum = 0;
    for (let i = 0; i < chars.length; i++) {
      sum += (10 - i) * parseInt(chars[i]);
    }
    return sum % 11 === 0;
  }

  export function isValidIsbn13(isbn: string): boolean {
    if (!/^[\d]{13}$/i.test(isbn)) {
      return false;
    }
    var chars = isbn.split("");
    var sum = 0;
    for (var i = 0; i < chars.length; i++) {
      if (i % 2 === 0) {
        sum += parseInt(chars[i]);
      } else {
        sum += parseInt(chars[i]) * 3;
      }
    }
    return sum % 10 === 0;
  }

  export function isValidIsbn(isbn: string): boolean {
    if (typeof isbn !== "string") {
      return false;
    }
    isbn = isbn.replace(/[- ]/gi, "");
    if (isbn.length === 10) {
      return isValidIsbn10(isbn);
    } else if (isbn.length === 13) {
      return isValidIsbn13(isbn);
    }
    return false;
  }
}
