 "use client";

 
  import Image from "next/image";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";
import BlogAdminPage from "./blogAdmin/page";

  export default function Home() {

    const images = [
      "/images/primary2.jpg",
      "/images/secondary.webp",
      "/images/studentlearn.jpg",
      "/images/commercial.jpg",
      "/images/studentExam.jpg",
      "/images/learners.jpg",
    ];

    const [current, setCurrent] = useState(0);
    const [blogs, setBlogs] = useState([]);

    // auto change every 4 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    }, []);


    useEffect(() => {

      const fetchBlogs = async () => {

        const res = await fetch("/api/blog/all");

        const data = await res.json();

        if (data.success) {
          setBlogs(data.blogs);
        }
      };

      fetchBlogs();

    }, []);

    const courses = [
      {
        title: "Mathematics",
        desc: "Advanced algebra, calculus, and problem-solving techniques.",
        color: "bg-blue-600",
      },
      {
        title: "English Language",
        desc: "Literature, writing skills, and communication mastery.",
        color: "bg-green-600",
      },
      {
        title: "Physics",
        desc: "Mechanics, electricity, and modern physics concepts.",
        color: "bg-purple-600",
      },
      {
        title: "Chemistry",
        desc: "Organic, inorganic, and practical laboratory work.",
        color: "bg-pink-600",
      },
      {
        title: "Biology",
        desc: "Human anatomy, ecology, and life sciences.",
        color: "bg-emerald-600",
      },
      {
        title: "ICT",
        desc: "Programming, digital literacy, and modern tech tools.",
        color: "bg-indigo-600",
      },
      {
        title: "Economics",
        desc: "Market systems, finance, and economic principles.",
        color: "bg-yellow-500",
      },
      {
        title: "Government",
        desc: "Political systems, leadership, and civic education.",
        color: "bg-red-600",
      },
    ];
  
  return (
    <main className="min-h-screen font-sans overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">

        {/* SLIDER 1 */}
        <div
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative min-w-full h-full">
              <Image
                src={img}
                alt="School"
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 px-4 sm:px-6 md:px-10 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Building Future Leaders
          </h1>

          <p className="text-sm sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            A place where excellence, discipline, and innovation meet.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/admissions">
              <button className="w-full sm:w-auto bg-blue-600 px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Apply Now
              </button>
            </Link>

            <Link href="/about">
              <button className="w-full sm:w-auto border border-white px-5 py-3 rounded-lg hover:bg-white hover:text-black transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* SLIDER 2 (kept but prevented from breaking UI) */}
        <div
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out pointer-events-none opacity-0"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative min-w-full h-full">
              <Image
                src={img}
                alt="School"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

      </section>

      {/* ABOUT */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center">

        {/* TEXT */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            About Our School
          </h2>

          <p className="text-gray-600 mb-4 text-base sm:text-lg md:text-xl leading-relaxed">
            We provide high-quality education that prepares students
            for global opportunities. Our focus is on academic excellence,
            character development, and innovation.
          </p>

          <Link href="/about">
            <button className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
              Read More →
            </button>
          </Link>
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96">
          <Image
            src="/images/classroom.jpg"
            alt="Classroom"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-2xl"
          />
        </div>

      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-100">

        {/* HEADER */}
        <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Higher School Program & Courses
          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Our senior school curriculum prepares students for university,
            leadership, and global opportunities.
          </p>
        </div>

        {/* GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >

              {/* BACKGROUND */}
              <div
                className={`${course.color} h-28 sm:h-32 md:h-40 flex items-center justify-center transition-all duration-500 md:group-hover:h-52`}
              >
                <h3 className="text-white text-lg sm:text-xl font-bold text-center px-2">
                  {course.title}
                </h3>
              </div>

              {/* CONTENT */}
              <div className="bg-white p-4 sm:p-5 transform transition-all duration-500 md:group-hover:-translate-y-6">
                <p className="text-gray-600 text-sm sm:text-base">
                  {course.desc}
                </p>
              </div>

              {/* HOVER LINE */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 md:group-hover:w-full" />

            </motion.div>
          ))}

        </div>

      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 text-gray-800">
          Lower School Instruction
        </h2>

        {/* GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

          {/* CARD 1 */}
          <div className="bg-lime-500 p-5 sm:p-6 rounded-xl shadow text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="font-semibold mb-2 text-white text-lg sm:text-xl">
              Child-Centered Learning
            </h3>
            <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
              We focus on each child’s unique learning style, ensuring they grow
              at their own pace with confidence.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-pink-500 p-5 sm:p-6 rounded-xl shadow text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="font-semibold mb-2 text-white text-lg sm:text-xl">
              Interactive Teaching
            </h3>
            <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
              Lessons are engaging through storytelling, visuals, and hands-on
              activities that make learning enjoyable.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-violet-500 p-5 sm:p-6 rounded-xl shadow text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="font-semibold mb-2 text-white text-lg sm:text-xl">
              Continuous Assessment
            </h3>
            <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
              Regular assessments help track progress and provide support where needed.
            </p>
          </div>

        </div>

      </section>


      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-100">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 text-gray-800">
          Lower School Program & Courses
        </h2>

        {/* GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {[
            {
              title: "English Language",
              desc: "Reading, writing, phonics, and communication skills.",
              color: "from-blue-500 to-blue-700",
            },
            {
              title: "Mathematics",
              desc: "Numbers, problem-solving, and logical reasoning.",
              color: "from-green-500 to-green-700",
            },
            {
              title: "Basic Science",
              desc: "Introduction to nature, environment, and experiments.",
              color: "from-purple-500 to-purple-700",
            },
            {
              title: "Social Studies",
              desc: "Understanding society, culture, and community values.",
              color: "from-yellow-500 to-yellow-600",
            },
            {
              title: "ICT",
              desc: "Basic computer knowledge and digital skills.",
              color: "from-fuchsia-500 to-pink-600",
            },
            {
              title: "Creative Arts",
              desc: "Drawing, music, drama, and creativity development.",
              color: "from-teal-500 to-teal-700",
            },
          ].map((course, index) => (

            <div
              key={index}
              className={`group relative p-5 sm:p-6 rounded-2xl text-white shadow-lg overflow-hidden 
              bg-linear-to-br ${course.color}
              transform transition-all duration-500 ease-in-out
              hover:-translate-y-2 sm:hover:-translate-y-3 md:hover:scale-105 hover:shadow-2xl`}
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: "forwards",
              }}
            >

              {/* Overlay glow */}
              <div className="absolute inset-0 bg-white/10 opacity-0 md:group-hover:opacity-100 transition duration-500" />

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 relative z-10 text-center sm:text-left">
                {course.title}
              </h3>

              <p className="text-sm sm:text-base opacity-90 relative z-10 leading-relaxed text-center sm:text-left">
                {course.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      <section className="py-20 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Complementing the Academic Program
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* SPORTS */}
          <div className="rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
            <div className="relative h-80 w-full">
              <Image
                src="/images/sport.jpg"
                alt="Sports"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Sports & Physical Education</h3>
              <p className="text-lg text-gray-600">
                Encouraging teamwork, fitness, and discipline through sports activities.
              </p>
            </div>
          </div>

          {/* CLUBS */}
          <div className="rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
            <div className="relative h-80 w-full">
              <Image
                src="/images/vocation.jpg"
                alt="Classroom"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Clubs & Activities</h3>
              <p className="text-lg text-gray-600">
                Debate, music, drama, and other clubs to develop talents.
              </p>
            </div>
          </div>

          {/* EXCURSIONS */}
          <div className="rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
            <div className="relative h-80 w-full">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/admission.jpg"
                  alt="Admission"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Excursions & Field Trips</h3>
              <p className="text-lg text-gray-600">
                Real-world learning experiences outside the classroom.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-100">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">
          Why Choose Us
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">

          {/* CARD 1 */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Expert Teachers
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Highly qualified and passionate educators guiding students.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Modern Learning
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Smart classrooms and advanced teaching techniques.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Safe Environment
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              A secure and supportive atmosphere for all students.
            </p>
          </div>

        </div>

      </section>
{/* NEWS */}
<section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">

  {/* TITLE */}
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">
    Latest News
  </h2>

  {/* GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

    {blogs.slice(0, 3).map((blog: any) => (

      <Link
        key={blog._id}
        href={`/blog/${blog.slug}`}
        className="group"
      >

        <div className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">

          {/* IMAGE */}
          <div className="relative w-full h-80 overflow-hidden">

            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />

          </div>

          {/* CONTENT */}
          <div className="p-6">

            <h3 className="font-bold text-2xl mb-3 text-gray-800 line-clamp-2">
              {blog.title}
            </h3>

            <p className="text-gray-600 leading-relaxed line-clamp-3 text-base">
              {blog.excerpt}
            </p>

            <div className="mt-5">

              <span className="text-blue-600 font-semibold group-hover:underline">
                Read More →
              </span>

            </div>

          </div>

        </div>

      </Link>

    ))}

  </div>

