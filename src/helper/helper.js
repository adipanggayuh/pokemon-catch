import bg from '../constant/bgImages';
import defaultImage from '../media/default.svg';
const getBgImage = (poke) => {
    let type = getFirstType(poke);
    return type ? bg[type] : bg.normal;
}
const getFirstType = (poke) => {
    if (poke.types && poke.types.length) {
        return poke.types[0].type.name;
    } else {
        return null;
    }
}

const getImage = (poke) => {
    return poke?.sprites?.other?.dream_world?.front_default || defaultImage;
}

export {
    getBgImage,
    getFirstType,
    getImage
}