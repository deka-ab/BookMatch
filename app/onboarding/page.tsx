import Button from "@/components/Button"; 

export default function Onboarding() {
    
    return (
        <main>
            <h1 className="text-4xl font-bold"> Tell us about yourself</h1>

            <h2 className = "text-lg "> What are you interested in?</h2>

            <Button text="Gaming" />

            <button className="bg-green-500 text-white px-4 py-2 rounded">Psychology </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded"> Technology </button>

            <button className="bg-red-500 text-white px-4 py-2 rounded"> Sport </button>

            <button className="bg-purple-500 text-white px-4 py-2 rounded"> History </button>

            <p className="text-lg">  Continue</p>
        
        </main>
    );
}