'use client'

import { useState, type FormEvent } from 'react'

type Book = {
    key: string, 
    title: string, 
    authors: string[], 
    year: number | null 
}

export default function BookSearch() {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        setLoading(true)
        setError('')

        try{
        const response = await fetch(
            `/api/books/search?q=${encodeURIComponent(query)}`
        )
        const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Søket feilet')
      }

      setBooks(data.books)
    
    } catch {
      setError('Kunne ikke hente bøker. Prøv igjen.')
      setBooks([])
    
    } finally {
      setLoading(false)
    }
    }

    


    return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Søk etter bøker"
        />
        <button disabled={loading || !query.trim()}>
          {loading ? 'Søker…' : 'Søk'}
        </button>
      </form>

      {error && <p>{error}</p>}
      {!loading && !error && books.length === 0 && <p>Søk etter en bok.</p>}

      <ul>
        {books.map((book) => (
          <li key={book.key}>
            <strong>{book.title}</strong>
            <span> — {book.authors.join(', ') || 'Ukjent forfatter'}</span>
            {book.year && <span> ({book.year})</span>}
          </li>
        ))}
      </ul>
    </section>
  )
    
}