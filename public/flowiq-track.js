/**
 * FlowIQ Analytics Tracking Script
 * Version: 1.0.0
 * 
 * This script automatically tracks user behavior on your website
 * and sends data to FlowIQ analytics platform.
 */

(function() {
  'use strict';

  // Get configuration
  const config = window.flowiqConfig || {};
  const siteId = config.siteId || new URLSearchParams(window.location.search).get('id') || 'demo';
  
  // Generate session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('flowiq_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('flowiq_session_id', sessionId);
    }
    return sessionId;
  };

  // Generate user ID (persistent across sessions)
  const getUserId = () => {
    let userId = localStorage.getItem('flowiq_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('flowiq_user_id', userId);
    }
    return userId;
  };

  const sessionId = getSessionId();
  const userId = getUserId();

  // Device detection
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let device = 'desktop';
    
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      device = 'tablet';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      device = 'mobile';
    }

    return {
      browser: (function() {
        if (ua.indexOf('Firefox') > -1) return 'Firefox';
        if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera';
        if (ua.indexOf('Trident') > -1) return 'IE';
        if (ua.indexOf('Edge') > -1) return 'Edge';
        if (ua.indexOf('Chrome') > -1) return 'Chrome';
        if (ua.indexOf('Safari') > -1) return 'Safari';
        return 'Unknown';
      })(),
      os: (function() {
        if (ua.indexOf('Win') > -1) return 'Windows';
        if (ua.indexOf('Mac') > -1) return 'macOS';
        if (ua.indexOf('Linux') > -1) return 'Linux';
        if (ua.indexOf('Android') > -1) return 'Android';
        if (ua.indexOf('iOS') > -1) return 'iOS';
        return 'Unknown';
      })(),
      device: device,
      screenResolution: window.screen.width + 'x' + window.screen.height
    };
  };

  // Location info
  const getLocationInfo = () => {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    };
  };

  // Storage for tracking data
  const analyticsQueue = [];
  let pageStartTime = Date.now();
  let lastPath = window.location.pathname;

  // Send data to analytics endpoint
  const sendData = (data) => {
    // In production, this would send to a real API endpoint
    // For demo, we'll log to console and store in sessionStorage
    
    console.log('[FlowIQ Analytics]', data.type, data);
    
    // Store in sessionStorage for demo purposes
    const stored = JSON.parse(sessionStorage.getItem('flowiq_events') || '[]');
    stored.push(data);
    sessionStorage.setItem('flowiq_events', JSON.stringify(stored.slice(-100))); // Keep last 100 events
    
    // In production, uncomment this:
    // fetch(config.endpoint || 'https://api.flowiq.io/track', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    //   keepalive: true
    // }).catch(err => console.error('FlowIQ tracking error:', err));
  };

  // Track page view
  const trackPageView = (customData = {}) => {
    const path = customData.path || window.location.pathname;
    const referrer = customData.referrer || document.referrer;
    
    sendData({
      type: 'pageview',
      siteId: siteId,
      sessionId: sessionId,
      userId: userId,
      data: {
        path: path,
        title: customData.title || document.title,
        referrer: referrer,
        url: window.location.href,
        timestamp: Date.now(),
        device: getDeviceInfo(),
        location: getLocationInfo()
      }
    });

    pageStartTime = Date.now();
    lastPath = path;
  };

  // Track event
  const trackEvent = (eventName, properties = {}) => {
    sendData({
      type: 'event',
      siteId: siteId,
      sessionId: sessionId,
      userId: userId,
      data: {
        eventName: eventName,
        properties: properties,
        path: window.location.pathname,
        timestamp: Date.now()
      }
    });
  };

  // Track click
  const trackClick = (element, target) => {
    const tagName = element.tagName.toLowerCase();
    const elementId = element.id;
    const elementClass = element.className;
    const text = element.textContent?.trim().substring(0, 100);

    trackEvent('click', {
      target: target,
      tagName: tagName,
      elementId: elementId,
      elementClass: elementClass,
      text: text,
      href: element.href || null
    });
  };

  // Track form submission
  const trackFormSubmit = (form) => {
    const formId = form.id || 'unknown';
    const formName = form.name || 'unknown';
    const fieldCount = form.elements.length;

    trackEvent('form_submit', {
      formId: formId,
      formName: formName,
      fieldCount: fieldCount,
      action: form.action || null
    });
  };

  // Track scroll depth
  let maxScrollDepth = 0;
  const trackScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100);
    
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
      
      // Track at 25%, 50%, 75%, and 100%
      if ([25, 50, 75, 100].includes(scrollPercent)) {
        trackEvent('scroll_depth', {
          depth: scrollPercent,
          path: window.location.pathname
        });
      }
    }
  };

  // Track time on page before exit
  const trackPageExit = () => {
    const duration = Date.now() - pageStartTime;
    
    sendData({
      type: 'page_exit',
      siteId: siteId,
      sessionId: sessionId,
      userId: userId,
      data: {
        path: lastPath,
        duration: duration,
        timestamp: Date.now(),
        exitType: 'navigation'
      }
    });
  };

  // Auto-tracking setup
  if (config.autoTrackClicks !== false) {
    document.addEventListener('click', (e) => {
      let element = e.target;
      // Find the closest clickable element
      while (element && element !== document) {
        if (element.tagName === 'A' || element.tagName === 'BUTTON' || 
            element.onclick || element.hasAttribute('data-track')) {
          trackClick(element, e.target.tagName);
          break;
        }
        element = element.parentElement;
      }
    }, true);
  }

  if (config.autoTrackForms !== false) {
    document.addEventListener('submit', (e) => {
      if (e.target.tagName === 'FORM') {
        trackFormSubmit(e.target);
      }
    }, true);
  }

  if (config.autoTrackScroll !== false) {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScrollDepth, 150);
    }, { passive: true });
  }

  // Track page unload
  window.addEventListener('beforeunload', trackPageExit);

  // Track visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackPageExit();
    } else {
      pageStartTime = Date.now();
    }
  });

  // Handle SPA navigation (History API)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function() {
    trackPageExit();
    originalPushState.apply(history, arguments);
    setTimeout(() => trackPageView(), 0);
  };

  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(() => trackPageView(), 0);
  };

  window.addEventListener('popstate', () => {
    trackPageExit();
    setTimeout(() => trackPageView(), 0);
  });

  // Public API
  window.flowiq = function(command, ...args) {
    switch(command) {
      case 'pageview':
        trackPageView(args[0] || {});
        break;
      case 'event':
        trackEvent(args[0], args[1]);
        break;
      case 'identify':
        sendData({
          type: 'identify',
          siteId: siteId,
          sessionId: sessionId,
          userId: userId,
          data: args[0]
        });
        break;
      case 'set':
        // Set custom properties
        Object.assign(config, args[0]);
        break;
      default:
        console.warn('Unknown FlowIQ command:', command);
    }
  };

  // Initialize - track initial page view
  trackPageView();

  console.log('FlowIQ Analytics initialized for site:', siteId);
  console.log('Session ID:', sessionId);
  console.log('View tracked events in sessionStorage key: flowiq_events');

})();
