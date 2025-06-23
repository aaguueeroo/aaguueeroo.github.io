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
    // Main headings (H1)
    h1: {
        fontSize: {
            xs: '2.5rem',
            sm: '3.5rem', 
            md: '4rem',
            lg: '5rem'
        },
        fontWeight: 700,
        lineHeight: 1.2,
        fontFamily: 'Golos Text, sans-serif'
    },
    // Section headings (H2)
    h2: {
        fontSize: {
            xs: '2.2rem',
            sm: '2.7rem',
            md: '2.7rem',
            lg: '2.7rem'
        },
        fontWeight: 700,
        lineHeight: 1.2,
        fontFamily: 'Golos Text, sans-serif'
    },
    // Subsection headings (H3)
    h3: {
        fontSize: {
            xs: '1.7rem',
            sm: '1.9rem',
            md: '2.1rem'
        },
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: 'Golos Text, sans-serif'
    },
    h4: {
        fontSize: {
            xs: '1.3rem',
            sm: '1.5rem',
            md: '1.7rem'
        },
    },
    // Body text (descriptions, paragraphs)
    body: {
        fontSize: {
            xs: '1.3rem',
            sm: '1.3rem',
            md: '1.5rem'
        },
        fontWeight: 400,
        lineHeight: 1.4,
        fontFamily: 'Golos Text, sans-serif'
    },
    // Small body text (captions, secondary info)
    bodySmall: {
        fontSize: {
            xs: '1.1rem',
            sm: '1.2rem',
            md: '1.3rem'
        },
        fontWeight: 400,
        lineHeight: 1.4,
        fontFamily: 'Golos Text, sans-serif'
    },
    // Button text
    button: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
        fontFamily: 'Golos Text, sans-serif'
    }
} as const;