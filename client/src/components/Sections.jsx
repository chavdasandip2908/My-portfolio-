import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../config/api';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('All fields are required');
            return;
        }

        if (formData.name.length < 2) {
            toast.error('Name must be at least 2 characters');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email');
            return;
        }

        if (formData.message.length < 10) {
            toast.error('Message must be at least 10 characters');
            return;
        }

        setSending(true);

        try {
            const response = await fetch(API_ENDPOINTS.contactSend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            toast.error('Failed to send message. Please try again later.');
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
                        Get In <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Touch</span>
                    </h2>
                    <p className="text-lg text-light-muted dark:text-dark-muted mb-10">
                        I am currently available for freelance projects. Have a project in mind? Let's discuss how I can help.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-center gap-4 mb-12"
                >
                    <a href="mailto:sandip@example.com" className="group flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <span className="text-2xl">📧</span>
                        <span className="font-semibold">Email Me</span>
                    </a>
                    <a href="https://linkedin.com/in/sandip" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 px-6 py-4 bg-[#0077b5] text-white rounded-xl hover:opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <span className="text-2xl">💼</span>
                        <span className="font-semibold">LinkedIn</span>
                    </a>
                    <a href="https://github.com/sandip" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-900 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <span className="text-2xl">💻</span>
                        <span className="font-semibold">GitHub</span>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-100 dark:border-gray-700"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Send a Quick Message</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            disabled={sending}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition disabled:opacity-50"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            disabled={sending}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition disabled:opacity-50"
                        />
                        <textarea
                            rows="4"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="How can I help you?"
                            disabled={sending}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition disabled:opacity-50"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-3 bg-accent text-white font-bold rounded-xl hover:bg-emerald-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
