import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Coffee, Mail, Lock, User } from "lucide-react";
import theme from "../../theme";

const Signup = () => {
  const navigate = useNavigate(); // ← THIS IS REQUIRED
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setBusy(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      alert("Account created! Welcome to PlaceMate ☕");
      navigate("/login"); // Now this will work!
    } catch (error) {
      alert("Signup failed: " + error.message);
    } finally {
      setBusy(false);
    }
  };

  // ... rest of your component
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(135deg, ${theme.mocha} 0%, ${theme.latte} 25%, ${theme.cappuccino} 50%, ${theme.cream} 100%)`
        }}
      />
      
      {/* Floating Coffee Elements */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            width: Math.random() * 80 + 30 + 'px',
            height: Math.random() * 80 + 30 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: i % 2 === 0 ? theme.accent.caramel : theme.accent.hazelnut,
            animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
        {/* Left Side - Sign Up Form */}
        <div className="bg-white p-12 flex flex-col justify-center order-2 md:order-1">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-4xl font-bold mb-3" style={{ color: theme.espresso }}>
              Join PlaceMate
            </h2>
            <p className="text-lg mb-8" style={{ color: theme.cappuccino }}>
              Start your placement journey today
            </p>

            <div className="space-y-5">
              {/* Name Input */}
              <div className="relative">
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                  Full Name
                </label>
                <div className="relative">
                  <User 
                    size={20} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
                    style={{ color: focusedInput === 'name' ? theme.accent.cinnamon : theme.cream }}
                  />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 outline-none transition-all duration-300"
                    style={{
                      borderColor: focusedInput === 'name' ? theme.accent.cinnamon : theme.foam,
                      backgroundColor: focusedInput === 'name' ? theme.milk : 'white'
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 outline-none transition-all duration-300"
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
                    placeholder="Min. 6 characters"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 outline-none transition-all duration-300"
                    style={{
                      borderColor: focusedInput === 'password' ? theme.accent.cinnamon : theme.foam,
                      backgroundColor: focusedInput === 'password' ? theme.milk : 'white'
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                  />
                </div>
                {password && (
                  <p className="text-xs mt-1.5" style={{ color: password.length >= 6 ? theme.accent.caramel : theme.cappuccino }}>
                    {password.length >= 6 ? "✓ Strong password" : `${6 - password.length} more characters needed`}
                  </p>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSignup}
                disabled={busy}
                className="w-full py-4 rounded-xl text-white font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent.caramel} 0%, ${theme.accent.cinnamon} 100%)`
                }}
              >
                {busy ? "Creating your account..." : "Sign Up"}
              </button>

              {/* Terms */}
              <p className="text-xs text-center mt-4" style={{ color: theme.cappuccino }}>
                By signing up, you agree to our{" "}
                <span className="font-semibold cursor-pointer hover:underline" style={{ color: theme.accent.cinnamon }}>
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-semibold cursor-pointer hover:underline" style={{ color: theme.accent.cinnamon }}>
                  Privacy Policy
                </span>
              </p>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: theme.foam }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white" style={{ color: theme.cappuccino }}>
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <button
                onClick={() => alert("Navigate to Login")}
                className="w-full py-3.5 rounded-xl font-bold text-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  borderColor: theme.accent.caramel,
                  color: theme.accent.cinnamon,
                  backgroundColor: 'white'
                }}
              >
                Login Instead
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div 
          className="relative p-12 flex flex-col justify-center items-center text-center overflow-hidden order-1 md:order-2"
          style={{
            background: `linear-gradient(180deg, ${theme.accent.cinnamon} 0%, ${theme.accent.hazelnut} 100%)`
          }}
        >
          {/* Steam Effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-16 rounded-full opacity-30"
                style={{
                  background: theme.milk,
                  left: `${i * 30 - 30}px`,
                  animation: `steam ${3 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="inline-block p-6 rounded-full mb-6 transform transition-all duration-500 hover:scale-110 hover:rotate-12"
                 style={{ background: `rgba(255, 255, 255, 0.2)` }}>
              <Coffee size={64} className="text-white" strokeWidth={2} />
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              PlaceMate
            </h1>
            
            <p className="text-xl text-white/95 mb-10 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              Brew Your Future Success
            </p>
            
            <div className="space-y-5 text-left max-w-sm mx-auto">
              {[
                "Smart placement tracking",
                "Interview preparation tools",
                "Application management",
                "Progress analytics"
              ].map((text, i) => (
                <div 
                  key={i}
                  className="text-white text-sm font-medium transform transition-all duration-300 hover:translate-x-2"
                  style={{ 
                    animation: `slideIn 0.6s ease-out ${i * 0.15}s both`,
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
                      background: 'white'
                    }}
                  />
                  {text}
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <p className="text-white/90 text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>
                "Join thousands of students who've landed their dream placements with PlaceMate"
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(180deg); }
        }
        
        @keyframes steam {
          0% { 
            transform: translateY(0) scaleX(1);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
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

export default Signup;