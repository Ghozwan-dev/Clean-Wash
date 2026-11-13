import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function checkIsStandalone(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return Boolean(
    window.matchMedia?.('(display-mode: standalone)')?.matches ||
    (window.navigator as unknown as { standalone?: boolean })?.standalone
  );
}

function checkIsIos(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return (
    /iphone|ipad|ipod/.test(ua) &&
    !(window.navigator as unknown as { standalone?: boolean })?.standalone
  );
}

export function usePwaInstall() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(checkIsStandalone);
  const [isIos] = useState(checkIsIos);
  const [hasNativePrompt, setHasNativePrompt] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      return;
    }

    if (checkIsStandalone()) {
      return;
    }

    // Listen for beforeinstallprompt event (Chrome, Edge, Android)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e as BeforeInstallPromptEvent;
      setHasNativePrompt(true);
      setIsInstallable(true);
      setShowModal(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Auto-show popup after 1.2s for first-time visitors if not dismissed in session
    const dismissed = sessionStorage.getItem('cleanwash_install_dismissed');
    const timer = setTimeout(() => {
      if (!dismissed && !checkIsStandalone()) {
        setShowModal(true);
      }
    }, 1200);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPromptRef.current) {
      try {
        await deferredPromptRef.current.prompt();
        const choice = await deferredPromptRef.current.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setShowModal(false);
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }
  };

  const dismissModal = () => {
    setShowModal(false);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('cleanwash_install_dismissed', 'true');
    }
  };

  return {
    isInstallable,
    isInstalled,
    isIos,
    showModal,
    setShowModal,
    handleInstallClick,
    dismissModal,
    hasNativePrompt,
  };
}
