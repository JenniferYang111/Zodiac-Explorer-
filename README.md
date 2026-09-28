# Zodiac Explorer

A small English-language interactive website for people interested in zodiac signs.

## Link

1. GitHub Repository: [https://github.com/JenniferYang111/Zodiac-Explorer-](https://github.com/JenniferYang111/Zodiac-Explorer-)
2. Live website: [https://jenniferyang111.github.io/Zodiac-Explorer-/](https://jenniferyang111.github.io/Zodiac-Explorer-/)

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

## AI‑Collaboration

Tool used: OpenAI Codex.

### Key Prompts from My Conversation with AI

These five prompts summarize my main requests to Codex; they are condensed paraphrases, not verbatim quotations.

- **Initial idea:** Build an interactive webpage where clicking one of twelve zodiac signs displays its personality traits.
- **Information and navigation:** Add date ranges, separate sign selection from details, and include a Back button.
- **Cover design:** Add a starry cover with twelve unique, glowing zodiac spheres and a Start Exploring button.
- **Animation and refinement:** Make the spheres drift independently and bounce on contact. Use soft fades, subtle zooms, and star particles between screens, without a pause button.
- **Publishing:** Commit and push the project to a public GitHub repository, then publish a live website link.

## Reflection

The first version captured my main idea: clicking any of the twelve zodiac buttons displayed the corresponding personality traits. Its dark palette and highlighted buttons also matched the mysterious atmosphere I had imagined. However, I expected the selection and details to appear on separate screens, whereas Codex placed them side by side. Some additions were unexpected but useful, including short trait summaries, each sign’s element, and a reminder that astrology is entertainment rather than science. After trying the page, I focused on making it easier to explore. I requested date ranges so visitors could identify not only their own sign but also those of friends and family whose birthdays they knew. I also changed the layout into three screens: a cover, a sign selection screen, and an individual sign’s details. The Start Exploring and Back buttons gave this sequence a clear direction, while separating the information helped users focus on the sign they wanted to read about. For the cover, I moved from a static, neatly arranged illustration to twelve glowing spheres drifting slowly across a starry background. This felt more playful and better suited the sense of discovery I wanted. I also liked that returning to the selection screen kept the most recently chosen sign highlighted. The full record of these changes is in my [testing and revision notes](test.md).

Codex handled the coding and turned a short description into a working starting point, but deciding what the experience should feel like required my own judgment. The initial page fulfilled the basic interaction without fully expressing the journey I had in mind. I had to try it, notice what felt crowded or visually stiff, and explain the changes I wanted through several rounds of conversation. Choices about the page structure, imagery, colors, buttons, and movement became clearer as I saw each version. This process helped me distinguish between a feature that works and an experience that feels thoughtfully designed. There are still aspects I would like to explore: the personality descriptions are too brief for the depth I hoped to offer, and the button grid may not be the most engaging way to choose a sign, although I have not yet settled on an alternative. The visual design could also be more refined. Carefully placed sun or moon imagery might give the background more character and make the site feel more polished without distracting from its content. These remain possible next steps rather than changes I have already completed.
