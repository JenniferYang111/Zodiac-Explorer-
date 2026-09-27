# Zodiac Explorer

A small English-language interactive website for people interested in zodiac signs.

## Original idea

“This is a simple interactive web demo for people interested in star-sign facts. When someone clicks on any of the twelve zodiac-sign buttons, the experience should display that sign's corresponding personality traits on the screen.”

The descriptions present traditional astrological associations for entertainment, not scientifically established personality facts.

## Run the project

1. Download or clone this repository.
2. Open the `dist` folder.
3. Double-click `index.html` to open it in a modern browser with JavaScript enabled.
4. On the illustrated cover, click **Start Exploring**.
5. Choose one of the twelve signs on the selection screen to open its details screen, including its dates, description, and three traits.
6. Click **Back to all signs** to return and choose another sign. **Back to cover** returns to the opening illustration.

No installation, account, API key, or internet connection is needed to run the downloaded webpage.

## Files

- `dist/index.html`: page structure.
- `dist/style.css`: responsive layout and visual styling.
- `dist/script.js`: twelve sign descriptions and selection behavior.
- `dist/zodiac-cover.png`: AI-generated cover illustration representing all twelve zodiac signs.

## AI collaboration

Tool used: OpenAI Codex.

The original idea above was supplied by the student as the initial implementation prompt. Codex generated the first version, including the layout, descriptions, and button behavior. The student's own evaluation, decisions, and subsequent prompts still need to be recorded below after hands-on testing.

Implementation choices in this first version:

- Ordinary HTML buttons support mouse, touch, Enter, and Space.
- The initial shared description panel was revised into separate selection and detail screens at the student's request.
- Selected buttons use both a visual highlight and an accessible pressed state.
- Fixed local descriptions keep the project small and usable offline.

## Checks performed by Codex

- JavaScript syntax check passed; the local preview returned HTTP 200.
- Clicked all twelve signs in the browser: each showed the matching heading, three traits, and exactly one selected button.
- Enter selected Aries; Space selected Taurus.
- At the preview's 460-pixel viewport, the document did not overflow horizontally.
- After the two-screen revision, checked every sign: the correct details appeared, the selection screen was hidden, and the Back button returned to the selection screen. Enter also opened Leo's details.

These are AI-assisted checks, not a substitute for the student's own hands-on testing and reflection.

## Student testing and revision — to complete

### Revision requested by the student: birthday ranges

Prompt: “Could you add the corresponding date range for each zodiac sign? Cuz some people might not know which sign they belong to.”

The student identified that visitors may know their birthday but not their zodiac sign. Codex added date ranges directly to all twelve buttons, so visitors can find their sign before selecting it, and repeated the dates in the selected sign's details. These are conventional approximate Western zodiac ranges; exact transitions can vary by year and time. Date reference: https://time.com/5315377/are-zodiac-signs-real-astrology-history/

Try all twelve signs, switch repeatedly, select with the keyboard, and try a narrow window. Record expected results, actual results, and any changes you request. Do not present these suggested checks as completed tests until you have performed them.

### Revision requested by the student: two-screen navigation

The student requested all zodiac options on the first screen, only the selected sign's information on a second screen, and a Back button. Codex replaced the side-by-side layout with a full-width selection grid and a separate details view. Dates remain visible before selection. Returning restores focus to the selected button and the previous scroll position. Both screens are in one HTML file, so the project still runs offline; use the on-page Back button to return.

### Revision requested by the student: animated cosmic cover

Additional student-requested revision: add an illustrated cover and a **Start Exploring** button before the selection screen. Codex generated a navy-and-gold illustration of all twelve zodiac figures and connected the cover, selection, and detail screens. The artwork is bundled locally for offline use and includes descriptive alternative text.

Further student requests shaped the cover into twelve distinct glowing spheres against a full starfield. Each sphere uses a different part of the illustration, follows independently changing random directions, and bounces away from other spheres. The student also requested soft-focus fades, subtle scaling, and faint star particles between screens, without a pause button. Reduced-motion preferences disable drifting and particles and simplify the transitions.

Codex checked the collision logic for head-on bounces, separation, coincident centers, and twelve unique sign records. The student's own observations and final reflection still need to be added.

## Reflection — to complete before submission

Write 1–2 paragraphs in your own words: what matched your intention, what did not, what you tested or changed and why, how AI helped, what you decided or understood yourself, and what remains uncertain.

## Current limitations

Descriptions are brief, generalized astrological associations. There is no birth-date lookup, personalized assessment, or saved selection. Reloading returns to the cover. Use the on-page buttons to navigate between screens.
