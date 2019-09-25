export function makeUrl(base: URL, path: string, params: Record<string, string> = {}){
    const url = new URL(path, base);
        
    url.search = new URLSearchParams(params).toString();
    return url.toString();
}
