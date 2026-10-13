export async function serachOpenLibrary(query: string){
    const url = new URL("https://openlibrary.org/search.json");

    url.searchParams.set("q", query); 
    url.searchParams.set(
        "fields", 
        "key, title, author_name, first_publish_year, cover_i, subject"
    ); 
    
    url.searchParams.set("limit", "10"); 

    const response = await fetch(url); 

    if(!response.ok){
        throw new Error("Open Library request failed"); 
    }

    const data = await response.json(); 

    return (data.docs ?? []).map((book: any) => ({
        key: book.key, 
        title: book.title, 
        authors: book.author_name ?? [],
        year: book.first_publish_year ?? null, 
        coverId: book.cover_i ?? null, 
        subjects: book.subject?.slice(0,5) ?? [], 
    })); 
    
}