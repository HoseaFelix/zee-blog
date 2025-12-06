// app/components/ProPushLoader.jsx
'use client';
import { useEffect } from 'react';

export default function ProPushLoader() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.propush.me/pushsdk.js'; // official ProPush script
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
