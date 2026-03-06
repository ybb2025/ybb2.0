import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AnimatedPasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    success?: boolean;
    placeholder?: string;
}

export function AnimatedPasswordInput({
    value,
    onChange,
    error = false,
    success = false,
    placeholder = "Password"
}: AnimatedPasswordInputProps) {
    const [shake, setShake] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Trigger shake on error
    useEffect(() => {
        if (error) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 500);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const bounceAnimation = {
        x: shake ? [-10, 10, -10, 10, 0] : 0,
        transition: { duration: 0.5 },
    };

    const matchAnimation = {
        scale: success ? [1, 1.05, 1] : 1,
        transition: { duration: 0.3 },
    };

    // Border turns red on error, green on success, or matches normal theme
    const borderAnimation = {
        borderColor: success ? '#10B981' : error ? '#EF4444' : '',
        transition: { duration: 0.3 },
    };

    return (
        <div className="relative flex w-full flex-col items-start justify-center">

            {/* Actual Input Field */}
            <motion.div
                className="relative h-[52px] w-full overflow-hidden rounded-xl"
                animate={matchAnimation}
            >
                <motion.input
                    id="password"
                    className="h-full w-full rounded-xl border-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 px-3.5 py-3 tracking-[0.4em] outline-none placeholder:tracking-normal text-gray-900 dark:text-gray-100 pr-12 transition-colors"
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    animate={{
                        ...bounceAnimation,
                        ...borderAnimation
                    }}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </motion.div>
        </div>
    );
}
