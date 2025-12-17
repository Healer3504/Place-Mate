// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Coffee, Mail, Lock } from "lucide-react";
import theme from "../../theme";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setBusy(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(135deg, ${theme.espresso} 0%, ${theme.darkRoast} 25%, ${theme.mocha} 50%, ${theme.latte} 100%)`
        }}
      />
      
      {/* Floating Coffee Beans */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            width: Math.random() * 60 + 20 + 'px',
            height: Math.random() * 60 + 20 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: theme.accent.caramel,
            animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
        {/* Left Side - Branding */}
        <div 
          className="hidden md:flex items-center justify-center p-12 relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${theme.espresso} 0%, ${theme.darkRoast} 100%)`
          }}
        >
          {/* Steam Effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-16 rounded-full opacity-20"
                style={{
                  background: theme.milk,
                  left: `${i * 30 - 30}px`,
                  animation: `steam ${3 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-block p-6 rounded-full mb-6 transform transition-all duration-500 hover:scale-110 hover:rotate-12"
                 style={{ background: `linear-gradient(135deg, ${theme.accent.caramel}, ${theme.accent.cinnamon})` }}>
              <Coffee size={64} className="text-white" strokeWidth={2} />
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              PlaceMate
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              Your Perfect Blend of Success
            </p>
            
            <div className="space-y-4 text-left max-w-sm mx-auto">
              {[
                "Track placements effortlessly",
                "Practice with precision",
                "Manage applications smartly"
              ].map((text, i) => (
                <div 
                  key={i}
                  className="text-white/80 text-sm font-medium transform transition-all duration-300 hover:translate-x-2 hover:text-white"
                  style={{ 
                    animation: `slideIn 0.6s ease-out ${i * 0.2}s both`,
                    paddingLeft: '1.5rem',
                    position: 'relative'
                  }}
                >
                  <span 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: theme.accent.caramel
                    }}
                  />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-4xl font-bold mb-3" style={{ color: theme.espresso }}>
              Welcome Back
            </h2>
            <p className="text-lg mb-8" style={{ color: theme.cappuccino }}>
              Login to continue your journey
            </p>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail 
                    size={20} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                    style={{ color: focusedInput === 'email' ? theme.accent.cinnamon : theme.cream }}
                  />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 outline-none transition-all duration-300"
                    style={{
                      borderColor: focusedInput === 'email' ? theme.accent.cinnamon : theme.foam,
                      backgroundColor: focusedInput === 'email' ? theme.milk : 'white'
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                  Password
                </label>
                <div className="relative">
                  <Lock 
                    size={20} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                    style={{ color: focusedInput === 'password' ? theme.accent.cinnamon : theme.cream }}
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 outline-none transition-all duration-300"
                    style={{
                      borderColor: focusedInput === 'password' ? theme.accent.cinnamon : theme.foam,
                      backgroundColor: focusedInput === 'password' ? theme.milk : 'white'
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded" style={{ accentColor: theme.accent.cinnamon }} />
                  <span className="text-sm" style={{ color: theme.mocha }}>Remember me</span>
                </label>
                <button 
                  className="text-sm font-semibold hover:underline transition-all duration-300"
                  style={{ color: theme.accent.cinnamon }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={busy}
                className="w-full py-4 rounded-xl text-white font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent.caramel} 0%, ${theme.accent.cinnamon} 100%)`
                }}
              >
                {busy ? "Brewing your session..." : "Login"}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: theme.foam }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white" style={{ color: theme.cappuccino }}>
                    New to PlaceMate?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <button
                onClick={() => navigate("/signup")}
                className="w-full py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  borderColor: theme.accent.caramel,
                  color: theme.accent.cinnamon,
                  backgroundColor: 'white'
                }}
              >
                Create an Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes steam {
          0% { 
            transform: translateY(0) scaleX(1);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% { 
            transform: translateY(-100px) scaleX(0.5);
            opacity: 0;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        input::placeholder {
          color: ${theme.cream};
          opacity: 0.6;
        }

        input:focus::placeholder {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default Login;