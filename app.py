from flask import Flask
from flask import render_template
from flask import jsonify
import decode_can_code
import os
import json
from flask import request

# from flask.ext.sq


app = Flask(__name__, static_url_path="", static_folder='static')
app._static_folder = os.path.abspath("static")
app._static_folder = 'static'


@app.route('/')
def index():
    user = {'nickname': 'Miguel'}
    return render_template("index.html", user=user)


@app.route('/login', methods=['GET', 'POST'])
def login():
    # print('hello ', name)
    return render_template("login.html")


@app.route('/sell/')
def sell():
    return render_template("sell_page.html")


@app.route('/additem/', methods=['GET', 'POST'])
# @app.route('/additem/<barcode>/')
def additem():
    # if request.args.get('barcode', None):
    if request.method == 'GET':
        data = request.args.get('barcode')
        return render_template("add_t.html", barcode=data)
    elif request.method == 'POST':
        barc_post = request.form['barcode']
        name_item = request.form['name']
        amount = request.form['amount']
        print(barc_post, amount, name_item)
        return "ECHO: POST\n"
    else:
        return render_template("add_t.html")


@app.route('/admin/')
def admin():
    return render_template("base.html")


test5 = [
    {
        "id": 7,
        "name": "0",
        "price": 100500,
        "quantity": 1,
        "total_amount": 6
    },
    {
        "id": 6,
        "name": "1",
        "price": 4,
        "quantity": 1,
        "total_amount": 6
    },
    {
        "id": 5,
        "name": "2",
        "price": 142,
        "quantity": 1,
        "total_amount": 6
    },
    {
        "id": 339,
        "name": "3",
        "price": 1,
        "quantity": 2,
        "total_amount": 10
    }
]

text = '{"canApprove": true,"hasDisplayed": false}'


@app.route('/getbarcode/', methods=['GET', 'POST'])
def getBarcode():
    print("respons")
    S = str(test5)
    if request.method == 'GET':
        # print("this is reqest",json.loads(request.args))
        print("this is reqest", request.args)
        if "barcode" in request.args:
            print("its barcode")
            data = request.args.get('barcode')
            print(test5[int(data)])
            return jsonify(test5[int(data)])
    elif request.method == 'POST':
        print("its mass", request.get_json(force=True))
        return "xyz", 200



        # if "collection[0][price]" in request.args:
        #     print(request.args.get("2"))
        #     return "xyz", 200
        # data = request.args.get('barcode')
        # print(test5[int(data)])
        # #return render_template("add_t.html", barcode=data)
        # return jsonify(test5[int(data)])


@app.route('/hello')
def hello_world():
    return 'Hello World2!'


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
