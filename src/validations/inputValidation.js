export const validateIsInArabic = (word) => {
    let regexInArabic = new RegExp("^[ا-ﺀ ]+$");
    return regexInArabic.test(word);
};