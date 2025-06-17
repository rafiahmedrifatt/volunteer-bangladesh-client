import React from 'react';

const testimonials = [
    {
        name: "Sarah Thompson",
        role: "Volunteer",
        quote:
            "This platform connected me with causes I care about. It’s rewarding to make a real impact in my community.",
        image: "https://i.postimg.cc/8z2x2Lf5/environment-volunteer-concept-with-persons-holding-boxes-donations.jpg", // Replace with real image URLs
    },
    {
        name: "John Martinez",
        role: "Non-Profit Organizer",
        quote:
            "We've seen a huge increase in volunteer sign-ups since joining the platform. It's made recruitment easier and faster.",
        image: "https://i.postimg.cc/664bX8w4/junior-reis-e1-F9-G-7cnss-unsplash.jpg",
    },
    {
        name: "Emily Wu",
        role: "Volunteer",
        quote:
            "I’ve met amazing people and gained valuable experience. The platform made it all so accessible and easy.",
        image: "https://i.postimg.cc/nLqNpMq1/different-people-doing-volunteer-work-with-food.jpg",
    },
];

const TestimonialsSection = () => {
    return (
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 my-10">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                <p className="text-gray-600 mb-12">
                    Hear from our volunteers and partners about how the platform has made a difference.
                </p>
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700">"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
