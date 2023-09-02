import { useEffect, useMemo } from 'react'
import './App.css'

function App() {
    const worker = useMemo(() => {
        return new SharedWorker(new URL('./sharedWorker', import.meta.url), { type: "module" })
    }, []);

    const handleMessage = (event: any) => {
        console.log('HANDLE MESSAGE WORKS');
        console.log("Message received from shared worker:", event.data);
    }

    const sendMessage = () => {
        worker.port.postMessage({ data: Math.random() });
    }

    useEffect(() => {
        if (worker) {
            worker.port.start();
            worker.port.addEventListener('message', handleMessage);
        }

        return () => {
            if (worker) {
                worker.port.removeEventListener('message', handleMessage);
            }
        }
    }, [worker]);

    return (
        <div>
            <button onClick={sendMessage}>Send Message to Shared Worker</button>
        </div>
    );
}

export default App
