from flask import Flask, render_template, request, redirect, url_for
import qrcode
import os

app = Flask(__name__)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to generate QR code
@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    # Get data from the form
    name = request.form.get('name')
    age = request.form.get('age')
    weight = request.form.get('weight')
    height = request.form.get('height')
    goal = request.form.get('goal')

    # Combine data into a single string
    data = f"Name: {name}, Age: {age}, Weight: {weight}, Height: {height}, Goal: {goal}"

    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    # Create an image from the QR code
    img = qr.make_image(fill_color="black", back_color="white")

    # Save the QR code image
    img_path = "static/qrcode.png"
    img.save(img_path)

    # Redirect to the output page
    return redirect(url_for('output'))

# Route for the output page
@app.route('/output')
def output():
    return render_template('output.html')

# Route to handle scanned QR code and show the data
@app.route('/qr-result')
def qr_result():
    # Get the scanned data from the URL query parameter
    data = request.args.get('data', 'No data found')
    return render_template('qr_result.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
