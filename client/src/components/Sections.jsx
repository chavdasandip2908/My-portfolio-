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
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch"
                >
                    {/* Email Card */}
                    <div
                        onClick={() => {
                            navigator.clipboard.writeText('chavdasandip2908@gmail.com');
                            toast.success('Email copied to clipboard!');
                        }}
                        className="group relative cursor-pointer h-full"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
                        <div className="relative flex flex-col items-center p-6 bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full min-h-[180px] justify-center">
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl mb-4 text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 font-mono">Email</h4>
                            <p className="text-gray-900 dark:text-white font-medium break-all text-center text-sm sm:text-base px-2">chavdasandip2908@gmail.com</p>
                        </div>
                    </div>

                    {/* LinkedIn Card */}
                    <a
                        href="https://www.linkedin.com/in/chavdasandip/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-full"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0077b5] to-blue-400 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
                        <div className="relative flex flex-col items-center p-6 bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full min-h-[180px] justify-center">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#0077b5]/10 rounded-xl mb-4 text-[#0077b5] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </div>
                            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 font-mono">LinkedIn</h4>
                            <p className="text-gray-900 dark:text-white font-medium text-center text-sm sm:text-base px-2">chavdasandip</p>
                        </div>
                    </a>

                    {/* GitHub Card */}
                    <a
                        href="https://github.com/chavdasandip2908"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-full"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
                        <div className="relative flex flex-col items-center p-6 bg-white dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full min-h-[180px] justify-center">
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-500/10 rounded-xl mb-4 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </div>
                            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 font-mono">GitHub</h4>
                            <p className="text-gray-900 dark:text-white font-medium text-center text-sm sm:text-base px-2">chavdasandip2908</p>
                        </div>
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
