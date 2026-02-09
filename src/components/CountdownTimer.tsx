import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
    endTime: string; // ISO timestamp
    className?: string;
}

export const CountdownTimer = ({ endTime, className = '' }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const end = new Date(endTime).getTime();
            const now = new Date().getTime();
            const difference = end - now;

            if (difference <= 0) {
                setIsExpired(true);
                setTimeLeft('Offer Expired');
                return;
            }

            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Clock className="w-4 h-4" />
            <span className={`font-mono font-bold ${isExpired ? 'text-red-500' : 'text-primary'}`}>
                {isExpired ? '⚠️ Offer Expired' : `⏰ ${timeLeft}`}
            </span>
        </div>
    );
};

export default CountdownTimer;
