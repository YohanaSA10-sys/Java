const express = require('express');
const java = require('java');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

java.classpath.push('../Sumador/Path/Sumador-1.0-SNAPSHOT.jar');
java.classpath.push('../Sumador/Path/commons-codec-1.16.1.jar');

try {
    const Sumador = java.import('com.mycompany.sumador.Sumador');

    app.post('/encrypt', (req, res) => {
        if (!req.body || typeof req.body !== 'object') {
            const errorResponse = {
                status: 400,
                message: 'Bad Request',
                error: 'Los datos no están en el formato correcto'
            };
            res.status(400).json(errorResponse);
            return;
        }
        
        const data = req.body;
        const encryptedData = {};
    
        const keys = Object.keys(data);
        let processedCount = 0;
    
        keys.forEach(key => {
            const plaintext = data[key];
            Sumador.encrypt(plaintext, (err, resultado) => {
                if (err) {
                    console.error('Error al llamar al método Java:', err);
                    const errorResponse = {
                        status: 500,
                        message: 'Error interno del servidor',
                        error: err.message 
                    };
                    res.status(500).json(errorResponse);
                    return;
                }
    
                encryptedData[key] = resultado;
    
                processedCount++;
    
                if (processedCount === keys.length) {
                    const response = {
                        status: 200,
                        message: 'OK',
                        data: encryptedData
                    };
                    res.status(200).json(response);
                }
            });
        });
    });
    app.post('/EncryptLong', (req, res) => {
        if (!req.body || typeof req.body !== 'object') {
            const errorResponse = {
                status: 400,
                message: 'Bad Request',
                error: 'Los datos no están en el formato correcto'
            };
            res.status(400).json(errorResponse);
            return;
        }
    
        const data = req.body;
        const encryptedData = {};
    
        const keys = Object.keys(data);
        let processedCount = 0;
    
        keys.forEach(key => {
            const plaintext = data[key];
            Sumador.encrypt(plaintext, (err, resultado) => {
                if (err) {
                    console.error('Error al llamar al método Java:', err);
                    const errorResponse = {
                        status: 500,
                        message: 'Error interno del servidor',
                        error: err.message 
                    };
                    res.status(500).json(errorResponse);
                    return;
                }
    
                encryptedData[key] = resultado;
    
                processedCount++;
    
                if (processedCount === keys.length) {
                    const response = {
                        status: 200,
                        message: 'OK',
                        data: encryptedData
                    };
                    res.status(200).json(response);
                }
            });
        });
    });

    app.post('/decrypt', (req, res) => {
        if (!req.body || typeof req.body !== 'object') {
            const errorResponse = {
                status: 400,
                message: 'Bad Request',
                error: 'Los datos no están en el formato correcto'
            };
            res.status(400).json(errorResponse);
            return;
        }
        
        const data = req.body;
        const decryptedData = {};
    
        const keys = Object.keys(data);
        let processedCount = 0;
    
        keys.forEach(key => {
            const encryptedText = data[key];
            Sumador.decrypt(encryptedText, (err, decryptedText) => {
                if (err) {
                    console.error('Error al llamar al método Java:', err);
                    const errorResponse = {
                        status: 500,
                        message: 'Error interno del servidor',
                        error: err.message 
                    };
                    res.status(500).json(errorResponse);
                    return;
                }
                decryptedData[key] = decryptedText;
                processedCount++;
    
                if (processedCount === keys.length) {
                    const response = {
                        status: 200,
                        message: 'OK',
                        data: decryptedData
                    };
                    res.status(200).json(response);
                }
            });
        });
    });
    app.post('/decryptLong', (req, res) => {
        if (!req.body || typeof req.body !== 'object') {
            const errorResponse = {
                status: 400,
                message: 'Bad Request',
                error: 'Los datos no están en el formato correcto'
            };
            res.status(400).json(errorResponse);
            return;
        }
        
        const data = req.body;
        const decryptedData = {};
    
        const keys = Object.keys(data);
        let processedCount = 0;
    
        keys.forEach(key => {
            const encryptedText = data[key];
            Sumador.decrypt(encryptedText, (err, decryptedText) => {
                if (err) {
                    console.error('Error al llamar al método Java:', err);
                    const errorResponse = {
                        status: 500,
                        message: 'Error interno del servidor',
                        error: err.message 
                    };
                    res.status(500).json(errorResponse);
                    return;
                }
                decryptedData[key] = decryptedText;
                processedCount++;
    
                if (processedCount === keys.length) {
                    const response = {
                        status: 200,
                        message: 'OK',
                        data: decryptedData
                    };
                    res.status(200).json(response);
                }
            });
        });
    });
} catch (error) {
    console.error('Error al importar la clase Java:', error);
    res.status(500).send('Error interno del servidor');
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
