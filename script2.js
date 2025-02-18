function generateRSAKeys(p, q, e) {
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    // Hàm tính ước số chung lớn nhất (GCD)
    const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));

    if (gcd(e, phi) !== 1n) {
        alert("e phải là số nguyên tố cùng nhau với (p-1)*(q-1).");
        return null;
    }

    // Hàm tìm số nghịch đảo modulo
    const modInverse = (a, m) => {
        let m0 = m, y = 0n, x = 1n;
        while (a > 1n) {
            let q = a / m;
            [m, a] = [a % m, m];
            [y, x] = [x - q * y, y];
        }
        return x < 0n ? x + m0 : x;
    };

    const d = modInverse(e, phi);

    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
}

let rsaKeys = null; // Lưu trữ khóa RSA

function rsaCipher() {
    const p = BigInt(document.getElementById("p").value);
    const q = BigInt(document.getElementById("q").value);
    const e = BigInt(document.getElementById("e").value);

    rsaKeys = generateRSAKeys(p, q, e);

    if (rsaKeys) {
        document.getElementById("publicKey").innerText = `Public Key: (e=${rsaKeys.publicKey.e}, n=${rsaKeys.publicKey.n})`;
        document.getElementById("privateKey").innerText = `Private Key: (d=${rsaKeys.privateKey.d}, n=${rsaKeys.privateKey.n})`;
    } else {
        alert("Không thể tạo khóa RSA. Hãy kiểm tra giá trị nhập vào!");
    }
}


function encryptRSA(message) {
    if (!rsaKeys) {
        alert("Hãy tạo khóa RSA trước khi mã hóa!");
        return "";
    }

    const { e, n } = rsaKeys.publicKey;
    let encrypted = [];

    for (let char of message) {
        let m = BigInt(char.charCodeAt(0));
        let c = (m ** e) % n;
        encrypted.push(c.toString());
    }

    return encrypted.join(" ");
}

function decryptRSA(ciphertext) {
    if (!rsaKeys) {
        alert("Hãy tạo khóa RSA trước khi giải mã!");
        return "";
    }

    const { d, n } = rsaKeys.privateKey;
    let decrypted = "";

    let encryptedArray = ciphertext.split(" ").map(BigInt);

    for (let c of encryptedArray) {
        let m = (c ** d) % n;
        decrypted += String.fromCharCode(Number(m));
    }

    return decrypted;
}
