from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@localhost/RestaurantRoulette'
db = SQLAlchemy(app)

# Class name should be the name of the table
class Users(db.Model):
    username = db.Column(db.String(150), primary_key=True)
    password = db.Column(db.String(150))

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username


# For login
@app.route('/user', methods=['GET'])
def get_user():
    return ("This is a get request")

# This is for registering
@app.route('/user', methods=['POST'])
def post_tasks():
    # Still need to accunt for duplicate entries
    # test = Users('Email@email.com', "password")
    db.session.add(test)
    db.session.commit()
    return ("This is a post request")

if __name__ == '__main__':
    app.run(debug=True)
