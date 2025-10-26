// API entrypoint (placeholder)
import express from 'express';
import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
