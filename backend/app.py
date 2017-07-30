from flask import Flask, request, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from models.model import db, Users, Favorites, UserSchema, FavoritesSchema
from key import key
import requests

app = Flask(__name__)
db.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:admin@localhost/RestaurantRoulette'



user_schema = UserSchema()
users_schema = UserSchema(many=True)
favorite_schema = FavoritesSchema()
favorites_schema = FavoritesSchema(many=True, only=('id', 'content'))
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
        users = Users.query.filter_by(username=username).all()
        # Serialize the queryset
        result = users_schema.dump(users)
        return jsonify({'username': result.data[0]["username"]})

    # Checking username and password verification
    elif (request.method == 'POST'):
        username = request.json['username']
        password = request.json['password']
        email = Users.query.filter_by(username=username).all()
        result = users_schema.dump(users)
        if (username == result.data[0]["username"]):
            if (password == result.data[0]["password"]):
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

####################### Google Maps API ################################
search_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?type=restaurant"
details_url = "https://maps.googleapis.com/maps/api/place/details/json"

@app.route('/maps/<string:query>')
def maps(query):
    search_payload = {"key":key, "query":query}
    search_req = requests.get(search_url, params=search_payload)
    search_json = search_req.json()
    dictLength = len(search_json)
    RestaurantNames = [search_json["results"][item]['name'] for item in range(0,dictLength)]
    # return (jsonify(names = RestaurantNames))
    # return (jsonify(search_json))

    place_id = search_json["results"][0]["place_id"]

    details_payload = {"key":key, "placeid":place_id}
    details_resp = requests.get(details_url, params=details_payload)
    details_json = details_resp.json()

    return(jsonify(details_json))
    url = details_json["result"]["url"]
    # return jsonify({'result' : url})



if __name__ == '__main__':
    app.run(debug=True)
