import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel = () => {
    const [emblaRef] = useEmblaCarousel([Autoplay()]);

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                <div className="flex-[0_0_100%] p-4 bg-red-500">Slide 1</div>
                <div className="flex-[0_0_100%] p-4 bg-green-500">Slide 2</div>
                <div className="flex-[0_0_100%] p-4 bg-blue-500">Slide 3</div>
            </div>
        </div>
    );
}

export default Carousel;
