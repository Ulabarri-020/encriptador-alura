document.getElementById('encrypt-btn').addEventListener('click', function() {
    handleTextTransformation('encrypt');
});

document.getElementById('decrypt-btn').addEventListener('click', function() {
    handleTextTransformation('decrypt');
});

document.getElementById('copy-btn').addEventListener('click', function() {
    copyToClipboard(document.getElementById('output-title').textContent);
});

function handleTextTransformation(type) {
    const inputText = document.getElementById('input-text').value;
    const outputTitle = document.getElementById('output-title');
    const outputText = document.getElementById('output-text');
    const outputImg = document.getElementById('output-img');

    if (inputText.length === 0) {
        outputImg.src = "img/muñeco.png";
        outputTitle.textContent = "Ningún mensaje fue encontrado";
        outputText.textContent = "Ingresa el texto que deseas encriptar o desencriptar";
        swal("ERROR", "Debes ingresar un texto", "warning");
        return;
    }

    const transformations = {
        'encrypt': {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        },
        'decrypt': {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        }
    };

    const transformedText = transformText(inputText, transformations[type]);
    document.getElementById('input-text').value = transformedText;

    if (type === 'encrypt') {
        outputTitle.textContent = transformedText; // Mostrar el texto encriptado en el título
        outputImg.src = "img/comprobado.png";
    } else {
        outputTitle.textContent = transformedText; // Mostrar el texto desencriptado en el título
        outputImg.src = "img/llave.png";
    }

    outputText.textContent = "";
}

function transformText(text, transformationRules) {
    let transformedText = text.toLowerCase();
    for (const [key, value] of Object.entries(transformationRules)) {
        transformedText = transformedText.replace(new RegExp(key, 'g'), value);
    }
    return transformedText;
}

// Función para copiar el texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Opcional: Puedes mostrar un mensaje de éxito al usuario
        alert('Texto copiado al portapapeles!');
    }, function(err) {
        console.error('Error al copiar el texto: ', err);
    });
}
