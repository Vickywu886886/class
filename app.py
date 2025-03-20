from flask import Flask, jsonify
from extensions import db, jwt, cors, migrate
from datetime import timedelta, datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')
<<<<<<< HEAD
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///database.db')
=======
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///education_platform.db')
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize extensions
db.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)

# Configure CORS
cors.init_app(app, resources={
    r"/api/*": {
<<<<<<< HEAD
        "origins": ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:3004"],
=======
        "origins": ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"],
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Import models
from models.user import User
from models.course import Course
from models.schedule import Schedule
from models.booking import Booking

# Import routes
from routes.auth import auth_bp
from routes.student import student_bp
from routes.teacher import teacher_bp
from routes.admin import admin_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(student_bp, url_prefix='/api/student')
app.register_blueprint(teacher_bp, url_prefix='/api/teacher')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Education Platform API"})

<<<<<<< HEAD
# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=3004) 
=======
# Create database tables and add default teacher
with app.app_context():
    db.create_all()
    # Check if default teacher exists
    default_teacher = User.query.filter_by(email='teacher1@example.com').first()
    if not default_teacher:
        teacher = User(
            username='teacher1',
            email='teacher1@example.com',
            role='teacher',
            created_at=datetime.utcnow()
        )
        teacher.set_password('password123')
        db.session.add(teacher)
        db.session.commit()
        print('Default teacher account created successfully!')

if __name__ == '__main__':
    app.run(debug=True, port=5001) 
>>>>>>> 417a01e2b58f8c81056a4604f9083ae808e8bcfc
