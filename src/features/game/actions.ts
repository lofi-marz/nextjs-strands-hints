export function fetchHints(words: string[]) {
    const params = new URLSearchParams();
    params.append('words', words.join(','));
    const url = '/api/hints?' + params;
    console.log(url);
    return fetch(url);
}
