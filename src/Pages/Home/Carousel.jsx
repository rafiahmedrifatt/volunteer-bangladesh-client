import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router';

const Carousel = () => {
    const options = { loop: true }
    const autoplayOptions = {
        delay: 4000,
        stopOnInteraction: false,
        playOnInit: true
    };

    const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

    return (
        <div className="overflow-hidden mt-0" ref={emblaRef}>
            <div className="flex">
                <section className="lg:grid lg:h-screen lg:w-screen lg:place-content-center">
                    <div
                        className="mx-auto w-screen max-w-screen px-4 py-10 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
                    >
                        <div className="w-10/12 mx-auto text-left">
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                                Make a Difference
                                <strong className="text-teal-600"> Today </strong>
                            </h1>

                            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                                Join our community of volunteers and contribute to meaningful projects. Your time and skills can help create positive change.
                            </p>

                            <div className="mt-4 flex gap-4 sm:mt-6">
                                <Link
                                    className="inline-block rounded border px-5 py-3 font-medium bg-gray-100 text-teal-600 transition hover:text-teal-600/75"
                                    to="/posts"
                                >
                                    Get Started
                                </Link>

                                <a
                                    className="inline-block rounded border px-5 py-3 font-medium shadow-sm bg-teal-600 text-white transition hover:bg-teal-700"
                                    href="#"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <img src="https://i.postimg.cc/8z2x2Lf5/environment-volunteer-concept-with-persons-holding-boxes-donations.jpg" className='w-10/12 mx-auto rounded-2xl' alt="" />
                    </div>
                </section>
                <section className="lg:grid lg:h-screen lg:w-screen lg:place-content-center">
                    <div
                        className="mx-auto w-screen max-w-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
                    >
                        <div className="w-10/12 mx-auto text-left">
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                                Find Your Perfect
                                <strong className="text-teal-600"> Volunteer </strong>
                                Opportunity
                            </h1>

                            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                                Explore a variety of volunteer needs in your area and discover how you can make an impact in causes you care about
                            </p>

                            <div className="mt-4 flex gap-4 sm:mt-6">
                                <Link
                                    className="inline-block rounded border px-5 py-3 font-medium bg-gray-100 text-teal-600 transition hover:text-teal-600/75"
                                    to="/posts"
                                >
                                    Get Started
                                </Link>

                                <a
                                    className="inline-block rounded border px-5 py-3 font-medium shadow-sm bg-teal-600 text-white transition hover:bg-teal-700"
                                    href="#"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <img src="https://i.postimg.cc/g2XftgJQ/environment-volunteer-concept.jpg" className='w-10/12 mx-auto rounded-2xl' alt="" />
                    </div>
                </section>
                <section className="lg:grid lg:h-screen lg:w-screen lg:place-content-center">
                    <div
                        className="mx-auto w-screen max-w-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
                    >
                        <div className="w-10/12 mx-auto text-left">
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                                Empowering
                                <strong className="text-teal-600"> Communities </strong>
                                Together
                            </h1>

                            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                                Together, we can build stronger, more connected communities. Volunteer and be a part of something bigger than yourself.
                            </p>

                            <div className="mt-4 flex gap-4 sm:mt-6">
                                <Link
                                    className="inline-block rounded border px-5 py-3 font-medium bg-gray-100 text-teal-600 transition hover:text-teal-600/75"
                                    to="/posts"
                                >
                                    Get Started
                                </Link>

                                <a
                                    className="inline-block rounded border px-5 py-3 font-medium shadow-sm bg-teal-600 text-white transition hover:bg-teal-700"
                                    href="#"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <img src="https://i.postimg.cc/2jndGhrG/multiethnic-volunteer-team-removing-garbage-from-grass.jpg" className='w-10/12 mx-auto rounded-2xl' alt="" />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Carousel;
