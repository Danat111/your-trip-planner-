# Deployment Configuration for Your Trip Planner

To fix the client-side routing issue with our React single-page application, we need to create a configuration file that tells the hosting service to redirect all requests to the index.html file.

For most static hosting services, this can be accomplished with a simple configuration file.

## Netlify Configuration

Create a `_redirects` file in the public directory with the following content:

```
/*    /index.html   200
```

## Vercel Configuration

Create a `vercel.json` file in the root directory with the following content:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Firebase Configuration

Create a `firebase.json` file with the following content:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## General Solution

For our current deployment, we'll create a simple `_redirects` file that should work with most static hosting services.
