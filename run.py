from app.twitter_giphy import create_app

app = create_app()
app.run(debug=True, threaded=True)
