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
            xs: '1.5rem',
            sm: '1.75rem',
            md: '2rem',
            lg: '2.25rem'
        },
        fontWeight: 700,
        lineHeight: 1.3,
        fontFamily: 'Golos Text, sans-serif'
    },
    h2: {
        fontSize: {
            xs: '1.25rem',
            sm: '1.5rem',
            md: '1.75rem',
            lg: '2rem'
        },
        fontWeight: 700,
        lineHeight: 1.3,
        fontFamily: 'Golos Text, sans-serif'
    },
    h3: {
        fontSize: {
            xs: '1.125rem',
            sm: '1.25rem',
            md: '1.5rem'
        },
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: 'Golos Text, sans-serif'
    },
    h4: {
        fontSize: {
            xs: '1.0625rem',
            sm: '1.125rem',
            md: '1.25rem'
        },
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: 'Golos Text, sans-serif'
    },
    body: {
        fontSize: {
            xs: '0.875rem',
            sm: '0.9375rem',
            md: '1rem'
        },
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'Golos Text, sans-serif'
    },
    bodySmall: {
        fontSize: {
            xs: '0.8125rem',
            sm: '0.875rem',
            md: '0.9375rem'
        },
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'Golos Text, sans-serif'
    },
    bodyExtraSmall: {
        fontSize: {
            xs: '0.75rem',
            sm: '0.8125rem',
            md: '0.875rem'
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