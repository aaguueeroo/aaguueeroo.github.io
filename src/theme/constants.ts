export const Spacings = {
    xxs: 4,
    xs: 8,
    s: 16,
    ms: 24,
    m: 32,
    ml: 48,
    l: 64,
    xl: 128,
    xxl: 256,
} as const;

export const Colors = {
    primary: "#CF8B7F",
    secondary: "#212529",
}

export const Radiuses = {
    xxs: 4,
    xs: 8,
    s: 16,
    m: 24,
    l: 48,
    xl: 80,
    xxl: 160,
}

export const MaxWidths = {
    content: "1400px",    // Increased from 1200px
    layout: "2000px",     // Increased from 1920px
    component: "1000px",  // Increased from 900px
} as const;

export const Typography = {
    h1: {
        fontSize: {
            xs: '2rem',
            sm: '2.5rem',
            md: '3rem',
            lg: '3.5rem'
        },
        fontWeight: 700,
        lineHeight: 1.3,
        fontFamily: 'Golos Text, sans-serif'
    },
    h2: {
        fontSize: {
            xs: '1.8rem',
            sm: '2rem',
            md: '2.3rem',
            lg: '2.7rem'
        },
        fontWeight: 700,
        lineHeight: 1.3,
        fontFamily: 'Golos Text, sans-serif'
    },
    h3: {
        fontSize: {
            xs: '1.5rem',
            sm: '1.7rem',
            md: '2rem'
        },
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: 'Golos Text, sans-serif'
    },
    h4: {
        fontSize: {
            xs: '1.3rem',
            sm: '1.5rem',
            md: '1.7rem'
        },
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: 'Golos Text, sans-serif'
    },
    body: {
        fontSize: {
            xs: '1rem',
            sm: '1.1rem',
            md: '1.2rem'
        },
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'Golos Text, sans-serif'
    },
    bodySmall: {
        fontSize: {
            xs: '0.9rem',
            sm: '1rem',
            md: '1.1rem'
        },
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'Golos Text, sans-serif'
    },
    bodyExtraSmall: {
        fontSize: {
            xs: '0.8rem',
            sm: '0.9rem',
            md: '1rem'
        },
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'Golos Text, sans-serif'
    },
    button: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: 'Golos Text, sans-serif'
    }
} as const;