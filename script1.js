function caesarCipher(text, key, mode, alphabetMode) {
    let result = "";
    const shift = mode === "encode" ? key : -key; // Đổi chiều dịch
    const m = alphabetMode === "alphabet" ? 26 : 256;

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (alphabetMode === "alphabet") {
            if (charCode >= 65 && charCode <= 90) { // A-ZZ
                charCode = ((charCode - 65 + shift + m) % m) + 65;
            } else if (charCode >= 97 && charCode <= 122) { // a-zz
                charCode = ((charCode - 97 + shift + m) % m) + 97;
            }
        } else { // ASCII
            charCode = (charCode + shift + m) % m;
        }
        result += String.fromCharCode(charCode);
    }
    return result;
}

function affineCipher(text, a, b, mode, alphabetMode) {
    let result = "";
    const m = alphabetMode === "alphabet" ? 26 : 256;
    const invA = modInverse(a, m);
    if (mode === "decode" && invA === -1) {
        alert("Hệ số A không có nghịch đảo, chọn giá trị khác.");
        return "";
    }
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (alphabetMode === "alphabet") {
            if (charCode >= 65 && charCode <= 90) {
                let newChar = mode === "encode" ? (a * (charCode - 65) + b) % m : (invA * (charCode - 65 - b + m)) % m;
                charCode = newChar + 65;
            } else if (charCode >= 97 && charCode <= 122) {
                let newChar = mode === "encode" ? (a * (charCode - 97) + b) % m : (invA * (charCode - 97 - b + m)) % m;
                charCode = newChar + 97;
            }
        } else {
            charCode = mode === "encode" ? (a * charCode + b) % m : (invA * (charCode - b + m)) % m;
        }
        result += String.fromCharCode(charCode); // Giúp dịch chuyển, xử lý ký tự và nói vào chuỗi
    }
    return result;
}

function vigenereCipher(text, key, mode) {
    if (!key || key.length === 0) {
        alert("Vui lòng nhập khóa Vigenère.");
        return "";
    }

    key = key.toUpperCase().replace(/[^A-Z]/g, ""); // Chuyển khóa sang chữ hoa và loại bỏ kí tự không phải chữ cái
    if (key.length === 0) { 
        alert("Vui lòng nhập khóa Vigenère hợp lệ (chỉ chứa chữ cái)."); 
        return ""; 
    }

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i); // charCode là mã Unicode của ký tự
        if (charCode >= 65 && charCode <= 90) { 
            let shift = key.charCodeAt(keyIndex % key.length) - 65; // Tính giá trị dịch chuyển
            charCode = mode === "encode" // Mã dịch trái, Giải dịch phảiphải
                ? (charCode - 65 + shift) % 26 + 65
                : (charCode - 65 - shift + 26) % 26 + 65;
            keyIndex++; // Tăng chỉ số để chuyển tiếp trong keykey
        } else if (charCode >= 97 && charCode <= 122) { 
            let shift = key.charCodeAt(keyIndex % key.length) - 65;
            charCode = mode === "encode"
                ? (charCode - 97 + shift) % 26 + 97
                : (charCode - 97 - shift + 26) % 26 + 97;
            keyIndex++;
        }else { // Không phải chữ cái thì giữ nguyênnguyên
            result += String.fromCharCode(charCode);
            continue;
        }
        result += String.fromCharCode(charCode);
    }
    return result;
}

function hillCipher(text, key, mode) {
    function parseKeyMatrix(keyString) { // Chuyển key thành ma trậntrận
        let matrix = keyString.split(',').map(Number); // Tách chuỗi thành mảng các số
        let size = Math.sqrt(matrix.length); // Đảm bảo ma trận là vuông
        if (size % 1 !== 0) return null;
        let formattedMatrix = []; // Đảm bảo ma trận 2 chiềuchiều
        for (let i = 0; i < size; i++) {
            formattedMatrix.push(matrix.slice(i * size, (i + 1) * size));
        }
        return formattedMatrix;
    }

    function modInverse(a, m) { // Tính nghịch đảo  modulo cho số nguyên
        a = ((a % m) + m) % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) return x;
        }
        return -1;
    }

    function modMatrixInverse(matrix, m) { // Nhân vector với ma trận theo mm
        let det = determinant(matrix);
        let inverseDet = modInverse(det, m);
        if (inverseDet === -1) return null;

        let cofactor = cofactorMatrix(matrix);
        let adjugate = transpose(cofactor);
        let inverseMatrix = adjugate.map(row => row.map(value => ((value * inverseDet) % m + m) % m));
        return inverseMatrix;
    }

    function determinant(matrix) { // Tính định thức ma trận (LaplaceLaplace)
        if (matrix.length === 1) return matrix[0][0];
        if (matrix.length === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }

        let det = 0;
        for (let i = 0; i < matrix.length; i++) {
            let subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
            det += ((i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix));
        }
        return det;
    }

    function cofactorMatrix(matrix) { // Tìm ma trận phù hợp (Cofactor Matrix)
        let cofactors = [];
        for (let i = 0; i < matrix.length; i++) {
            let row = [];
            for (let j = 0; j < matrix.length; j++) {
                let subMatrix = matrix
                    .filter((_, r) => r !== i)
                    .map(row => row.filter((_, c) => c !== j));
                row.push(((i + j) % 2 === 0 ? 1 : -1) * determinant(subMatrix));
            }
            cofactors.push(row);
        }
        return cofactors;
    }

    function transpose(matrix) { // Chuyển vị ma trậntrận
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
    }

    function multiplyVectorMatrix(vector, matrix, m) { // Nghịch đảo theo mm
        let result = [];
        for (let j = 0; j < matrix[0].length; j++) {
            let sum = 0;
            for (let i = 0; i < vector.length; i++) {
                sum += vector[i] * matrix[i][j]; 
            }
            result.push(((sum % m) + m) % m);
        }
        return result;
    }
    // Parse khóa thành ma trậntrận
    let keyMatrix = parseKeyMatrix(key);
    if (!keyMatrix) {
        alert("Khóa không hợp lệ. Hãy nhập ma trận hợp lệ.");
        return "";
    }

    let textMatrix = text.toUpperCase().replace(/[^A-Z]/g, "");
    let size = keyMatrix.length;
    // Thêm ký tự 'X' nếu độ dài không chia hết cho kích thước ma trận
    while (textMatrix.length % size !== 0) {
        textMatrix += "X"; 
    }

    let m = 26;
    let result = ""; 
    // Tính nghịch đảo ma trận nếu đang giải mã
    let keyToUse = mode === "decode" ? modMatrixInverse(keyMatrix, m) : keyMatrix;
    if (!keyToUse) {
        alert("Khóa không có nghịch đảo, chọn giá trị khác.");
        return "";
    }
    // Thực hiện mã hóa/giải mã
    for (let i = 0; i < textMatrix.length; i += size) {
        let vector = textMatrix.slice(i, i + size).split("").map(c => c.charCodeAt(0) - 65);
        let encryptedVector = multiplyVectorMatrix(vector, keyToUse, m);
        result += encryptedVector.map(v => String.fromCharCode(v + 65)).join("");
    }
    return result;
}
