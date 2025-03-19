from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

student_bp = Blueprint('student', __name__)

@student_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    current_user_id = get_jwt_identity()
    # TODO: Implement dashboard data retrieval
    return jsonify({"message": "Student dashboard"}) 