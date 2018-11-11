export declare namespace isbn {
    function toIsbn13(isbn: string): string;
    function toIsbn10(isbn: string): string;
    function calculateIsbn13Code(partial: string): string;
    function calculateIsbn10Code(partial: string): string;
    function isValidIsbn10(isbn: string): boolean;
    function isValidIsbn13(isbn: string): boolean;
    function isValidIsbn(isbn: string): boolean;
}
