// middleware/redirect.js

export default function ({ route, redirect }) {
  const path = route.fullPath;
  const newPath = path.replace(/\/+$/, "/"); // Заменить все конечные слеши на один

  if (path !== newPath) {
    return redirect(301, newPath);
  }
}
