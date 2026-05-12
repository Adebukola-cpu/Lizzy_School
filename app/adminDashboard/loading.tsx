export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
            {Array(6)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-xl p-4 shadow bg-white animate-pulse"
                    >
                        <div className="w-full h-40 bg-gray-300 rounded-lg mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
        </div>
    );
}