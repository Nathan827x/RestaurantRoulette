from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, ValidationError, pre_load
from models.model import db, Users, Favorites

app = Flask(__name__)
db.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@localhost/RestaurantRoulette'

############# user API requests ###################
# For login
@app.route('/user', methods=['GET'])
def get_user():
    email = Users.query.filter_by(username='Email@email.com').first()
    return ("This is a get request " + email.username)

# This is for registering
@app.route('/user', methods=['POST'])
def post_users():
    # Still need to accunt for duplicate entries
    insertTest = Users('Email@email.com', "password")
    db.session.add(insertTest)
    db.session.commit()
    return ("This is a post request")

# For deleteing an account
@app.route('/user', methods=['DELETE'])
def delete_users():
    deleteTest = Users.query.filter_by(username='Email@email.com').first()
    db.session.delete(deleteTest)
    db.session.commit()
    return ("This is a delete request")
############## favoites API requests ##########################
# profile or a way to show the list of what they have as favorites
@app.route('/favorites', methods=['GET'])
def get_favorites():
    email = Favorites.query.all()
    return ("This is a get request " + email.username)

# This is for favorting a place to eat
@app.route('/favorites', methods=['POST'])
def post_favorites():
    # Still need to accunt for duplicate entries
    # The goal is for DEFAULT be the primary key
    insertTest = Favorites( fav_id= None , username="Email@email.com", restaurant_name=" Famous")
    db.session.add(insertTest)
    db.session.commit()
    return ("This is a post request")

# For deleteing an restaurant names
@app.route('/favorites', methods=['DELETE'])
def delete_favorites():
    # This needs to be the deleted restaurant name
    # deleteTest = Favorites.query.filter_by(fav_id=).first()
    db.session.delete(deleteTest)
    db.session.commit()
    return ("This is a delete request")



if __name__ == '__main__':
    app.run(debug=True)
