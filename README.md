# React Auth App

A modern authentication app built with React, TypeScript, Ant Design, Formik, and Axios.

## Features

- **Full-width, animated login, register, and forgot password pages**
- **Ant Design icons** as site logo and for UI enhancement
- **Sidebar** with expand/collapse, large icons, hover/active effects, and logout
- **Purple-themed UI** using Ant Design's theming
- **Formik** for robust form handling and validation
- **Yup** for schema-based validation
- **Axios** for API requests
- **Error Boundaries** for robust error handling
- **Private/Public routes** using React Router
- **PrivateLayout**: Sidebar and navigation only for authenticated users
- **Auto-login after registration** (authToken saved to localStorage)
- **Drag and Drop page** with draggable user cards and project columns using [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- **Infinite Scroll page** with custom hook for fetching images from [dog.ceo API](https://dog.ceo/api/breeds/image/random/5)
- **Reusable folder structure** for scalability
- **Code comments** for clarity and maintainability

## Folder Structure

```
src/
  components/      // Reusable UI components (e.g., ErrorBoundary)
  pages/           // Page-level components (Login, Register, InfiniteScroll, DragDrop, etc.)
  hooks/           // Custom React hooks (e.g., useInfiniteDogImages)
  utils/           // Utility functions (API, helpers)
  routes/          // Routing logic (AppRoutes.tsx)
  layouts/         // Layout components (Sidebar, PrivateLayout, etc.)
  App.tsx
  index.tsx
```

## Sidebar & Navigation
- **Navigation Items:** Home, Drag and Drop, Infinite Scroll (private routes)
- **Expand/Collapse:** Button toggles sidebar width
- **Icons:** Large, themed, with hover and active effects
- **Logout:** Button at the bottom logs out and redirects to login
- **Access Control:** Sidebar and private routes only visible when logged in

## Registration Logic
- On successful registration, the API response's `authToken` is saved to localStorage
- User is automatically logged in and redirected to the homepage
- Private routes become accessible

## Drag and Drop Page
- Top section: draggable user cards with profile pic, username, and designation (dummy data)
- Bottom section: three columns labeled Project 1, 2, 3
- Cards can be moved between columns or from the top row
- Built with [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) and Ant Design
- Themed with purple shades and modern UI
- Extensible for real data or more columns

## Infinite Scroll Page
- Fetches 5 random dog images at a time from [dog.ceo API](https://dog.ceo/api/breeds/image/random/5)
- Uses a custom hook `useInfiniteDogImages` to manage state and loading
- Loads more images as the user scrolls to the bottom
- Responsive grid layout with Ant Design
- Extensible for other APIs or infinite scroll use cases

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
