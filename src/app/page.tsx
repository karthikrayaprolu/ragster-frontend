'use client';

import Link from 'next/link';
import Image from 'next/image';
import SplineRobot from '@/components/SplineRobot';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });

      gsap.from('.hero-robot', {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        delay: 0.4,
        ease: 'power3.out',
      });

      // Workflow steps animation
      gsap.from('.workflow-step', {
        scrollTrigger: {
          trigger: workflowRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });

      // Features animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" ref={heroRef}>
      <main className="container mx-auto px-4" data-scroll-section>
        {/* Hero Section with 3D Robot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 min-h-[80vh]">
          {/* Left side - Text Content */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6 hero-title">
              <Image 
                src="/logo.svg" 
                alt="RAGster Logo" 
                width={100} 
                height={100}
                priority
                className="opacity-90"
              />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 hero-title">
              Welcome to <span className="gradient-accent">RAGster</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 hero-subtitle leading-relaxed">
              Your Custom RAG Platform. Upload documents, connect databases, 
              and get AI-powered answers with your own API endpoint.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 hero-buttons">
              <Link 
                href="/auth"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-gray-200 transform hover:scale-105 text-center shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link 
                href="/auth"
                className="glass border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/10 transform hover:scale-105 text-center"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right side - 3D Robot */}
          <div className="flex justify-center items-center hero-robot">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-500/20 blur-3xl rounded-full"></div>
              <SplineRobot />
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <div ref={workflowRef} className="mb-32 glass rounded-3xl p-12 border border-white/10" data-scroll data-scroll-speed="1">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            <span className="gradient-accent">How It Works</span>
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6 workflow-step">
              <div className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-3">🧍‍♂️ Register / Login</h3>
                <p className="text-gray-400 text-lg">Get your unique <code className="bg-white/10 px-3 py-1 rounded text-white">user_id</code> and <code className="bg-white/10 px-3 py-1 rounded text-white">api_key</code></p>
              </div>
            </div>

            <div className="flex items-start gap-6 workflow-step">
              <div className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-3">📤 Upload Data or Connect Database</h3>
                <p className="text-gray-400 text-lg">Upload files (PDF, CSV, TXT, JSON) or connect SQL/NoSQL databases</p>
              </div>
            </div>

            <div className="flex items-start gap-6 workflow-step">
              <div className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-3">⚙️ Automatic Processing</h3>
                <p className="text-gray-400 text-lg">Text extracted → chunked → embedded → stored in vector database (per user)</p>
              </div>
            </div>

            <div className="flex items-start gap-6 workflow-step">
              <div className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">4</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-3">💬 Ask Questions on Dashboard</h3>
                <p className="text-gray-400 text-lg">Type questions → system retrieves relevant data → LLM answers contextually</p>
              </div>
            </div>

            <div className="flex items-start gap-6 workflow-step">
              <div className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">5</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-3">🌐 Use Your API Endpoint</h3>
                <p className="text-gray-400 text-lg">Call <code className="bg-white/10 px-3 py-1 rounded text-white">/api/ask/&lt;user_id&gt;</code> from your app/chatbot using your API key</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8" data-scroll data-scroll-speed="0.5">
          <div className="feature-card glass rounded-2xl p-8 border border-white/10 text-center hover:border-white/30 transition-all group cursor-pointer">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">📄</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Multi-Format Support</h3>
            <p className="text-gray-400 leading-relaxed">
              PDF, CSV, TXT, JSON files and PostgreSQL, MySQL, MongoDB databases
            </p>
          </div>

          <div className="feature-card glass rounded-2xl p-8 border border-white/10 text-center hover:border-white/30 transition-all group cursor-pointer">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🤖</div>
            <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered RAG</h3>
            <p className="text-gray-400 leading-relaxed">
              Advanced embeddings & vector search for accurate context retrieval
            </p>
          </div>

          <div className="feature-card glass rounded-2xl p-8 border border-white/10 text-center hover:border-white/30 transition-all group cursor-pointer">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">🔌</div>
            <h3 className="text-2xl font-semibold text-white mb-4">API Integration</h3>
            <p className="text-gray-400 leading-relaxed">
              REST API endpoint for seamless integration with your applications
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
