from flask import Flask, request, jsonify, json, Response
from flask_sqlalchemy import SQLAlchemy
from models.model import db, Users, Favorites, UserSchema, FavoritesSchema
from key import key
import requests
from flask_cors import CORS, cross_origin
from random import randint


app = Flask(__name__)
db.init_app(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@localhost/RestaurantRoulette'


user_schema = UserSchema()
users_schema = UserSchema(many=True)
favorite_schema = FavoritesSchema()
favorites_schema = FavoritesSchema(many=True, only=('id', 'content'))
############# Register API requests ###################
# Accounting for
@app.route('/register', methods=['POST'])
def register():
    try:
        username = request.json['username']
        password = request.json['password']
        insertTest = Users(username, password)
        db.session.add(insertTest)
        print(username, password)
        db.session.commit()
        return 200, "Success"
    except:
        return 400, "Failed"


############# user API requests ###################
@app.route('/user', methods=['GET', 'POST', 'DELETE'])
def user():
    # For profile
    # if (request.method == 'GET'):
    #     username = request.headers['username']
    #     users = Users.query.filter_by(username=username).all()
    #     # Serialize the queryset
    #     result = users_schema.dump(users)
    #     # return jsonify({'username': result.data[0]["username"]})
    #     resMessage = {
    #         "username": result.data[0]["username"]
    #     }
    #     res = jsonify(resMessage)
    #     resMessage.status_code = 200
    #     return res

    # Checking username and password verification
    if (request.method == 'POST'):
        username = request.json['username']
        password = request.json['password']
        users = Users.query.filter_by(username=username).all()
        result = users_schema.dump(users)
        if (username == result.data[0]["username"]):
            if (password == result.data[0]["password"]):
                resMessage = {
                    "message": "Success",
                }
                res = jsonify(resMessage)
                res.status_code = 200
            else:
                resMessage = {
                    "message": "Incorrect username or password",
                }
                res = jsonify(resMessage)
                resMessage.status_code = 400

    # For Deleting accounts
    # Account for relationship with favorites list
    elif (request.method == 'DELETE'):
        try:
            username = request.json['username']
            deleteTest = Users.query.filter_by(username=username).first()
            db.session.delete(deleteTest)
            db.session.commit()
            resMessage = {
                "message": "Success",
            }
            res = jsonify(resMessage)
            res.status_code = 200
        except Exception as e:
            resMessage = {
                "message": "Failure",
            }
            res = jsonify(resMessage)
            res.status_code = 400

    return res

############## favoites API requests ##########################
# profile or a way to show the list of what they have as favorites
@app.route('/favorites', methods=['GET', 'POST', 'DELETE'])
def favorites():
    # Need to be able to list all of the restaurants as a json
    if (request.method == 'GET'):
        username = request.json['username']
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
        except Exception as e:
            return("Failed Delete Request")

####################### Google Maps API ################################
search_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
details_url = "https://maps.googleapis.com/maps/api/place/details/json"

@app.route('/maps')
def maps():
    params = {
     'query': request.args.get('location'),
     'radius': request.args.get('radius') or '5000',
     'maxprice': request.args.get('maxprice') or '4',
     'type': 'restaurant',
     'key': key
    }
    ########BY DEFAULT IT WILL SEND A LOT OF PLACES!!!! NO FIX YET BY GOOGLE
    search_json = requests.get(search_url, params=params).json()
    # return jsonify(search_json)
    # print search_json
    results = {}
    # for index, restaurant in enumerate(search_json["results"]):
    flag = True
    while flag:
        index = randint(0, len(search_json["results"])-1)
        restaurant = search_json['results'][index]
        if restaurant['opening_hours']['open_now']:
            results['location'] = restaurant['geometry']['location']
            results['name'] = restaurant['name']
            results['address'] = restaurant['formatted_address']
            # Getting Phone Number
            details_payload = {"key": key, "placeid": restaurant['place_id']}
            details_resp = requests.get(details_url, params=details_payload)
            details_json = details_resp.json()
            results['phone'] = details_json['result']['formatted_phone_number']
            results['price_level'] = restaurant['price_level']
            flag = False

    resMessage = results
    res = jsonify(resMessage)
    res.status_code = 200
    return res


if __name__ == '__main__':
    app.run(debug=True)
