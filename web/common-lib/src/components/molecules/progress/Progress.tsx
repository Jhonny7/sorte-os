import React, {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
} from "react";
import "./progress.scss";
import { useTheme } from "../../../context/ThemeContext";

export interface ProgressProps {
    initialMillis: number;
    stepMillis?: number;
    title: string;
    onFinish?: () => void;
}

export interface ProgressRef {
    reset: () => void;
    stop: () => void;
    play: () => void;
}

const Progress = forwardRef<ProgressRef, ProgressProps>(
    ({ initialMillis, stepMillis = 1000, title, onFinish }, ref) => {
        const [remaining, setRemaining] = useState(initialMillis);
        const [isRunning, setIsRunning] = useState(true);
        const intervalRef = useRef<NodeJS.Timeout | null>(null);
        const theme: any = useTheme();

        const percent = (remaining / initialMillis) * 100;

        const clearCurrentInterval = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const startInterval = () => {
            clearCurrentInterval();
            intervalRef.current = setInterval(() => {
                setRemaining((prev) => {
                    const next = prev - stepMillis;
                    if (next <= 0) {
                        clearCurrentInterval();
                        onFinish?.();
                        return 0;
                    }
                    return next;
                });
            }, stepMillis);
        };

        // Public API
        useImperativeHandle(ref, () => ({
            reset: () => {
                clearCurrentInterval();
                setRemaining(initialMillis);
                setIsRunning(true);
                startInterval();
            },
            stop: () => {
                setIsRunning(false);
                clearCurrentInterval();
            },
            play: () => {
                if (!intervalRef.current && remaining > 0) {
                    setIsRunning(true);
                    startInterval();
                }
            },
        }));

        useEffect(() => {
            if (isRunning) startInterval();
            return () => clearCurrentInterval();
        }, [initialMillis, stepMillis, isRunning]);

        const formatTime = (millis: number): string => {
            const seconds = Math.floor(millis / 1000);
            const min = Math.floor(seconds / 60);
            const sec = seconds % 60;
            return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        };

        return (
            <div className="progress-container">
                <div className="progress-bar-bg">
                    <div
                        className="progress-bar-fill"
                        style={{
                            backgroundColor: theme.theme.primary,
                            width: `${percent}%`,
                        }}
                    />
                </div>
                <div className="progress-info">
                    <span>{title}</span>
                    <span>{formatTime(remaining)}</span>
                </div>
            </div>
        );
    }
);

export default Progress;
