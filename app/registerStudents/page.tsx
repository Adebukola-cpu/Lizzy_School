import { registerStudent } from "../actions/student";





export default function Register() {


    return (
        <main className="max-w-2xl mx-auto py-16 px-6">

            <h1 className="text-3xl font-bold text-blue-600 mb-6">
                Student Registration
            </h1>

            <form action={registerStudent} className="flex flex-col gap-3">

                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="middlename"
                    placeholder="Middle Name"
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="date"
                    name="DOB"
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full border p-3 rounded"
                />


                <button type="submit" className="w-full border p-3 rounded">Register</button>

            </form>

        </main>
    );
}