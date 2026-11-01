# FitLog

A web app for browsing exercises, building a daily workout plan, and tracking progress. Built with Next.js, TypeScript, Tailwind CSS, and HeroUI.

> Replace the `[bracketed]` placeholders with your project's real details.

## Features

- Browse exercises with duration, calories burned, equipment, and rating
- View full details for each exercise
- Add exercises to **Today's plan** or **Saved**
- **My Plan** page with live stats (exercises, minutes, calories)
- Sort by duration, calories, or rating
- Mark exercises as done and track daily progress
- Remove exercises and restore them
- Responsive dark UI with keyboard-friendly controls

## Tech stack

| Area      | Tool                           |
| --------- | ------------------------------ |
| Framework | Next.js (App Router)           |
| Language  | TypeScript                     |
| UI        | React, HeroUI                  |
| Styling   | Tailwind CSS                   |
| State     | React Context (`PlanContext`)  |
| Data      | `[API / JSON file / database]` |

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm, yarn, or pnpm

### Installation

```bash
git clone [your-repo-url]
cd [project-folder]
npm install
```

### Environment variables

Create a `.env.local` file in the project root if your app needs any:

```env
# Example
NEXT_PUBLIC_API_URL=[your-api-url]
```

### Run the app

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm start        # run the production build
npm run lint     # check code quality
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
src/
└── app/
    ├── ContextProvider/
    │   └── MyPlanContext.tsx   # plan and saved-plan state
    ├── myplan/
    │   ├── page.tsx            # My Plan page
    │   └── Card.tsx            # plan tabs, stats, sorting, actions
    └── workdetails/
        └── [id]/page.tsx       # exercise detail page
```

Adjust this to match your real folders.

## Key routes

| Route               | Description                      |
| ------------------- | -------------------------------- |
| `/`                 | Home / exercise browsing         |
| `/myplan`           | Today's plan and saved exercises |
| `/workdetails/[id]` | Details for one exercise         |

## Data model

```ts
interface PlanItem {
  id: string | number; // unique per exercise
  name: string;
  equipment: string;
  duration: number; // minutes
  caloriesBurned: number; // kcal
  rating: number;
  image: string;
}
```

## How the plan works

1. Users add an exercise from the browsing or details page.
2. `PlanContext` stores it in `addToPlan` (today) or `savedPlan` (saved).
3. The My Plan page reads both lists, removes duplicates, sorts them, and calculates the stats for the active tab.

See the `MyPlanCard` README for component-level details.

## Known limitations

- Done and removed states reset on page refresh (they live in component state).
- Removing an exercise hides it in both tabs.
- Remote images need their domain added to `images.remotePatterns` in `next.config`.

## Roadmap

- [ ] Persist plan, done, and removed items (localStorage or database)
- [ ] User accounts and sync across devices
- [ ] Weekly planner and history
- [ ] Per-tab removal
- [ ] Tests for plan logic and sorting

## Troubleshooting

| Problem                         | Fix                                                             |
| ------------------------------- | --------------------------------------------------------------- |
| Duplicate `key` warning         | Two exercises share an `id`. Make IDs unique in your data.      |
| Images don't load               | Add the image host to `images.remotePatterns` in `next.config`. |
| Stats don't change between tabs | Use `selectedKey` and `onSelectionChange` on `<Tabs>`.          |

## Contributing

1. Fork the repo and create a branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "Add your feature"`
3. Push and open a pull request

## License

`[MIT / your license]`

## Author

`[Your name]` · `[GitHub / LinkedIn / email]`
