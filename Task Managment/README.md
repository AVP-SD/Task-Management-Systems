# Task Management System - Static HTML Version

A static HTML task management system with interactive pipeline visualization, built for easy deployment to GitHub Pages.

## Features

- **Static HTML/CSS/JavaScript** - No build process required
- **Interactive Pipeline Flowcharts** - Visual pipeline representation
- **Task Management** - Submit and track tasks through pipelines
- **User Dashboard** - View personal task history
- **Admin Dashboard** - Full system overview
- **RESTful API** - JSON-based data storage
- **GitHub Pages Ready** - Deploy directly to GitHub Pages

## Project Structure

```
/
├── index.html          # Homepage
├── pipelines.html      # Pipeline selection
├── pipeline.html       # Individual pipeline view with flowchart
├── tasks.html         # User task dashboard
├── admin.html         # Admin dashboard
├── api/
│   ├── server.js      # Express.js API server
│   └── data-service.js # Data management functions
├── data/              # JSON data storage (created automatically)
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Pages deployment
└── README.md
```

## Quick Start

### 1. Run Locally

```bash
# Install dependencies
npm install

# Start the API server (for data storage)
npm start
```

The API server will run on `http://localhost:3001`

### 2. Deploy to GitHub Pages

1. **Fork this repository** to your GitHub account

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Select "GitHub Actions" as the source

3. **Deploy**:
   - The site will automatically deploy when you push to the `main` branch
   - Your site will be available at: `https://yourusername.github.io/task-management-system`

### 3. Access Your Site

- **Homepage**: `https://yourusername.github.io/task-management-system/`
- **API Endpoint**: `https://yourusername.github.io/task-management-system/api/tasks`

## How It Works

### Interactive Flowcharts
The pipeline visualization is created using pure HTML/CSS/JavaScript with custom positioning and arrow drawing.

### Data Storage
- Tasks, users, and pipelines are stored as JSON files
- API endpoints provide CRUD operations
- Data persists between sessions

### API Endpoints

```javascript
// Create a task
POST /api/tasks
{
  "userId": "user123",
  "pipelineId": "content-review-pipeline",
  "link": "https://example.com/task"
}

// Get user tasks
GET /api/tasks?userId=user123

// Get all tasks (admin)
GET /api/admin/tasks

// Get all users (admin)
GET /api/admin/users

// Get all pipelines (admin)
GET /api/admin/pipelines
```

## Customization

### Adding New Pipelines

1. Add pipeline data to the JavaScript in `pipeline.html`
2. Update the pipeline selection in `pipelines.html`
3. Add any new pipeline files to the data structure

### Styling
- Uses Tailwind CSS via CDN
- Custom CSS for flowchart visualization
- Responsive design for mobile and desktop

## Sample Data

The system includes sample data for:
- **Pipelines**: Content Review and Bug Report pipelines
- **Tasks**: Sample tasks with different statuses
- **Users**: Regular users and admin accounts

## Development

### Local Development
```bash
# Start the API server
npm start

# The API runs on port 3001
# Static files are served from the root directory
```

### Testing the Flowcharts
1. Open `pipeline.html?id=content-review-pipeline`
2. The flowchart will render with interactive nodes
3. Submit tasks through the form

### API Testing
Use any HTTP client to test the API:
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","pipelineId":"content-review-pipeline","link":"https://example.com"}'
```

## Deployment Notes

- The static HTML files deploy directly to GitHub Pages
- The API server is for local development only
- For production, consider hosting the API separately
- GitHub Pages serves static files only

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- No external dependencies beyond CDN resources

## License

MIT License - Feel free to use and modify for your needs!
