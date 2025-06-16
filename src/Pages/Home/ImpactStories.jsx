import React from 'react';

const impactStories = [
    {
        id: 1,
        name: "Sarah Thompson",
        title: "Feeding Families",
        image: "https://i.postimg.cc/8z2x2Lf5/environment-volunteer-concept-with-persons-holding-boxes-donations.jpg",
        story:
            "Through weekend food drives, Sarah helped feed over 150 families during the winter months.",
    },
    {
        id: 2,
        name: "James Lee",
        title: "Clean-Up Champion",
        image: "https://i.postimg.cc/664bX8w4/junior-reis-e1-F9-G-7cnss-unsplash.jpg",
        story:
            "James organized a community cleanup that removed 500+ pounds of waste from local parks.",
    },
    {
        id: 3,
        name: "Amina Yusuf",
        title: "Youth Mentor",
        image: "https://i.postimg.cc/nLqNpMq1/different-people-doing-volunteer-work-with-food.jpg",
        story:
            "Amina dedicated her weekends to mentoring high school students, helping boost graduation rates.",
    },
];

const ImpactStories = () => {
    return (
        <section className=" py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Impact Stories</h2>
                <p className="text-lg text-gray-600 mb-12">
                    Discover how volunteers are making real changes in our communities. These stories inspire and show the power of giving back.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {impactStories.map((story) => (
                        <div
                            key={story.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
                                <p className="text-gray-600 mb-4">{story.story}</p>
                                <div className="text-sm text-gray-500 italic">— {story.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStories;
