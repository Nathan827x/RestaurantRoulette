from flask import Flask, request, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, ValidationError, pre_load
from models.model import db, Users, Favorites

app = Flask(__name__)
db.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@localhost/RestaurantRoulette'

############# Register API requests ###################
# Accounting for
@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    insertTest = Users(username, password)
    db.session.add(insertTest)
    db.session.commit()
    return ("This post request was succesful.")


############# user API requests ###################
@app.route('/user', methods=['GET', 'POST', 'DELETE'])
def user():
    # For profile
    if (request.method == 'GET'):
        username = request.headers['username']
        email = Users.query.filter_by(username=username).first()
        return ("This is a get request " + email.username)

    # Checking username and password verification
    elif (request.method == 'POST'):
        username = request.json['username']
        password = request.json['password']
        email = Users.query.filter_by(username=username).first()
        if (username == email.username):
            if (password == email.password):
                return ("This post request was succesful.")

        return ("This Login Request has failed")

    # For Deleting accounts
    # Account for relationship with favorites list
    elif (request.method == 'DELETE'):
        try:
            username = request.json['username']
            deleteTest = Users.query.filter_by(username=username).first()
            db.session.delete(deleteTest)
            db.session.commit()
            return ("The delete request was succesful")
        except Exception ,e:
            return("Failed Delete Request")

############## favoites API requests ##########################
# profile or a way to show the list of what they have as favorites
@app.route('/favorites', methods=['GET', 'POST', 'DELETE'])
def favorites():
    # Need to be able to list all of the restaurants as a json
    if (request.method == 'GET'):

        #username = request.json['username']
        email = Favorites.query.filter_by(username="Email@email.com").all()
        # Initialize a employee list
        favList = []
        # create a instances for filling up employee list
        for element in email:
            entry = {
            'fav_id': element.fav_id,
            'restaurant_name': element.restaurant_name}
            favList.append(entry)

        return(jsonify(favList))
    # This is for favorting a place to eat
    elif (request.method == 'POST'):
        # Still need to accunt for duplicate entries
        # The goal is for DEFAULT be the primary key
        username = request.json['username']
        restaurant_name = request.json['restaurant_name']
        insertTest = Favorites( None , username,  restaurant_name)
        db.session.add(insertTest)
        db.session.commit()
        return ("This is a post request")

    # For deleting an restaurant names
    elif (request.method == 'DELETE'):
        try:
            fav_id = request.json['fav_id']
            deleteTest = Favorites.query.filter_by(fav_id=fav_id).first()
            db.session.delete(deleteTest)
            db.session.commit()
            return ("This is a delete request")
        except Exception ,e:
            return("Failed Delete Request")

if __name__ == '__main__':
    app.run(debug=True)
