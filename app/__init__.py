import os
from flask import Flask, render_template, request, session, redirect
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .helpers import *


from .seeds import seed_commands
from .models import *
from .api import user_routes
from .api import auth_routes
from .api import post_routes
from .api import gigs_routes
from .api import payment_routes
from .api import admin_routes
from .api import content_routes
from .api import event_routes


from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

# Load config files for mastergig
app.config.from_object(Config)


# Register routes for all paths
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(payment_routes, url_prefix='/api/payment')
app.register_blueprint(gigs_routes, url_prefix='/api/gigs')
app.register_blueprint(content_routes, url_prefix='/api/content')
app.register_blueprint(event_routes, url_prefix='/api/event')
app.register_blueprint(admin_routes, url_prefix='/api/admin')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# move to respective route
# upload method
@app.route("/s3_upload", methods=["POST"])
def upload_file():
    if "user_file" not in request.files:
        return "No user_file key in request.files"

    file = request.files["user_file"]

    if file.filename == "":
        return "Please select a file"

        # D.
    if file:
        file.filename = secure_filename(file.filename)
        output = upload_file_to_s3(file, app.config["S3_BUCKET"])
        return str(output)

    else:
        return redirect("/")
