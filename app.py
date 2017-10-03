from flask import Flask
from flask import render_template
from flask import jsonify
import decode_can_code
import  os
from flask import request
#from flask.ext.sq

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
#@app.route('/additem/<barcode>/')
def additem():
    #if request.args.get('barcode', None):
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
		"id":1,
		"name":"test",
		"price":100,
		"quantity":1,
		"total_amount": 6
	},
	{
		"id":2,
		"name":"test2",
		"price":142,
		"quantity":1,
		"total_amount": 6
	},
	{
		"id":3,
		"name":"test3",
		"price":4,
		"quantity":1,
		"total_amount": 5
	}
]

text = '{"canApprove": true,"hasDisplayed": false}'

@app.route('/getbarcode/')
def getBarcode():
    print("respons")
    S=str(test5)
   # print(jsonify({"test5":test5}))
    return jsonify({"test5":S})

@app.route('/hello')
def hello_world():
    return 'Hello World2!'

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)