import hashlib

def hash_sha256(input_string):
    return hashlib.sha256(input_string.encode()).hexdigest()

def create_signature_sha256(message, private_key):
    message_hash = hash_sha256(message)
    signature = message_hash   # Giả lập chữ ký
    return signature

def verify_signature_sha256(message, signature, private_key):
    expected_signature = create_signature_sha256(message, private_key)
    return signature == expected_signature

def verify_multiple_signatures_sha256(message, signatures, private_key):
    """Kiểm tra danh sách chữ ký SHA-256"""
    results = []
    for sig in signatures:
        result = verify_signature_sha256(message, sig, private_key)
        results.append(result)
    return results

def demo_hashing_sha256():
    print("\n--- Băm chuỗi 'Hello, World!' bằng SHA-256 ---")
    hello_world_hash_sha256 = hash_sha256("Hello, World!")
    print("Băm của 'Hello, World!' là:", hello_world_hash_sha256)

def demo_signature_sha256():
    """Demo tạo chữ ký SHA-256"""
    print("\n--- Tạo chữ ký cho 'Sensitive Information' với khóa riêng là 'private_key' ---")
    message = "Sensitive Information"
    private_key = "private_key"
    signature_sha256 = create_signature_sha256(message, private_key)
    print("Chữ ký điện tử SHA-256 là:", signature_sha256)

if __name__ == "__main__":
    demo_hashing_sha256()
    demo_signature_sha256()

    print("\n--- Tạo chữ ký điện tử bằng SHA-256 ---")
    message = input("Nhập thông điệp: ")
    private_key = input("Nhập khóa riêng: ")
    
    signature_sha256 = create_signature_sha256(message, private_key)
    print("Chữ ký điện tử SHA-256 là:", signature_sha256)
    
    print("\n--- Kiểm tra chữ ký điện tử SHA-256 2 lần ---")
    message_to_verify = input("Nhập thông điệp để kiểm tra: ")
    private_key_to_verify = input("Nhập khóa riêng: ")
    
    signatures_to_verify = []
    for i in range(2):
        sig = input(f"Nhập chữ ký thứ {i+1} để kiểm tra: ")
        signatures_to_verify.append(sig)
    
    results = verify_multiple_signatures_sha256(message_to_verify, signatures_to_verify, private_key_to_verify)
    
    for idx, res in enumerate(results, start=1):
        print(f"Chữ ký thứ {idx} {'hợp lệ' if res else 'không hợp lệ'}.")