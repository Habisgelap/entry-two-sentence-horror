import { mkdirSync, writeFileSync } from "node:fs";

// Two-Sentence Horror — the chosen entry (candidate 10 of 10 drafted and
// scored in the build session; highest fright score, second sentence turns
// the shrine-room of sentence one into a route to the narrator's own bed).
const STORY =
  "After my son's funeral, I kept his bedroom exactly as he left it, down to the glass of water on the nightstand. " +
  "This morning the glass was empty, and there were wet footprints leading from his bed to mine.";

// Count sentences the way a reader would: a run of text ending in a
// terminal mark (. ! ?) counts as one sentence; abbreviations are not
// used in this entry, so a simple split on terminal punctuation is exact.
function countSentences(text: string): number {
  const matches = text.match(/[^.!?]+[.!?]+/g);
  return matches === null ? 0 : matches.length;
}

const sentences = countSentences(STORY);
if (sentences !== 2) {
  throw new Error(`entry must be exactly two sentences, got ${sentences}`);
}

// Gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters,
// exactly two sentences.
const chars = [...STORY].length;
if (chars < 1 || chars > 400) {
  throw new Error(`entry must be 1-400 characters, got ${chars}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY);
console.log(`wrote ${chars} characters, ${sentences} sentences, to /output/entry.txt`);
console.log(`first sentence: ${STORY.split(". ")[0]}.`);
console.log(`second sentence: ${STORY.split(". ")[1]}`);
