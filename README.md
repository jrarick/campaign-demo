## Live demo

Visit [campaign-demo.vercel.app](campaign-demo.vercel.app)

## To run locally

1. Clone this repo
2. `npm install`
3. `npm run dev`

#### There are two hard coded accounts:

1. username: joe-blow | password: password1
2. username: jane-doe | password: password2

You can logout from the menu in the top right corner.

#### If the app starts breaking, its probably because the `crudcrud.com` endpoint has reached its limit

You can replace the id with a new `CRUDCRUD_ID` in `constants/crudcrud-id.ts` and it should work again.

## Decisions made

- Use [shadcn/ui](https://ui.shadcn.com/) for the component library. This library has first class support for Next.js and a comprehensive offering of components. It is also has a very elegant theming system and it's easy to customize individual components.

- Use [React Hook Form](https://react-hook-form.com/) for handling forms. It has an easy to use API and solid Next.js support.

- Use [Zod](https://zod.dev/) for validating form schemas.

## Unimplemented features

#### These are beyond the scope of this project but would be nice to implement and could improve UX a lot:

- Overall most of the fetching and mutation logic needs to be moved over to the server. I didn't have time to dig in to Next 14 server actions and how to make them work with React Hook Form so most of the work is done on the client for now.
- Use loading and transition states to make app appear more responsive.
- Auth implementation is only MVP and is not secure.

##### On the `/campagins/new` route:

- Break campaign creation form into multiple steps on separate routes so the user only sees 3 or 4 related fields at a time on each step.
- When submitting the campaign creation form, the user could be prompted with a modal window that displays a streamlined version of all the entered information and asks if everything looks correct.
- Either use `window.onbeforeunload` to prevent accidental navigations from clearing form state or store form state in session storage so the user's progress is saved if they navigate away.
- Use custom currency component for budget field so it can include and handle `$` and `,` characters.
- After creating or updating a campaign, add a toast notification confirming the record was created/updated.

##### On the `/campaigns` route:

- Implement bulk deletes using a checkbox for each table row to select which campaigns to delete.
- Add search functionality or criteria narrowing and sorting to the table.
- Store table state in local storage so the users preferences for column visibility and sorting carry over between refreshes and navigations.
- Use a modal window to show a detailed view instead of navigating to `/campaigns/<id>`.
- Prompt the user with a modal window to confirm they're sure they want to delete a campaign and add a toast notification confirming the deletion.

##### On the `/campaigns/[id]` route

- Add a delete option that redirects to `/campaigns` when finished

## Known issues

- Client side validation on blur is not working on combobox fields after failed form submission. Validation still works with resubmission.
- On failed form submission the window sometimes doesn't scroll up to the failed field.
- Edit page doesn't redirect when changes are saved but it still updates.
