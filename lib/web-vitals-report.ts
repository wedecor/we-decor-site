import { getCLS, getFID, getINP, getLCP, getTTFB, type Metric } from 'web-vitals';
import { trackEvent } from '@/lib/analytics/events';

function send(name: string, value: number, id: string) {
  const v = name === 'CLS' ? Math.round(value * 1000) : Math.round(value);
  trackEvent('web_vitals', {
    event_category: 'Web Vitals',
    event_label: id,
    value: v,
    name,
  });
}

function handler(metric: Metric) {
  send(metric.name, metric.value, metric.id);
}

getCLS(handler);
getFID(handler);
getLCP(handler);
getINP(handler);
getTTFB(handler);
