import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'submitting'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert('All fields are required.');
      return;
    }
    
    setStatus('submitting');

    try {
      const response = await fetch('http://127.0.0.1:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12">
            <Mail className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Contact Us</h2>
            <p className="text-gray-400">We'd love to hear from you!</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="text-center p-8 bg-green-900 rounded-xl border border-green-700">
            <h3 className="text-xl font-semibold text-green-400">Message Sent! 🎉</h3>
            <p className="text-green-200 mt-2">Thank you for reaching out. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50 placeholder-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-center mt-2">Failed to send message. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};