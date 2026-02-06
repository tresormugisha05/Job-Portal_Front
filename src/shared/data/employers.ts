export interface Employer {
    id: string;
    name: string;
    slug: string;
    openings: number;
    location: string;
    description: string;
    logo: string;
    socials: {
        website?: string;
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        googlePlus?: string;
        pinterest?: string;
    };
}

export const employers: Employer[] = [
    // A
    {
        id: "1",
        name: "Akshay INC.",
        slug: "akshay-inc",
        openings: 3,
        location: "12 Lane No 5 Jain Nagar Delhi, 110039",
        description: "Akshay Technology Ltd.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg", // Placeholder
        socials: {
            website: "http://apusthemes.com",
            facebook: "apustheme",
            twitter: "apustheme",
            linkedin: "apustheme",
            googlePlus: "apustheme",
            pinterest: "apustheme",
        },
    },
    {
        id: "2",
        name: "Apus Inc.",
        slug: "apus-inc",
        openings: 1,
        location: "New York, USA",
        description: "Innovative tech solutions provided by Apus Inc.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
        socials: {
            website: "http://apusinc.com",
            twitter: "apusinc",
        },
    },

    // C
    {
        id: "3",
        name: "Camera Inc.",
        slug: "camera-inc",
        openings: 4,
        location: "London, UK",
        description: "Leading photography equipment and services.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png",
        socials: {
            website: "http://camerainc.com",
            facebook: "camerainc",
        },
    },
    {
        id: "4",
        name: "Coriea Inc.",
        slug: "coriea-inc",
        openings: 2,
        location: "Seoul, South Korea",
        description: "Global logistics and supply chain management.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
        socials: {
            linkedin: "corieainc",
        },
    },

    // E
    {
        id: "5",
        name: "Envato Inc.",
        slug: "envato-inc",
        openings: 2,
        location: "Melbourne, Australia",
        description: "Community for creative assets and creative people.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
        socials: {
            website: "http://envato.com",
            twitter: "envato",
        },
    },
    {
        id: "6",
        name: "EVNShop Inc.",
        slug: "evnshop-inc",
        openings: 1,
        location: "Berlin, Germany",
        description: "Premium ecommerce solutions.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Facebook_F_icon.svg",
        socials: {
            facebook: "evnshop",
        },
    },

    // F
    {
        id: "7",
        name: "FShop Inc.",
        slug: "fshop-inc",
        openings: 2,
        location: "Paris, France",
        description: "Fashion retail and online shopping.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg",
        socials: {
            website: "http://fshop.com",
            pinterest: "fshop",
        },
    },

    // P
    {
        id: "8",
        name: "Pay Walt",
        slug: "pay-walt",
        openings: 2,
        location: "San Francisco, USA",
        description: "Secure payment processing systems.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg",
        socials: {
            website: "http://paywalt.com",
            twitter: "paywalt",
        },
    },

    // W
    {
        id: "9",
        name: "Webstrot Inc.",
        slug: "webstrot-inc",
        openings: 2,
        location: "Toronto, Canada",
        description: "Web development and digital marketing agency.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png",
        socials: {
            website: "http://webstrot.com",
            linkedin: "webstrot",
        },
    },
];
