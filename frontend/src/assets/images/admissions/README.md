# Imagen del hero de Admisión

## Fotografía de la tarjeta de examen

`exam-reference.png`: captura original aportada por el usuario. `AdmissionsPosterPhoto` muestra únicamente la región fotográfica del afiche mediante un encuadre CSS; curvas y contenido inferior se construyen con SVG y JSX, no con una imagen del afiche completo. Se conserva la referencia sin alterarla. Fecha, teléfono y dirección se configuran en `data/admissions/exam.js`; las carreras proceden del catálogo compartido. La generación intermedia del afiche completo no se usa en el proyecto.

`admissions-classroom.png`: imagen ilustrativa generada con la herramienta integrada ImageGen el 8 de octubre de 2026. No es una fotografía documental del instituto. Composición horizontal con docente a la derecha y espacio central para el título. El oscurecimiento se aplica en `Image`, no en el archivo.

## Prompt

Use case: photorealistic-natural. Create a photographic background asset for a Peruvian higher education admissions website hero. Landscape wide 1536x1024 composition suitable for cropping to a 2.4:1 banner. A warm naturally lit modern classroom, a friendly adult Latina female lecturer standing at the far right third, holding a notebook and explaining to young adult students seen from behind along the bottom foreground. Large softly lit gray classroom board and uncluttered wall in the left and central two thirds provide quiet space for centered website typography. Realistic editorial education photography, authentic human features, natural hands, modest professional beige jacket, subtle warm light through windows on right. Keep teacher face within right third and upper middle, enough headroom for cropping. Foreground students softly out of focus, main teacher sharp. Natural neutral gray, beige and warm brown colors. No text, letters, logos, watermarks, UI, buttons, borders or graphic overlays; website will add its own dark overlay and orange and white text. Image is an illustrative fictional classroom, not a documentary photograph of a real institute.

