
function desCipher(text, key, mode) {
    if (!key || key.length === 0) {
        alert("Vui lòng nhập khóa DES.");
        return "";
    }

    let keyHex = CryptoJS.enc.Utf8.parse(key);

    if (mode === "encode") {
        let encrypted = CryptoJS.DES.encrypt(text, keyHex, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    } else {
        let decrypted = CryptoJS.DES.decrypt(text, keyHex, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

function aesCipher(text, key, mode, keySize) {
    if (!key || key.length === 0) {
        alert("Vui lòng nhập khóa AES.");
        return "";
    }

    let keyHex = CryptoJS.enc.Utf8.parse(key);
    
    if (keySize === 128) {
        keyHex = CryptoJS.enc.Utf8.parse(key.padEnd(16, " ").substr(0, 16));
    } else if (keySize === 192) {
        keyHex = CryptoJS.enc.Utf8.parse(key.padEnd(24, " ").substr(0, 24));
    } else if (keySize === 256) {
        keyHex = CryptoJS.enc.Utf8.parse(key.padEnd(32, " ").substr(0, 32));
    }
    
    if (mode === "encode") {
        let encrypted = CryptoJS.AES.encrypt(text, keyHex, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    } else {
        let decrypted = CryptoJS.AES.decrypt(text, keyHex, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}