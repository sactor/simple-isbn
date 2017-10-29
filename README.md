# simple-isbn
Small and simple utility with no dependencies to validate and convert ISBN 10 and ISBN 13.

## Install
```bash
npm install simple-isbn
```

## Usage

```javascript
const ISBN = require('simple-isbn').isbn;

ISBN.toIsbn13('951309524X');
ISBN.toIsbn10('9789513095246');
```

## API

### `ISBN.toIsbn13(isbn)`

Converts ISBN 10 to ISBN 13 or cleans up ISBN 13. Throws TypeError if not a valid ISBN.

#### Parameters:

 * `isbn`, ISBN 10 or ISBN 13, may include hyphens or spaces

#### Returns:

ISBN 13 with no hyphens or spaces as a string.

### `ISBN.toIsbn10(isbn)`

Converts ISBN 13 to ISBN 10 or cleans up ISBN 10. Throws TypeError if not a valid ISBN.

#### Parameters:

 * `isbn`, ISBN 10 or ISBN 13, may include hyphens or spaces

#### Returns:

ISBN 10 with no hyphens or spaces as a string.

### `ISBN.isValidIsbn10(isbn)`

Validates ISBN 10. Doesn't accept hyphens or spaces, ISBN needs to contain only digits and a check digit.

#### Parameters:

 * `isbn`, string to check

#### Returns:

`true` on valid ISBN 10 and `false` otherwise.

### `ISBN.isValidIsbn13(isbn)`

Validates ISBN 13. Doesn't accept hyphens or spaces, ISBN needs to contain only digits and a check digit.

#### Parameters:

 * `isbn`, string to check

#### Returns:

`true` on valid ISBN 13 and `false` otherwise.

### `ISBN.isValidIsbn(isbn)`

Validates an ISBN. Accepts extra hyphens and spaces, but not any other characters.

#### Parameters:

 * `isbn`, string to check

#### Returns:

`true` on valid ISBN 13 and `false` otherwise.