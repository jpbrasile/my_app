# React-Supabase CRUD Application

This project is a full-stack React application built with Vite and styled with Tailwind CSS. It integrates with Supabase for managing data in both the "prospects" and "entreprises" tables.

## Features

- **Supabase Integration:**
  Initializes the Supabase client using environment variables (`VITE_SUPABASE_PROJECT_URL` and `VITE_SUPABASE_SERVICE_ROLE`). Locally these are stored in a `.env` file, and in production (Netlify), they are set as environment secrets.

- **Dynamic Data and UI:**
  Provides two tabs:
  - **Prospects:** Interacts with the `prospects` table.
  - **Entreprises:** Interacts with the `entreprises` table.

  For the selected tab, the app dynamically inspects the fetched records to render a form with fields matching the database keys and displays a list of records with edit/delete options.

- **Full CRUD Operations:**
  - **Create:** Inserts new records via form submission.
  - **Update:** Edits records and resets the form when switching between items.
  - **Delete:** Removes records from the database.
  - The UI automatically re-fetches data after each operation to display current records.

- **Filtering:**
  - Filter records by any field using the search functionality.
  - Results update in real-time as you type.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14+)
- A Supabase project ([Supabase.io](https://supabase.io))
- Git

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd your-repo
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the project root with:
   ```env
   VITE_SUPABASE_PROJECT_URL=your_project_url
   VITE_SUPABASE_SERVICE_ROLE=your_service_role
   ```

5. **Run the Application Locally:**
   - Development: `npm run dev`
   - Production Build: `npm run build`

## Deployment

### Deploying on GitHub

- Ensure your project includes a proper `.gitignore` to exclude files like `node_modules`, `.env`, and build artifacts.
- Commit and push your files to GitHub.

### Deploying on Netlify

1. **Link Your GitHub Repository:**
   Connect your repo via the Netlify dashboard.

2. **Set Environment Variables:**
   In Netlify's Site Settings > Build & Deploy > Environment, add:
   - `VITE_SUPABASE_PROJECT_URL`
   - `VITE_SUPABASE_SERVICE_ROLE`

3. **Client-Side Routing:**
   The `_redirects` file in the `public/` folder contains:
   ```
   /*    /index.html   200
   ```
   ensuring that all routes are handled by your React Router.

4. **Deploy:**
   Trigger a deploy and Netlify will build and deploy your site.

## Project Structure

my-app/
├── .env
├── .gitignore
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│ ├── index.html
│ └── _redirects
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │ ├── Tabs.jsx
    │ ├── DynamicForm.jsx
    │ ├── DataTable.jsx
    │ └── FilterInput.jsx
    └── utils/
        └── supabaseClient.js


## License

This project is licensed under the MIT License.
