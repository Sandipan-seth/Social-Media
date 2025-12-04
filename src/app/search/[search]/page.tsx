import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react'; 

export default async function SearchPage({ params }: { params: { search: string } }) {
    const {search} =await params;
    
    const sameNameData = [
        {
            id: 1,
            name: search,
            username: "@" + search.toLowerCase().replace(/\s/g, ''),
            bio: "Official profile for the main account. Posting updates daily.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            name: search,
            username: "@" + search.toLowerCase().replace(/\s/g, '') + "_fans",
            bio: "The best fan content and community discussions. Follow for more!",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

        {
            id: 3,
            name: search,
            username: "@" + search.toLowerCase().replace(/\s/g, '') + "_archive",
            bio: "Archival content and historical data.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex justify-center">
            
            <main className="w-full max-w-4xl py-10 px-4 sm:px-6 lg:px-8">
                
                <div className="mb-10 pb-4 border-b border-zinc-800">
                    <div className="flex items-center text-zinc-400 mb-2">
                        <Search className="w-5 h-5 mr-2" />
                        <span className="text-sm">Search results for...</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-indigo-400">
                        {search}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sameNameData.map((item) => (
                        <Link href={`/profile/${item.username}`} key={item.id} className="block group">
                            <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg flex items-center space-x-4 transition duration-300 hover:bg-zinc-800 hover:border-indigo-600/50 transform hover:-translate-y-0.5">
                                
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 group-hover:border-indigo-400 transition" 
                                />
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-xl font-bold text-white truncate group-hover:text-indigo-400 transition">
                                        {item.name}
                                    </h2>
                                    <p className="text-sm text-zinc-400 mb-1 truncate">
                                        {item.username}
                                    </p>
                                    
                                    <p className="text-xs text-zinc-500 line-clamp-2">
                                        {item.bio}
                                    </p>
                                </div>
                                <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-indigo-400 transition" />
                            </div>
                        </Link>
                    ))}
                </div>
                
                

            </main>
        </div>
    );
}