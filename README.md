# Cow Catalog App
- A simple offline-first mobile catalog for managing cows.
- Users can browse cows, search/filter, view details, and add new cows — all stored locally (no backend required).

## CA-01: Cow List
- Displays a list of cows.
- Each item shows:
- Ear Tag (unique ID)
- Sex (Male / Female)
- Pen (location)
- Status (Active / In Treatment / Deceased)
- Last Recorded Event Date (latest from timeline)

## CA-02: Search & Filters
- Search cows by ear tag.
- Filter cows by: Status (Active, In Treatment, Deceased)
- Pen (area)
- Filters and search query persist automatically (Redux Persist ensures they remain when returning to the list).

## CA-03: Create Cow
- Button from Cow List to add a new cow.
--> Form fields:
- Ear Tag (required, unique)
- Sex (required)
- Pen (required)
- Status (default: Active)
- Weight (optional, must be positive)
- Validations for uniqueness and required fields.
- On save, data is stored locally and added instantly to the list.

## CA-04: Cow Detail
-->Displays:
- Ear Tag, Sex, Pen, Status, Weight
- Basic timeline of recent events:
- Weight Check
- Treatment
- Pen Movement
- Death
- Each event shows type, date, and optional note.
- Timeline designed as a vertical list with color-coded dots.


- Redux Toolkit → for global state management
- Redux Persist → for offline local storage
- React Navigation → for screen navigation
- TypeScript → for safety & maintainability
- Functional Components + Hooks → modern React Native best practices