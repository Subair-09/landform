import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync mode if initialMode changes
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSuccess(name || email.split('@')[0] || 'User');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#079B68"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 21 9 12 15 12 15 21" />
            </svg>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#102235]">Home</span>
              <span className="text-[#079B68]">Find</span>
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#102235]">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-[#526176]">
            {mode === 'login'
              ? 'Access your saved properties and inquiries'
              : 'Join thousands finding their ideal home'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-[#F5F8FC] p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#102235] shadow-xs'
                : 'text-gray-500 hover:text-[#102235]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#102235] shadow-xs'
                : 'text-gray-500 hover:text-[#102235]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center text-[#079B68] flex flex-col items-center">
            <CheckCircle2 className="w-10 h-10 mb-2 animate-bounce" />
            <p className="text-sm font-bold">
              {mode === 'login' ? 'Signed in successfully!' : 'Account registered successfully!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Blessing Adeleke"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#079B68] hover:bg-[#068458] text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs mt-2 cursor-pointer"
            >
              {mode === 'login' ? 'Sign In to HomeFind' : 'Create Free Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
