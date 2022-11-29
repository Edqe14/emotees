import { getAnalytics } from 'firebase/analytics';
import app from '.';

const analytics = getAnalytics(app);

export default analytics;