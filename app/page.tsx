import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
    return (
        <div className="relative isolates overflow-hidden min-h-screen flex flex-col supports-[min-height:100dvh]:min-h-[100dvh]">
            {/* Background Decor */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
            </div>

            <main className="flex-grow flex items-center justify-center w-full">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-0 flex flex-col lg:flex-row lg:items-center gap-12 sm:gap-16 lg:gap-24 w-full">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 z-10">
                        <div className="mb-8 xl:mt-0 flex justify-center lg:justify-start">
                            <div className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50/50 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-cyan-700 shadow-sm ring-1 ring-cyan-200/50">
                                Research Survey
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] sm:leading-tight lg:leading-[1.1]">
                            Recycling in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 inline-block">Modern Dentistry</span>
                        </h1>

                        <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            A comprehensive study on the Knowledge, Attitude, and Practices of oral health professionals regarding material recycling. Your insights shape the future of sustainable dentistry.
                        </p>
                        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                            <Link
                                href="/survey"
                                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-8 sm:px-10 py-3.5 sm:py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center whitespace-nowrap"
                            >
                                Participate Now
                            </Link>
                        </div>

                        <div className="mt-4 sm:mt-12 pt-8 border-t border-slate-200/60 flex flex-row justify-center lg:justify-start gap-6 sm:gap-16 text-center sm:text-left">
                            <div>
                                <p className="text-lg sm:text-xl font-bold text-slate-900">Dr. Girish Galagali</p>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Investigator</p>
                            </div>
                            <div>
                                <p className="text-lg sm:text-xl font-bold text-slate-900">Navodaya</p>
                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Dental College</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="hidden md:flex flex-1 w-full max-w-lg lg:max-w-none mx-auto relative lg:pl-10 perspective-1000 mt-8 lg:mt-0">
                        <div className="relative w-full h-auto transform transition-transform duration-700 hover:scale-[1.02] hover:rotate-1">
                            <Image alt='hero_image' src={'/landing.png'} width={1000} height={1000} className="w-full h-auto border-4 border-black/75 rounded-xl shadow-2xl" />
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <Link
                            href="/dashboard"
                            className="block lg:hidden w-full sm:w-auto text-sm font-semibold leading-6 text-slate-900 hover:text-cyan-600 transition-colors py-3 sm:py-0 flex items-center justify-center sm:justify-start"
                        >
                            Go to Dashboard <span aria-hidden="true" className="ml-1">→</span>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="border-t border-slate-200/60 bg-white/40 backdrop-blur-md py-6 lg:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 font-medium text-center md:text-left">
                        &copy; 2024 Navodaya Dental College, Raichur
                    </p>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        KAP Survey on Sustainable Dentistry
                    </p>
                </div>
            </footer>

            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#06b6d4] to-[#14b8a6] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
            </div>
        </div>
    )
}
