#!/usr/bin/env python3
import json
import sys
import os
import numpy as np
from datetime import datetime
import sqlite3
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle

class BankingAI:
    def __init__(self):
        self.banking_keywords = self.initialize_banking_knowledge()
        self.user_interactions = {}
        self.fraud_patterns = self.initialize_fraud_detection()
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self.response_vectors = None
        self.training_data = self.load_training_data()
        self.initialize_ml_model()
        
    def initialize_fraud_detection(self):
        return {
            'suspicious_patterns': [
                r'\b(urgent|emergency|account.*suspended|verify.*immediately)\b',
                r'\b(wire.*transfer|bitcoin|cryptocurrency|gift.*card)\b',
                r'\b(social.*security|ssn|password|pin)\b',
                r'\b(government.*official|irs|tax.*refund)\b'
            ],
            'risk_indicators': {
                'unusual_amount': 0.7,
                'foreign_transaction': 0.6,
                'multiple_failed_logins': 0.8,
                'unusual_time': 0.5,
                'new_device': 0.6
            }
        }

    def initialize_banking_knowledge(self):
        return {
            'account_management': [
                "I can help you manage your account. What specific information do you need?",
                "Your account details are secure. You can view your balance and transactions in the dashboard.",
                "To update your account information, please visit the settings section in your dashboard."
            ],
            'transactions': [
                "I can help you track your transactions. Recent activity is shown in your dashboard.",
                "For transaction disputes, please provide the transaction ID and I'll assist you.",
                "Transfer limits depend on your account type. Check your account settings for details."
            ],
            'security': [
                "Your security is our priority. Enable two-factor authentication for enhanced protection.",
                "If you notice suspicious activity, immediately contact our fraud department.",
                "Never share your PIN, password, or security codes with anyone."
            ],
            'deposits': [
                "You can deposit funds using various methods: bank transfer, mobile check deposit, or ATM.",
                "Deposit limits vary by account type. Check your account terms for specific limits.",
                "International deposits may take 1-3 business days to process."
            ],
            'loans': [
                "We offer various loan products. Would you like to check your eligibility?",
                "Loan applications require income verification and credit check.",
                "Interest rates depend on your credit score and loan type."
            ],
            'investments': [
                "We offer investment products suitable for different risk profiles.",
                "Consider your investment goals and timeline when choosing products.",
                "Investment returns are not guaranteed and may vary with market conditions."
            ],
            'customer_support': [
                "I'm here to help with any banking questions. What can I assist you with?",
                "For complex issues, I can connect you with a human representative.",
                "You can also visit our help center for detailed guides and FAQs."
            ]
        }

    def load_training_data(self):
        try:
            with open('chatbot_training_data.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []

    def initialize_ml_model(self):
        if self.training_data:
            # Prepare training data
            inputs = [item['input'] for item in self.training_data]
            self.response_vectors = self.vectorizer.fit_transform(inputs)

    def detect_fraud(self, message, user_id=None):
        """Enhanced fraud detection with pattern matching and risk scoring"""
        risk_score = 0
        detected_patterns = []
        
        # Check for suspicious patterns
        for pattern in self.fraud_patterns['suspicious_patterns']:
            if re.search(pattern, message.lower()):
                detected_patterns.append(pattern)
                risk_score += 0.3
        
        # Check user behavior patterns
        if user_id and user_id in self.user_interactions:
            user_history = self.user_interactions[user_id]
            
            # Check for unusual activity patterns
            if len(user_history) > 10:
                recent_activity = user_history[-10:]
                if any('urgent' in msg.lower() for msg in recent_activity):
                    risk_score += 0.2
                
                if any('password' in msg.lower() or 'pin' in msg.lower() for msg in recent_activity):
                    risk_score += 0.3
        
        return {
            'risk_score': min(risk_score, 1.0),
            'detected_patterns': detected_patterns,
            'is_suspicious': risk_score > 0.5
        }

    def learn_from_interaction(self, user_id, message, response, feedback=None):
        """Learn from user interactions to improve responses"""
        if user_id not in self.user_interactions:
            self.user_interactions[user_id] = []
        
        self.user_interactions[user_id].append({
            'message': message,
            'response': response,
            'timestamp': datetime.now().isoformat(),
            'feedback': feedback
        })
        
        # Limit history to last 100 interactions
        if len(self.user_interactions[user_id]) > 100:
            self.user_interactions[user_id] = self.user_interactions[user_id][-100:]

    def get_smart_response(self, message, user_id=None):
        """Get intelligent response using ML and context"""
        message_lower = message.lower()
        
        # First, check for fraud
        fraud_result = self.detect_fraud(message, user_id)
        if fraud_result['is_suspicious']:
            return {
                'response': "I've detected potentially suspicious activity. For your security, please contact our fraud department immediately at 1-800-FRAUD-HELP.",
                'fraud_alert': True,
                'risk_score': fraud_result['risk_score']
            }
        
        # Use ML model if available
        if self.response_vectors is not None:
            try:
                # Vectorize the input message
                input_vector = self.vectorizer.transform([message])
                
                # Calculate similarity with training data
                similarities = cosine_similarity(input_vector, self.response_vectors)
                best_match_idx = np.argmax(similarities)
                
                if similarities[0][best_match_idx] > 0.3:  # Threshold for good match
                    response = self.training_data[best_match_idx]['output']
                else:
                    response = self.get_keyword_response(message_lower)
            except:
                response = self.get_keyword_response(message_lower)
        else:
            response = self.get_keyword_response(message_lower)
        
        # Learn from this interaction
        self.learn_from_interaction(user_id, message, response)
        
        return {
            'response': response,
            'fraud_alert': False,
            'risk_score': fraud_result['risk_score']
        }

    def get_keyword_response(self, message_lower):
        """Get response based on keyword matching"""
        for category, responses in self.banking_keywords.items():
            if any(keyword in message_lower for keyword in category.split('_')):
                return np.random.choice(responses)
        
        # Fallback responses based on context
        if any(word in message_lower for word in ['help', 'support', 'assist']):
            return "I'm here to help with your banking needs. Could you please provide more details about what you need assistance with?"
        elif any(word in message_lower for word in ['balance', 'account', 'money']):
            return "You can check your account balance and recent transactions in your dashboard. Is there something specific you'd like to know about your account?"
        elif any(word in message_lower for word in ['transfer', 'send', 'payment']):
            return "I can help you with transfers and payments. You can use the 'Send Money' feature in your dashboard for quick transfers."
        else:
            return "I'm here to help with any banking-related questions. Could you please clarify what you need assistance with?"

    def get_personalized_recommendations(self, user_id):
        """Get personalized banking recommendations based on user behavior"""
        if user_id not in self.user_interactions:
            return []
        
        user_history = self.user_interactions[user_id]
        recommendations = []
        
        # Analyze user behavior patterns
        security_mentions = sum(1 for interaction in user_history 
                              if 'security' in interaction['message'].lower())
        transaction_mentions = sum(1 for interaction in user_history 
                                 if any(word in interaction['message'].lower() 
                                       for word in ['transfer', 'payment', 'transaction']))
        
        if security_mentions > 2:
            recommendations.append({
                'type': 'security',
                'title': 'Enhanced Security',
                'description': 'Consider enabling biometric authentication for faster, more secure access.',
                'priority': 'high'
            })
        
        if transaction_mentions > 3:
            recommendations.append({
                'type': 'convenience',
                'title': 'Quick Transfer Setup',
                'description': 'Set up recurring transfers to save time on regular payments.',
                'priority': 'medium'
            })
        
        return recommendations

    def process_message(self, data):
        try:
            message = data.get('message', '')
            user_id = data.get('user_id', None)
            feedback = data.get('feedback', None)

            if not message.strip():
                return {"error": "Empty message"}

            # Get intelligent response
            result = self.get_smart_response(message, user_id)
            
            # Add personalized recommendations
            if user_id:
                recommendations = self.get_personalized_recommendations(user_id)
                if recommendations:
                    result['recommendations'] = recommendations

            result['timestamp'] = datetime.now().isoformat()
            return result

        except Exception as e:
            return {"error": f"Processing error: {str(e)}"}

    def save_user_data(self):
        """Save user interaction data for persistence"""
        try:
            with open('user_interactions.json', 'w') as f:
                json.dump(self.user_interactions, f, indent=2)
        except Exception as e:
            print(f"Error saving user data: {e}")

    def load_user_data(self):
        """Load user interaction data"""
        try:
            with open('user_interactions.json', 'r') as f:
                self.user_interactions = json.load(f)
        except FileNotFoundError:
            self.user_interactions = {}


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Invalid arguments"}))
        sys.exit(1)

    try:
        input_data = json.loads(sys.argv[1])
        ai = BankingAI()
        ai.load_user_data()  # Load existing user data
        result = ai.process_message(input_data)
        ai.save_user_data()  # Save updated user data
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": f"Unexpected error: {str(e)}"}))
        sys.exit(1)

if __name__ == "__main__":
    main()
