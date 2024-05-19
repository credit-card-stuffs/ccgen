export const CommonBrandsList = [
    {
        brand: "mastercard",
        regex: /^5[1-5]\d{14}$/,
    },
    {
        brand: "visa",
        regex: /^4\d{15}$/,
    },
    {
        brand: "elo",
        regex: /^50[0679]\d{12}$|^60[4678]\d{12}$|^63[6789]\d{12}$|^64[0-9]\d{12}$|^65[0-9]\d{12}$/,
    },
    {
        brand: "american express",
        regex: /^3[47]\d{13}$|^30[0-5]\d{12}$|^3[89]\d{14}$/,
    },
    {
        brand: "diners club",
        regex: /^30[0-5]\d{11}$|^36\d{12}$|^38\d{12}$|^39\d{12}$/,
    },
    {
        brand: "discover",
        regex: /^6011\d{12}$|^64[4-9]\d{12}$|^65\d{12}$/,
    },
]
