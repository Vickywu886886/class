from app import app, db
from models.user import User

def init_db():
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Create default users if they don't exist
        if not User.query.filter_by(email='admin@example.com').first():
            admin = User(
                username='admin',
                email='admin@example.com',
                role='admin',
                avatar='default.png'
            )
            admin.set_password('admin123')
            db.session.add(admin)
        
        if not User.query.filter_by(email='teacher1@example.com').first():
            teacher = User(
                username='teacher1',
                email='teacher1@example.com',
                role='teacher',
                avatar='default.png',
                bio='Experienced teacher',
                expertise='Mathematics',
                teaching_style='Interactive'
            )
            teacher.set_password('teacher123')
            db.session.add(teacher)
        
        if not User.query.filter_by(email='student1@example.com').first():
            student = User(
                username='student1',
                email='student1@example.com',
                role='student',
                avatar='default.png'
            )
            student.set_password('student123')
            db.session.add(student)
        
        db.session.commit()

if __name__ == '__main__':
    init_db()
    print("Database initialized with default users.") 