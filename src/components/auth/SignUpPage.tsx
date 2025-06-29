import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AnimatedInput from './AnimatedInput';
import SubmitButton from './SubmitButton';
import { useJobStore } from '../../store/jobStore';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { setUser } = useJobStore();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create user profile for storing preferences
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: 'jobseeker' as const,
      skills: [],
      experience: 0,
      location: '',
      remoteOnly: false,
      salaryExpectation: { min: 0, max: 0, currency: 'USD' }
    };

    setUser(newUser);
    navigate('/');
  };

  return (
    <AuthLayout
      title="Join DevHire"
      subtitle="Create your profile to save jobs, track applications, and get personalized recommendations"
      type="signup"
    >
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
            Create Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start building your personalized job search experience
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <AnimatedInput
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            error={errors.name}
            autoFocus
          />

          <AnimatedInput
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
          />

          <AnimatedInput
            type="password"
            label="Password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            error={errors.password}
            showPasswordStrength
          />

          <AnimatedInput
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
            error={errors.confirmPassword}
          />

          <SubmitButton onClick={handleSubmit}>
            Create Profile
          </SubmitButton>
        </form>

        {/* Benefits */}
        <motion.div
          className="mt-8 p-4 glass-card dark:glass-card-dark rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            What you'll get:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Save and organize your favorite job listings</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Get AI-powered job recommendations</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Track your application history</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>Personalized job alerts and notifications</span>
            </li>
          </ul>
        </motion.div>

        {/* Login Link */}
        <motion.div
          className="text-center pt-6 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="text-gray-600 dark:text-gray-400">Already have a profile? </span>
          <motion.button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in
          </motion.button>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
};

export default SignUpPage;