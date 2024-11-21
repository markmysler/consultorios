// File: helloAlgolia.mjs
import { algoliasearch } from "algoliasearch";

const appID = import.meta.env.VITE_ALGOLIA_APPLICATION_ID;
// API key with `addObject` and `editSettings` ACL
const apiKey = import.meta.env.VITE_ALGOLIA_API_KEY;

export const alogliaClient = algoliasearch(appID, apiKey);
