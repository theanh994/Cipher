import time
import hashlib

def hash_md5(input_string):
    """Hàm băm MD5"""
    return hashlib.md5(input_string.encode()).hexdigest()

def hash_sha256(input_string):
    """Hàm băm SHA-256"""
    return hashlib.sha256(input_string.encode()).hexdigest()

def compare_md5_sha256():
    """So sánh thời gian thực hiện và kích thước băm của MD5 và SHA-256"""
    input_string = "Performance Test String"
    
    # So sánh thời gian thực hiện MD5
    start_time_md5 = time.time()
    md5_hash = hash_md5(input_string)
    end_time_md5 = time.time()
    time_md5 = end_time_md5 - start_time_md5
    print("\n--- MD5 ---")
    print("Giá trị băm:", md5_hash)
    print("Độ dài giá trị băm:", len(md5_hash) * 4, "bit")  # Mỗi ký tự hex = 4 bit
    print("Thời gian thực hiện:", time_md5, "giây")
    
    # So sánh thời gian thực hiện SHA-256
    start_time_sha256 = time.time()
    sha256_hash = hash_sha256(input_string)
    end_time_sha256 = time.time()
    time_sha256 = end_time_sha256 - start_time_sha256
    print("\n--- SHA-256 ---")
    print("Giá trị băm:", sha256_hash)
    print("Độ dài giá trị băm:", len(sha256_hash) * 4, "bit")  # Mỗi ký tự hex = 4 bit
    print("Thời gian thực hiện:", time_sha256, "giây")
    
    # So sánh thời gian
    print("\n--- So sánh thời gian ---")
    print("SHA-256 chậm hơn MD5 gấp", round(time_sha256 / time_md5, 2), "lần")

if __name__ == "__main__":
    compare_md5_sha256()
