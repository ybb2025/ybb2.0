const { execSync } = require('child_process');
const fs = require('fs');

const env = {
    FIREBASE_PROJECT_ID: "yourbrandbuilders-43d2d",
    FIREBASE_CLIENT_EMAIL: "firebase-adminsdk-fbsvc@yourbrandbuilders-43d2d.iam.gserviceaccount.com",
    FIREBASE_PRIVATE_KEY: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+xF3P5DVXeBhC\nxfoT89h4LAarN00mkEhREvYL8XLHzYj0pa50rMccsxyJ6Q1kbk9/l0nNBEgdfQ29\nk70BrbgDltntdnvnhyW/NL7wW0vQyt7eVBiB3abkKDKT9N39cSWzorGCaTa+xoZ/\ngocR1/LxdKIh3Y64uHdzsvIAjeIndUQoXPth8fYtXEqHoJTus7OyjaMn+i4t4Qwt\naSLL4uMTJl1KT+U4JcdgsGVNou0g5wAkSOZ2URwiC3LwEViQMLIxEhyt6Jm1K/ER\nbysxl+mjyngCg4BaQs//Y5AP1qF+OdW2pztcDbGe6/qznfPPTjxxcgOmhadjva5l\nEQ9D1t6bAgMBAAECggEAKcKd0LUh0jCJixCAwp5mPERS/2cfPfpmwky2zP2BhWii\nev/L9WGfQtKYxD3evyYAxCsPrlAqIz5tZBszzGrFdg+vTDLcQ95LbpRy2fX6Xk4S\nxLO/G6q0boy4Kbh4YhNDUBQk7KnwoImgBsjBna/a0G2aUnSIWjqTd6HsJR/qKn25\nU+aNPmLhrVcarswDbpvcCeAhSYaRJrTtUxhmZlrxfsy0j/h6jWJeNTmc37bE/ar1\ncb/OXOeSY9mNcQfrY3UoJ5sqkSmD9FhGeIftYdM/CIEIj4DpUhT95jz7XoMiHOM/\na71csC/t6zeex2rFpEy4UIJYAteu8fe8hpQRFU5+YQKBgQD4Dy50DcoXpqMwRzh2\nOtiHZQZISdiyVGOCkY/HvcFXT0WrmWAWS1osJSheEixM6ztkNnfUP+AxdMI8iNz8\nkHd84CRMyycnHrUWCy2iE0s5oAYphMFAMDbapWmjE9712yKsFB/kG4acQF900u6/\nhZ1MMsErmDpr5+ZAkJh9WHdmewKBgQDE365ur+qptngBx7uQS7aCgNz1gGzc6FOK\ne5U8a9nVUrBtqFE8jXAi0a7657WsmDTK1lsuqUllT8sBTn4zF/R1HzEZVcSmBpns\nJjdv+wBu9a2AL7NM6fjUc6o5JtsL3GGhHnfznCDMol+gmTfMsVvY0gkQkI+h6jsL\nLqvOblH+YQKBgDVIJYU+FQOhgnnzQlh66VmjxIawfgBIChvYolaYFrhnSaLDThVb\n2CGVVadnJebbvCUZYgHQOprE5pfUGguSCGhlSMbJ+D355ZG3kvS2Sjk1ez1dy5i7\nAn1SfG9P7FtI15i4teTsWKylUxun1yqCS7g7SqzPhPT6mcWSiX6bCwKTAoGBAJ9T\nnuk5OSIr56cZK3Q1sfifrTKJwpBs/N7/8OC7L8lyaBH2u/fTR0MGiyPHTcHmVCMr\noxN6MUnqb5IZIgzbgB0hJy0nukPa58qziv33Fny2Grm44NSILbZR/RrPlUpeCizI\naa8fVXQGnHluRjhD+N7Z7DgZpgQVeb8tACHKKlVBAoGBAK92J1rKkIQj16qRjScK\n5ZD5Bm9BzYw23GNR/F0noTq4dHhCj0SzTxRB+0dQ24xnKOQAiN3FtT7vZUesw3Ac\nCSSsdhWGcq8xvibNzT6KKFeTegfdPeuvDjaOuS3Ebu6pt3+FML9jPwY+nRI1MPL4\nSTxlmmZ7GieW9+veGGW5hfFL\n-----END PRIVATE KEY-----\n`
};

for (const [key, value] of Object.entries(env)) {
    console.log(`Adding ${key}...`);
    try {
        // We use echo in a way that handles newlines properly for Vercel CLI
        execSync(`echo "${value.replace(/"/g, '\\"')}" | npx vercel env add ${key} production --force`);
    } catch (err) {
        console.error(`Failed to add ${key}: ${err.message}`);
    }
}
