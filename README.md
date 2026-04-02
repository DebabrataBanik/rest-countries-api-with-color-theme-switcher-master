# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

![Current live web page design after loading](<web design.png>)

### Links

<!-- - Solution URL: [Add solution URL here](https://your-solution-url.com) -->

- [Live Site URL](https://rest-countries-api-with-color-theme-amber.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

I was hardcoding `grid-template-columns` for different breakpoints, then I learned about `auto-fill` to create a fluid, response layout that handles any screen size automatically.

```css
.list-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 275px);
  gap: 4rem;
}
```

I implemented manual navigation using the `History API`. This involved managing the browser history stack via `pushState` and synchronizing the UI with the `popstate` event to ensure seamless back/forward button support.

### Continued development

I plan on further optimization by:

- **Skeleton Loading UI**: Implementing a skeleton screen to replace the current loading state for a smoother feel during API calls.

- **State Management & Data Fetching**: Integrating Tanstack Query to handle caching, loading states and errors.

- **Performance Refactoring**: Cleaning up the logic so it looks and feels good.

## Author

- Frontend Mentor - [@DebabrataBanik](https://www.frontendmentor.io/profile/DebabrataBanik)
