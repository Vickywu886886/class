from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from models.course import Course
from models.schedule import Schedule
from models.booking import Booking
from extensions import db
from datetime import datetime, timedelta
import openai
import os
from dotenv import load_dotenv

load_dotenv()

teacher_bp = Blueprint('teacher', __name__)

# 配置 OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

@teacher_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    current_user_id = get_jwt_identity()
    teacher = User.query.get(current_user_id)
    
    # 获取教师的课程
    courses = Course.query.filter_by(teacher_id=current_user_id).all()
    
    # 获取今日课程表
    today = datetime.now().date()
    schedules = Schedule.query.filter(
        Schedule.course_id.in_([course.id for course in courses]),
        Schedule.date == today
    ).all()
    
    # 获取今日预约
    bookings = Booking.query.filter(
        Booking.schedule_id.in_([schedule.id for schedule in schedules])
    ).all()
    
    return jsonify({
        "courses": [{
            "id": course.id,
            "name": course.name,
            "description": course.description,
            "price": course.price,
            "duration": course.duration,
            "level": course.level,
            "category": course.category
        } for course in courses],
        "schedules": [{
            "id": schedule.id,
            "course_id": schedule.course_id,
            "course_name": schedule.course.name,
            "date": schedule.date.strftime('%Y-%m-%d'),
            "start_time": schedule.start_time.strftime('%H:%M'),
            "end_time": schedule.end_time.strftime('%H:%M'),
            "location": schedule.location
        } for schedule in schedules],
        "bookings": [{
            "id": booking.id,
            "student_name": booking.student.username,
            "course_name": booking.schedule.course.name,
            "date": booking.schedule.date.strftime('%Y-%m-%d'),
            "start_time": booking.schedule.start_time.strftime('%H:%M'),
            "status": booking.status
        } for booking in bookings]
    })

@teacher_bp.route('/courses', methods=['GET'])
@jwt_required()
def get_courses():
    current_user_id = get_jwt_identity()
    courses = Course.query.filter_by(teacher_id=current_user_id).all()
    return jsonify([{
        "id": course.id,
        "name": course.name,
        "description": course.description,
        "price": course.price,
        "duration": course.duration,
        "level": course.level,
        "category": course.category
    } for course in courses])

@teacher_bp.route('/courses', methods=['POST'])
@jwt_required()
def create_course():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    course = Course(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        duration=data['duration'],
        level=data['level'],
        category=data['category'],
        teacher_id=current_user_id
    )
    
    db.session.add(course)
    db.session.commit()
    
    return jsonify({
        "id": course.id,
        "name": course.name,
        "description": course.description,
        "price": course.price,
        "duration": course.duration,
        "level": course.level,
        "category": course.category
    }), 201

@teacher_bp.route('/courses/<int:course_id>', methods=['PUT'])
@jwt_required()
def update_course(course_id):
    current_user_id = get_jwt_identity()
    course = Course.query.filter_by(id=course_id, teacher_id=current_user_id).first_or_404()
    
    data = request.get_json()
    course.name = data.get('name', course.name)
    course.description = data.get('description', course.description)
    course.price = data.get('price', course.price)
    course.duration = data.get('duration', course.duration)
    course.level = data.get('level', course.level)
    course.category = data.get('category', course.category)
    
    db.session.commit()
    
    return jsonify({
        "id": course.id,
        "name": course.name,
        "description": course.description,
        "price": course.price,
        "duration": course.duration,
        "level": course.level,
        "category": course.category
    })

@teacher_bp.route('/courses/<int:course_id>', methods=['DELETE'])
@jwt_required()
def delete_course(course_id):
    current_user_id = get_jwt_identity()
    course = Course.query.filter_by(id=course_id, teacher_id=current_user_id).first_or_404()
    
    db.session.delete(course)
    db.session.commit()
    
    return '', 204

@teacher_bp.route('/schedules', methods=['GET'])
@jwt_required()
def get_schedules():
    current_user_id = get_jwt_identity()
    courses = Course.query.filter_by(teacher_id=current_user_id).all()
    course_ids = [course.id for course in courses]
    
    schedules = Schedule.query.filter(Schedule.course_id.in_(course_ids)).all()
    return jsonify([{
        "id": schedule.id,
        "course_id": schedule.course_id,
        "course_name": schedule.course.name,
        "date": schedule.date.strftime('%Y-%m-%d'),
        "start_time": schedule.start_time.strftime('%H:%M'),
        "end_time": schedule.end_time.strftime('%H:%M'),
        "location": schedule.location
    } for schedule in schedules])

