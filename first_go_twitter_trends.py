import tweepy
import random
import time
import json
import app_vars as av

def main():
    auth = tweepy.OAuthHandler(av.cKey, av.cSecret)
    auth.set_access_token = (av.aToken, av.aSecret)
    api = tweepy.API(auth)

    cities = av.cities
    today = time.strftime("%m/%d/%Y")

    with open("city_tracker","rb") as f:
        all_taken = json.load(f)

    taken_today = all_taken[today]

    if len(taken_today) == len(cities):
        # if we've taken all of the cities once, just get a random one
        take = random.choice(cities)
        data = api.trends_place(take)

    if len(taken_today) < len(cities):
        # if we haven't hit all yet, take random from ones we missed
        choose_from = list(set(cities) - set(taken_today))
        take = random.choice(choose_from)
        data = api.trends_place(take)
        all_taken[today].append(take)

    with open("city_tracker", "wb") as g:
        json.dump(all_taken,g)

    testi = [
        {
            "placeID": data[0]["locations"][0]["woeid"],
            "placeName": data[0]["locations"][0]["name"],
            "tweetVolume": trend["tweet_volume"],
            "tweetName": trend["name"],
            "asOfDate": data[0]["as_of"]
        } for trend in data[0]["trends"]
    ]

    print testi[0]

if __name__ == '__main__':
    main()
