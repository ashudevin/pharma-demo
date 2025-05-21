const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-render-app-url.onrender.com/api'
    : 'http://localhost:5000/api'
};
 
export default config; 