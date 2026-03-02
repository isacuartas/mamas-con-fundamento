import atalahData from '../data/atalahData.json';

/**
 * Encuentra o interpola linealmente los valores de p10, p85 y p97 para una semana dada.
 * Esto es necesario porque el JSON original solo tiene puntos de control específicos (semanas pares/claves).
 */
export const getAtalahLimitsForWeek = (week) => {
    // Si la semana es menor a 10, no hay curva oficial MINSA, no evaluamos
    if (week < 10) return null;

    // Buscar si existe el punto exacto
    const exactPoint = atalahData.find(p => p.week === week);
    if (exactPoint) return exactPoint;

    // Si no es un punto exacto, encontrar los dos los puntos más cercanos (interpolación)
    let pInf = null;
    let pSup = null;

    for (let i = 0; i < atalahData.length - 1; i++) {
        if (week > atalahData[i].week && week < atalahData[i + 1].week) {
            pInf = atalahData[i];
            pSup = atalahData[i + 1];
            break;
        }
    }

    // Si es más allá de la semana 42 (extrapolación plana basándonos en el último punto)
    if (!pInf && !pSup) {
        if (week > 42) return atalahData[atalahData.length - 1];
        return null;
    }

    // Interpolación Lineal: y = y0 + (x - x0) * ((y1 - y0) / (x1 - x0))
    const interpolate = (y0, y1) => {
        const x0 = pInf.week;
        const x1 = pSup.week;
        return y0 + (week - x0) * ((y1 - y0) / (x1 - x0));
    };

    return {
        week,
        p10: parseFloat(interpolate(pInf.p10, pSup.p10).toFixed(2)),
        p85: parseFloat(interpolate(pInf.p85, pSup.p85).toFixed(2)),
        p97: parseFloat(interpolate(pInf.p97, pSup.p97).toFixed(2))
    };
};

/**
 * Retorna la clasificación en la que se encuentra un IMC en una semana dada
 */
export const getNutritionalStatusForWeek = (week, currentImc) => {
    const limits = getAtalahLimitsForWeek(week);
    if (!limits) return "Normal"; // Fallback

    if (currentImc < limits.p10) return "BAJO_PESO";
    if (currentImc >= limits.p10 && currentImc <= limits.p85) return "NORMAL";
    if (currentImc > limits.p85 && currentImc <= limits.p97) return "SOBREPESO";
    if (currentImc > limits.p97) return "OBESIDAD";

    return "NORMAL";
};
