const maxCharacters = 65536;

export default {
  maxCharactersCount: maxCharacters,
  charactersCountWarn: Math.floor(maxCharacters * 3 / 4)
};
