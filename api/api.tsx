export const getActivity = async ({ search }) => {
    try {
      const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=128314be&app_key=7f7f3fd18e6cbcbc6e6d78037fe29fbe&ingr=${search}`);
      const responseJson = await response.json();
  
      const data = responseJson.hints.map((hint) => ({
        Label: hint.food.label,
        Brand: hint.food.brand,
        ENERC_KCAL: hint.food.nutrients.ENERC_KCAL,
        FAT: hint.food.nutrients.FAT
      }));
      console.warn(search)
      return {
        data
      };
    } catch (error) {
      throw new Error('Error fetching data');
    }
  };