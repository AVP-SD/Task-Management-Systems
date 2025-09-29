const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, '..', 'data', 'tasks.json');
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const PIPELINES_FILE = path.join(__dirname, '..', 'data', 'pipelines.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(__dirname, '..', 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read data from JSON file
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Write data to JSON file
async function writeData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Get all tasks
async function getTasks() {
  return await readData(TASKS_FILE);
}

// Add new task
async function addTask(taskData) {
  const tasks = await getTasks();
  const newTask = {
    id: Date.now().toString(),
    ...taskData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  await writeData(TASKS_FILE, tasks);
  return newTask;
}

// Get tasks by user
async function getTasksByUser(userId) {
  const tasks = await getTasks();
  return tasks.filter(task => task.userId === userId);
}

// Get all users
async function getUsers() {
  return await readData(USERS_FILE);
}

// Add new user
async function addUser(userData) {
  const users = await getUsers();
  const newUser = {
    uid: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  await writeData(USERS_FILE, users);
  return newUser;
}

// Get all pipelines
async function getPipelines() {
  return await readData(PIPELINES_FILE);
}

// Initialize with sample data
async function initializeSampleData() {
  await ensureDataDir();

  // Sample tasks
  const sampleTasks = [
    {
      id: '1',
      userId: 'user1',
      pipelineId: 'content-review-pipeline',
      link: 'https://example.com/content1',
      status: 'pending',
      quality: null,
      createdAt: '2024-01-15T10:30:00.000Z',
      updatedAt: '2024-01-15T10:30:00.000Z'
    }
  ];

  // Sample users
  const sampleUsers = [
    {
      uid: 'user1',
      email: 'john@example.com',
      role: 'user',
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      uid: 'admin1',
      email: 'admin@example.com',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  // Sample pipelines
  const samplePipelines = [
    {
      id: 'content-review-pipeline',
      name: 'Content Review Pipeline',
      description: 'Pipeline for reviewing content submissions',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 'bug-report-pipeline',
      name: 'Bug Report Pipeline',
      description: 'Pipeline for handling bug reports',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  try {
    await fs.access(TASKS_FILE);
  } catch {
    await writeData(TASKS_FILE, sampleTasks);
  }

  try {
    await fs.access(USERS_FILE);
  } catch {
    await writeData(USERS_FILE, sampleUsers);
  }

  try {
    await fs.access(PIPELINES_FILE);
  } catch {
    await writeData(PIPELINES_FILE, samplePipelines);
  }
}

module.exports = {
  getTasks,
  addTask,
  getTasksByUser,
  getUsers,
  addUser,
  getPipelines,
  initializeSampleData,
  ensureDataDir
};
