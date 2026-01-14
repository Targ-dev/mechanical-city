import React from 'react';

const brands = [
    '/images/brands/1.jpg',
    '/images/brands/2.jpg',
    '/images/brands/3.jpg',
    '/images/brands/4.jpg',
    '/images/brands/5.jpg',
    '/images/brands/6.jpg',
    '/images/brands/7.jpg',
    '/images/brands/8.jpg',
    '/images/brands/9.jpg',
    '/images/brands/10.jpg',
    '/images/brands/11.jpg',
    '/images/brands/12.jpg',
];

const PopularBrands = () => {
    // Split brands into two rows
    const row1 = brands.slice(0, 6);
    const row2 = brands.slice(6, 12);

    // Duplicate arrays for seamless infinite scroll
    const brandsRow1 = [...row1, ...row1, ...row1, ...row1];
    const brandsRow2 = [...row2, ...row2, ...row2, ...row2];

    const BrandCard = ({ src }: { src: string }) => (
        <div className="group flex-shrink-0 w-40 h-24 md:w-56 md:h-36 bg-white border border-gray-100 rounded-lg flex items-center justify-center py-6 px-2 mx-2 md:hover:shadow-md transition-shadow duration-500 relative overflow-hidden">
            <img
                src={src}
                alt="Brand"
                className="max-w-[85%] max-h-[85%] object-contain transition-all duration-300"
            />
        </div>
    );

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="layout-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-secondary uppercase tracking-wide mb-4">
                        Popular Brands
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-muted text-sm max-w-lg mx-auto">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 overflow-hidden">
                {/* Top Row - Moving Left */}
                <div className="relative flex">
                    <div className="flex animate-scroll-left whitespace-nowrap w-max">
                        {brandsRow1.map((src, idx) => (
                            <BrandCard key={`r1-${idx}`} src={src} />
                        ))}
                    </div>
                </div>

                {/* Bottom Row - Moving Right */}
                <div className="relative flex">
                    <div className="flex animate-scroll-right whitespace-nowrap w-max">
                        {brandsRow2.map((src, idx) => (
                            <BrandCard key={`r2-${idx}`} src={src} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularBrands;
