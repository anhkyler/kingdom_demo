# Kingdom K.E.Y.S website

Static rebuild of https://www.kingdomkeysconnect.org (originally a Wix site). Plain HTML/CSS/JS — no build step.

Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000

| Page | File | Original URL |
|---|---|---|
| Home | index.html | / |
| Founder | founder.html | /about-5 |
| Our Volunteers | our-volunteers.html | /team-3 |
| Our Staff (added to the About us menu) | our-team.html | /our-team |
| Our Services | our-services.html | /our-services |
| Sisterhood Program | sisterhood-program.html | /services-6 |
| Brother’s Keeper (new, not on original) | brothers-keeper.html | — |
| Resources | resources.html | /services-4 |
| Prayer Requests | prayer-requests.html | /copy-of-free-gifts |
| Give-A-Ways | give-a-ways.html | /general-5 |
| Support Us | support-us.html | /support-us |
| Events | events.html | /events |
| Volunteer | volunteer.html | /general-8 |
| Contact | contact.html | /contact |
| Privacy Policy | privacy-policy.html | /privacy-policy |
| Terms of Use | terms-of-use.html | /terms-of-use |

## Forms
Forms have no server. Set `FORM_ENDPOINT` at the top of `js/main.js` (e.g. a Formspree URL) to receive
submissions directly; until then, submitting opens the visitor's email app addressed to kingdomkeysconnect@yahoo.com.

## Shared header/footer
The header and footer are repeated in every page. Edit them in each file (search & replace works well).