</section>


      <footer className="bg-gray-900 text-gray-300">

        {/* ================= TOP ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* BRAND */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                MySchool
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Raising future leaders through excellence, discipline, and innovation.
              </p>
            </div>

            {/* NAVIGATION */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/academics" className="hover:text-white">Academics</Link></li>
                <li><Link href="/admissions" className="hover:text-white">Admissions</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* ACADEMICS LINKS */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">
                Academics
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link href="/academics/primary_school" className="hover:text-white">Primary School</Link></li>
                <li><Link href="/academics/secondary_school" className="hover:text-white">Secondary School</Link></li>
                <li><Link href="/academics/curriculum" className="hover:text-white">Curriculum</Link></li>
                <li><Link href="/academics/departments" className="hover:text-white">Departments</Link></li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">
                Contact
              </h3>

              <p className="text-sm sm:text-base mb-2">📍 Osogbo, Osun State</p>
              <p className="text-sm sm:text-base mb-2">📞 +234 808 803 3643</p>
              <p className="text-sm sm:text-base mb-4">✉️ info@myschool.com</p>

              <Link href="/admissions">
                <button className="w-full sm:w-auto bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition text-sm">
                  Apply Now
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* ================= LOGIN / SIGNUP BAR ================= */}
        <div className="border-t border-gray-800">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">

            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} MySchool. All rights reserved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">

              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                  Login
                </button>
              </Link>

              <Link href="/signup" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-blue-600 px-4 py-2 rounded-lg text-sm text-white hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </Link>

            </div>

          </div>

        </div>

      </footer>


    </main>
  );
}