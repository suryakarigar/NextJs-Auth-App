export default function Profile({params}: any) {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>User 1 Profile</h1>
            <p className="text-4xl p-3">User <span className="px-3 py-1 rounded-lg bg-orange-400">{params.id}</span></p>
        </div>
    )
}