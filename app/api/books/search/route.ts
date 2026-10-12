import { serachOpenLibrary } from "@/lib/open-library";

export async function GET(request: Request) {
    const query = new URL(request.url).searchParams.get("q")?.trim(); 

    if(!query) {
        return Response.json(
            {error: "Du må oppgi et søk"}, 
            {status: 400}
        );
    }

    try{
        const books = await serachOpenLibrary(query); 
        return Response.json({books})
    } catch {
        return Response.json(
            {error: "Kunne ikke hente bøker."}, 
            {status: 502}
        );
    }
    
}