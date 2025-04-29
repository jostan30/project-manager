// @typescript-eslint/no-unused-expressions
'use client'
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Smartphone, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const Hero = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                if (typeof window === "undefined") return;

                const token = localStorage.getItem("token");
                if (!token) {
                    setIsLoggedIn(false);
                    return;
                }
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsLoggedIn(response.data.success);
                if (response.data.user) {
                    setRole(response.data.user.role);
                    setName(response.data.user.name);
                }
            } catch (error) {
                toast.error(`Error checking login status: ${error instanceof Error ? error.message : String(error)}`);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <div className="relative w-screen min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
            {/* 3D Background Animation */}
            <div className="absolute inset-0 ">
                <Spline scene="https://prod.spline.design/SCR3stcLmc59o21q/scene.splinecode" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block mb-6"
                    >
                        <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                            {name ? `Hello ${name} ` : ""}
                            Welcome to the Future of Project Management
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Redefining the
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"> Digital Project Management </span>
                        Experience
                    </h1>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Experience the next generation of online project management.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                       
                        <motion.button
                            onClick={() => {
                                if (isLoggedIn) {
                                    window.location.href = "/dashboard";
                                } else {
                                    toast.error("You are not authorized to view this page. Please log in.", { duration: 3000 });
                                }
                            }}

                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center justify-center gap-2 bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {/* Real-Time Collaboration */}
                    <div className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                        <div className="bg-blue-500/20 rounded-xl w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Smartphone className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-4">Real-Time Collaboration</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Empower your team to work together seamlessly across tasks and timelines with live updates.
                        </p>
                    </div>

                    {/* Task & Deadline Management */}
                    <div className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                        <div className="bg-blue-500/20 rounded-xl w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Shield className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-4">Task & Deadline Tracking</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Keep your projects on schedule with smart task assignments and intuitive deadline reminders.
                        </p>
                    </div>

                    {/* Performance Analytics */}
                    <div className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                        <div className="bg-blue-500/20 rounded-xl w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Truck className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-4">Performance Analytics</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Visualize progress with real-time charts, reports, and team productivity insights.
                        </p>
                    </div>

                    {/* Instant Notifications */}
                    <div className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                        <div className="bg-blue-500/20 rounded-xl w-12 h-12 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <HeadphonesIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-4">Instant Notifications</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Stay in the loop with automated alerts for task updates, comments, and project milestones.
                        </p>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                        <h4 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">10K+</h4>
                        <p className="text-gray-400">Projects Managed</p>
                    </div>
                    <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                        <h4 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">250K+</h4>
                        <p className="text-gray-400">Tasks Tracked</p>
                    </div>
                    <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                        <h4 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">120+</h4>
                        <p className="text-gray-400">Active Teams</p>
                    </div>
                    <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
                        <h4 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">99.9%</h4>
                        <p className="text-gray-400">Uptime Guarantee</p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

export default Hero;