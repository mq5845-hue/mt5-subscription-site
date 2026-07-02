# Google Form Entry Mapping

Use this file to wire the reservation form to a Google Form.

## Recommended order

1. Create a Google Form with these questions.
2. Open the form, submit one test entry, then inspect the network request or form HTML.
3. Copy each field's `entry.xxxxx` name.
4. Paste the mapping into `GOOGLE_FORM_FIELD_MAP`.

## Form fields

| App field | Purpose | Suggested Google Form question |
| --- | --- | --- |
| `name` | Lead name | Name |
| `email` | Email address | Email |
| `address` | Address | Address |
| `phoneNumber` | Phone number | Phone number |
| `comments` | Comments | Comments |

## Example env values

```bash
GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/1FAIpQLScYrRh0ocOwqeujLk01hot8W4EJrM-JGXrzsT5UTTuUxNzpVg/formResponse"
GOOGLE_FORM_FIELD_MAP='{"name":"entry.2005620554","email":"entry.1045781291","address":"entry.1065046570","phoneNumber":"entry.1166974658","comments":"entry.839337160"}'
```

## Per-field env fallback

If you prefer separate variables instead of the JSON map, the app also accepts:

```bash
GOOGLE_FORM_ENTRY_NAME="entry.2005620554"
GOOGLE_FORM_ENTRY_EMAIL="entry.1045781291"
GOOGLE_FORM_ENTRY_ADDRESS="entry.1065046570"
GOOGLE_FORM_ENTRY_PHONE_NUMBER="entry.1166974658"
GOOGLE_FORM_ENTRY_COMMENTS="entry.839337160"
```

## Notes

- `GOOGLE_FORM_ACTION_URL` should be the `formResponse` URL, not the share link.
- Keep `entry.xxxxx` values in sync with the Google Form if the questions are edited.
- If a field is optional in the form, you can still map it; blank values are skipped by the app.
- In the current form, `name`, `email`, and `address` are treated as required; `phoneNumber` and `comments` can be left blank.