@teacher_bp.route('/schedules', methods=['POST'])
@jwt_required()
def create_schedule():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # 验证课程是否属于当前教师
    course = Course.query.filter_by(id=data['course_id'], teacher_id=current_user_id).first_or_404()
    
    schedule = Schedule(
        course_id=data['course_id'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
        start_time=datetime.strptime(data['start_time'], '%H:%M').time(),
        end_time=datetime.strptime(data['end_time'], '%H:%M').time(),
        location=data['location']
    )
    
    db.session.add(schedule)
    db.session.commit()
    
    return jsonify({
        "id": schedule.id,
        "course_id": schedule.course_id,
        "course_name": schedule.course.name,
        "date": schedule.date.strftime('%Y-%m-%d'),
        "start_time": schedule.start_time.strftime('%H:%M'),
        "end_time": schedule.end_time.strftime('%H:%M'),
        "location": schedule.location
    }), 201

@teacher_bp.route('/schedules/<int:schedule_id>', methods=['PUT'])
@jwt_required()
def update_schedule(schedule_id):
    current_user_id = get_jwt_identity()
    schedule = Schedule.query.join(Course).filter(
        Schedule.id == schedule_id,
        Course.teacher_id == current_user_id
    ).first_or_404()
    
    data = request.get_json()
    schedule.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    schedule.start_time = datetime.strptime(data['start_time'], '%H:%M').time()
    schedule.end_time = datetime.strptime(data['end_time'], '%H:%M').time()
    schedule.location = data['location']
    
    db.session.commit()
    
    return jsonify({
        "id": schedule.id,
        "course_id": schedule.course_id,
        "course_name": schedule.course.name,
        "date": schedule.date.strftime('%Y-%m-%d'),
        "start_time": schedule.start_time.strftime('%H:%M'),
        "end_time": schedule.end_time.strftime('%H:%M'),
        "location": schedule.location
    })

@teacher_bp.route('/schedules/<int:schedule_id>', methods=['DELETE'])
@jwt_required()
def delete_schedule(schedule_id):
    current_user_id = get_jwt_identity()
    schedule = Schedule.query.join(Course).filter(
        Schedule.id == schedule_id,
        Course.teacher_id == current_user_id
    ).first_or_404()
    
    db.session.delete(schedule)
    db.session.commit()
    
    return '', 204

@teacher_bp.route('/bookings', methods=['GET'])
@jwt_required()
def get_bookings():
    current_user_id = get_jwt_identity()
    courses = Course.query.filter_by(teacher_id=current_user_id).all()
    course_ids = [course.id for course in courses]
    
    schedules = Schedule.query.filter(Schedule.course_id.in_(course_ids)).all()
    schedule_ids = [schedule.id for schedule in schedules]
    
    bookings = Booking.query.filter(Booking.schedule_id.in_(schedule_ids)).all()
    return jsonify([{
        "id": booking.id,
        "student_name": booking.student.username,
        "course_name": booking.schedule.course.name,
        "date": booking.schedule.date.strftime('%Y-%m-%d'),
        "start_time": booking.schedule.start_time.strftime('%H:%M'),
        "status": booking.status
    } for booking in bookings])

@teacher_bp.route('/bookings/<int:booking_id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(booking_id):
    current_user_id = get_jwt_identity()
    booking = Booking.query.join(Schedule).join(Course).filter(
        Booking.id == booking_id,
        Course.teacher_id == current_user_id
    ).first_or_404()
    
    data = request.get_json()
    booking.status = data['status']
    
    db.session.commit()
    
    return jsonify({
        "id": booking.id,
        "student_name": booking.student.username,
        "course_name": booking.schedule.course.name,
        "date": booking.schedule.date.strftime('%Y-%m-%d'),
        "start_time": booking.schedule.start_time.strftime('%H:%M'),
        "status": booking.status
    })

@teacher_bp.route('/generate-course', methods=['POST'])
@jwt_required()
def generate_course():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # 使用 OpenAI API 生成课程内容
    prompt = f"""请为以下课程生成详细的教学大纲和内容：
    课程名称：{data['name']}
    课程类别：{data['category']}
    难度级别：{data['level']}
    课程时长：{data['duration']}分钟
    目标学生：{data.get('target_students', '所有学生')}
    
    请提供：
    1. 课程简介
    2. 教学目标
    3. 课程大纲
    4. 教学方法
    5. 评估方式
    """
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "你是一个专业的教育课程设计专家。"},
                {"role": "user", "content": prompt}
            ]
        )
        
        generated_content = response.choices[0].message.content
        
        # 创建课程
        course = Course(
            name=data['name'],
            description=generated_content,
            price=data['price'],
            duration=data['duration'],
            level=data['level'],
            category=data['category'],
            teacher_id=current_user_id
        )
        
        db.session.add(course)
        db.session.commit()
        
        return jsonify({
            "id": course.id,
            "name": course.name,
            "description": course.description,
            "price": course.price,
            "duration": course.duration,
            "level": course.level,
            "category": course.category
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500 