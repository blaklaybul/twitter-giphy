from flask import Flask, render_template, Blueprint
from flask.ext.cors import CORS
from flask.ext.restful import Api
# import api.api
# import views.employees
# import views.projects

def create_app(config=None, debug=True):

    app = Flask(__name__)
#    app.register_blueprint(api.api.blueprint)
#    app.register_blueprint(views.employees.employees)
#    app.register_blueprint(views.projects.projects)

    cors = CORS(app)

    if config is not None:
        app.config.from_object(config)

    @app.route("/")
    def index():
        return render_template("index.html")


    return app
