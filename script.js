function modInverse(a, m) { // Tính nghịch đảo modulo của a theo m (Hỗ trợ Affine và RSARSA)
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    return -1;
}

function loadFile(target) { // Đọc dữ liệu và hiển thị vào textarea (Mã hoặc giải mã)
    const fileInput = document.getElementById(target + "File");
    const textArea = document.getElementById(target);
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            textArea.value = e.target.result;
        };
        reader.readAsText(file);
    }
} 

function processCipher() { // Xử lý mã hóa và giải mã theo phương pháp
    
    const method = document.getElementById("cipherMethod").value;
    const mode = document.getElementById("mode").value;
    const alphabetMode = document.getElementById("alphabetMode").value;
    
    let inputText = mode === "encode" ? document.getElementById("plaintext").value : document.getElementById("ciphertext").value;
    let outputText = "";
    
    if (method === "caesar") { // Chọn phương pháp
        const key = parseInt(document.getElementById("key").value);
        outputText = caesarCipher(inputText, key, mode, alphabetMode);
    } else if (method === "affine") {
        const a = parseInt(document.getElementById("affineA").value);
        const b = parseInt(document.getElementById("affineB").value);
        outputText = affineCipher(inputText, a, b, mode, alphabetMode);
    } else if (method === "vigenere") {
        const key = document.getElementById("vigenereKey").value.trim();
        outputText = vigenereCipher(inputText, key, mode);
    } else if (method === "hill") {
        const key = document.getElementById("hillKey").value;
        outputText = hillCipher(inputText, key, mode);
    } else if (method === "des") {
        const key = document.getElementById("desKey").value.trim();
        outputText = desCipher(inputText, key, mode);
    } else if (method === "aes") {
        const key = document.getElementById("aesKey").value.trim();
        const keySize = parseInt(document.getElementById("aesKeySize").value);
        outputText = aesCipher(inputText, key, mode, keySize);
    } else  if (method === "rsa") {
        if (mode === "encode") {
            outputText = encryptRSA(inputText);
        } else {
            outputText = decryptRSA(inputText);
        }
    }

    document.getElementById(mode === "encode" ? "ciphertext" : "plaintext").value = outputText;
}

function updateKey() { // Thay đổi phương pháp mã hóa và điều chỉnh giao diện
    document.getElementById("caesar-options").style.display = document.getElementById("cipherMethod").value === "caesar" ? "block" : "none";
    document.getElementById("affine-options").style.display = document.getElementById("cipherMethod").value === "affine" ? "block" : "none";
    document.getElementById("vigenere-options").style.display = document.getElementById("cipherMethod").value === "vigenere" ? "block" : "none";
    document.getElementById("hill-options").style.display = document.getElementById("cipherMethod").value === "hill" ? "block" : "none";
    document.getElementById("des-options").style.display = document.getElementById("cipherMethod").value === "des" ? "block" : "none";
    document.getElementById("aes-options").style.display = document.getElementById("cipherMethod").value === "aes" ? "block" : "none";
    document.getElementById("rsa-options").style.display = document.getElementById("cipherMethod").value === "rsa" ? "block" : "none";
}
function toggleInputFields() { // Khóa và ngăn nhập liệu ở trường không phù hợphợp
    const mode = document.getElementById("mode").value;
    document.getElementById("plaintext").readOnly = mode === "decode";
    document.getElementById("ciphertext").readOnly = mode === "encode";
}

function hexToBytes(hex) { 
    let bytes = "";
    for (let i = 0; i < hex.length; i += 2) {
        bytes += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
} 

window.onload = function() { // Gọi các hàm khởi tạo khi trang web tải xong
    toggleInputFields();
    updateKey();
};
