"use strict";
/*
   El typscript es utilizado especificamente para validar entrada de datos,
   es una herramienta que compila el codigo creado en typescript a javascript, la
   diferencia es que el codigo en typescript el te va indicando cuales son los posibles
   problemas que puedes presentar y en ese momento corregirlos y testar el codigo solamente una vez
*/
const tboton = document.getElementById('btn');
const ttext1 = document.getElementById('iput1');
const ttext2 = document.getElementById('iput2');
const tresul = document.getElementById('resultados');
function suma(valor1, valor2) {
    return valor1 + valor2;
}
tboton.addEventListener('click', () => {
    let resultado = suma(Number(ttext1.value), Number(ttext2.value));
    tresul.innerText = `A soma é: ${resultado}`;
});
