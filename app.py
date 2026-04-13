# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import gspread
# from oauth2client.service_account import ServiceAccountCredentials

# app = Flask(__name__)
# CORS(app)  # 🔥 IMPORTANT for frontend connection

# # Google Sheets connection
# scope = [
#     "https://spreadsheets.google.com/feeds",
#     "https://www.googleapis.com/auth/drive"
# ]

# creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
# client = gspread.authorize(creds)

# sheet = client.open_by_key("193UAxGGb1YFwpoWfTohanG8P8fdLPRQQ0NhKOhB1sac").sheet1


# @app.route('/submit', methods=['POST'])
# def submit():
#     try:
#         data = request.get_json()  # ✅ safer than request.json

#         if not data:
#             return jsonify({"status": "error", "message": "No data received"}), 400

#         sheet.append_row([
#             data.get('firstName', ''),
#             data.get('lastName', ''),
#             data.get('grade', ''),
#             data.get('dob', ''),
#             data.get('parentName', ''),
#             data.get('phone', ''),
#             data.get('email', '')
#         ])

#         return jsonify({"status": "success"})

#     except Exception as e:
#         return jsonify({"status": "error", "message": str(e)}), 500


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=10000)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"status": "error", "message": "No data received"}), 400

        # 🔥 Temporary: just print data instead of saving
        print("Received data:", data)

        return jsonify({"status": "success"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)