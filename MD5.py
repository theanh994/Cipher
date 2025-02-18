import hashlib

def hash_md5(input_string):
    return hashlib.md5(input_string.encode()).hexdigest()

def create_signature(message, private_key):
    message_hash = hash_md5(message)
    signature = message_hash  # Giả lập chữ ký
    return signature

def verify_signature(message, signature, private_key):
    expected_signature = create_signature(message, private_key)
    return signature == expected_signature
def verify_multiple_signatures(message, signatures, private_key):
    """Kiểm tra danh sách chữ ký điện tử"""
    results = []
    for sig in signatures:
        result = verify_signature(message, sig, private_key)
        results.append(result)
    return results

# Băm chuỗi "Hello, World!"
print("\n--- Băm chuỗi 'Hello, World!' ---")
hello_world_hash = hash_md5("Hello, World!")
print("Băm của 'Hello, World!' là:", hello_world_hash)

# So sánh băm của "abc" và "abc "
print("\n--- So sánh băm của 'abc' và 'abc ' ---")
abc_hash = hash_md5("abc")
abc_space_hash = hash_md5("abc ")
print("Băm của 'abc':", abc_hash)
print("Băm của 'abc ':", abc_space_hash)

# Tạo chữ ký cho thông điệp "Confidential Message" với khóa riêng "secret_key"
print("\n--- Tạo chữ ký cho 'Confidential Message' với khóa riêng là 'private_key'---")
message = "Confidential Message"
private_key = "secret_key"
signature = create_signature(message, private_key)
print("Chữ ký điện tử là:", signature)



if __name__ == "__main__":

    print("\n--- Tạo chữ ký điện tử bằng MD5 ---")
    message = input("Nhập thông điệp: ")
    private_key = input("Nhập khóa riêng: ")
    
    signature = create_signature(message, private_key)
    print("Chữ ký điện tử là:", signature)
    
    print("\n--- Kiểm tra chữ ký điện tử 2 lần ---")
    message_to_verify = input("Nhập thông điệp để kiểm tra: ")
    private_key_to_verify = input("Nhập khóa riêng: ")
    
    signatures_to_verify = []
    for i in range(2):
        sig = input(f"Nhập chữ ký thứ {i+1} để kiểm tra: ")
        signatures_to_verify.append(sig)
    
    results = verify_multiple_signatures(message_to_verify, signatures_to_verify, private_key_to_verify)
    
    for idx, res in enumerate(results, start=1):
        print(f"Chữ ký thứ {idx} {'hợp lệ' if res else 'không hợp lệ'}.")



