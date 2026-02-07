# app/__init__.py

from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import jwt, mongo


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.config["MONGO_URI"] = Config.MONGODB_URI
    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

    mongo.init_app(app)
    jwt.init_app(app)

    # Dev-only wildcard CORS so the browser never blocks
    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},  # dev-only wildcard
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Content-Type", "Authorization"],
    )

    from app.routes.auth_routes import auth_bp
    from app.routes.tutor_routes import tutor_bp
    from app.routes.match_routes import match_bp
    from app.routes.message_routes import message_bp
    from app.routes.user_routes import user_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(tutor_bp, url_prefix="/api/tutors")
    app.register_blueprint(match_bp, url_prefix="/api/matches")
    app.register_blueprint(message_bp, url_prefix="/api/messages")
    app.register_blueprint(user_bp, url_prefix="/api/users")

    # Catch-all OPTIONS for any /api/... path
    @app.route("/api/<path:path>", methods=["OPTIONS"])
    def api_options(path):
        # empty 204; Flask-CORS will attach the CORS headers
        return ("", 204)

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    return app
