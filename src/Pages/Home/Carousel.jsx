import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router';

const Carousel = () => {
    const options = { loop: true };
    const autoplayOptions = {
        delay: 4000,
        stopOnInteraction: false,
        playOnInit: true
    };
    const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

    const slides = [
        {
            title: "Make a Difference",
            highlight: "Today",
            description: "Join our community of volunteers and contribute to meaningful projects. Your time and skills can help create positive change.",
            image: "https://i.postimg.cc/8z2x2Lf5/environment-volunteer-concept-with-persons-holding-boxes-donations.jpg",
            gradient: "from-teal-600 to-cyan-600"
        },
        {
            title: "Find Your Perfect",
            highlight: "Volunteer",
            subtitle: "Opportunity",
            description: "Explore a variety of volunteer needs in your area and discover how you can make an impact in causes you care about.",
            image: "https://i.postimg.cc/g2XftgJQ/environment-volunteer-concept.jpg",
            gradient: "from-emerald-600 to-teal-600"
        },
        {
            title: "Empowering",
            highlight: "Communities",
            subtitle: "Together",
            description: "Together, we can build stronger, more connected communities. Volunteer and be a part of something bigger than yourself.",
            image: "https://i.postimg.cc/2jndGhrG/multiethnic-volunteer-team-removing-garbage-from-grass.jpg",
            gradient: "from-blue-600 to-indigo-600"
        }
    ];

    return (
        <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {slides.map((slide, index) => (
                    <section key={index} className="relative min-w-full">
                        <div className="container mx-auto px-6 lg:px-8 z-10 py-24">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                {/* Content Side */}
                                <div className="space-y-6 text-center lg:text-left">
                                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                        <span className="block">{slide.title}</span>
                                        <span className={`block bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                                            {slide.highlight}
                                        </span>
                                        {slide.subtitle && (
                                            <span className="block text-gray-700">{slide.subtitle}</span>
                                        )}
                                    </h1>

                                    <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                                        {slide.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                        <Link
                                            to="/posts"
                                            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-md"
                                        >
                                            Get Started
                                        </Link>
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="relative">
                                    <img
                                        src={slide.image}
                                        className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-xl"
                                        alt="Volunteer activity"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Carousel;