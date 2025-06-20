import fs from 'fs';

// Define file paths
const ruFilePath = './src/i18n/locales/app_ru.json';
const enFilePath = './src/i18n/locales/app_en.json';
const outputFilePath = './src/i18n/locales/app_ru_with_english_keys.json';

// Read the files
const ruData = JSON.parse(fs.readFileSync(ruFilePath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

// Create a mapping of Russian keys to English keys
function createKeyMapping(enObj) {
    const mapping = new Map();

    // Find all English keys that have Russian counterparts in their values
    for (const [key, value] of Object.entries(enObj)) {
        if (typeof value === 'string') {
            mapping.set(value, key);
        } else if (typeof value === 'object' && value !== null) {
            const nestedMapping = createKeyMapping(value);
            for (const [nestedKey, nestedValue] of nestedMapping) {
                mapping.set(nestedKey, nestedValue);
            }
        }
    }

    return mapping;
}

// Create a reverse mapping from Russian keys to English keys
const keyMapping = createKeyMapping(enData);

function transformKey(value) {
    if (typeof value !== 'string') {
        return value;
    }

    return value.replace(/\s+/g, '_').toLowerCase();
}

// Example usage in your translation process:
function translateKeys(ruObj) {
    const result = {};

    for (const [ruKey, ruValue] of Object.entries(ruObj)) {
        // Find English key for this Russian key or use the original
        let engKey = keyMapping.get(ruKey) || ruKey;

        // Transform the key
        engKey = transformKey(ruValue);

        if (typeof ruValue === 'object' && ruValue !== null) {
            result[engKey] = translateKeys(ruValue);
        } else {
            result[engKey] = ruValue;
        }
    }

    return result;
}

// Translate keys
const translatedData = translateKeys(enData);

// Write the result to a file
fs.writeFileSync(outputFilePath, JSON.stringify(translatedData, null, 2), 'utf8');

console.log('Keys translated successfully. Output saved to:', outputFilePath);
