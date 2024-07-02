const express = require('express');
const client = require('prom-client');
const app = express();
const port = 3030;

// Create a Registry which registers the metrics
const register = new client.Registry();
register.setDefaultLabels({
  app: 'demo-app'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500] // buckets for response time from 50ms to 500ms
});

// Add the histogram to the register
register.registerMetric(httpRequestDurationMicroseconds);

// Middleware to measure request duration
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ route: req.route ? req.route.path : '', code: res.statusCode, method: req.method });
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Demo app listening at http://localhost:${port}`);
});

