from flask import Flask, jsonify
from flask_cors import CORS  # Thêm thư viện CORS
import random

app = Flask(__name__)
CORS(app)  # Kích hoạt CORS cho toàn bộ ứng dụng

@app.route('/api/data', methods=['GET'])
def get_data():
    days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
    data = [
        {
            "day": day,
            "returned": random.randint(0, 100),
            "borrowed": random.randint(0, 100)
        }
        for day in days
    ]
    return jsonify(data)

@app.route('/api/monthly-data', methods=['GET'])
def get_monthly_data():
    months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ]
    data = [
        {
            "month": month,
            "returned": random.randint(100, 1000),  # Số ngẫu nhiên lớn hơn để đại diện cho dữ liệu tháng
            "borrowed": random.randint(100, 1000)
        }
        for month in months
    ]
    return jsonify(data)

@app.route('/api/top-book-borrow', methods=['GET'])
def get_top_book_borrow():
    top_books = [
        {
            "_id": str(random.randint(100000, 999999)),
            "borrowCount": random.randint(1, 50),  # Số ngẫu nhiên từ 1 đến 50
            "title": f"Book Title {i}+ sdf",
            "author": f"Author {i}",
            "img": None
        }
        for i in range(10)
    ]
    return jsonify(top_books)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
