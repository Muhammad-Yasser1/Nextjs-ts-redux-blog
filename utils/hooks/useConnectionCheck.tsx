import { useEffect, useRef } from 'react';
import { notify } from 'reapop';
import { useAppDispatch } from '../../store';

const useConnectionCheck = (everySeconds: number) => {
    const wasAppOnline = useRef(true);
    const isAppOnline = useRef(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setInterval(() => {
            wasAppOnline.current = isAppOnline.current;
            isAppOnline.current = navigator.onLine;
            if (wasAppOnline.current && !isAppOnline.current) {
                dispatch(
                    notify(
                        `we are offline now but don't worry all your operations 
                        will be sync with database after you get back online`,
                        'error'
                    )
                );
            } else if (!wasAppOnline.current && isAppOnline.current) {
                dispatch(
                    notify(
                        'we are online now if you done any operation it will be synced with database now',
                        'success'
                    )
                );
            }
        }, everySeconds);
    }, [dispatch, everySeconds]);

    return {
        wasAppOnline: wasAppOnline.current,
        isAppOnline: isAppOnline.current,
    } as const;
};

export default useConnectionCheck;
