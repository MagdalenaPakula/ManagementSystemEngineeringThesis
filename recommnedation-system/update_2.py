from flask import Flask, render_template, request, jsonify
import traceback

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    try:
        # Your existing code for processing user input and generating suggestions here...
        return jsonify({"success": True, "message": "Request processed successfully"})
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()  # Print the traceback to see the details of the error
        return jsonify({"success": False, "message": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
