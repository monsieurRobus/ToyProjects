# TOY PROJECT CALCULADORA

Este toy project es un mero ejercicio para practicar la arquitectura MVC a través de la creación de una calculadora básica.

Para poder poner en práctica más cosas, voy a hacer que sea responsive y adaptative. 

## Toy Project para MVC: "Mini Calculadora"

**Descripción**:

> Una calculadora básica que permite sumar, restar, multiplicar y dividir dos números. El objetivo es entender cómo separar la lógica de los cálculos (Modelo) de la interacción del usuario (Vista) y coordinarlo todo con el Controlador.

**Funcionalidad**:
- Dos campos para ingresar números.
- Botones para cada operación (+, -, *, /).
- Un lugar donde se muestre el resultado.

**Pasos a implementar**:
- Modelo: Implementa la lógica de las operaciones matemáticas (sumar, restar, multiplicar, dividir).
- Vista: Una interfaz sencilla con los campos de entrada, botones y una sección para mostrar el resultado.
- Controlador: Conecta los eventos de los botones con las funciones del Modelo y actualiza la Vista con el resultado.

**Pista para la estructura**:
- Usa eventos como onclick para los botones.
- Ejemplo: Al presionar "+", el Controlador toma los valores de la Vista, llama al Modelo para calcular, y luego actualiza la Vista con el resultado.