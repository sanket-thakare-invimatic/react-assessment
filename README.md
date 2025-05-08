# React Auth App

A modern authentication app built with React, TypeScript, Ant Design, Formik, and Axios.

## Features

- **Full-width, animated login page** with professional design
- **Ant Design icons** as site logo and for UI enhancement
- **Purple-themed UI** using Ant Design's theming
- **Formik** for robust form handling and validation
- **Yup** for schema-based validation
- **Axios** for API requests
- **Error Boundaries** for robust error handling
- **Private/Public routes** using React Router
- **Reusable folder structure** for scalability
- **Code comments** for clarity and maintainability

## Folder Structure

```
src/
  components/      // Reusable UI components (e.g., ErrorBoundary)
  pages/           // Page-level components (Login, Register, etc.)
  hooks/           // Custom React hooks
  utils/           // Utility functions (API, helpers)
  routes/          // Routing logic (AppRoutes.tsx)
  layouts/         // Layout components (Sidebar, etc.)
  App.tsx
  index.tsx
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization
- Update theme colors in `App.tsx` via Ant Design's `ConfigProvider`.
- Add or modify icons using [Ant Design Icons](https://ant.design/components/icon/).
- See code comments for guidance on extending functionality.

## License
MIT
