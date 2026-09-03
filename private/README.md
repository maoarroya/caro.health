# private/

Archivos que se venden y **no** deben servirse públicamente. Nada de esta
carpeta pasa por `/public`; solo se entrega a través de `/api/libro/descargar`
con un token firmado que se emite cuando Wompi aprueba el pago.

- `libro.pdf` — el libro *Alta Vibración* en digital (ruta configurable con
  `BOOK_PDF_PATH`). Está ignorado por git: súbelo directamente al servidor.
