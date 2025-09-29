const express = require('express');
const cors = require('cors');
const { addTask, getTasksByUser, initializeSampleData } = require('./data-service');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize sample data
initializeSampleData();

// Routes

// POST /api/tasks - Create new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { userId, pipelineId, link, status = 'pending' } = req.body;

    if (!userId || !pipelineId || !link) {
      return res.status(400).json({
        error: 'Missing required fields: userId, pipelineId, link'
      });
    }

    const taskData = {
      userId,
      pipelineId,
      link,
      status,
      quality: null
    };

    const newTask = await addTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/tasks?userId=xxx&status=xxx - Get tasks for user
app.get('/api/tasks', async (req, res) => {
  try {
    const { userId, status } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'userId parameter is required'
      });
    }

    let tasks = await getTasksByUser(userId);

    if (status && status !== 'all') {
      tasks = tasks.filter(task => task.status === status);
    }

    // Add pipeline names (in a real app, you'd join with pipeline data)
    const tasksWithPipelines = tasks.map(task => ({
      ...task,
      pipelineName: getPipelineName(task.pipelineId)
    }));

    res.json(tasksWithPipelines);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/tasks - Get all tasks (admin only)
app.get('/api/admin/tasks', async (req, res) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    const TASKS_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

    const tasks = await require('./data-service').getTasks();

    // Add user emails and pipeline names
    const tasksWithDetails = await Promise.all(tasks.map(async (task) => {
      const users = await require('./data-service').getUsers();
      const user = users.find(u => u.uid === task.userId);

      return {
        ...task,
        userEmail: user ? user.email : 'Unknown User',
        pipelineName: getPipelineName(task.pipelineId)
      };
    }));

    res.json(tasksWithDetails);
  } catch (error) {
    console.error('Error fetching admin tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/users - Get all users (admin only)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await require('./data-service').getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/pipelines - Get all pipelines (admin only)
app.get('/api/admin/pipelines', async (req, res) => {
  try {
    const pipelines = await require('./data-service').getPipelines();
    res.json(pipelines);
  } catch (error) {
    console.error('Error fetching pipelines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to get pipeline name
function getPipelineName(pipelineId) {
  const pipelineNames = {
    'content-review-pipeline': 'Content Review Pipeline',
    'bug-report-pipeline': 'Bug Report Pipeline'
  };
  return pipelineNames[pipelineId] || 'Unknown Pipeline';
}

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/api/tasks to test the API`);
});

module.exports = app;
