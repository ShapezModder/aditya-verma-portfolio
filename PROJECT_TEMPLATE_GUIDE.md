# Project Template Guide

## Quick Start: Adding a New Project

Follow these simple steps to add a new project to your portfolio:

### Step 1: Add Your Project Image

1. Place your project image in the `public/project_images/` folder
2. Name it something descriptive (e.g., `my-awesome-project.jpg`)
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Step 2: Add Project Data

Open `components/Projects/projectsData.ts` and add a new project object to the `projects` array:

```typescript
{
  title: "Your Project Title",
  category: "Category: Web Development", // or "Category: Mobile App", etc.
  imagePath: "/project_images/your-image-name.jpg", // Update this with your image name
  gitRepoUrl: "https://github.com/adityaverma9777/your-repo", // Update with your GitHub repo URL
  color: "from-cyan-400/20 to-blue-500/20", // Optional: Change gradient colors
  glowColor: "rgba(34, 211, 238, 0.3)", // Optional: Change glow color
},
```

### Step 3: That's It!

Your new project will automatically appear on the projects page with all the same animations and styling!

---

## Template Example

Here's a complete example you can copy and paste:

```typescript
{
  title: "E-Commerce Platform",
  category: "Category: Full-Stack Web App",
  imagePath: "/project_images/ecommerce-platform.jpg",
  gitRepoUrl: "https://github.com/adityaverma9777/ecommerce-platform",
  color: "from-purple-400/20 to-pink-500/20",
  glowColor: "rgba(168, 85, 247, 0.3)",
},
```

---

## Available Color Schemes

You can use any of these pre-configured color schemes:

### Cyan/Blue (Default)
```typescript
color: "from-cyan-400/20 to-blue-500/20",
glowColor: "rgba(34, 211, 238, 0.3)",
```

### Purple/Pink
```typescript
color: "from-purple-400/20 to-pink-500/20",
glowColor: "rgba(168, 85, 247, 0.3)",
```

### Green/Emerald
```typescript
color: "from-green-400/20 to-emerald-500/20",
glowColor: "rgba(74, 222, 128, 0.3)",
```

### Orange/Red
```typescript
color: "from-orange-400/20 to-red-500/20",
glowColor: "rgba(251, 146, 60, 0.3)",
```

### Yellow/Amber
```typescript
color: "from-yellow-400/20 to-amber-500/20",
glowColor: "rgba(250, 204, 21, 0.3)",
```

---

## File Structure

```
public/
  └── project_images/
      ├── project-1.jpg
      ├── project-2.jpg
      └── your-new-project.jpg

components/
  └── Projects/
      ├── ProjectCard.tsx      (The reusable component)
      └── projectsData.ts      (Where you add new projects)
```

---

## Features Included

✅ **Image Display** - Shows your project screenshot  
✅ **Title & Category** - Display project information  
✅ **GitHub Button** - Green "GIT REPO" button linking to your repository  
✅ **Hover Animations** - Same smooth animations as existing tiles  
✅ **Glow Effects** - Customizable glow colors  
✅ **Responsive Design** - Works on all screen sizes  
✅ **Glassmorphism** - Modern glass effect styling  

---

## Tips

- **Image Size**: Recommended 800x600px or 16:9 aspect ratio for best results
- **Image Quality**: Use high-quality images for better visual impact
- **Naming**: Use descriptive, lowercase filenames with hyphens (e.g., `my-project.jpg`)
- **GitHub URL**: Make sure your repository is public or you have proper access

---

## Need Help?

If you need to modify the template structure or add new features, check:
- `components/Projects/ProjectCard.tsx` - The main component
- `app/projects/page.tsx` - The projects page layout

